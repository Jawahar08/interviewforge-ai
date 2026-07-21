package com.interviewforge.auth.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthResponse {

    private String email;
    private String role;
    private Boolean isPremium;
    private String token;
    private String message;
}