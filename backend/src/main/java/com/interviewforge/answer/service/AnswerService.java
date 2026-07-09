package com.interviewforge.answer.service;

import java.time.LocalDateTime;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.interviewforge.ai.gemini.GeminiService;
import com.interviewforge.answer.dto.AnswerEvaluationResult;
import com.interviewforge.answer.dto.AnswerResponse;
import com.interviewforge.answer.dto.SubmitAnswerRequest;
import com.interviewforge.answer.entity.Answer;
import com.interviewforge.answer.repository.AnswerRepository;
import com.interviewforge.common.exception.AnswerNotFoundException;
import com.interviewforge.question.entity.Question;
import com.interviewforge.question.repository.QuestionRepository;
import com.interviewforge.session.entity.InterviewSession;
import com.interviewforge.session.repository.InterviewSessionRepository;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final InterviewSessionRepository sessionRepository;
    private final GeminiService geminiService;

    public AnswerService(
            AnswerRepository answerRepository,
            QuestionRepository questionRepository,
            InterviewSessionRepository sessionRepository,
            GeminiService geminiService
    ) {
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
        this.sessionRepository = sessionRepository;
        this.geminiService = geminiService;
    }

    @Transactional
    public AnswerResponse submitAnswer(
            SubmitAnswerRequest request
    ) {
        validateSubmitRequest(request);

        Question question = questionRepository
                .findById(request.getQuestionId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Question not found: "
                                        + request.getQuestionId()
                        )
                );

        InterviewSession session = sessionRepository
                .findById(request.getSessionId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Session not found: "
                                        + request.getSessionId()
                        )
                );

        Answer answer = Answer.builder()
                .question(question)
                .session(session)
                .userAnswer(request.getUserAnswer().trim())
                .score(null)
                .feedback("Pending evaluation")
                .submittedAt(LocalDateTime.now())
                .build();

        Answer savedAnswer =
                answerRepository.save(answer);

        return mapToResponse(savedAnswer);
    }

    @Transactional
