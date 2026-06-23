package com.interviewforge.jobmatch.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewforge.ai.gemini.GeminiService;
import com.interviewforge.jobmatch.dto.JobMatchResponse;

@Service
public class JobMatchService {

    private final GeminiService geminiService;
    private final ObjectMapper objectMapper;

    public JobMatchService(
            GeminiService geminiService,
            ObjectMapper objectMapper) {

        this.geminiService = geminiService;
        this.objectMapper = objectMapper;
    }

    public JobMatchResponse analyzeMatch(
            String resumeText,
            String jobDescription) throws Exception {

        String prompt = """
Compare the following resume and job description.

IMPORTANT:
Return ONLY raw JSON.
Do not include markdown.
Do not include explanations.
Do not wrap the response in ```json.

Format:

{
  "matchScore": 0,
  "matchedSkills": [],
  "missingSkills": [],
  "recommendations": []
}

Resume:
%s

Job Description:
%s
"""
.formatted(
        resumeText,
        jobDescription);

        String response =
        geminiService.generateContent(prompt);

System.out.println("RAW GEMINI RESPONSE:");
System.out.println(response);

if (response.contains("\"error\"")) {

    return new JobMatchResponse(
            0,
            java.util.List.of(),
            java.util.List.of(),
            java.util.List.of(
                    "Gemini quota exceeded. Try again later.")
    );
}

return objectMapper.readValue(
        response,
        JobMatchResponse.class);
    }
}