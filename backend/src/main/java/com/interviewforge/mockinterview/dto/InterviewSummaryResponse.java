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
public class InterviewSummaryResponse {

    private Integer overallScore;

    private Integer technicalScore;

    private Integer communicationScore;

    private List<String> strengths;

    private List<String> weaknesses;

    private List<String> recommendations;
}