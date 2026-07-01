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
public class WeekPlan {

    private Integer week;

    private String topic;

    private List<String> tasks;

}