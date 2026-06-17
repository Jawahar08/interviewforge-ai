package com.interviewforge.recommendation.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.recommendation.dto.RoleRecommendationResponse;
import com.interviewforge.recommendation.service.RecommendationService;

@RestController
@RequestMapping("/api/v1/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(
            RecommendationService recommendationService) {

        this.recommendationService =
                recommendationService;
    }

    @PostMapping
    public RoleRecommendationResponse recommendRoles(
            @RequestBody String resumeText) {

        return recommendationService
                .recommendRoles(resumeText);
    }
}