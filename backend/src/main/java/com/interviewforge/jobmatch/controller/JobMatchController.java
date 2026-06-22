package com.interviewforge.jobmatch.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.jobmatch.dto.JobMatchRequest;
import com.interviewforge.jobmatch.service.JobMatchService;

@RestController
@RequestMapping("/api/v1/job-match")
public class JobMatchController {

    private final JobMatchService jobMatchService;

    public JobMatchController(
            JobMatchService jobMatchService) {

        this.jobMatchService = jobMatchService;
    }

    @PostMapping
    public String analyzeMatch(
            @RequestBody JobMatchRequest request) {

        return jobMatchService.analyzeMatch(
                request.getResumeText(),
                request.getJobDescription()
        );
    }
}