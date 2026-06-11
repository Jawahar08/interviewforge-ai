package com.interviewforge.question.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateQuestionRequest {

    @NotBlank
    private String questionText;

    @NotBlank
    private String answer;

    @NotBlank
    private String category;

    @NotBlank
    private String difficulty;

    private Long interviewId;
}