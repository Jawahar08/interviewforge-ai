package com.interviewforge.profile.dto;

import java.util.UUID;

public class UserProfileResponse {

    private UUID userId;
    private String name;
    private String email;
    private String targetRole;
    private Boolean isPremium;

    public UserProfileResponse(
            UUID userId,
            String name,
            String email,
            String targetRole,
            Boolean isPremium) {

        this.userId = userId;
        this.name = name;
        this.email = email;
        this.targetRole = targetRole;
        this.isPremium = isPremium;
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

    public Boolean getIsPremium() {
        return isPremium;
    }
}