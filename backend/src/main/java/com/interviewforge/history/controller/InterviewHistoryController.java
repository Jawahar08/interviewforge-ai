package com.interviewforge.history.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.common.dto.ApiResponse;
import com.interviewforge.history.dto.InterviewHistoryResponse;
import com.interviewforge.history.service.InterviewHistoryService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/history")
@Tag(
        name = "Interview History",
        description = "Interview history APIs"
)
public class InterviewHistoryController {

    private final InterviewHistoryService service;

    public InterviewHistoryController(
            InterviewHistoryService service) {

        this.service = service;
    }

    @GetMapping
    public ApiResponse<List<InterviewHistoryResponse>> getHistory() {

        return ApiResponse.success(
                service.getHistory(),
                "Interview history retrieved successfully"
        );
    }
}