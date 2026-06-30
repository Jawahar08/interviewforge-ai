package com.interviewforge.jobmatch.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.common.dto.ApiResponse;
import com.interviewforge.jobmatch.dto.JobMatchResponse;
import com.interviewforge.jobmatch.service.JobMatchService;

@RestController
@RequestMapping("/api/v1/jobmatch")
public class JobMatchController {

    private final JobMatchService jobMatchService;

    public JobMatchController(JobMatchService jobMatchService) {
        this.jobMatchService = jobMatchService;
    }

    @PostMapping
    public ApiResponse<JobMatchResponse> generateCareerRecommendation(
            @RequestBody String resumeText) {

        return ApiResponse.success(
                jobMatchService.generateCareerRecommendation(resumeText),
                "Career recommendation generated successfully"
        );
    }
}