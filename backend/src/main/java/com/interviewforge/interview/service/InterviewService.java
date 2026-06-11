package com.interviewforge.interview.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.interviewforge.auth.repository.UserRepository;
import com.interviewforge.exception.InterviewNotFoundException;
import com.interviewforge.interview.dto.CreateInterviewRequest;
import com.interviewforge.interview.entity.Interview;
import com.interviewforge.interview.repository.InterviewRepository;
import com.interviewforge.auth.entity.User;






@Service
public class InterviewService {

    private final InterviewRepository interviewRepository;
    private final UserRepository userRepository;

    public InterviewService(
        InterviewRepository interviewRepository,
        UserRepository userRepository) {

    this.interviewRepository = interviewRepository;
    this.userRepository = userRepository;
}
    public List<Interview> getAllInterviews() {

    String email = SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getName();

    User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new RuntimeException("User not found"));

    return interviewRepository.findByUser(user);
}

    public Interview createInterview(
            CreateInterviewRequest request) {

                String email = SecurityContextHolder
        .getContext()
        .getAuthentication()
        .getName();
        
System.out.println("EMAIL FROM TOKEN = " + email);

User user = userRepository.findByEmail(email)
        .orElseThrow(() ->
                new RuntimeException("User not found"));

        Interview interview = Interview.builder()
        .title(request.getTitle())
        .role(request.getRole())
        .difficulty(request.getDifficulty())
        .createdAt(LocalDateTime.now())
        .user(user)
        .build();

        return interviewRepository.save(interview);
    }
    public Interview getInterviewById(Long id) {

    String email = SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getName();

    User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new RuntimeException("User not found"));

    Interview interview = interviewRepository.findById(id)
            .orElseThrow(() ->
                    new InterviewNotFoundException(
                            "Interview not found"));

    if (!interview.getUser().getId().equals(user.getId())) {
        throw new RuntimeException("Access denied");
    }

    return interview;
}

    public Interview updateInterview(
            Long id,
            CreateInterviewRequest request) {

    String email = SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getName();

    User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new RuntimeException("User not found"));

    Interview interview = interviewRepository.findById(id)
            .orElseThrow(() ->
        new InterviewNotFoundException(
                "Interview not found"));

    if (!interview.getUser().getId().equals(user.getId())) {
    throw new RuntimeException("Access denied");
}

    interview.setTitle(request.getTitle());
    interview.setRole(request.getRole());
    interview.setDifficulty(request.getDifficulty());

    return interviewRepository.save(interview);
}
public void deleteInterview(Long id) {

    String email = SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getName();

    User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new RuntimeException("User not found"));

    Interview interview = interviewRepository.findById(id)
            .orElseThrow(() ->
                    new InterviewNotFoundException(
                            "Interview not found"));

    if (!interview.getUser().getId().equals(user.getId())) {
        throw new RuntimeException("Access denied");
    }

    interviewRepository.delete(interview);
}
}
