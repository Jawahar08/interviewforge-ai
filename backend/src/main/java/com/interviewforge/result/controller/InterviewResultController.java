package com.interviewforge.result.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.common.dto.ApiResponse;
import com.interviewforge.result.dto.CreateResultRequest;
import com.interviewforge.result.entity.InterviewResult;
import com.interviewforge.result.service.InterviewResultService;

@RestController
@RequestMapping("/api/v1/results")
public class InterviewResultController {

    private final InterviewResultService resultService;

    public InterviewResultController(
            InterviewResultService resultService) {

        this.resultService = resultService;
    }

    @PostMapping
    public ApiResponse<InterviewResult> createResult(
            @RequestBody CreateResultRequest request) {

        return ApiResponse.success(
                resultService.createResult(request),
                "Interview result created successfully"
        );
    }
}