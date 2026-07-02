package com.interviewforge.mockinterview.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.common.dto.ApiResponse;
import com.interviewforge.mockinterview.dto.AnswerRequest;
import com.interviewforge.mockinterview.dto.InterviewFeedbackResponse;
import com.interviewforge.mockinterview.dto.InterviewQuestionResponse;
import com.interviewforge.mockinterview.dto.InterviewReportResponse;
import com.interviewforge.mockinterview.dto.StartInterviewRequest;
import com.interviewforge.mockinterview.service.MockInterviewService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/mock-interview")
@Tag(
        name = "AI Mock Interview",
        description = "AI Powered Mock Interview APIs"
)
public class MockInterviewController {

    private final MockInterviewService mockInterviewService;

    public MockInterviewController(
            MockInterviewService mockInterviewService) {

        this.mockInterviewService = mockInterviewService;
    }

    @PostMapping("/start")
    public ApiResponse<InterviewQuestionResponse> startInterview(
            @Valid @RequestBody StartInterviewRequest request) {

        return ApiResponse.success(
                mockInterviewService.startInterview(request),
                "Interview started successfully"
        );
    }
    @PostMapping("/{sessionId}/answer")
public ApiResponse<InterviewFeedbackResponse> submitAnswer(
        @PathVariable String sessionId,
        @RequestBody AnswerRequest request)
        throws Exception {

    return ApiResponse.success(
            mockInterviewService.submitAnswer(
                    sessionId,
                    request),
            "Answer evaluated successfully");
}
@GetMapping("/{sessionId}/report")
public ApiResponse<InterviewReportResponse> getReport(
        @PathVariable String sessionId)
        throws Exception {

    return ApiResponse.success(
            mockInterviewService.generateFinalReport(sessionId),
            "Interview report generated successfully"
    );
}

}