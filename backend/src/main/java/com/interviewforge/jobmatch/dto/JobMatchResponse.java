package com.interviewforge.jobmatch.dto;

import java.util.List;

public record JobMatchResponse(
        Integer matchScore,
        List<String> matchedSkills,
        List<String> missingSkills,
        List<String> recommendations
) {}