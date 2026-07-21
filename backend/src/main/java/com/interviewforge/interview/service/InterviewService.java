package com.interviewforge.interview.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.interviewforge.auth.entity.User;
import com.interviewforge.auth.repository.UserRepository;
import com.interviewforge.common.exception.InterviewNotFoundException;
import com.interviewforge.interview.dto.CreateInterviewRequest;
import com.interviewforge.interview.entity.Interview;
import com.interviewforge.interview.repository.InterviewRepository;



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

        String company = request.getCompany();
        if (company != null && !company.trim().isEmpty()) {
            if (user.getIsPremium() == null || !user.getIsPremium()) {
                throw new RuntimeException("Company-based mock interview prep is a Premium feature. Please upgrade your account to unlock this feature.");
            }
        }

        Interview interview = Interview.builder()
        .title(request.getTitle())
        .role(request.getRole())
        .difficulty(request.getDifficulty())
        .company(company)
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
                new InterviewNotFoundException(id));

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
        new InterviewNotFoundException(id));

    if (!interview.getUser().getId().equals(user.getId())) {
    throw new RuntimeException("Access denied");
}

    String company = request.getCompany();
    if (company != null && !company.trim().isEmpty()) {
        if (user.getIsPremium() == null || !user.getIsPremium()) {
            throw new RuntimeException("Company-based mock interview prep is a Premium feature. Please upgrade your account to unlock this feature.");
        }
    }

    interview.setTitle(request.getTitle());
    interview.setRole(request.getRole());
    interview.setDifficulty(request.getDifficulty());
    interview.setCompany(company);

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
                    new InterviewNotFoundException(id));

    if (!interview.getUser().getId().equals(user.getId())) {
        throw new RuntimeException("Access denied");
    }

    interviewRepository.delete(interview);
}
}
