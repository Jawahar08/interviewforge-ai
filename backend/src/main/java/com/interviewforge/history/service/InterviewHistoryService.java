package com.interviewforge.history.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.interviewforge.history.dto.InterviewHistoryResponse;
import com.interviewforge.result.entity.InterviewResult;
import com.interviewforge.result.repository.InterviewResultRepository;

@Service
public class InterviewHistoryService {

    private final InterviewResultRepository repository;

    public InterviewHistoryService(
            InterviewResultRepository repository) {

        this.repository = repository;
    }

    public List<InterviewHistoryResponse> getHistory() {

        return repository.findAllByOrderByIdDesc()
                .stream()
                .map(this::convert)
                .toList();
    }

    private InterviewHistoryResponse convert(
        InterviewResult result) {

    return InterviewHistoryResponse.builder()
            .id(result.getId())
            .company(result.getSession()
                    .getInterview()
                    .getTitle())
            .role(result.getSession()
                    .getInterview()
                    .getRole())
            .score(result.getOverallScore())
            .feedback(result.getRecommendation())
            .createdAt(result.getCreatedAt().toString())
            .build();
}
}