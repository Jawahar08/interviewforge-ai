package com.interviewforge.profile.dto;

import java.util.UUID;

public class UserProfileResponse {

    private UUID userId;
    private String name;
    private String email;
    private String targetRole;

    public UserProfileResponse(
            UUID userId,
            String name,
            String email,
            String targetRole) {

        this.userId = userId;
        this.name = name;
        this.email = email;
        this.targetRole = targetRole;
    }

    public UUID getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getTargetRole() {
        return targetRole;
    }
}