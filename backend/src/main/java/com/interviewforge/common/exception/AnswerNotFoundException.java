package com.interviewforge.common.exception;

public class AnswerNotFoundException extends RuntimeException {

    public AnswerNotFoundException(Long id) {
        super("Answer not found with id: " + id);
    }
}