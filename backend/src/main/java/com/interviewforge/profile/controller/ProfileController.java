package com.interviewforge.profile.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.profile.dto.UserProfileResponse;
import com.interviewforge.profile.service.ProfileService;

@RestController
@RequestMapping("/api/v1/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(
            ProfileService profileService) {

        this.profileService = profileService;
    }

    @GetMapping
    public UserProfileResponse getProfile() {

        return profileService.getProfile();
    }
}