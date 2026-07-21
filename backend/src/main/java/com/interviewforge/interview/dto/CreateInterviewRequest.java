package com.interviewforge.interview.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateInterviewRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Role is required")
    private String role;

    @NotBlank(message = "Difficulty is required")
    private String difficulty;

    private String company;
}