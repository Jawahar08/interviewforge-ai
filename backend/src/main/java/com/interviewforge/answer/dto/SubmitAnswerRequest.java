package com.interviewforge.answer.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubmitAnswerRequest {

    private Long questionId;

    private Long sessionId;

    private String userAnswer;
}