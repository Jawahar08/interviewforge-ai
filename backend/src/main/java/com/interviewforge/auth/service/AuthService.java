package com.interviewforge.auth.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewforge.auth.dto.AuthResponse;
import com.interviewforge.auth.dto.ForgotPasswordRequest;
import com.interviewforge.auth.dto.ForgotPasswordResponse;
import com.interviewforge.auth.dto.GoogleAuthRequest;
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
    private final ObjectMapper objectMapper = new ObjectMapper();
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

    @Transactional
    public AuthResponse googleAuth(GoogleAuthRequest request) {
        String email = null;
        String name = null;

        // 1. If a Google token / ID token is provided, verify or parse it
        if (request.getToken() != null && !request.getToken().isBlank()) {
            try {
                String tokenUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=" + request.getToken();
                HttpClient client = HttpClient.newBuilder()
                        .connectTimeout(Duration.ofSeconds(5))
                        .build();
                HttpRequest httpRequest = HttpRequest.newBuilder()
                        .uri(URI.create(tokenUrl))
                        .timeout(Duration.ofSeconds(5))
                        .GET()
                        .build();

                HttpResponse<String> response = client.send(httpRequest, HttpResponse.BodyHandlers.ofString());
                if (response.statusCode() == 200) {
                    JsonNode jsonNode = objectMapper.readTree(response.body());
                    if (jsonNode.has("email")) {
                        email = jsonNode.get("email").asText();
                    }
                    if (jsonNode.has("name")) {
                        name = jsonNode.get("name").asText();
                    }
                }
            } catch (Exception e) {
                log.warn("Could not verify Google token via tokeninfo API: {}", e.getMessage());
            }

            // 2. If tokeninfo didn't resolve (e.g. it was an OAuth access token), try userinfo API
            if (email == null) {
                try {
                    String userInfoUrl = "https://www.googleapis.com/oauth2/v3/userinfo";
                    HttpClient client = HttpClient.newBuilder()
                            .connectTimeout(Duration.ofSeconds(5))
                            .build();
                    HttpRequest userRequest = HttpRequest.newBuilder()
                            .uri(URI.create(userInfoUrl))
                            .header("Authorization", "Bearer " + request.getToken())
                            .timeout(Duration.ofSeconds(5))
                            .GET()
                            .build();

                    HttpResponse<String> userResponse = client.send(userRequest, HttpResponse.BodyHandlers.ofString());
                    if (userResponse.statusCode() == 200) {
                        JsonNode jsonNode = objectMapper.readTree(userResponse.body());
                        if (jsonNode.has("email")) {
                            email = jsonNode.get("email").asText();
                        }
                        if (jsonNode.has("name")) {
                            name = jsonNode.get("name").asText();
                        }
                    }
                } catch (Exception e) {
                    log.warn("Could not fetch Google profile via userinfo API: {}", e.getMessage());
                }
            }

            // 3. If token is a JWT structure, decode claims
            if (email == null && request.getToken().contains(".")) {
                try {
                    String[] parts = request.getToken().split("\\.");
                    if (parts.length >= 2) {
                        String payload = new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);
                        JsonNode jsonNode = objectMapper.readTree(payload);
                        if (jsonNode.has("email")) {
                            email = jsonNode.get("email").asText();
                        }
                        if (jsonNode.has("name")) {
                            name = jsonNode.get("name").asText();
                        }
                    }
                } catch (Exception e) {
                    log.warn("Could not decode JWT payload: {}", e.getMessage());
                }
            }
        }

        // Fallback to request fields if provided
        if (email == null && request.getEmail() != null && !request.getEmail().isBlank()) {
            email = request.getEmail();
        }
        if (name == null && request.getName() != null && !request.getName().isBlank()) {
            name = request.getName();
        }

        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("Google authentication failed: Email could not be determined.");
        }

        final String cleanEmail = email.trim().toLowerCase();
        final String finalName = (name != null && !name.isBlank()) ? name.trim() : cleanEmail.split("@")[0];

        // Find existing user or create a new user for Google login
        User user = userRepository.findByEmailIgnoreCase(cleanEmail)
                .or(() -> userRepository.findByEmail(cleanEmail))
                .orElseGet(() -> {
                    User newUser = User.builder()
                            .fullName(finalName)
                            .email(cleanEmail)
                            .passwordHash(passwordEncoder.encode(UUID.randomUUID().toString()))
                            .role("USER")
                            .isPremium(true)
                            .build();
                    return userRepository.save(newUser);
                });

        String token = jwtService.generateToken(user.getEmail());

        return AuthResponse.builder()
                .email(user.getEmail())
                .role(user.getRole())
                .isPremium(true)
                .token(token)
                .message("Google authentication successful")
                .build();
    }
}