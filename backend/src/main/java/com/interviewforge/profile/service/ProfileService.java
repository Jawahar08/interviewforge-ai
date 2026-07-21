package com.interviewforge.profile.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.interviewforge.auth.entity.User;
import com.interviewforge.auth.repository.UserRepository;
import com.interviewforge.common.exception.InvalidCredentialsException;
import com.interviewforge.common.exception.UserNotFoundByEmailException;
import com.interviewforge.profile.dto.ProfileUpdateRequest;
import com.interviewforge.profile.dto.UserProfileResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public UserProfileResponse getProfile() {
        User user = getCurrentUser();
        return toResponse(user);
    }

    @Transactional
    public UserProfileResponse updateProfile(ProfileUpdateRequest request) {
        User user = getCurrentUser();

        user.setFullName(request.getFullName());
        user.setTargetRole(request.getTargetRole());

        if (request.getCurrentPassword() != null && !request.getCurrentPassword().isEmpty()
                && request.getNewPassword() != null && !request.getNewPassword().isEmpty()) {

            boolean passwordMatches = passwordEncoder.matches(
                    request.getCurrentPassword(),
                    user.getPasswordHash()
            );

            if (!passwordMatches) {
                throw new InvalidCredentialsException();
            }

            user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        }

        User savedUser = userRepository.save(user);
        return toResponse(savedUser);
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundByEmailException(email));
    }

    private UserProfileResponse toResponse(User user) {
        return new UserProfileResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getTargetRole()
        );
    }
}