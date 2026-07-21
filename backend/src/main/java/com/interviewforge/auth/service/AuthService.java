package com.interviewforge.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.interviewforge.auth.dto.AuthResponse;
import com.interviewforge.auth.dto.LoginRequest;
import com.interviewforge.auth.dto.RegisterRequest;
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

       if (userRepository.existsByEmail(request.getEmail())) {
    throw new EmailAlreadyExistsException(request.getEmail());
}

        User user = User.builder()
                .fullName(request.getName())
                .email(request.getEmail())
                .passwordHash(
                        passwordEncoder.encode(request.getPassword())
                )
                .role("USER")
                .build();

        User savedUser = userRepository.save(user);

        String token = jwtService.generateToken(
                savedUser.getEmail()
        );

        return AuthResponse.builder()
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .isPremium(savedUser.getIsPremium())
                .token(token)
                .message("User registered successfully")
                .build();
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(
                        () -> new UserNotFoundByEmailException(
                                request.getEmail()
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
                .isPremium(user.getIsPremium())
                .token(token)
                .message("Login successful")
                .build();
    }
}