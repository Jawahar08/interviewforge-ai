package com.interviewforge.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.interviewforge.auth.dto.AuthResponse;
import com.interviewforge.auth.dto.ForgotPasswordRequest;
import com.interviewforge.auth.dto.ForgotPasswordResponse;
import com.interviewforge.auth.dto.LoginRequest;
import com.interviewforge.auth.dto.RegisterRequest;
import com.interviewforge.auth.dto.ResetPasswordRequest;
import com.interviewforge.auth.entity.User;
import com.interviewforge.auth.repository.UserRepository;
import com.interviewforge.common.exception.EmailAlreadyExistsException;
import com.interviewforge.common.exception.InvalidCredentialsException;
import com.interviewforge.common.exception.UserNotFoundByEmailException;
import com.interviewforge.security.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse register(RegisterRequest request) {
        String cleanEmail = request.getEmail() != null ? request.getEmail().trim().toLowerCase() : "";

        if (userRepository.existsByEmailIgnoreCase(cleanEmail)) {
            throw new EmailAlreadyExistsException(cleanEmail);
        }

        User user = User.builder()
                .fullName(request.getName() != null ? request.getName().trim() : "")
                .email(cleanEmail)
                .passwordHash(
                        passwordEncoder.encode(request.getPassword())
                )
                .role("USER")
                .isPremium(true)
                .build();

        User savedUser = userRepository.save(user);

        String token = jwtService.generateToken(
                savedUser.getEmail()
        );

        return AuthResponse.builder()
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .isPremium(true)
                .token(token)
                .message("User registered successfully")
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        String cleanEmail = request.getEmail() != null ? request.getEmail().trim().toLowerCase() : "";

        User user = userRepository.findByEmailIgnoreCase(cleanEmail)
                .orElseThrow(
                        () -> new UserNotFoundByEmailException(
                                cleanEmail
                        )
                );

        boolean passwordMatches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPasswordHash()
                );

        if (!passwordMatches) {
           throw new InvalidCredentialsException();
        }

        String token = jwtService.generateToken(
                user.getEmail()
        );

        return AuthResponse.builder()
                .email(user.getEmail())
                .role(user.getRole())
                .isPremium(true)
                .token(token)
                .message("Login successful")
                .build();
    }

    public ForgotPasswordResponse forgotPassword(ForgotPasswordRequest request) {
        String cleanEmail = request.getEmail() != null ? request.getEmail().trim().toLowerCase() : "";

        User user = userRepository.findByEmailIgnoreCase(cleanEmail)
                .or(() -> userRepository.findByEmail(cleanEmail))
                .orElseThrow(
                        () -> new UserNotFoundByEmailException(
                                cleanEmail
                        )
                );

        String resetToken = jwtService.generatePasswordResetToken(user.getEmail());

        return ForgotPasswordResponse.builder()
                .email(user.getEmail())
                .resetToken(resetToken)
                .message("Password reset token generated successfully")
                .build();
    }

    public void resetPassword(ResetPasswordRequest request) {
        String cleanEmail = request.getEmail() != null ? request.getEmail().trim().toLowerCase() : "";

        if (request.getResetToken() != null && !request.getResetToken().isBlank()) {
            String tokenEmail = jwtService.validatePasswordResetToken(request.getResetToken());
            if (!cleanEmail.equalsIgnoreCase(tokenEmail)) {
                throw new IllegalArgumentException("Token email does not match the requested email");
            }
        }

        User user = userRepository.findByEmailIgnoreCase(cleanEmail)
                .or(() -> userRepository.findByEmail(cleanEmail))
                .orElseThrow(
                        () -> new UserNotFoundByEmailException(
                                cleanEmail
                        )
                );

        user.setPasswordHash(
                passwordEncoder.encode(request.getNewPassword())
        );

        userRepository.save(user);
    }
}