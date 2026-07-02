package com.interviewforge.mockinterview.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewforge.ai.gemini.GeminiService;
import com.interviewforge.mockinterview.dto.AnswerRequest;
import com.interviewforge.mockinterview.dto.InterviewFeedbackResponse;
import com.interviewforge.mockinterview.dto.InterviewQuestionResponse;
import com.interviewforge.mockinterview.dto.InterviewReportResponse;
import com.interviewforge.mockinterview.dto.StartInterviewRequest;
import com.interviewforge.mockinterview.entity.MockInterviewSession;
import com.interviewforge.mockinterview.repository.MockInterviewSessionRepository;
@Service
public class MockInterviewService {

    private final GeminiService geminiService;
    private final ObjectMapper objectMapper;
    private final MockInterviewSessionRepository repository;

    public MockInterviewService(
        GeminiService geminiService,
        MockInterviewSessionRepository repository,
        ObjectMapper objectMapper) {

    this.geminiService = geminiService;
    this.repository = repository;
    this.objectMapper = objectMapper;
}
    public InterviewQuestionResponse startInterview(
        StartInterviewRequest request) {

    String prompt = """
You are an expert technical interviewer.

Generate ONLY ONE interview question.

Role: %s

Difficulty: %s

Do not explain anything.
Return only the question.
"""
.formatted(
        request.getRole(),
        request.getDifficulty());

    String question = geminiService.generateContent(prompt).trim();

    MockInterviewSession session = new MockInterviewSession();

session.setId(UUID.randomUUID());
session.setRole(request.getRole());
session.setDifficulty(request.getDifficulty());
session.setTotalQuestions(
        request.getNumberOfQuestions());
session.setCurrentQuestionIndex(1);
session.setCurrentQuestion(question);
session.getQuestions().add(question);
session.setCompleted(false);
session.setOverallScore(0);
session.setStartedAt(java.time.LocalDateTime.now());

repository.save(session);

return InterviewQuestionResponse.builder()
        .sessionId(session.getId().toString())
        .question(question)
        .questionNumber(session.getCurrentQuestionIndex())
        .totalQuestions(session.getTotalQuestions())
        .build();
}
public InterviewFeedbackResponse submitAnswer(
        String sessionId,
        AnswerRequest request) throws Exception {

    MockInterviewSession session =
        repository.findById(UUID.fromString(sessionId))
                .orElseThrow();

StringBuilder history = new StringBuilder();

for (int i = 0; i < session.getAnswers().size(); i++) {

    history.append("Question ")
           .append(i + 1)
           .append(":\n")
           .append(session.getQuestions().get(i))
           .append("\n\n");

    history.append("Answer ")
           .append(i + 1)
           .append(":\n")
           .append(session.getAnswers().get(i))
           .append("\n\n");
}
    String prompt = """
You are an expert technical interviewer.

Evaluate the answer.

Return ONLY valid JSON.

{
  "score":0,
  "feedback":"",
  "nextQuestion":"",
  "completed":false
}

Interview History:

%s

Current Question:

%s

Candidate Answer:

%s

Current Question Number:

%d

Total Questions:

%d
"""
.formatted(
    history.toString(),
    session.getCurrentQuestion(),
    request.getAnswer(),
    session.getCurrentQuestionIndex(),
    session.getTotalQuestions());

    System.out.println("========== PROMPT ==========");
System.out.println(prompt);
System.out.println("============================");

    String response =
            geminiService.generateContent(prompt);

    response = response
            .replace("```json", "")
            .replace("```", "")
            .trim();

    int first = response.indexOf("{");
    int last = response.lastIndexOf("}");

    response = response.substring(first, last + 1);

    InterviewFeedbackResponse result =
            objectMapper.readValue(
                    response,
                    InterviewFeedbackResponse.class);

    session.getAnswers().add(request.getAnswer());


    session.getScores().add(result.getScore());

    session.setCurrentQuestion(result.getNextQuestion());
    if (result.getNextQuestion() != null &&
    !result.getNextQuestion().isBlank()) {

    session.getQuestions().add(result.getNextQuestion());
}

    session.setCurrentQuestionIndex(
            session.getCurrentQuestionIndex() + 1);

    if (session.getCurrentQuestionIndex() >
            session.getTotalQuestions()) {

        session.setCompleted(true);
    }

    repository.save(session);

    return result;
}
public InterviewReportResponse generateFinalReport(
        String sessionId) throws Exception {

    MockInterviewSession session =
            repository.findById(UUID.fromString(sessionId))
                    .orElseThrow();

    String prompt = """
You are an expert technical interviewer.

Analyze the complete interview.

Return ONLY valid JSON.

{
  "overallScore":0,
  "performance":"",
  "recommendation":"",
  "strengths":[],
  "weaknesses":[],
  "improvementPlan":[],
  "learningResources":[]
}

Role:
%s

Answers:
%s

Scores:
%s
"""
.formatted(
        session.getRole(),
        session.getAnswers(),
        session.getScores());

    String response = geminiService.generateContent(prompt);

    response = response
            .replace("```json", "")
            .replace("```", "")
            .trim();

    int first = response.indexOf("{");
    int last = response.lastIndexOf("}");

    response = response.substring(first, last + 1);

    return objectMapper.readValue(
            response,
            InterviewReportResponse.class);
}

}