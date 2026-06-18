package com.interviewforge.interview.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.common.dto.ApiResponse;
import com.interviewforge.interview.dto.CreateInterviewRequest;
import com.interviewforge.interview.entity.Interview;
import com.interviewforge.interview.service.InterviewService;

import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;


@RestController
@RequestMapping("/api/v1/interviews")
@SecurityRequirement(name = "bearerAuth")
public class InterviewController {

    private final InterviewService interviewService;

    public InterviewController(
            InterviewService interviewService) {
        this.interviewService = interviewService;
    }
    

    @PostMapping
    public ApiResponse<Interview> createInterview(
            @Valid @RequestBody CreateInterviewRequest request) {

        return ApiResponse.success(
                interviewService.createInterview(request),
                "Interview created successfully"
        );
    }

    @GetMapping
    public ApiResponse<List<Interview>> getAllInterviews() {
        return ApiResponse.success(
                interviewService.getAllInterviews(),
                "Interviews retrieved successfully"
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<Interview> getInterviewById(
            @PathVariable Long id) {

        return ApiResponse.success(
                interviewService.getInterviewById(id),
                "Interview retrieved successfully"
        );
    }

    @PutMapping("/{id}")
    public ApiResponse<Interview> updateInterview(
            @PathVariable Long id,
            @Valid @RequestBody CreateInterviewRequest request) {

        return ApiResponse.success(
                interviewService.updateInterview(id, request),
                "Interview updated successfully"
        );
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteInterview(
            @PathVariable Long id) {

        interviewService.deleteInterview(id);

        return ApiResponse.success(
                null,
                "Interview deleted successfully"
        );
    }
    
}
