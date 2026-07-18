package com.interviewforge.result.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.interviewforge.ai.gemini.GeminiService;
import com.interviewforge.answer.entity.Answer;
import com.interviewforge.answer.repository.AnswerRepository;
import com.interviewforge.auth.entity.User;
import com.interviewforge.auth.repository.UserRepository;
import com.interviewforge.question.entity.Question;
import com.interviewforge.result.dto.QuestionReviewDto;
import com.interviewforge.result.dto.ResultResponse;
import com.interviewforge.result.entity.InterviewResult;
import com.interviewforge.result.repository.InterviewResultRepository;
import com.interviewforge.session.entity.InterviewSession;
import com.interviewforge.session.repository.InterviewSessionRepository;

@Service
public class ResultService {

    private final InterviewSessionRepository sessionRepository;
    private final AnswerRepository answerRepository;
    private final InterviewResultRepository resultRepository;
    private final GeminiService geminiService;
    private final UserRepository userRepository;

    public ResultService(
            InterviewSessionRepository sessionRepository,
            AnswerRepository answerRepository,
            InterviewResultRepository resultRepository,
            GeminiService geminiService,
            UserRepository userRepository) {
        this.sessionRepository = sessionRepository;
        this.answerRepository = answerRepository;
        this.resultRepository = resultRepository;
        this.geminiService = geminiService;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
    }

    @Transactional
    public ResultResponse generateResult(Long sessionId) {
        User user = getCurrentUser();

        InterviewSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Interview session not found"));

        // Enforce user ownership
        if (session.getUser() == null || !session.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized: You do not own this interview session");
        }

        List<Answer> answers = answerRepository.findBySession(session);

        if (answers.isEmpty()) {
            throw new RuntimeException("No answers found for this interview session.");
        }

        double technicalScore = answers.stream()
                .map(Answer::getScore)
                .filter(Objects::nonNull)
                .mapToDouble(Double::doubleValue)
                .average()
                .orElse(0.0);

        double communicationScore = Math.min(100, technicalScore * 0.90 + 8);
        double confidenceScore = Math.min(100, technicalScore * 0.95 + 5);
        double overallScore = (technicalScore + communicationScore + confidenceScore) / 3.0;

        String evaluations = answers.stream()
                .map(Answer::getFeedback)
                .filter(Objects::nonNull)
                .collect(Collectors.joining("\n\n----------------\n\n"));

        String aiSummary = geminiService.generateInterviewSummary(overallScore, evaluations);

        String strengths = extractSection(aiSummary, "Strengths", "Weaknesses");
        String weaknesses = extractSection(aiSummary, "Weaknesses", "Recommendation");
        String recommendation = extractSection(aiSummary, "Recommendation", "Summary");
        String summary = extractSection(aiSummary, "Summary", null);

        // Check if result already exists for this session to make it idempotent
        Optional<InterviewResult> existingResult = resultRepository.findBySession(session);
        InterviewResult result;
        if (existingResult.isPresent()) {
            result = existingResult.get();
            result.setOverallScore(overallScore);
            result.setTechnicalScore(technicalScore);
            result.setCommunicationScore(communicationScore);
            result.setConfidenceScore(confidenceScore);
            result.setStrengths(strengths);
            result.setWeaknesses(weaknesses);
            result.setRecommendation(recommendation);
            result.setSummary(summary);
            result.setCreatedAt(LocalDateTime.now());
        } else {
            result = InterviewResult.builder()
                    .session(session)
                    .overallScore(overallScore)
                    .technicalScore(technicalScore)
                    .communicationScore(communicationScore)
                    .confidenceScore(confidenceScore)
                    .strengths(strengths)
                    .weaknesses(weaknesses)
                    .recommendation(recommendation)
                    .summary(summary)
                    .createdAt(LocalDateTime.now())
                    .build();
        }

        resultRepository.save(result);

        List<QuestionReviewDto> questionReviews = mapAnswersToReviews(answers);

        return ResultResponse.builder()
                .overallScore(overallScore)
                .technicalScore(technicalScore)
                .communicationScore(communicationScore)
                .confidenceScore(confidenceScore)
                .strengths(strengths)
                .weaknesses(weaknesses)
                .recommendation(recommendation)
                .summary(summary)
                .questions(questionReviews)
                .build();
    }

    @Transactional(readOnly = true)
    public ResultResponse getResult(Long sessionId) {
        User user = getCurrentUser();

        InterviewSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        // Enforce user ownership
        if (session.getUser() == null || !session.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized: You do not own this interview session");
        }

        InterviewResult result = resultRepository.findBySession(session)
                .orElseThrow(() -> new RuntimeException("Result not found"));

        List<Answer> answers = answerRepository.findBySession(session);
        List<QuestionReviewDto> questionReviews = mapAnswersToReviews(answers);

        return ResultResponse.builder()
                .overallScore(result.getOverallScore())
                .technicalScore(result.getTechnicalScore())
                .communicationScore(result.getCommunicationScore())
                .confidenceScore(result.getConfidenceScore())
                .strengths(result.getStrengths())
                .weaknesses(result.getWeaknesses())
                .recommendation(result.getRecommendation())
                .summary(result.getSummary())
                .questions(questionReviews)
                .build();
    }

    private List<QuestionReviewDto> mapAnswersToReviews(List<Answer> answers) {
        return answers.stream().map(ans -> {
            Question q = ans.getQuestion();
            return QuestionReviewDto.builder()
                    .questionId(q != null ? q.getId() : null)
                    .questionText(q != null ? q.getQuestionText() : null)
                    .category(q != null ? q.getCategory() : null)
                    .difficulty(q != null ? q.getDifficulty() : null)
                    .modelAnswer(q != null ? q.getAnswer() : null)
                    .userAnswer(ans.getUserAnswer())
                    .score(ans.getScore())
                    .feedback(ans.getFeedback())
                    .build();
        }).collect(Collectors.toList());
    }

    private String extractSection(String text, String start, String end) {
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

        return text.substring(startIndex, endIndex).trim();
    }
}