package com.interviewforge.profile.dto;

public class UserProfileResponse {

    private Long userId;
    private String name;
    private String email;
    private String targetRole;

    public UserProfileResponse(
            Long userId,
            String name,
            String email,
            String targetRole) {

        this.userId = userId;
        this.name = name;
        this.email = email;
        this.targetRole = targetRole;
    }

    public Long getUserId() {
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