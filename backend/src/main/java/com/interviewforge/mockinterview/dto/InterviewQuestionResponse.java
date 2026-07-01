package com.interviewforge.mockinterview.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewQuestionResponse {

    private String sessionId;

    private String question;

    private Integer questionNumber;

    private Integer totalQuestions;
}