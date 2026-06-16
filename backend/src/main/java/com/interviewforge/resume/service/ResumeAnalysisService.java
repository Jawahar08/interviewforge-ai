package com.interviewforge.resume.service;

import org.springframework.stereotype.Service;

import com.interviewforge.resume.dto.ResumeAnalysisResponse;

@Service
public class ResumeAnalysisService {

    public ResumeAnalysisResponse analyzeResume(
            String resumeText) {

        return new ResumeAnalysisResponse(
                "Spring Boot, PostgreSQL, REST APIs",
                "Docker, Kubernetes, System Design",
                "Focus on cloud deployment and system design concepts."
        );
    }
}