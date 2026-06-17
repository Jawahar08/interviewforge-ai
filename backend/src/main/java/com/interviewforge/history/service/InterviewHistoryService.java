package com.interviewforge.history.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.interviewforge.history.dto.InterviewHistoryResponse;
import com.interviewforge.result.entity.InterviewResult;
import com.interviewforge.result.repository.InterviewResultRepository;

@Service
public class InterviewHistoryService {

    private final InterviewResultRepository resultRepository;

    public InterviewHistoryService(
            InterviewResultRepository resultRepository) {

        this.resultRepository = resultRepository;
    }

    public List<InterviewHistoryResponse> getHistory() {

        List<InterviewResult> results =
                resultRepository.findAll();

        return results.stream()
                .map(result ->
                        new InterviewHistoryResponse(
                                result.getSession().getId(),
                                result.getSession()
                                        .getStatus()
                                        .name(),
                                result.getScore()))
                .collect(Collectors.toList());
    }
}