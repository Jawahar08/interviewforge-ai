package com.interviewforge.session.dto;

public class InterviewSessionResponse {

    private Long id;
    private Long interviewId;
    private String status;

    public InterviewSessionResponse() {
    }

    public InterviewSessionResponse(
            Long id,
            Long interviewId,
            String status) {

        this.id = id;
        this.interviewId = interviewId;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public Long getInterviewId() {
        return interviewId;
    }

    public String getStatus() {
        return status;
    }
}