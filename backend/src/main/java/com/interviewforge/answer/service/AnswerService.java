package com.interviewforge.answer.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.interviewforge.ai.gemini.GeminiService;
import com.interviewforge.answer.dto.SubmitAnswerRequest;
import com.interviewforge.answer.entity.Answer;
import com.interviewforge.answer.repository.AnswerRepository;
import com.interviewforge.common.exception.AnswerNotFoundException;
import com.interviewforge.question.entity.Question;
import com.interviewforge.question.repository.QuestionRepository;
import com.interviewforge.session.entity.InterviewSession;
import com.interviewforge.session.repository.InterviewSessionRepository;


@Service
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final InterviewSessionRepository sessionRepository;
    private final GeminiService geminiService;

    public AnswerService(
        AnswerRepository answerRepository,
        QuestionRepository questionRepository,
        InterviewSessionRepository sessionRepository,
        GeminiService geminiService) {

    this.answerRepository = answerRepository;
    this.questionRepository = questionRepository;
    this.sessionRepository = sessionRepository;
    this.geminiService = geminiService;
}

    public Answer submitAnswer(
            SubmitAnswerRequest request) {

        Question question =
                questionRepository.findById(
                        request.getQuestionId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Question not found"));

        InterviewSession session =
                sessionRepository.findById(
                        request.getSessionId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Session not found"));

        Answer answer =
                Answer.builder()
                        .question(question)
                        .session(session)
                        .userAnswer(request.getUserAnswer())
                        .score(0.0)
                        .feedback("Pending evaluation")
                        .submittedAt(LocalDateTime.now())
                        .build();

        return answerRepository.save(answer);
    }
public Answer evaluateAnswer(Long answerId) {

    Answer answer = answerRepository.findById(answerId)
            .orElseThrow(() ->
                    new AnswerNotFoundException(answerId));

    String feedback = geminiService.evaluateAnswer(
            answer.getQuestion().getQuestionText(),
            answer.getQuestion().getAnswer(),
            answer.getUserAnswer());

    answer.setScore(85.0);
    answer.setFeedback(feedback);

    return answerRepository.save(answer);
}


}