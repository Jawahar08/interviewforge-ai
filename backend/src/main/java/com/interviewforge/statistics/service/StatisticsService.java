package com.interviewforge.statistics.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.interviewforge.auth.entity.User;
import com.interviewforge.auth.repository.UserRepository;
import com.interviewforge.result.entity.InterviewResult;
import com.interviewforge.result.repository.InterviewResultRepository;
import com.interviewforge.session.entity.SessionStatus;
import com.interviewforge.session.repository.InterviewSessionRepository;
import com.interviewforge.statistics.dto.StatisticsResponse;

@Service
public class StatisticsService {

    private final InterviewSessionRepository sessionRepository;
    private final InterviewResultRepository resultRepository;
    private final UserRepository userRepository;

    public StatisticsService(
            InterviewSessionRepository sessionRepository,
            InterviewResultRepository resultRepository,
            UserRepository userRepository) {
        this.sessionRepository = sessionRepository;
        this.resultRepository = resultRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
    }

    @Transactional(readOnly = true)
    public StatisticsResponse getStatistics() {
        User user = getCurrentUser();

        Long totalSessions = sessionRepository.countByUser(user);
        Long completedSessions = sessionRepository.countByUserAndStatus(user, SessionStatus.COMPLETED);

        List<InterviewResult> results = resultRepository.findByUser(user);

        double averageScore = results.stream()
                .map(InterviewResult::getOverallScore)
                .filter(java.util.Objects::nonNull)
                .mapToDouble(Double::doubleValue)
                .average()
                .orElse(0.0);

        double successRate = totalSessions == 0
                ? 0.0
                : (completedSessions.doubleValue() / totalSessions) * 100;

        return new StatisticsResponse(
                totalSessions,
                completedSessions,
                averageScore,
                successRate
        );
    }
}