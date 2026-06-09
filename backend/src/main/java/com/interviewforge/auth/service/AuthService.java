package com.interviewforge.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.interviewforge.auth.dto.AuthResponse;
import com.interviewforge.auth.dto.LoginRequest;
import com.interviewforge.auth.dto.RegisterRequest;
import com.interviewforge.auth.entity.User;
import com.interviewforge.auth.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .passwordHash(
                        passwordEncoder.encode(request.getPassword())
                )
                .role("USER")
                .build();

        userRepository.save(user);

        return AuthResponse.builder()
                .email(user.getEmail())
                .role(user.getRole())
                .message("User registered successfully")
                .build();
    }
    public AuthResponse login(LoginRequest request) {

    User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (!passwordEncoder.matches(
            request.getPassword(),
            user.getPasswordHash())) {

        throw new RuntimeException("Invalid credentials");
    }

    return AuthResponse.builder()
            .email(user.getEmail())
            .role(user.getRole())
            .message("Login successful")
            .build();
}
}