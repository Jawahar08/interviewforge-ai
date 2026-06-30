package com.interviewforge.dashboard.service;

import org.springframework.stereotype.Service;

import com.interviewforge.answer.repository.AnswerRepository;
import com.interviewforge.dashboard.dto.DashboardResponse;
import com.interviewforge.interview.repository.InterviewRepository;
import com.interviewforge.question.repository.QuestionRepository;
import com.interviewforge.result.repository.InterviewResultRepository;

@Service
public class DashboardService {

    private final InterviewRepository interviewRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final InterviewResultRepository resultRepository;

    public DashboardService(
            InterviewRepository interviewRepository,
            QuestionRepository questionRepository,
            AnswerRepository answerRepository,
            InterviewResultRepository resultRepository) {

        this.interviewRepository = interviewRepository;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.resultRepository = resultRepository;
    }

    public DashboardResponse getDashboard() {

        Double average = resultRepository.getAverageScore();
        Double highest = resultRepository.getHighestScore();
        Double lowest = resultRepository.getLowestScore();

        return DashboardResponse.builder()
                .totalInterviews(interviewRepository.count())
                .totalQuestions(questionRepository.count())
                .totalAnswers(answerRepository.count())
                .averageInterviewScore(average == null ? 0 : average)
                .highestScore(highest == null ? 0 : highest)
                .lowestScore(lowest == null ? 0 : lowest)
                .resumeAtsScore(82)
                .aiInsight(
                        "Your interview performance is improving. Focus on Docker, Kubernetes and System Design to increase your placement readiness.")
                .build();
    }
}