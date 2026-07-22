package com.interviewforge.resume.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HrEvaluationResponse {
    private Integer starScore;
    private String starBreakdown;
    private String toneAndConfidence;
    private String resumeConsistency;
    private String verdict;
    private List<String> keyStrengths;
    private List<String> improvements;
}
