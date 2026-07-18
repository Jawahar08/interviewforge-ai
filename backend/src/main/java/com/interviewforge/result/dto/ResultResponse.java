package com.interviewforge.result.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
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

    private String summary;

    private List<QuestionReviewDto> questions;
}