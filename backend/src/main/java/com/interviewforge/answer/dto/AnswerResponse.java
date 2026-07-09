package com.interviewforge.answer.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnswerResponse {

    private Long id;

    private Long questionId;

    private Long sessionId;

    private String userAnswer;

    private Double score;

    private String feedback;

    private LocalDateTime submittedAt;
}