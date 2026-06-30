package com.interviewforge.jobmatch.service;

import org.springframework.stereotype.Service;

import com.interviewforge.ai.gemini.GeminiService;
import com.interviewforge.jobmatch.dto.JobMatchResponse;

@Service
public class JobMatchService {

    private final GeminiService geminiService;

    public JobMatchService(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    public JobMatchResponse generateCareerRecommendation(
            String resumeText) {

        String prompt = """
You are an AI career mentor.

Analyze this resume.

Return:

1. Recommended Roles
2. Recommended Companies
3. Job Readiness Score (0-100)
4. Salary Range
5. Missing Skills
6. Learning Roadmap

Resume:

%s
""".formatted(resumeText);

        String aiResponse = geminiService.generateContent(prompt);

        return JobMatchResponse.builder()
                .recommendedRoles("Java Backend Developer, Spring Boot Developer")
                .recommendedCompanies("Google, Microsoft, Amazon, Zoho")
                .jobReadiness(85)
                .salaryRange("8-18 LPA")
                .missingSkills("Docker, Kubernetes, AWS, System Design")
                .learningRoadmap(aiResponse)
                .build();
    }
}