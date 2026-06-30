package com.interviewforge.result.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResultResponse {

    private Double overallScore;

    private Double technicalScore;

    private Double communicationScore;

    private Double confidenceScore;

    private String strengths;

    private String weaknesses;

    private String recommendation;
}