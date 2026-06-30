package com.interviewforge.jobmatch.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobMatchResponse {

    private String recommendedRoles;

    private String recommendedCompanies;

    private Integer jobReadiness;

    private String salaryRange;

    private String missingSkills;

    private String learningRoadmap;
}