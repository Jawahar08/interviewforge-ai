package com.interviewforge.ai.gemini;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    public String evaluateAnswer(String question,
                                 String answer) {

        return """
                Score: 85

                Feedback:
                Good technical explanation.
                Could include more practical examples.
                """;
    }
}