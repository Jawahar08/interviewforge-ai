package com.interviewforge.resume.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeAnalysisResponse {

    private Integer atsScore;

    private List<String> strengths;

    private List<String> weaknesses;

    private List<String> missingSkills;

    private List<String> improvements;

    private List<String> suggestedProjects;

    private List<String> interviewQuestions;

    private List<String> learningResources;
}