package com.interviewforge.interview.service;

import java.time.LocalDateTime;
import java.util.List;

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
    public List<Interview> getAllInterviews() {
    return interviewRepository.findAll();
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
    public Interview getInterviewById(Long id) {

    return interviewRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Interview not found"));
}
public Interview updateInterview(
        Long id,
        CreateInterviewRequest request) {

    Interview interview = interviewRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Interview not found"));

    interview.setTitle(request.getTitle());
    interview.setRole(request.getRole());
    interview.setDifficulty(request.getDifficulty());

    return interviewRepository.save(interview);
}
public void deleteInterview(Long id) {

    Interview interview = interviewRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Interview not found"));

    interviewRepository.delete(interview);
}
}
