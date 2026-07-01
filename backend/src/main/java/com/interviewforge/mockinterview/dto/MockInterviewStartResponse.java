package com.interviewforge.mockinterview.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MockInterviewStartResponse {

    private String sessionId;

    private String firstQuestion;

    private Integer totalQuestions;

    private String role;

    private String difficulty;
}