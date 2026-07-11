package com.interviewforge.result.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.interviewforge.ai.gemini.GeminiService;
import com.interviewforge.answer.entity.Answer;
import com.interviewforge.answer.repository.AnswerRepository;
import com.interviewforge.result.dto.ResultResponse;
import com.interviewforge.result.entity.InterviewResult;
import com.interviewforge.result.repository.InterviewResultRepository;
import com.interviewforge.session.entity.InterviewSession;
import com.interviewforge.session.repository.InterviewSessionRepository;

import java.util.List;
import java.util.Objects;
@Service
public class ResultService {

    private final InterviewSessionRepository sessionRepository;

    private final AnswerRepository answerRepository;

    private final InterviewResultRepository resultRepository;

    private final GeminiService geminiService;

    public ResultService(
        InterviewSessionRepository sessionRepository,
        AnswerRepository answerRepository,
        InterviewResultRepository resultRepository,
        GeminiService geminiService
) {

    this.sessionRepository = sessionRepository;
    this.answerRepository = answerRepository;
    this.resultRepository = resultRepository;
    this.geminiService = geminiService;
}

    public ResultResponse generateResult(
        Long sessionId
) {

    InterviewSession session =
            sessionRepository.findById(sessionId)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Interview session not found"
                            )
                    );

    List<Answer> answers =
            answerRepository.findBySession(session);

    if (answers.isEmpty()) {
        throw new RuntimeException(
                "No answers found for this interview session."
        );
    }

    double technicalScore =
            answers.stream()
                    .map(Answer::getScore)
                    .filter(Objects::nonNull)
                    .mapToDouble(Double::doubleValue)
                    .average()
                    .orElse(0.0);

    double communicationScore =
            Math.min(
                    100,
                    technicalScore * 0.90 + 8
            );

    double confidenceScore =
            Math.min(
                    100,
                    technicalScore * 0.95 + 5
            );

    double overallScore =
            (
                    technicalScore
                    + communicationScore
                    + confidenceScore
            ) / 3.0;

    String evaluations =
            answers.stream()
                    .map(Answer::getFeedback)
                    .filter(Objects::nonNull)
                    .collect(
                            Collectors.joining(
                                    "\n\n----------------\n\n"
                            )
                    );

    String aiSummary =
            geminiService.generateInterviewSummary(
                    overallScore,
                    evaluations
            );

    String strengths =
            extractSection(
                    aiSummary,
                    "Strengths",
                    "Weaknesses"
            );

    String weaknesses =
            extractSection(
                    aiSummary,
                    "Weaknesses",
                    "Recommendation"
            );

    String recommendation =
            extractSection(
                    aiSummary,
                    "Recommendation",
                    "Summary"
            );

    String summary =
            extractSection(
                    aiSummary,
                    "Summary",
                    null
            );

    InterviewResult result =
            InterviewResult.builder()
                    .session(session)
                    .overallScore(overallScore)
                    .technicalScore(technicalScore)
                    .communicationScore(
                            communicationScore
                    )
                    .confidenceScore(
                            confidenceScore
                    )
                    .strengths(strengths)
                    .weaknesses(weaknesses)
                    .recommendation(
                            recommendation
                    )
                    .summary(summary)
                    .build();

    resultRepository.save(result);

    return ResultResponse.builder()
        .overallScore(overallScore)
        .technicalScore(technicalScore)
        .communicationScore(communicationScore)
        .confidenceScore(confidenceScore)
        .strengths(strengths)
        .weaknesses(weaknesses)
        .recommendation(recommendation)
        .summary(summary)
        .build();
}
            


    public ResultResponse getResult(Long sessionId) {

        InterviewSession session =
                sessionRepository.findById(sessionId)
                        .orElseThrow(() ->
                                new RuntimeException("Session not found"));

        InterviewResult result =
                resultRepository.findBySession(session)
                        .orElseThrow(() ->
                                new RuntimeException("Result not found"));

        return ResultResponse.builder()
        .overallScore(result.getOverallScore())
        .technicalScore(result.getTechnicalScore())
        .communicationScore(result.getCommunicationScore())
        .confidenceScore(result.getConfidenceScore())
        .strengths(result.getStrengths())
        .weaknesses(result.getWeaknesses())
        .recommendation(result.getRecommendation())
        .summary(result.getSummary())
        .build();
    }
    private String extractSection(
        String text,
        String start,
        String end
) {

    if (text == null || text.isBlank()) {
        return "";
    }

    String startToken = start + ":";

    int startIndex = text.indexOf(startToken);

    if (startIndex < 0) {
        return "";
    }

    startIndex += startToken.length();

    int endIndex;

    if (end == null) {

        endIndex = text.length();

    } else {

        String endToken = end + ":";

        endIndex = text.indexOf(endToken, startIndex);

        if (endIndex < 0) {
            endIndex = text.length();
        }
    }

    return text
            .substring(startIndex, endIndex)
            .trim();
}

}