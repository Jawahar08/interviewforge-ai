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

        String title = interview.getTitle() != null ? interview.getTitle() : "";
        String focus = "General / Domain-Specific";
        if (title.contains("TECHNICAL")) {
            focus = "Technical / Domain-Specific (Testing core knowledge, tools, concepts, and technical problem-solving)";
        } else if (title.contains("BEHAVIORAL")) {
            focus = "Behavioral & Situational (Testing soft skills, past experiences, teamwork, and behavioral response)";
        } else if (title.contains("CASE_STUDY")) {
            focus = "Case Study & Analysis (Testing scenario-based analysis, diagnosing client/business issues, and structured problem-solving)";
        } else if (title.contains("STRESS_ETHICS")) {
            focus = "Stress & Ethical Scenario (Testing handling high pressure, ethical dilemmas, client conflicts, and resilience)";
        } else if (title.contains("SYSTEM_PROCESS")) {
            focus = "System & Process Design (Testing designing systems, processes, organizational frameworks, or structural workflows)";
        } else if (title.contains("MIXED")) {
            focus = "Mixed / Comprehensive (A balanced combination of technical domain knowledge, behavioral, and situational questions)";
        }

        String companyFocus = "";
        if (interview.getCompany() != null && !interview.getCompany().trim().isEmpty()) {
            companyFocus = "\nTarget Company:\n" + interview.getCompany() + " (Specifically tailored to this company's hiring bar, technical standards, cultural values, and typical loop style)\n";
        }

        String prompt = """
Generate exactly %d interview questions.
%s
Role:
%s

Interview Type/Focus:
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
                companyFocus,
                interview.getRole(),
                focus,
                interview.getDifficulty());

        try {
            String response = geminiService.generateContent(prompt);
            System.out.println("========== GEMINI RESPONSE ==========");
            System.out.println(response);
            System.out.println("====================================");

            if (response != null) {
                response = response
                        .replace("```json", "")
                        .replace("```", "")
                        .trim();

                int startIdx = response.indexOf("[");
                int endIdx = response.lastIndexOf("]");

                if (startIdx != -1 && endIdx != -1 && endIdx > startIdx) {
                    String jsonArrayStr = response.substring(startIdx, endIdx + 1);
                    List<Question> questions = Arrays.asList(
                            objectMapper.readValue(
                                    jsonArrayStr,
                                    Question[].class));

                    questions.forEach(question -> {
                        question.setId(null);
                        question.setInterview(interview);
                        question.setCreatedAt(LocalDateTime.now());
                    });

                    return questionRepository.saveAll(questions);
                }
            }
        } catch (Exception e) {
            System.err.println("Gemini question generation error: " + e.getMessage() + ". Using fallback questions.");
        }

        // Fallback guaranteed questions if AI call is slow or fails
        String roleName = interview.getRole() != null ? interview.getRole() : "Software Engineer";
        String companyName = interview.getCompany() != null && !interview.getCompany().isEmpty() 
            ? interview.getCompany() 
            : "Target Company";

        List<Question> fallbackQuestions = List.of(
            Question.builder()
                .interview(interview)
                .questionText("Walk me through a complex " + roleName + " project you led recently. What technical challenges did you face and how did you resolve them?")
                .category("Technical Depth")
                .difficulty(interview.getDifficulty())
                .createdAt(LocalDateTime.now())
                .build(),
            Question.builder()
                .interview(interview)
                .questionText("How do you approach system design and scalability when engineering solutions for " + companyName + "?")
                .category("System Design")
                .difficulty(interview.getDifficulty())
                .createdAt(LocalDateTime.now())
                .build(),
            Question.builder()
                .interview(interview)
                .questionText("Describe a situation where you had a technical disagreement with a teammate. How did you handle it?")
                .category("Behavioral")
                .difficulty(interview.getDifficulty())
                .createdAt(LocalDateTime.now())
                .build(),
            Question.builder()
                .interview(interview)
                .questionText("What testing and code quality practices do you enforce in your day-to-day workflow?")
                .category("Best Practices")
                .difficulty(interview.getDifficulty())
                .createdAt(LocalDateTime.now())
                .build(),
            Question.builder()
                .interview(interview)
                .questionText("Where do you see the biggest engineering bottlenecks in your current domain, and how would you optimize them?")
                .category("Problem Solving")
                .difficulty(interview.getDifficulty())
                .createdAt(LocalDateTime.now())
                .build(),
            Question.builder()
                .interview(interview)
                .questionText("How do you ensure data integrity and security when building API services?")
                .category("Security & Reliability")
                .difficulty(interview.getDifficulty())
                .createdAt(LocalDateTime.now())
                .build(),
            Question.builder()
                .interview(interview)
                .questionText("Explain a scenario where you had to debug a production incident under tight time pressure.")
                .category("Incident Response")
                .difficulty(interview.getDifficulty())
                .createdAt(LocalDateTime.now())
                .build(),
            Question.builder()
                .interview(interview)
                .questionText("How do you manage technical debt while delivering new product features on schedule?")
                .category("Agile & Delivery")
                .difficulty(interview.getDifficulty())
                .createdAt(LocalDateTime.now())
                .build(),
            Question.builder()
                .interview(interview)
                .questionText("What caching strategies or database optimization techniques do you use for high-throughput applications?")
                .category("Performance")
                .difficulty(interview.getDifficulty())
                .createdAt(LocalDateTime.now())
                .build(),
            Question.builder()
                .interview(interview)
                .questionText("How do you evaluate new technologies before adopting them into a production stack?")
                .category("Architecture")
                .difficulty(interview.getDifficulty())
                .createdAt(LocalDateTime.now())
                .build()
        );

        try {
            List<Question> csvDataset = loadDatasetQuestions(interview, numberOfQuestions);
            if (!csvDataset.isEmpty()) {
                System.out.println("Loaded " + csvDataset.size() + " questions from Kaggle interview dataset!");
                return questionRepository.saveAll(csvDataset);
            }
        } catch (Exception err) {
            System.err.println("Dataset fallback error: " + err.getMessage());
        }

        return questionRepository.saveAll(fallbackQuestions);
    }

    private List<Question> loadDatasetQuestions(Interview interview, int count) {
        List<Question> list = new java.util.ArrayList<>();
        try {
            var resource = new org.springframework.core.io.ClassPathResource("db/data/full_interview_questions_dataset.csv");
            if (resource.exists()) {
                try (var reader = new java.io.BufferedReader(new java.io.InputStreamReader(resource.getInputStream()))) {
                    String line;
                    boolean isHeader = true;
                    while ((line = reader.readLine()) != null) {
                        if (isHeader) { isHeader = false; continue; }
                        String[] parts = line.split(",");
                        if (parts.length >= 4) {
                            String qText = parts[0].trim();
                            String category = parts[2].trim();
                            String diff = parts[3].trim().toUpperCase();
                            if (!qText.isEmpty() && qText.length() > 5) {
                                list.add(Question.builder()
                                        .interview(interview)
                                        .questionText(qText)
                                        .category(category)
                                        .difficulty(diff)
                                        .createdAt(LocalDateTime.now())
                                        .build());
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Error reading Kaggle dataset CSV: " + e.getMessage());
        }
        if (!list.isEmpty()) {
            java.util.Collections.shuffle(list);
            return list.stream().limit(count).toList();
        }
        return List.of();
    }
    
}