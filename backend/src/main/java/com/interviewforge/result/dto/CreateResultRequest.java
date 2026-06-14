package com.interviewforge.result.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateResultRequest {

    private Long sessionId;

    private Double score;

    private String feedback;

    private String strengths;

    private String weaknesses;
}