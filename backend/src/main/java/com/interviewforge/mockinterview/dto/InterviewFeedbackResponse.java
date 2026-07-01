package com.interviewforge.mockinterview.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewFeedbackResponse {

    private Integer score;

    private String feedback;

    private String nextQuestion;

    private Boolean completed;
}