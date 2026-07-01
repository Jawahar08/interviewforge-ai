package com.interviewforge.roadmap.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonAlias;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class ProjectDto {
    

    private String title;

    private String description;
    @JsonAlias("technologies")

    private List<String> keyTechnologies;
}