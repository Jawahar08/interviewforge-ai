package com.interviewforge.common.exception;

public class UserNotFoundByEmailException extends RuntimeException {

    public UserNotFoundByEmailException(String email) {
        super("No account found with email: " + email);
    }
}