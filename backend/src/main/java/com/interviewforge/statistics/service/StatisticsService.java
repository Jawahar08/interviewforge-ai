package com.interviewforge.statistics.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.interviewforge.result.entity.InterviewResult;
import com.interviewforge.result.repository.InterviewResultRepository;
import com.interviewforge.session.entity.SessionStatus;
import com.interviewforge.session.repository.InterviewSessionRepository;
import com.interviewforge.statistics.dto.StatisticsResponse;

@Service
public class StatisticsService {

    private final InterviewSessionRepository sessionRepository;
    private final InterviewResultRepository resultRepository;

    public StatisticsService(
            InterviewSessionRepository sessionRepository,
            InterviewResultRepository resultRepository) {

        this.sessionRepository = sessionRepository;
        this.resultRepository = resultRepository;
    }

    public StatisticsResponse getStatistics() {

        Long totalSessions =
                sessionRepository.count();

        Long completedSessions =
                sessionRepository.countByStatus(
                        SessionStatus.COMPLETED);

        List<InterviewResult> results =
                resultRepository.findAll();

        double averageScore =
                results.stream()
                        .mapToDouble(
                                InterviewResult::getScore)
                        .average()
                        .orElse(0.0);

        double successRate =
                totalSessions == 0
                        ? 0
                        : (completedSessions.doubleValue()
                        / totalSessions) * 100;

        return new StatisticsResponse(
                totalSessions,
                completedSessions,
                averageScore,
                successRate
        );
    }
}