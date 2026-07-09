package com.interviewforge.answer.dto;

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
public class AnswerEvaluationResult {

    private Double score;

    private String strengths;

    private String weaknesses;

    private String suggestions;

    private String feedback;
}