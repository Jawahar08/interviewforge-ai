package com.interviewforge.history.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewHistoryResponse {

    private Long id;

    private String company;

    private String role;

    private Double score;

    private String feedback;

    private String createdAt;
}