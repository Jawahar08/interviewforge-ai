package com.interviewforge.statistics.dto;

public class StatisticsResponse {

    private Long totalSessions;
    private Long completedSessions;
    private Double averageScore;
    private Double successRate;

    public StatisticsResponse(
            Long totalSessions,
            Long completedSessions,
            Double averageScore,
            Double successRate) {

        this.totalSessions = totalSessions;
        this.completedSessions = completedSessions;
        this.averageScore = averageScore;
        this.successRate = successRate;
    }

    public Long getTotalSessions() {
        return totalSessions;
    }

    public Long getCompletedSessions() {
        return completedSessions;
    }

    public Double getAverageScore() {
        return averageScore;
    }

    public Double getSuccessRate() {
        return successRate;
    }
}