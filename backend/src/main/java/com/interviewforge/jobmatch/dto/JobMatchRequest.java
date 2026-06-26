package com.interviewforge.jobmatch.dto;

import jakarta.validation.constraints.NotBlank;

public record JobMatchRequest(

    @NotBlank(message = "Resume text cannot be empty")
    String resumeText,

    @NotBlank(message = "Job description cannot be empty")
    String jobDescription

) {}