package com.interviewforge.jobmatch.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JobMatchResponse {

    private Integer matchScore;

    private List<String> matchedSkills;

    private List<String> missingSkills;

    private List<String> recommendations;
}