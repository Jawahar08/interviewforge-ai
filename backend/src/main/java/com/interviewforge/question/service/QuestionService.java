package com.interviewforge.question.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.interviewforge.common.exception.InterviewNotFoundException;
import com.interviewforge.common.exception.QuestionNotFoundException;
import com.interviewforge.interview.entity.Interview;
import com.interviewforge.interview.repository.InterviewRepository;
import com.interviewforge.question.dto.CreateQuestionRequest;
import com.interviewforge.question.entity.Question;
import com.interviewforge.question.repository.QuestionRepository;


@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final InterviewRepository interviewRepository;

    public QuestionService(
            QuestionRepository questionRepository,
            InterviewRepository interviewRepository) {

        this.questionRepository = questionRepository;
        this.interviewRepository = interviewRepository;
    }

    public Question createQuestion(
            CreateQuestionRequest request) {

        Interview interview = interviewRepository
                .findById(request.getInterviewId())
                .orElseThrow(() ->
                        new RuntimeException("Interview not found"));

        Question question = Question.builder()
                .questionText(request.getQuestionText())
                .answer(request.getAnswer())
                .category(request.getCategory())
                .difficulty(request.getDifficulty())
                .interview(interview)
                .build();

        return questionRepository.save(question);
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Question updateQuestion(
        Long id,
        CreateQuestionRequest request) {

    Question question = questionRepository.findById(id)
            .orElseThrow(() ->
                    new QuestionNotFoundException(id));

    Interview interview = interviewRepository.findById(request.getInterviewId())
            .orElseThrow(() ->
                    new InterviewNotFoundException(request.getInterviewId()));

    question.setQuestionText(request.getQuestionText());
    question.setAnswer(request.getAnswer());
    question.setCategory(request.getCategory());
    question.setDifficulty(request.getDifficulty());
    question.setInterview(interview);

    return questionRepository.save(question);
}
    public void deleteQuestion(Long id) {

    Question question = questionRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Question not found"));

    questionRepository.delete(question);
}
public Question getQuestionById(Long id) {
    return questionRepository.findById(id)
            .orElseThrow(() ->
                    new QuestionNotFoundException(id));
}
}