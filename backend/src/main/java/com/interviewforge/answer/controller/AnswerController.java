package com.interviewforge.answer.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.answer.dto.AnswerResponse;
import com.interviewforge.answer.dto.EvaluateAnswerRequest;
import com.interviewforge.answer.dto.SubmitAnswerRequest;
import com.interviewforge.answer.service.AnswerService;
import com.interviewforge.common.dto.ApiResponse;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(
    name = "Answer Management",
    description =
        "Answer submission and AI evaluation APIs"
)
@RestController
@RequestMapping("/api/v1/answers")
public class AnswerController {

    private final AnswerService answerService;

    public AnswerController(
            AnswerService answerService
    ) {
        this.answerService = answerService;
    }

    @PostMapping
    public ApiResponse<AnswerResponse> submitAnswer(
            @RequestBody SubmitAnswerRequest request
    ) {
        return ApiResponse.success(
                answerService.submitAnswer(request),
                "Answer submitted successfully"
        );
    }

    @PostMapping("/evaluate")
    public ApiResponse<AnswerResponse> evaluateAnswer(
            @RequestBody EvaluateAnswerRequest request
    ) {
        return ApiResponse.success(
                answerService.evaluateAnswer(
                        request.getAnswerId()
                ),
                "Answer evaluated successfully"
        );
    }
}