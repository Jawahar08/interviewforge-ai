package com.interviewforge.ai.service;

import org.springframework.stereotype.Service;

import com.interviewforge.interview.entity.Interview;
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

    public List<Question> generateQuestions(Long interviewId) {

    Interview interview = interviewRepository.findById(interviewId)
            .orElseGet(() -> {
                Interview i = new Interview();
                i.setTitle("Mock Interview");
                return interviewRepository.save(i);
            });

    Question q1 = Question.builder()
            .questionText("What is Dependency Injection?")
            .answer("A design pattern where dependencies are provided externally.")
            .category("Spring Boot")
            .difficulty("MEDIUM")
            .interview(interview)
            .build();

    Question q2 = Question.builder()
            .questionText("Explain JPA.")
            .answer("JPA is a Java persistence specification.")
            .category("Database")
            .difficulty("EASY")
            .interview(interview)
            .build();

    questionRepository.save(q1);
    questionRepository.save(q2);

    return List.of(q1, q2);
}
}