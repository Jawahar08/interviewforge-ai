package com.interviewforge.jobmatch.service;

import org.springframework.stereotype.Service;

import com.interviewforge.ai.gemini.GeminiService;

@Service
public class JobMatchService {

    private final GeminiService geminiService;

    public JobMatchService(
            GeminiService geminiService) {

        this.geminiService = geminiService;
    }

    public String analyzeMatch(
            String resumeText,
            String jobDescription) {

        String prompt = """
                Compare the following resume and job description.

                Return:
                1. Match Score (0-100)
                2. Matched Skills
                3. Missing Skills
                4. Recommendations

                Resume:
                %s

                Job Description:
                %s
                """
                .formatted(
                        resumeText,
                        jobDescription);

        return geminiService.generateContent(prompt);
    }
}