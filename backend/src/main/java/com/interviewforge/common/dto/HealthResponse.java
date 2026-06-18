package com.interviewforge.common.dto;

public record HealthResponse(
        String status,
        String application,
        String version
) {
}