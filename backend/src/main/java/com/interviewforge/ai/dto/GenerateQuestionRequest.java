package com.interviewforge.ai.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class GenerateQuestionRequest {

    @NotNull(message = "Interview ID is required")
    private Long interviewId;

    @Min(value = 1, message = "Number of questions must be at least 1")
    private int numberOfQuestions = 5;
}