package com.interviewforge.recommendation.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.interviewforge.recommendation.dto.RoleRecommendationResponse;

@Service
public class RecommendationService {

    public RoleRecommendationResponse recommendRoles(
            String resumeText) {

        List<String> roles = new ArrayList<>();

        String text = resumeText.toLowerCase();

        if (text.contains("java")
                || text.contains("spring")) {
            roles.add("Backend Developer");
        }

        if (text.contains("react")
                || text.contains("javascript")) {
            roles.add("Frontend Developer");
        }

        if (text.contains("java")
                && text.contains("react")) {
            roles.add("Full Stack Developer");
        }

        if (text.contains("python")
                || text.contains("machine learning")) {
            roles.add("AI/ML Engineer");
        }

        if (roles.isEmpty()) {
            roles.add("Software Developer");
        }

        return new RoleRecommendationResponse(
                roles);
    }
}