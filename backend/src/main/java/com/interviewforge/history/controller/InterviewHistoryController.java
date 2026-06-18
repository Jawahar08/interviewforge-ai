package com.interviewforge.history.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.common.dto.ApiResponse;
import com.interviewforge.history.dto.InterviewHistoryResponse;
import com.interviewforge.history.service.InterviewHistoryService;

@RestController
@RequestMapping("/api/v1/history")
public class InterviewHistoryController {

    private final InterviewHistoryService historyService;

    public InterviewHistoryController(
            InterviewHistoryService historyService) {

        this.historyService = historyService;
    }

    @GetMapping
    public ApiResponse<List<InterviewHistoryResponse>> getHistory() {

        return ApiResponse.success(
                historyService.getHistory(),
                "Interview history retrieved successfully"
        );
    }
}