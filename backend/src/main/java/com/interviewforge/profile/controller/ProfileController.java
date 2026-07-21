package com.interviewforge.profile.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.common.dto.ApiResponse;
import com.interviewforge.profile.dto.ProfileUpdateRequest;
import com.interviewforge.profile.dto.UserProfileResponse;
import com.interviewforge.profile.service.ProfileService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(
    name = "User Profile",
    description = "User profile management APIs"
)
@RestController
@RequestMapping("/api/v1/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(
            ProfileService profileService) {

        this.profileService = profileService;
    }

    @GetMapping
    public ApiResponse<UserProfileResponse> getProfile() {

        return new ApiResponse<>(
                true,
                "Profile fetched successfully",
                profileService.getProfile()
        );
    }

    @PutMapping
    public ApiResponse<UserProfileResponse> updateProfile(
            @Valid @RequestBody ProfileUpdateRequest request
    ) {
        return new ApiResponse<>(
                true,
                "Profile updated successfully",
                profileService.updateProfile(request)
        );
    }
}