package com.interviewforge.roadmap.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LearningRoadmapResponse {

    private String title;

    private Integer overallScore;

    private String estimatedDuration;

    private List<WeekPlan> weeks;

    private List<ProjectDto> projects;
private List<ResourceDto> resources;

}