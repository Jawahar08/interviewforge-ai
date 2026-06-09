package com.interviewforge.interview.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateInterviewRequest {

    private String title;
    private String role;
    private String difficulty;
}