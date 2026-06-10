package com.interviewforge.exception;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ApiErrorResponse {

    private String message;

    private int status;

    private LocalDateTime timestamp;
}