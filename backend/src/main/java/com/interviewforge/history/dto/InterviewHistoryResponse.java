package com.interviewforge.history.dto;

public class InterviewHistoryResponse {

    private Long sessionId;
    private String status;
    private Double score;

    public InterviewHistoryResponse(
            Long sessionId,
            String status,
            Double score) {

        this.sessionId = sessionId;
        this.status = status;
        this.score = score;
    }

    public Long getSessionId() {
        return sessionId;
    }

    public String getStatus() {
        return status;
    }

    public Double getScore() {
        return score;
    }
}