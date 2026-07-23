package com.interviewforge.resume.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeAnalysisResponse {

    @JsonProperty("atsScore")
    private Integer atsScore;

    private Integer keywordMatchScore;
    private Integer impactMetricsScore;
    private Integer formattingScore;
    private Integer sectionCompletenessScore;
    private Integer experienceRelevanceScore;

    private List<String> hardSkills;
    private List<String> softSkills;
    private List<String> criticalFixes;
    private String recruiterVerdict;
    private String readabilityIndex;

    private List<String> strengths;

    private List<String> weaknesses;

    private List<String> missingSkills;

    private List<String> improvements;

    private List<String> suggestedProjects;

    private List<String> interviewQuestions;

    private List<String> learningResources;

    private List<HrQuestionDto> hrQuestions;
}