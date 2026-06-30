package com.interviewforge.result.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.interviewforge.answer.entity.Answer;
import com.interviewforge.answer.repository.AnswerRepository;
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

    public ResultService(
            InterviewSessionRepository sessionRepository,
            AnswerRepository answerRepository,
            InterviewResultRepository resultRepository) {

        this.sessionRepository = sessionRepository;
        this.answerRepository = answerRepository;
        this.resultRepository = resultRepository;
    }

    public ResultResponse generateResult(Long sessionId) {

        InterviewSession session =
                sessionRepository.findById(sessionId)
                        .orElseThrow(() ->
                                new RuntimeException("Session not found"));

        List<Answer> answers =
                answerRepository.findBySession(session);

        double total = answers.stream()
                .mapToDouble(answer ->
                        answer.getScore() == null ? 0 : answer.getScore())
                .sum();

        double overall =
                answers.isEmpty()
                        ? 0
                        : total / answers.size();

        InterviewResult result =
                InterviewResult.builder()
                        .session(session)
                        .score(overall)
                        .feedback("Interview completed successfully.")
                        .strengths("Good Java fundamentals and Spring Boot knowledge.")
                        .weaknesses("Improve Docker and Kubernetes.")
                        .createdAt(LocalDateTime.now())
                        .build();

        resultRepository.save(result);

        return ResultResponse.builder()
                .overallScore(overall)
                .technicalScore(overall)
                .communicationScore(80.0)
                .confidenceScore(85.0)
                .strengths(result.getStrengths())
                .weaknesses(result.getWeaknesses())
                .recommendation(
                        "Ready for interviews. Improve cloud technologies.")
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
                .overallScore(result.getScore())
                .technicalScore(result.getScore())
                .communicationScore(80.0)
                .confidenceScore(85.0)
                .strengths(result.getStrengths())
                .weaknesses(result.getWeaknesses())
                .recommendation(result.getFeedback())
                .build();
    }

}