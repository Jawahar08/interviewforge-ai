package com.interviewforge.ai.gemini;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

public GeminiService(
        RestTemplate restTemplate) {

    this.restTemplate = restTemplate;
}

    public String evaluateAnswer(
            String question,
            String answer) {

        String prompt = """
                You are a technical interviewer.

                Question:
                %s

                Candidate Answer:
                %s

                Evaluate the answer and provide:
                1. Score out of 100
                2. Feedback
                """.formatted(question, answer);

        return "Gemini integration in progress";
    }
}