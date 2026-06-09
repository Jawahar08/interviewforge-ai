package com.interviewforge.interview.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.interview.dto.CreateInterviewRequest;
import com.interviewforge.interview.entity.Interview;
import com.interviewforge.interview.service.InterviewService;

@RestController
@RequestMapping("/api/v1/interviews")
public class InterviewController {

    private final InterviewService interviewService;

    public InterviewController(
            InterviewService interviewService) {
        this.interviewService = interviewService;
    }

    @PostMapping
    public Interview createInterview(
            @RequestBody CreateInterviewRequest request) {

        return interviewService.createInterview(request);
    }
}
