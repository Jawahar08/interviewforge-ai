package com.interviewforge.history.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.interviewforge.auth.entity.User;
import com.interviewforge.auth.repository.UserRepository;
import com.interviewforge.history.dto.InterviewHistoryResponse;
import com.interviewforge.result.entity.InterviewResult;
import com.interviewforge.result.repository.InterviewResultRepository;

@Service
public class InterviewHistoryService {

    private final InterviewResultRepository repository;
    private final UserRepository userRepository;

    public InterviewHistoryService(
            InterviewResultRepository repository,
            UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
    }

    @Transactional(readOnly = true)
    public List<InterviewHistoryResponse> getHistory() {
        User user = getCurrentUser();

        // Sort by ID descending by sorting the stream since results are user-filtered
        return repository.findByUser(user)
                .stream()
                .sorted((r1, r2) -> r2.getId().compareTo(r1.getId()))
                .map(this::convert)
                .toList();
    }

    private InterviewHistoryResponse convert(InterviewResult result) {
        String title = result.getSession() != null && result.getSession().getInterview() != null
                ? result.getSession().getInterview().getTitle() : "N/A";
        String role = result.getSession() != null && result.getSession().getInterview() != null
                ? result.getSession().getInterview().getRole() : "N/A";
        String feedback = result.getRecommendation() != null ? result.getRecommendation() : "";
        String createdAt = result.getCreatedAt() != null ? result.getCreatedAt().toString() : "";

        return InterviewHistoryResponse.builder()
                .id(result.getSession() != null ? result.getSession().getId() : result.getId())
                .company(title)
                .role(role)
                .score(result.getOverallScore())
                .feedback(feedback)
                .createdAt(createdAt)
                .build();
    }
}