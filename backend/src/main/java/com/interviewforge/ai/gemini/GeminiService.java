package com.interviewforge.ai.gemini;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import jakarta.annotation.PostConstruct;
@Service
public class GeminiService {
    
    

   @Value("${gemini.api.key}")
private String apiKey;
     @PostConstruct
    public void verifyKey() {
        System.out.println("Loaded Gemini Key: " + apiKey.substring(0, 10) + "...");
    }
    

    private final RestTemplate restTemplate;

    public GeminiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String generateContent(String prompt) {

        String url =
"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="
+ apiKey;

        HttpHeaders headers = new HttpHeaders();
headers.setContentType(MediaType.APPLICATION_JSON);


        Map<String, Object> requestBody = Map.of(
    "contents",
    List.of(
        Map.of(
            "parts",
            List.of(
                Map.of(
                    "text",
                    prompt
                )
            )
        )
    )
);

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(requestBody, headers);

        try {

            Map<?, ?> response =
                    restTemplate.postForObject(
                            url,
                            request,
                            Map.class);

            List<?> candidates =
                    (List<?>) response.get("candidates");

            if (candidates == null || candidates.isEmpty()) {
                return "No response from Gemini.";
            }
            Map<?, ?> candidate =
        (Map<?, ?>) candidates.get(0);

Map<?, ?> content =
        (Map<?, ?>) candidate.get("content");

List<?> parts =
        (List<?>) content.get("parts");

Map<?, ?> firstPart =
        (Map<?, ?>) parts.get(0);

return (String) firstPart.get("text");
        }

            catch (HttpClientErrorException e) {

    System.out.println("STATUS CODE: " + e.getStatusCode());
    System.out.println("RESPONSE BODY: " + e.getResponseBodyAsString());

    throw new RuntimeException(e.getResponseBodyAsString());

}
catch (Exception e) {

    e.printStackTrace();

    throw new RuntimeException(e.getMessage());
}
    }

    public String evaluateAnswer(
            String question,
            String expectedAnswer,
            String userAnswer) {

        String prompt = """
                Evaluate this interview answer.

                Question:
                %s

                Expected Answer:
                %s

                User Answer:
                %s

                Return:
                1. Score out of 10
                2. Strengths
                3. Weaknesses
                4. Suggestions
                """
                .formatted(
                        question,
                        expectedAnswer,
                        userAnswer);

        return generateContent(prompt);
    }
    public String analyzeResume(String resumeText) {

    String prompt = """
You are an expert ATS Resume Analyzer.

Analyze the following resume.

Return ONLY in this exact format.

ATS Score: <0-100>

Summary:
<summary>

Strengths:
<strengths>

Weaknesses:
<weaknesses>

Missing Skills:
<missing skills>

Suggestions:
<improvements>

Resume:

%s
"""
.formatted(resumeText);

    return generateContent(prompt);
}
    
}