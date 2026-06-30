package com.interviewforge.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    private Long totalInterviews;

    private Long totalQuestions;

    private Long totalAnswers;

    private Double averageInterviewScore;

    private Double highestScore;

    private Double lowestScore;

    private Integer resumeAtsScore;

    private String aiInsight;
}