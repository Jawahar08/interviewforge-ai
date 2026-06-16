package com.interviewforge.ai.gemini;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public GeminiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String evaluateAnswer(
        String question,
        String expectedAnswer,
        String userAnswer) {

    return """
            Score: 8

            Feedback:
            Good answer. Covers most key concepts.
            """;
}
}