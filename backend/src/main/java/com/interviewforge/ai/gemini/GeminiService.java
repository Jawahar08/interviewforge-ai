package com.interviewforge.ai.gemini;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import jakarta.annotation.PostConstruct;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public GeminiService(
            RestTemplate restTemplate
    ) {
        this.restTemplate = restTemplate;
    }

    @PostConstruct
    public void verifyConfiguration() {
        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException(
                    "Gemini API key is not configured"
            );
        }

        System.out.println(
                "Gemini API key configuration detected"
        );
    }

    public String generateContent(
            String prompt
    ) {
        if (prompt == null || prompt.isBlank()) {
            throw new IllegalArgumentException(
                    "Gemini prompt cannot be empty"
            );
        }

        String url =
                "https://generativelanguage.googleapis.com/"
                + "v1beta/models/"
                + "gemini-2.5-flash:"
                + "generateContent?key="
                + apiKey;

        HttpHeaders headers =
                new HttpHeaders();

        headers.setContentType(
                MediaType.APPLICATION_JSON
        );

        Map<String, Object> generationConfig =
                Map.of(
                        "temperature", 0.2,
                        "maxOutputTokens", 1024
                );

        Map<String, Object> requestBody =
                Map.of(
                        "contents",
                        List.of(
                                Map.of(
                                        "role", "user",
                                        "parts",
                                        List.of(
                                                Map.of(
                                                        "text",
                                                        prompt
                                                )
                                        )
                                )
                        ),
                        "generationConfig",
                        generationConfig
                );

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(
                        requestBody,
                        headers
                );

        try {
            Map<?, ?> response =
                    restTemplate.postForObject(
                            url,
                            request,
                            Map.class
                    );

            return extractText(response);

        } catch (HttpClientErrorException e) {

            System.err.println(
                    "Gemini client error status: "
                            + e.getStatusCode()
            );

            System.err.println(
                    "Gemini client error body: "
                            + e.getResponseBodyAsString()
            );

            throw new RuntimeException(
                    buildGeminiErrorMessage(
                            e.getStatusCode().value(),
                            e.getResponseBodyAsString()
                    ),
                    e
            );

        } catch (HttpServerErrorException e) {

            System.err.println(
                    "Gemini server error status: "
                            + e.getStatusCode()
            );

            System.err.println(
                    "Gemini server error body: "
                            + e.getResponseBodyAsString()
            );

            throw new RuntimeException(
                    "Gemini service is temporarily unavailable. "
                            + "Status: "
                            + e.getStatusCode().value(),
                    e
            );

        } catch (RuntimeException e) {

            System.err.println(
                    "Gemini processing error: "
                            + e.getMessage()
            );

            throw e;

        } catch (Exception e) {

            e.printStackTrace();

            throw new RuntimeException(
                    "Unexpected Gemini integration failure",
                    e
            );
        }
    }

    private String extractText(
            Map<?, ?> response
    ) {
        if (response == null) {
            throw new RuntimeException(
                    "Gemini returned an empty response"
            );
        }

        Object candidatesObject =
                response.get("candidates");

        if (!(candidatesObject instanceof List<?> candidates)
                || candidates.isEmpty()) {

            Object promptFeedback =
                    response.get("promptFeedback");

            throw new RuntimeException(
                    "Gemini returned no candidates. "
                            + "Prompt feedback: "
                            + String.valueOf(promptFeedback)
            );
        }

        Object firstCandidateObject =
                candidates.get(0);

        if (!(firstCandidateObject
                instanceof Map<?, ?> candidate)) {
            throw new RuntimeException(
                    "Gemini candidate format is invalid"
            );
        }

        Object contentObject =
                candidate.get("content");

        if (!(contentObject
                instanceof Map<?, ?> content)) {

            Object finishReason =
                    candidate.get("finishReason");

            throw new RuntimeException(
                    "Gemini response has no content. "
                            + "Finish reason: "
                            + String.valueOf(finishReason)
            );
        }

        Object partsObject =
                content.get("parts");

        if (!(partsObject instanceof List<?> parts)
                || parts.isEmpty()) {
            throw new RuntimeException(
                    "Gemini response contains no parts"
            );
        }

        StringBuilder result =
                new StringBuilder();

        for (Object partObject : parts) {
            if (partObject
                    instanceof Map<?, ?> part) {

                Object textObject =
                        part.get("text");

                if (textObject instanceof String text
                        && !text.isBlank()) {

                    if (!result.isEmpty()) {
                        result.append("\n");
                    }

                    result.append(text.trim());
                }
            }
        }

        if (result.isEmpty()) {
            throw new RuntimeException(
                    "Gemini response contains no text"
            );
        }

        return result.toString();
    }

    private String buildGeminiErrorMessage(
            int statusCode,
            String responseBody
    ) {
        if (statusCode == 429) {
            return "Gemini API quota or rate limit exceeded";
        }

        if (statusCode == 403) {
            return "Gemini API request forbidden. "
                    + "Check API key permissions and API access";
        }

        if (statusCode == 401) {
            return "Gemini API authentication failed";
        }

        if (statusCode == 400) {
            return "Gemini rejected the request: "
                    + responseBody;
        }

        if (statusCode == 404) {
            return "Gemini model or endpoint was not found";
        }

        return "Gemini API request failed with status "
                + statusCode
                + ": "
                + responseBody;
    }

    public String evaluateAnswer(
            String question,
            String expectedAnswer,
            String userAnswer
    ) {
        if (question == null
                || question.isBlank()) {
            throw new IllegalArgumentException(
                    "Question text is required "
                            + "for evaluation"
            );
        }

        if (userAnswer == null
                || userAnswer.isBlank()) {
            throw new IllegalArgumentException(
                    "Candidate answer is required "
                            + "for evaluation"
            );
        }

        String safeExpectedAnswer =
                expectedAnswer == null
                        || expectedAnswer.isBlank()
                        ? "No reference answer is available. "
                        + "Evaluate using technical correctness, "
                        + "relevance, clarity, and completeness."
                        : expectedAnswer;

        String prompt = """
You are a strict technical interview evaluator.

Evaluate the candidate answer objectively.

QUESTION:
%s

REFERENCE ANSWER:
%s

CANDIDATE ANSWER:
%s

Evaluation criteria:
- Technical correctness
- Relevance to the question
- Completeness
- Clarity
- Practical understanding

Return ONLY in this exact format:

Score: <number from 0 to 10>/10
Strengths: <concise strengths>
Weaknesses: <concise weaknesses>
Suggestions: <specific improvement suggestions>

Rules:
- Do not include markdown.
- Do not include JSON.
- Do not add extra headings.
- Always provide a numeric score.
"""
                .formatted(
                        question,
                        safeExpectedAnswer,
                        userAnswer
                );

        return generateContent(prompt);
    }

    public String analyzeResume(
            String resumeText
    ) {
        if (resumeText == null
                || resumeText.isBlank()) {
            throw new IllegalArgumentException(
                    "Resume text cannot be empty"
            );
        }

        String prompt = """
You are an expert ATS resume analyzer.

Analyze the following resume.

Return ONLY in this exact format:

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