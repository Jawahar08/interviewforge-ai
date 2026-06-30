package com.interviewforge.result.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.common.dto.ApiResponse;
import com.interviewforge.result.dto.ResultResponse;
import com.interviewforge.result.service.ResultService;

@RestController
@RequestMapping("/api/v1/results")
public class ResultController {

    private final ResultService resultService;

    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    @PostMapping("/generate/{sessionId}")
    public ApiResponse<ResultResponse> generateResult(
            @PathVariable Long sessionId) {

        return ApiResponse.success(
                resultService.generateResult(sessionId),
                "Interview result generated successfully");
    }

    @GetMapping("/{sessionId}")
    public ApiResponse<ResultResponse> getResult(
            @PathVariable Long sessionId) {

        return ApiResponse.success(
                resultService.getResult(sessionId),
                "Interview result fetched successfully");
    }
}