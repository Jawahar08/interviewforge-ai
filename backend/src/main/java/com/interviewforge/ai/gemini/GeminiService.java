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

        if ("mock-dev-key".equals(apiKey) || apiKey == null || apiKey.isBlank() || apiKey.contains("mock")) {
            if (prompt.contains("Generate exactly") || prompt.contains("valid JSON") || prompt.contains("questionText")) {
                String role = "Software Engineer";
                if (prompt.contains("Role:")) {
                    String[] parts = prompt.split("Role:");
                    if (parts.length > 1) {
                        String afterRole = parts[1].trim();
                        int nextNewline = afterRole.indexOf("\n");
                        role = nextNewline != -1 ? afterRole.substring(0, nextNewline).trim() : afterRole;
                    }
                }
                
                String type = "Technical";
                if (prompt.contains("Interview Type/Focus:")) {
                    String[] parts = prompt.split("Interview Type/Focus:");
                    if (parts.length > 1) {
                        String afterType = parts[1].trim();
                        int nextNewline = afterType.indexOf("\n");
                        type = nextNewline != -1 ? afterType.substring(0, nextNewline).trim() : afterType;
                    }
                }
                
                return getMockQuestionsJson(role, type);
            }

            if (prompt.contains("Target Role:") && (prompt.contains("weeks") || prompt.contains("projects") || prompt.contains("WeekPlan"))) {
                return """
                {
                  "title": "Personalized Learning Roadmap",
                  "overallScore": 75,
                  "estimatedDuration": "6 Weeks",
                  "weeks": [
                    {
                      "week": 1,
                      "topic": "Foundations & Core Principles",
                      "tasks": [
                        "Review primary concepts and theories relevant to the role.",
                        "Study standards, best practices, and guidelines.",
                        "Set up local development/working environment."
                      ]
                    },
                    {
                      "week": 2,
                      "topic": "Core Implementation & Frameworks",
                      "tasks": [
                        "Hands-on exercises with key tools and software.",
                        "Implement basic workflows and resolve common scenarios.",
                        "Review case studies of typical implementations."
                      ]
                    },
                    {
                      "week": 3,
                      "topic": "Advanced Scenarios & Integration",
                      "tasks": [
                        "Study security guidelines and performance optimization.",
                        "Implement end-to-end integration and data flows.",
                        "Conduct peer reviews and self-audits."
                      ]
                    }
                  ],
                  "projects": [
                    {
                      "title": "Capstone Implementation Project",
                      "description": "A comprehensive real-world simulator project integrating all learned concepts and technologies.",
                      "keyTechnologies": ["Core Frameworks", "Validation Tools", "Monitoring Suites"]
                    }
                  ],
                  "resources": [
                    {
                      "name": "Official Domain Documentation",
                      "type": "Documentation",
                      "url": "https://example.com/docs"
                    },
                    {
                      "name": "Recommended Study Guide",
                      "type": "Guide",
                      "url": "https://example.com/guide"
                    }
                  ]
                }
                """;
            }
            
            if (prompt.contains("technical interview evaluator") || prompt.contains("CANDIDATE ANSWER:")) {
                return """
                Score: 8/10
                Strengths: Clear explanation of core concepts, structured reasoning, and good vocabulary.
                Weaknesses: Could provide more concrete practical examples and quantitative impact details.
                Suggestions: Focus on structure, mention specific tools or frameworks, and relate your answer to real-world experience.
                """;
            }
            
            if (prompt.contains("expert ATS resume analyzer")) {
                return """
                ATS Score: 78
                
                Summary:
                Strong professional profile showing solid experiences and competencies in the target domain.
                
                Strengths:
                - Clear structure and formatting
                - Clear experience progression
                - Relevance of core achievements
                
                Weaknesses:
                - Some descriptions are too generic
                - Lack of clear quantitative metrics
                
                Missing Skills:
                - Advanced tool integration
                - Leadership of cross-functional efforts
                
                Suggestions:
                - Add concrete metrics and numbers to highlight impacts.
                - Explicitly list technical stack and tools.
                """;
            }
            
            if (prompt.contains("completed an interview") || prompt.contains("Individual AI evaluations")) {
                return """
                Strengths: Good communication, strong logical problem solving, and structured answers.
                Weaknesses: Minor syntax/detail gaps, occasionally skipped corner cases under pressure.
                Recommendation: Strong Hire. Candidate demonstrates solid fundamentals and high learning potential.
                Summary: Completed all questions with structured explanations and strong domain knowledge.
                """;
            }
            
            return "This is a default mock response generated by InterviewForge AI developer mode.";
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
                        "maxOutputTokens", 4096
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

        int maxRetries = 3;
        long backoffMs = 1000;
        Exception lastException = null;

        for (int attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                Map<?, ?> response =
                        restTemplate.postForObject(
                                url,
                                request,
                                Map.class
                        );

                return extractText(response);

            } catch (HttpClientErrorException e) {
                if (e.getStatusCode().value() == 429) {
                    System.err.println("Gemini 429 Rate Limit Exceeded. Attempt " + attempt + " of " + maxRetries + ". Retrying...");
                    lastException = e;
                } else {
                    throw new RuntimeException(
                            buildGeminiErrorMessage(
                                    e.getStatusCode().value(),
                                    e.getResponseBodyAsString()
                            ),
                            e
                    );
                }
            } catch (HttpServerErrorException e) {
                System.err.println("Gemini 5xx Server Error. Attempt " + attempt + " of " + maxRetries + ". Retrying...");
                lastException = e;
            } catch (Exception e) {
                System.err.println("Unexpected Gemini error. Attempt " + attempt + " of " + maxRetries + ". Retrying...");
                lastException = e;
            }

            if (attempt < maxRetries) {
                try {
                    Thread.sleep(backoffMs);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    throw new RuntimeException("Gemini retry interrupted", ie);
                }
                backoffMs *= 2;
            }
        }

        if (lastException instanceof HttpClientErrorException hcee) {
            throw new RuntimeException(
                    buildGeminiErrorMessage(
                            hcee.getStatusCode().value(),
                            hcee.getResponseBodyAsString()
                    ),
                    hcee
            );
        } else if (lastException instanceof HttpServerErrorException hsee) {
            throw new RuntimeException(
                    "Gemini service is temporarily unavailable. "
                            + "Status: "
                            + hsee.getStatusCode().value(),
                    hsee
            );
        } else {
            throw new RuntimeException(
                    "Unexpected Gemini integration failure after retries",
                    lastException
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
    public String generateInterviewSummary(
        double overallScore,
        String evaluations
) {

    String prompt = """
You are an expert senior engineering interviewer.

The candidate has completed an interview.

Overall score:

%.2f

Individual AI evaluations:

%s

Generate ONLY this format.

Strengths:
...

Weaknesses:
...

Recommendation:
...

Summary:
...

Keep it concise.

Maximum 120 words.
"""
.formatted(
        overallScore,
        evaluations
);

    return generateContent(prompt);
}

    private String getMockQuestionsJson(String role, String type) {
        String cleanRole = role.replace("_", " ").toLowerCase();
        return """
        [
          {
            "questionText": "What are the core methodologies and best practices you apply as a %s?",
            "answer": "Primary methodologies focus on structured processes, continuous validation, and alignment with target outcomes.",
            "category": "Core Methodology",
            "difficulty": "MEDIUM"
          },
          {
            "questionText": "Can you describe a challenging scenario you faced in your work as a %s and how you resolved it?",
            "answer": "Resolved by analyzing root causes, communicating transparently with stakeholders, and implementing preventative actions.",
            "category": "Problem Solving",
            "difficulty": "MEDIUM"
          },
          {
            "questionText": "How do you handle conflict or differing professional opinions in your domain?",
            "answer": "Approach conflicts by focusing on objective data, listening actively, and finding mutually beneficial compromises.",
            "category": "Behavioral",
            "difficulty": "MEDIUM"
          },
          {
            "questionText": "What key tools or software do you consider essential for a modern %s?",
            "answer": "Essential tools include project tracking, collaboration suites, and specialized domain-specific analysis platforms.",
            "category": "Tools & Technology",
            "difficulty": "MEDIUM"
          },
          {
            "questionText": "How do you stay updated with the latest trends and practices in your industry?",
            "answer": "Stay updated through continuous learning, industry publications, professional networking, and hands-on experimentation.",
            "category": "Professional Growth",
            "difficulty": "MEDIUM"
          }
        ]
        """.formatted(cleanRole, cleanRole, cleanRole);
    }
}