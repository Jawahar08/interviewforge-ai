package com.interviewforge.resume.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.interviewforge.common.dto.ApiResponse;

import com.interviewforge.resume.dto.ResumeAnalysisResponse;
import com.interviewforge.resume.dto.ResumeTextResponse;
import com.interviewforge.resume.dto.ResumeUploadResponse;
import com.interviewforge.resume.service.ResumeAnalysisService;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(
    name = "Resume Analysis",
    description = "Resume upload and AI analysis APIs"
)
@RestController
@RequestMapping("/api/v1/resume")
public class ResumeAnalysisController {

    private final ResumeAnalysisService resumeAnalysisService;

    public ResumeAnalysisController(
            ResumeAnalysisService resumeAnalysisService) {

        this.resumeAnalysisService = resumeAnalysisService;
    }

    @PostMapping("/analyze")
    public ApiResponse<ResumeAnalysisResponse> analyzeResume(
            @RequestBody String resumeText) {

        return ApiResponse.success(
                resumeAnalysisService.analyzeResume(resumeText),
                "Resume text analyzed successfully"
        );
    }

    @PostMapping(
            value = "/upload",
            consumes = "multipart/form-data"
    )
    public ApiResponse<ResumeUploadResponse> uploadResume(
            @RequestParam("file") MultipartFile file) {

        ResumeUploadResponse response = new ResumeUploadResponse(
                file.getOriginalFilename(),
                file.getSize(),
                "Resume uploaded successfully"
        );

        return ApiResponse.success(response, "Resume uploaded successfully");
    }

    @PostMapping(
            value = "/extract",
            consumes = "multipart/form-data"
    )
    public ApiResponse<ResumeTextResponse> extractResumeText(
            @RequestParam("file") MultipartFile file) {

        String text = resumeAnalysisService.extractTextFromPdf(file);

        ResumeTextResponse response = new ResumeTextResponse(
                file.getOriginalFilename(),
                text
        );

        return ApiResponse.success(response, "Resume text extracted successfully");
    }

    @PostMapping(
        value = "/analyze-pdf",
        consumes = "multipart/form-data"
)
public ApiResponse<ResumeAnalysisResponse> analyzePdfResume(
        @RequestParam("file") MultipartFile file) {

    String text = resumeAnalysisService.extractTextFromPdf(file);

    return ApiResponse.success(
            resumeAnalysisService.analyzeResume(text),
            "PDF Resume analyzed successfully"
    );
}
}