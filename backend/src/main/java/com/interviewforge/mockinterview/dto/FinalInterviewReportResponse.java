package com.interviewforge.mockinterview.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FinalInterviewReportResponse {

    private Integer overallScore;

    private String performance;

    private List<String> strengths;

    private List<String> weaknesses;

    private List<String> improvementPlan;
}