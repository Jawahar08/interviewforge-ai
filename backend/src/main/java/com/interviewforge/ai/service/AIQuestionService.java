package com.interviewforge.ai.service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewforge.ai.gemini.GeminiService;
import com.interviewforge.interview.entity.Interview;
import com.interviewforge.interview.repository.InterviewRepository;
import com.interviewforge.question.entity.Question;
import com.interviewforge.question.repository.QuestionRepository;

@Service
public class AIQuestionService {

    private final GeminiService geminiService;
    private final InterviewRepository interviewRepository;
    private final QuestionRepository questionRepository;
    private final ObjectMapper objectMapper;

    public AIQuestionService(
            GeminiService geminiService,
            InterviewRepository interviewRepository,
            QuestionRepository questionRepository,
            ObjectMapper objectMapper) {

        this.geminiService = geminiService;
        this.interviewRepository = interviewRepository;
        this.questionRepository = questionRepository;
        this.objectMapper = objectMapper;
    }

    public List<Question> generateQuestions(
            Long interviewId,
            int numberOfQuestions) {
                System.out.println("Interview ID requested: " + interviewId);

System.out.println("All interviews:");
interviewRepository.findAll().forEach(System.out::println);

        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() ->
                        new RuntimeException("Interview not found"));

        String prompt = """
Generate exactly %d interview questions.

Role:
%s

Difficulty:
%s

Return ONLY valid JSON.

Rules:
- No markdown
- No code blocks
- No explanations
- No text before or after JSON
- questionText max 100 characters
- answer max 150 characters
- category max 30 characters
- difficulty max 20 characters
"""
.formatted(
                numberOfQuestions,
                interview.getRole(),
                interview.getDifficulty());

        String response = geminiService.generateContent(prompt);

response = response
        .replace("```json", "")
        .replace("```", "")
        .trim();

System.out.println("========== GEMINI RESPONSE ==========");
System.out.println(response);
System.out.println("Length: " + response.length());
System.out.println("====================================");

if (!response.startsWith("[")) {
    throw new RuntimeException("Invalid Gemini response:\n" + response);
}

try {
            response = response
                    .replace("```json", "")
                    .replace("```", "")
                    .trim();
                    if (!response.trim().endsWith("]")) {
    throw new RuntimeException(
        "Gemini returned incomplete JSON:\n" + response
    );
}
            List<Question> questions = Arrays.asList(
                    objectMapper.readValue(
                            response,
                            Question[].class));

            questions.forEach(question -> {
                question.setId(null);
                question.setInterview(interview);
                question.setCreatedAt(LocalDateTime.now());
            });

            return questionRepository.saveAll(questions);

        } catch (Exception e) {
            throw new RuntimeException(
                    "Failed to parse Gemini response: " + e.getMessage());
        }
        
    }
    
}