package com.interviewforge.company.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompanyReadinessResponse {

    private String company;

    private Integer readinessScore;

    private String missingSkills;

    private String recommendation;

}