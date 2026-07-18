package com.interviewforge.result.dto;

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
public class QuestionReviewDto {
    private Long questionId;
    private String questionText;
    private String category;
    private String difficulty;
    private String modelAnswer;
    private String userAnswer;
    private Double score;
    private String feedback;
}
