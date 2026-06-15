package com.interviewforge.answer.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.interviewforge.answer.dto.SubmitAnswerRequest;
import com.interviewforge.answer.entity.Answer;
import com.interviewforge.answer.repository.AnswerRepository;
import com.interviewforge.question.entity.Question;
import com.interviewforge.question.repository.QuestionRepository;
import com.interviewforge.session.entity.InterviewSession;
import com.interviewforge.session.repository.InterviewSessionRepository;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final InterviewSessionRepository sessionRepository;

    public AnswerService(
            AnswerRepository answerRepository,
            QuestionRepository questionRepository,
            InterviewSessionRepository sessionRepository) {

        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
        this.sessionRepository = sessionRepository;
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
                    new RuntimeException("Answer not found"));

    String userAnswer =
            answer.getUserAnswer().toLowerCase();

    if (userAnswer.contains("dependency")) {

        answer.setScore(90.0);
        answer.setFeedback(
                "Good answer. Strong understanding demonstrated.");
    }
    else {

        answer.setScore(50.0);
        answer.setFeedback(
                "Answer needs more technical depth.");
    }

    return answerRepository.save(answer);
}
}