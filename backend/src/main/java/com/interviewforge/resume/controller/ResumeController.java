package com.interviewforge.resume.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.interviewforge.common.dto.ApiResponse;
import com.interviewforge.resume.dto.ResumeAnalysisResponse;
import com.interviewforge.resume.service.ResumeService;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/resume")
@Tag(
    name = "Resume Analyzer",
    description = "AI Resume Analysis APIs"
)
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(
            ResumeService resumeService) {

        this.resumeService = resumeService;
    }

    @PostMapping(
    value="/analyze",
    consumes = MediaType.MULTIPART_FORM_DATA_VALUE
)
public ApiResponse<ResumeAnalysisResponse> analyze(

        @Parameter(
                description = "Resume PDF",
                content = @Content(
                        mediaType = MediaType.APPLICATION_PDF_VALUE,
                        schema = @Schema(type = "string", format = "binary")
                )
        )
        @RequestParam("file") MultipartFile file)

        throws Exception {

    return ApiResponse.success(
            resumeService.analyze(file),
            "Resume analyzed successfully"
    );
}
}