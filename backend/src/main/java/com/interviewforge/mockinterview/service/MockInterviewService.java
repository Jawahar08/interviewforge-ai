package com.interviewforge.mockinterview.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewforge.ai.gemini.GeminiService;
import com.interviewforge.mockinterview.dto.AnswerRequest;
import com.interviewforge.mockinterview.dto.InterviewFeedbackResponse;
import com.interviewforge.mockinterview.dto.InterviewQuestionResponse;
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
session.setTotalQuestions(request.getNumberOfQuestions());
session.setCurrentQuestionIndex(1);
session.setCurrentQuestion(question);
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
            repository.findById(java.util.UUID.fromString(sessionId))
                    .orElseThrow();

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

Question:
%s

Candidate Answer:
%s

Current Question:
%d

Total Questions:
%d
"""
.formatted(
        session.getCurrentQuestion(),
        request.getAnswer(),
        session.getCurrentQuestionIndex(),
        session.getTotalQuestions());

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

    session.setCurrentQuestionIndex(
            session.getCurrentQuestionIndex() + 1);

    if (session.getCurrentQuestionIndex() >
            session.getTotalQuestions()) {

        session.setCompleted(true);
    }

    repository.save(session);

    return result;
}

}