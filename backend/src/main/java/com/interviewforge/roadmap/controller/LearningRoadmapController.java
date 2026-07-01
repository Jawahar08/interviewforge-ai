package com.interviewforge.roadmap.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.common.dto.ApiResponse;
import com.interviewforge.roadmap.dto.LearningRoadmapRequest;
import com.interviewforge.roadmap.dto.LearningRoadmapResponse;
import com.interviewforge.roadmap.service.LearningRoadmapService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/roadmap")
@Tag(
    name = "Learning Roadmap",
    description = "AI generated personalized learning roadmap"
)
public class LearningRoadmapController {

    private final LearningRoadmapService roadmapService;

    public LearningRoadmapController(
            LearningRoadmapService roadmapService) {

        this.roadmapService = roadmapService;
    }

    @PostMapping("/generate")
    public ApiResponse<LearningRoadmapResponse> generate(
            @RequestBody LearningRoadmapRequest request)
            throws Exception {

        return ApiResponse.success(
                roadmapService.generateRoadmap(request),
                "Roadmap generated successfully"
        );
    }
}