package com.interviewforge.session.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.session.dto.InterviewSessionResponse;
import com.interviewforge.session.dto.StartSessionRequest;
import com.interviewforge.session.entity.InterviewSession;
import com.interviewforge.session.service.InterviewSessionService;

@RestController
@RequestMapping("/api/v1/sessions")
public class InterviewSessionController {

    private final InterviewSessionService sessionService;

    public InterviewSessionController(
            InterviewSessionService sessionService) {

        this.sessionService = sessionService;
    }

    @PostMapping("/start")
    public InterviewSessionResponse startSession(
            @RequestBody StartSessionRequest request) {

        return sessionService.startSession(
                request.getInterviewId());
    }
}