public AnswerResponse evaluateAnswer(
        Long answerId
) {
    if (answerId == null) {
        throw new IllegalArgumentException(
                "Answer ID is required"
        );
    }

    Answer answer = answerRepository
            .findById(answerId)
            .orElseThrow(() ->
                    new AnswerNotFoundException(answerId)
            );

    Question question =
            answer.getQuestion();

    if (question == null) {
        throw new IllegalStateException(
                "Answer "
                        + answerId
                        + " is not linked to a question"
        );
    }

    String questionText =
            question.getQuestionText();

    if (questionText == null
            || questionText.isBlank()) {
        throw new IllegalStateException(
                "Question text is missing for question "
                        + question.getId()
        );
    }

    String expectedAnswer =
            question.getAnswer();

    if (expectedAnswer == null
            || expectedAnswer.isBlank()) {
        expectedAnswer =
                "No reference answer is available. "
                + "Evaluate based on technical correctness, "
                + "relevance, clarity, and completeness.";
    }

    String userAnswer =
            answer.getUserAnswer();

    if (userAnswer == null
            || userAnswer.isBlank()) {
        throw new IllegalStateException(
                "Submitted answer text is empty"
        );
    }

    System.out.println(
            "Evaluating answer ID: " + answerId
    );

    System.out.println(
            "Question ID: " + question.getId()
    );

    String aiFeedback =
            geminiService.evaluateAnswer(
                    questionText,
                    expectedAnswer,
                    userAnswer
            );

    System.out.println(
            "Gemini evaluation received successfully"
    );

    AnswerEvaluationResult evaluation =
            parseEvaluation(aiFeedback);

    answer.setScore(
            evaluation.getScore()
    );

    answer.setFeedback(
            evaluation.getFeedback()
    );

    Answer savedAnswer =
            answerRepository.save(answer);

    return mapToResponse(savedAnswer);
}

    private void validateSubmitRequest(
            SubmitAnswerRequest request
    ) {
        if (request == null) {
            throw new IllegalArgumentException(
                    "Answer request is required"
            );
        }

        if (request.getQuestionId() == null) {
            throw new IllegalArgumentException(
                    "Question ID is required"
            );
        }

        if (request.getSessionId() == null) {
            throw new IllegalArgumentException(
                    "Session ID is required"
            );
        }

        if (request.getUserAnswer() == null
                || request.getUserAnswer().isBlank()) {
            throw new IllegalArgumentException(
                    "User answer cannot be empty"
            );
        }
    }

    private AnswerEvaluationResult parseEvaluation(
            String aiFeedback
    ) {
        if (aiFeedback == null
                || aiFeedback.isBlank()) {
            return AnswerEvaluationResult.builder()
                    .score(0.0)
                    .strengths("Not available")
                    .weaknesses(
                            "AI evaluation returned no feedback"
                    )
                    .suggestions(
                            "Try submitting the answer again"
                    )
                    .feedback(
                            "Evaluation could not be generated"
                    )
                    .build();
        }

        double score = extractScore(aiFeedback);

        return AnswerEvaluationResult.builder()
                .score(score)
                .strengths(
                        extractSection(
                                aiFeedback,
                                "Strengths",
                                "Weaknesses"
                        )
                )
                .weaknesses(
                        extractSection(
                                aiFeedback,
                                "Weaknesses",
                                "Suggestions"
                        )
                )
                .suggestions(
                        extractSection(
                                aiFeedback,
                                "Suggestions",
                                null
                        )
                )
                .feedback(aiFeedback.trim())
                .build();
    }

    private double extractScore(
            String feedback
    ) {
        Pattern scoreOutOfTenPattern =
                Pattern.compile(
                        "(?i)score\\s*:?\\s*"
                                + "(\\d+(?:\\.\\d+)?)"
                                + "\\s*/\\s*10"
                );

        Matcher outOfTenMatcher =
                scoreOutOfTenPattern.matcher(feedback);

        if (outOfTenMatcher.find()) {
            double scoreOutOfTen =
                    Double.parseDouble(
                            outOfTenMatcher.group(1)
                    );

            return clampScore(
                    scoreOutOfTen * 10.0
            );
        }

        Pattern genericScorePattern =
                Pattern.compile(
                        "(?i)score\\s*:?\\s*"
                                + "(\\d+(?:\\.\\d+)?)"
                );

        Matcher genericMatcher =
                genericScorePattern.matcher(feedback);

        if (genericMatcher.find()) {
            double rawScore =
                    Double.parseDouble(
                            genericMatcher.group(1)
                    );

            if (rawScore <= 10.0) {
                rawScore *= 10.0;
            }

            return clampScore(rawScore);
        }

        return 0.0;
    }

    private String extractSection(
            String feedback,
            String startHeading,
            String endHeading
    ) {
        String endPattern =
                endHeading == null
                        ? "\\z"
                        : "(?="
                        + Pattern.quote(endHeading)
                        + "\\s*:)";

        Pattern pattern = Pattern.compile(
                "(?is)"
                        + Pattern.quote(startHeading)
                        + "\\s*:\\s*(.*?)"
                        + endPattern
        );

        Matcher matcher =
                pattern.matcher(feedback);

        if (matcher.find()) {
            String value =
                    matcher.group(1).trim();

            return value.isBlank()
                    ? "Not available"
                    : value;
        }

        return "Not available";
    }

    private double clampScore(
            double score
    ) {
        return Math.max(
                0.0,
                Math.min(100.0, score)
        );
    }

    private AnswerResponse mapToResponse(
            Answer answer
    ) {
        return AnswerResponse.builder()
                .id(answer.getId())
                .questionId(
                        answer.getQuestion().getId()
                )
                .sessionId(
                        answer.getSession().getId()
                )
                .userAnswer(
                        answer.getUserAnswer()
                )
                .score(answer.getScore())
                .feedback(answer.getFeedback())
                .submittedAt(
                        answer.getSubmittedAt()
                )
                .build();
    }
}