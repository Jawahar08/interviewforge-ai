package com.interviewforge.question.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.common.dto.ApiResponse;
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
    public ApiResponse<Question> createQuestion(
            @Valid @RequestBody CreateQuestionRequest request) {

        return ApiResponse.success(
                questionService.createQuestion(request),
                "Question created successfully"
        );
    }

    @GetMapping
    public ApiResponse<List<Question>> getAllQuestions() {
        return ApiResponse.success(
                questionService.getAllQuestions(),
                "Questions retrieved successfully"
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<Question> getQuestionById(
            @PathVariable Long id) {

        return ApiResponse.success(
                questionService.getQuestionById(id),
                "Question retrieved successfully"
        );
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteQuestion(
            @PathVariable Long id) {

        questionService.deleteQuestion(id);

        return ApiResponse.success(
                null,
                "Question deleted successfully"
        );
    }
}