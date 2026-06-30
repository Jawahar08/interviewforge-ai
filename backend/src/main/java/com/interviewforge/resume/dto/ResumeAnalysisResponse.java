package com.interviewforge.resume.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeAnalysisResponse {

    private Integer atsScore;

    private String summary;

    private String strengths;

    private String weaknesses;

    private String missingSkills;

    private String suggestions;
}