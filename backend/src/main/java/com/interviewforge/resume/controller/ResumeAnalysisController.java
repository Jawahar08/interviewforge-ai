package com.interviewforge.resume.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.interviewforge.resume.dto.ResumeAiAnalysisResponse;
import com.interviewforge.resume.dto.ResumeAnalysisResponse;
import com.interviewforge.resume.dto.ResumeTextResponse;
import com.interviewforge.resume.dto.ResumeUploadResponse;
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
    @PostMapping(
        value = "/upload",
        consumes = "multipart/form-data"
)
public ResumeUploadResponse uploadResume(
        @RequestParam("file") MultipartFile file) {

    return new ResumeUploadResponse(
            file.getOriginalFilename(),
            file.getSize(),
            "Resume uploaded successfully"
    );
}
@PostMapping(
        value = "/extract",
        consumes = "multipart/form-data"
)
public ResumeTextResponse extractResumeText(
        @RequestParam("file")
        MultipartFile file) {

    String text =
            resumeAnalysisService
                    .extractTextFromPdf(file);

    return new ResumeTextResponse(
            file.getOriginalFilename(),
            text);
}
@PostMapping(
        value = "/analyze-pdf",
        consumes = "multipart/form-data"
)
public ResumeAiAnalysisResponse analyzePdfResume(
        @RequestParam("file")
        MultipartFile file) {

    String text =
            resumeAnalysisService.extractTextFromPdf(file);

    return resumeAnalysisService
            .analyzeResumeText(text);
}
}