package com.interviewforge.recommendation.dto;

import java.util.List;

public class RoleRecommendationResponse {

    private List<String> recommendedRoles;

    public RoleRecommendationResponse(
            List<String> recommendedRoles) {
        this.recommendedRoles = recommendedRoles;
    }

    public List<String> getRecommendedRoles() {
        return recommendedRoles;
    }

    public void setRecommendedRoles(
            List<String> recommendedRoles) {
        this.recommendedRoles = recommendedRoles;
    }
}