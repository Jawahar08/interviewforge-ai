package com.interviewforge.report.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PerformanceReportResponse {

    private Double overallScore;

    private String strengths;

    private String weaknesses;

    private String recommendation;
}