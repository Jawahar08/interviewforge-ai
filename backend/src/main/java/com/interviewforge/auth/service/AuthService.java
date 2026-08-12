package com.interviewforge.auth.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.interviewforge.auth.dto.AuthResponse;
import com.interviewforge.auth.dto.ForgotPasswordRequest;
import com.interviewforge.auth.dto.ForgotPasswordResponse;
import com.interviewforge.auth.dto.LoginRequest;
import com.interviewforge.auth.dto.RegisterRequest;
import com.interviewforge.auth.dto.ResetPasswordRequest;
import com.interviewforge.auth.dto.VerifyOtpRequest;
import com.interviewforge.auth.entity.PasswordResetOtp;
import com.interviewforge.auth.entity.User;
import com.interviewforge.auth.repository.PasswordResetOtpRepository;
import com.interviewforge.auth.repository.UserRepository;
import com.interviewforge.common.exception.EmailAlreadyExistsException;
import com.interviewforge.common.exception.InvalidCredentialsException;
import com.interviewforge.common.exception.UserNotFoundByEmailException;
import com.interviewforge.common.service.EmailService;
import com.interviewforge.security.JwtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordResetOtpRepository passwordResetOtpRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final SecureRandom secureRandom = new SecureRandom();

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

    @Transactional
    public ForgotPasswordResponse forgotPassword(ForgotPasswordRequest request) {
        String cleanEmail = request.getEmail() != null ? request.getEmail().trim().toLowerCase() : "";

        User user = userRepository.findByEmailIgnoreCase(cleanEmail)
                .or(() -> userRepository.findByEmail(cleanEmail))
                .orElseThrow(
                        () -> new UserNotFoundByEmailException(
                                cleanEmail
                        )
                );

        // Generate 6-digit numeric OTP
        int randomPin = 100000 + secureRandom.nextInt(900000);
        String otp = String.valueOf(randomPin);

        // Delete any old OTPs for this email and save the fresh one
        passwordResetOtpRepository.deleteByEmailIgnoreCase(cleanEmail);

        PasswordResetOtp otpEntity = PasswordResetOtp.builder()
                .email(user.getEmail())
                .otp(otp)
                .expiryTime(LocalDateTime.now().plusMinutes(10))
                .verified(false)
                .build();

        passwordResetOtpRepository.save(otpEntity);

        // Dispatch OTP via email service
        emailService.sendOtpEmail(user.getEmail(), otp);

        return ForgotPasswordResponse.builder()
                .email(user.getEmail())
                .message("A 6-digit verification code has been sent to your email.")
                .build();
    }

    @Transactional
    public ForgotPasswordResponse verifyOtp(VerifyOtpRequest request) {
        String cleanEmail = request.getEmail() != null ? request.getEmail().trim().toLowerCase() : "";

        User user = userRepository.findByEmailIgnoreCase(cleanEmail)
                .or(() -> userRepository.findByEmail(cleanEmail))
                .orElseThrow(
                        () -> new UserNotFoundByEmailException(
                                cleanEmail
                        )
                );

        PasswordResetOtp otpEntity = passwordResetOtpRepository
                .findTopByEmailIgnoreCaseOrderByCreatedAtDesc(cleanEmail)
                .orElseThrow(() -> new IllegalArgumentException("No verification code found. Please request a new code."));

        if (!otpEntity.getOtp().equals(request.getOtp().trim())) {
            throw new IllegalArgumentException("Invalid verification code. Please check and try again.");
        }

        if (LocalDateTime.now().isAfter(otpEntity.getExpiryTime())) {
            throw new IllegalArgumentException("Verification code has expired. Please request a new code.");
        }

        otpEntity.setVerified(true);
        passwordResetOtpRepository.save(otpEntity);

        String resetToken = jwtService.generatePasswordResetToken(user.getEmail());

        return ForgotPasswordResponse.builder()
                .email(user.getEmail())
                .resetToken(resetToken)
                .message("Verification code verified successfully.")
                .build();
    }

    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        String cleanEmail = request.getEmail() != null ? request.getEmail().trim().toLowerCase() : "";

        if (request.getResetToken() != null && !request.getResetToken().isBlank()) {
            String tokenEmail = jwtService.validatePasswordResetToken(request.getResetToken());
            if (!cleanEmail.equalsIgnoreCase(tokenEmail)) {
                throw new IllegalArgumentException("Token email does not match the requested email");
            }
        } else {
            // Check if there is a verified OTP session
            PasswordResetOtp otpEntity = passwordResetOtpRepository
                    .findTopByEmailIgnoreCaseOrderByCreatedAtDesc(cleanEmail)
                    .orElseThrow(() -> new IllegalArgumentException("Authentication required. Please verify your OTP."));

            if (!otpEntity.isVerified()) {
                throw new IllegalArgumentException("Email authentication required. Please verify OTP first.");
            }

            if (LocalDateTime.now().isAfter(otpEntity.getExpiryTime())) {
                throw new IllegalArgumentException("Reset session expired. Please request a new OTP.");
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

        // Cleanup used OTP
        passwordResetOtpRepository.deleteByEmailIgnoreCase(cleanEmail);
    }
}