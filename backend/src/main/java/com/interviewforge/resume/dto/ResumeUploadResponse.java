package com.interviewforge.resume.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ResumeUploadResponse {

    private String fileName;

    private Long fileSize;

    private String message;
}