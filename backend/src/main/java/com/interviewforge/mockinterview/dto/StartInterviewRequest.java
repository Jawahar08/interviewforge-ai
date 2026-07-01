package com.interviewforge.mockinterview.dto;

import lombok.Data;

@Data
public class StartInterviewRequest {

    private String role;

    private String difficulty;

    private Integer numberOfQuestions;
}