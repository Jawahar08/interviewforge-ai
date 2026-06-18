package com.interviewforge.health.dto;

public record BuildInfoResponse(
        String project,
        String version,
        String javaVersion
) {
}