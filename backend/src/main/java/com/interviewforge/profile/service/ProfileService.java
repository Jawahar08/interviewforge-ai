package com.interviewforge.profile.service;

import org.springframework.stereotype.Service;

import com.interviewforge.profile.dto.UserProfileResponse;

@Service
public class ProfileService {

    public UserProfileResponse getProfile() {

        return new UserProfileResponse(
                1L,
                "Jawahar Bharathi",
                "jawahar@example.com",
                "Full Stack Developer"
        );
    }
}