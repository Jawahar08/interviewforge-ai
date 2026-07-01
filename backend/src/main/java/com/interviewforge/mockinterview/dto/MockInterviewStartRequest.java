package com.interviewforge.mockinterview.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MockInterviewStartRequest {

    @NotBlank
    private String role;

    @NotBlank
    private String difficulty;

    @Min(1)
    @Max(20)
    private Integer questionCount;
}