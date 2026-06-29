package com.interviewforge.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.interviewforge.auth.dto.AuthResponse;
import com.interviewforge.auth.dto.LoginRequest;
import com.interviewforge.auth.dto.RegisterRequest;
import com.interviewforge.auth.entity.User;
import com.interviewforge.auth.repository.UserRepository;
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

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .fullName(request.getName())
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
            .token(null)
            .build();
    }
    public AuthResponse login(LoginRequest request) {

    System.out.println("STEP 1");

    User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new UserNotFoundByEmailException(request.getEmail()));

    System.out.println("STEP 2");

    boolean match =
        passwordEncoder.matches(
                request.getPassword(),
                user.getPasswordHash()
        );

System.out.println("PASSWORD MATCH = " + match);

if (!match) {
    throw new RuntimeException("Invalid credentials");
}

    System.out.println("STEP 3");

    String token = jwtService.generateToken(user.getEmail());

    System.out.println("STEP 4");

    return AuthResponse.builder()
            .email(user.getEmail())
            .role(user.getRole())
            .token(token)
            .message("Login successful")
            .build();
}
}