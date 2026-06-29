package com.interviewforge.common.exception;

public class SessionNotFoundException extends RuntimeException {

    public SessionNotFoundException(Long id) {
        super("Interview Session not found with id: " + id);
    }
}