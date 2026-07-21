package com.interviewforge.profile.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileUpdateRequest {

    @NotBlank(message = "Name cannot be blank")
    private String fullName;

    private String targetRole;

    private String currentPassword;
    private String newPassword;
}
