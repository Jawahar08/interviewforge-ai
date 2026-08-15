package com.interviewforge.auth.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.auth.dto.AuthResponse;
import com.interviewforge.auth.dto.ForgotPasswordRequest;
import com.interviewforge.auth.dto.ForgotPasswordResponse;
import com.interviewforge.auth.dto.GoogleAuthRequest;
import com.interviewforge.auth.dto.LoginRequest;
import com.interviewforge.auth.dto.RegisterRequest;
import com.interviewforge.auth.dto.ResetPasswordRequest;
import com.interviewforge.auth.dto.VerifyOtpRequest;
import com.interviewforge.auth.service.AuthService;
import com.interviewforge.common.dto.ApiResponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(
    name = "Authentication",
    description = "User registration, login, and OAuth APIs"
)
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
            @RequestBody LoginRequest request
    ) {
        return ApiResponse.success(
                authService.login(request),
                "User logged in successfully"
        );
    }

    @PostMapping("/google")
    public ApiResponse<AuthResponse> googleAuth(
            @RequestBody GoogleAuthRequest request
    ) {
        return ApiResponse.success(
                authService.googleAuth(request),
                "Google authentication successful"
        );
    }

    @PostMapping("/forgot-password")
    public ApiResponse<ForgotPasswordResponse> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request
    ) {
        return ApiResponse.success(
                authService.forgotPassword(request),
                "OTP verification code sent to email"
        );
    }

    @PostMapping("/verify-otp")
    public ApiResponse<ForgotPasswordResponse> verifyOtp(
            @Valid @RequestBody VerifyOtpRequest request
    ) {
        return ApiResponse.success(
                authService.verifyOtp(request),
                "OTP verified successfully"
        );
    }

    @PostMapping("/reset-password")
    public ApiResponse<Void> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request
    ) {
        authService.resetPassword(request);
        return ApiResponse.success(
                null,
                "Password reset successfully"
        );
    }
}