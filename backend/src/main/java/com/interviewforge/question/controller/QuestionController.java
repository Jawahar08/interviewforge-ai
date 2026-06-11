package com.interviewforge.question.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.question.dto.CreateQuestionRequest;
import com.interviewforge.question.entity.Question;
import com.interviewforge.question.service.QuestionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(
            QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping
    public Question createQuestion(
            @Valid @RequestBody CreateQuestionRequest request) {

        return questionService.createQuestion(request);
    }

    @GetMapping
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @GetMapping("/{id}")
    public Question getQuestionById(
            @PathVariable Long id) {

        return questionService.getQuestionById(id);
    }
    @DeleteMapping("/{id}")
public String deleteQuestion(
        @PathVariable Long id) {

    questionService.deleteQuestion(id);

    return "Question deleted successfully";
}
}