package com.interviewforge.resume.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ResumeAiAnalysisResponse {

    private String strengths;

    private String skillGaps;

    private String recommendation;
}