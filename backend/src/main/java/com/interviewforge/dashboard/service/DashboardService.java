package com.interviewforge.dashboard.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.interviewforge.answer.repository.AnswerRepository;
import com.interviewforge.auth.entity.User;
import com.interviewforge.auth.repository.UserRepository;
import com.interviewforge.dashboard.dto.DashboardResponse;
import com.interviewforge.interview.repository.InterviewRepository;
import com.interviewforge.question.repository.QuestionRepository;
import com.interviewforge.result.repository.InterviewResultRepository;
import com.interviewforge.resume.entity.Resume;
import com.interviewforge.resume.repository.ResumeRepository;

@Service
public class DashboardService {

    private final InterviewRepository interviewRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final InterviewResultRepository resultRepository;
    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;

    public DashboardService(
            InterviewRepository interviewRepository,
            QuestionRepository questionRepository,
            AnswerRepository answerRepository,
            InterviewResultRepository resultRepository,
            UserRepository userRepository,
            ResumeRepository resumeRepository) {
        this.interviewRepository = interviewRepository;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.resultRepository = resultRepository;
        this.userRepository = userRepository;
        this.resumeRepository = resumeRepository;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
    }

    @Transactional(readOnly = true)
    public DashboardResponse getDashboard() {
        User user = getCurrentUser();

        Double average = resultRepository.getAverageScoreByUser(user);
        Double highest = resultRepository.getHighestScoreByUser(user);
        Double lowest = resultRepository.getLowestScoreByUser(user);

        List<Resume> userResumes = resumeRepository.findByUserOrderByCreatedAtDesc(user);
        Integer resumeAts = userResumes.stream()
                .filter(r -> "COMPLETED".equals(r.getStatus()))
                .map(Resume::getAtsScore)
                .filter(java.util.Objects::nonNull)
                .findFirst()
                .orElse(0);

        String aiInsight = "Welcome back! Start your mock interview to begin tracking performance and matching target competencies.";
        Optional<Resume> latestResume = userResumes.stream()
                .filter(r -> "COMPLETED".equals(r.getStatus()))
                .findFirst();

        if (latestResume.isPresent() && latestResume.get().getMissingSkills() != null && !latestResume.get().getMissingSkills().isEmpty()) {
            List<String> missing = latestResume.get().getMissingSkills();
            aiInsight = "Your latest resume optimization report suggests focusing on: " + 
                String.join(", ", missing.subList(0, Math.min(3, missing.size()))) + 
                " to increase your target placement readiness.";
        } else if (average != null && average > 0) {
            aiInsight = "Your average interview score is " + String.format("%.0f", average) + "%. Continue practicing to sharpen your coding and communication skills.";
        }

        return DashboardResponse.builder()
                .totalInterviews(interviewRepository.countByUser(user))
                .totalQuestions(questionRepository.countByUser(user))
                .totalAnswers(answerRepository.countByUser(user))
                .averageInterviewScore(average == null ? 0.0 : average)
                .highestScore(highest == null ? 0.0 : highest)
                .lowestScore(lowest == null ? 0.0 : lowest)
                .resumeAtsScore(resumeAts)
                .aiInsight(aiInsight)
                .build();
    }
}