package com.interviewforge.auth.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.auth.dto.AuthResponse;
import com.interviewforge.auth.dto.LoginRequest;
import com.interviewforge.auth.dto.RegisterRequest;
import com.interviewforge.auth.service.AuthService;
import com.interviewforge.common.dto.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ApiResponse<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) {

        return ApiResponse.success(
                authService.register(request),
                "User registered successfully"
        );
    }
    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(
        @RequestBody LoginRequest request) {

    return ApiResponse.success(
            authService.login(request),
            "User logged in successfully"
    );
}
}