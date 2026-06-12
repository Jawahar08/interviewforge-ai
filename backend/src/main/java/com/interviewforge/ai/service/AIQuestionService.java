package com.interviewforge.ai.service;

import org.springframework.stereotype.Service;

import com.interviewforge.interview.repository.InterviewRepository;
import com.interviewforge.question.repository.QuestionRepository;
import java.util.List;

import com.interviewforge.question.entity.Question;

@Service
public class AIQuestionService {

    private final QuestionRepository questionRepository;
    private final InterviewRepository interviewRepository;

    public AIQuestionService(
            QuestionRepository questionRepository,
            InterviewRepository interviewRepository) {

        this.questionRepository = questionRepository;
        this.interviewRepository = interviewRepository;
    }

    public List<Question> generateQuestions(
            Long interviewId) {

        return List.of();
    }
}