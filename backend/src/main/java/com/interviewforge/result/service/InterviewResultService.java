package com.interviewforge.result.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.interviewforge.result.dto.CreateResultRequest;
import com.interviewforge.result.entity.InterviewResult;
import com.interviewforge.result.repository.InterviewResultRepository;
import com.interviewforge.session.entity.InterviewSession;
import com.interviewforge.session.repository.InterviewSessionRepository;

@Service
public class InterviewResultService {

    private final InterviewResultRepository resultRepository;
    private final InterviewSessionRepository sessionRepository;

    public InterviewResultService(
            InterviewResultRepository resultRepository,
            InterviewSessionRepository sessionRepository) {

        this.resultRepository = resultRepository;
        this.sessionRepository = sessionRepository;
    }

    public InterviewResult createResult(
            CreateResultRequest request) {

        InterviewSession session =
                sessionRepository.findById(
                        request.getSessionId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Session not found"));

        InterviewResult result =
                InterviewResult.builder()
                        .session(session)
                        .score(request.getScore())
                        .feedback(request.getFeedback())
                        .strengths(request.getStrengths())
                        .weaknesses(request.getWeaknesses())
                        .createdAt(LocalDateTime.now())
                        .build();

        return resultRepository.save(result);
    }
}