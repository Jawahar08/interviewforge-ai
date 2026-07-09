package com.interviewforge.session.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.common.dto.ApiResponse;
import com.interviewforge.session.dto.InterviewSessionResponse;
import com.interviewforge.session.dto.SessionQuestionsResponse;
import com.interviewforge.session.dto.StartSessionRequest;
import com.interviewforge.session.service.InterviewSessionService;

@RestController
@RequestMapping("/api/v1/sessions")
public class InterviewSessionController {

    private final InterviewSessionService sessionService;

    public InterviewSessionController(
            InterviewSessionService sessionService
    ) {
        this.sessionService = sessionService;
    }

    @PostMapping("/start")
    public ApiResponse<InterviewSessionResponse> startSession(
            @RequestBody StartSessionRequest request
    ) {
        return ApiResponse.success(
                sessionService.startSession(
                        request.getInterviewId()
                ),
                "Interview session started successfully"
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<InterviewSessionResponse> getSession(
            @PathVariable Long id
    ) {
        return ApiResponse.success(
                sessionService.getSessionById(id),
                "Interview session retrieved successfully"
        );
    }

    @GetMapping("/{id}/questions")
    public ApiResponse<SessionQuestionsResponse> getSessionQuestions(
            @PathVariable Long id
    ) {
        return ApiResponse.success(
                sessionService.getSessionQuestions(id),
                "Session questions retrieved successfully"
        );
    }

    @PatchMapping("/{id}/complete")
    public ApiResponse<InterviewSessionResponse> completeSession(
            @PathVariable Long id
    ) {
        return ApiResponse.success(
                sessionService.completeSession(id),
                "Interview session completed successfully"
        );
    }
}