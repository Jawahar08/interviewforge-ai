package com.interviewforge.interview.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.interviewforge.interview.dto.CreateInterviewRequest;
import com.interviewforge.interview.entity.Interview;
import com.interviewforge.interview.repository.InterviewRepository;

@Service
public class InterviewService {

    private final InterviewRepository interviewRepository;

    public InterviewService(
            InterviewRepository interviewRepository) {
        this.interviewRepository = interviewRepository;
    }

    public Interview createInterview(
            CreateInterviewRequest request) {

        Interview interview = Interview.builder()
                .title(request.getTitle())
                .role(request.getRole())
                .difficulty(request.getDifficulty())
                .createdAt(LocalDateTime.now())
                .build();

        return interviewRepository.save(interview);
    }
}
