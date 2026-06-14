package com.interviewforge.dashboard.service;

import org.springframework.stereotype.Service;

import com.interviewforge.dashboard.dto.DashboardResponse;
import com.interviewforge.interview.repository.InterviewRepository;
import com.interviewforge.question.repository.QuestionRepository;
import com.interviewforge.result.repository.InterviewResultRepository;
import com.interviewforge.session.entity.SessionStatus;
import com.interviewforge.session.repository.InterviewSessionRepository;

@Service
public class DashboardService {

    private final InterviewRepository interviewRepository;
    private final QuestionRepository questionRepository;
    private final InterviewSessionRepository sessionRepository;
    private final InterviewResultRepository resultRepository;

    public DashboardService(
            InterviewRepository interviewRepository,
            QuestionRepository questionRepository,
            InterviewSessionRepository sessionRepository,
            InterviewResultRepository resultRepository) {

        this.interviewRepository = interviewRepository;
        this.questionRepository = questionRepository;
        this.sessionRepository = sessionRepository;
        this.resultRepository = resultRepository;
    }

    public DashboardResponse getDashboard() {

        Long totalInterviews = interviewRepository.count();

        Long totalQuestions = questionRepository.count();

        Long totalSessions = sessionRepository.count();

        Long completedSessions =
                sessionRepository.countByStatus(
                        SessionStatus.COMPLETED);

        Double averageScore =
                resultRepository.getAverageScore();

        if (averageScore == null) {
            averageScore = 0.0;
        }

        return DashboardResponse.builder()
                .totalInterviews(totalInterviews)
                .totalQuestions(totalQuestions)
                .totalSessions(totalSessions)
                .completedSessions(completedSessions)
                .averageScore(averageScore)
                .build();
    }
}