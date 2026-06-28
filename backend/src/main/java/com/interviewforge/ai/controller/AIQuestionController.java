package com.interviewforge.ai.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.ai.dto.GenerateQuestionRequest;
import com.interviewforge.ai.service.AIQuestionService;
import com.interviewforge.common.dto.ApiResponse;

import jakarta.validation.Valid;

import java.util.List;
import com.interviewforge.question.entity.Question;

@RestController
@RequestMapping("/api/v1/ai")
public class AIQuestionController {

    private final AIQuestionService aiQuestionService;

    public AIQuestionController(
            AIQuestionService aiQuestionService) {

        this.aiQuestionService = aiQuestionService;
    }

    @PostMapping("/generate")
    public ApiResponse<List<Question>> generateQuestions(
            @Valid @RequestBody GenerateQuestionRequest request) {

        return ApiResponse.success(
    aiQuestionService.generateQuestions(
        request.getInterviewId(),
        request.getNumberOfQuestions()),
    "AI questions generated successfully");
    }
}