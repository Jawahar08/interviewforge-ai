package com.interviewforge.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponse {

    private Long totalInterviews;
    private Long totalQuestions;
    private Long totalSessions;
    private Long completedSessions;
    private Double averageScore;
}