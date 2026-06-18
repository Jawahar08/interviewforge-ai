package com.interviewforge.health.controller;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.health.dto.AppInfoResponse;
import com.interviewforge.health.dto.BuildInfoResponse;

@RestController
public class HealthController {

    @GetMapping("/api/v1/health")
    public Map<String, Object> health() {

        return Map.of(
                "status", "UP",
                "service", "InterviewForge",
                "timestamp", LocalDateTime.now()
        );
    }
    @GetMapping("/api/v1/info")
public AppInfoResponse info() {

    return new AppInfoResponse(
            "InterviewForge AI",
            "1.0.0",
            "development"
    );
}
@GetMapping("/api/v1/build")
public BuildInfoResponse buildInfo() {

    return new BuildInfoResponse(
            "InterviewForge AI",
            "1.0.0",
            System.getProperty("java.version")
    );
}

}