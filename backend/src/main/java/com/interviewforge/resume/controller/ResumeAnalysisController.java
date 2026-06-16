package com.interviewforge.resume.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.resume.dto.ResumeAnalysisResponse;
import com.interviewforge.resume.service.ResumeAnalysisService;

@RestController
@RequestMapping("/api/v1/resume")
public class ResumeAnalysisController {

    private final ResumeAnalysisService resumeAnalysisService;

    public ResumeAnalysisController(
            ResumeAnalysisService resumeAnalysisService) {

        this.resumeAnalysisService = resumeAnalysisService;
    }

    @PostMapping("/analyze")
    public ResumeAnalysisResponse analyzeResume(
            @RequestBody String resumeText) {

        return resumeAnalysisService.analyzeResume(
                resumeText);
    }
}