package com.interviewforge.resume.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ResumeTextResponse {

    private String fileName;

    private String extractedText;
}