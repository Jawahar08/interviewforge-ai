package com.interviewforge.health.dto;

public record AppInfoResponse(
        String application,
        String version,
        String environment
) {}