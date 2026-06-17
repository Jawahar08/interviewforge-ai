package com.interviewforge.statistics.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.statistics.dto.StatisticsResponse;
import com.interviewforge.statistics.service.StatisticsService;

@RestController
@RequestMapping("/api/v1/statistics")
public class StatisticsController {

    private final StatisticsService statisticsService;

    public StatisticsController(
            StatisticsService statisticsService) {

        this.statisticsService = statisticsService;
    }

    @GetMapping
    public StatisticsResponse getStatistics() {

        return statisticsService.getStatistics();
    }
}