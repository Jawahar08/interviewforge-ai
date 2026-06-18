package com.interviewforge.report.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.common.dto.ApiResponse;
import com.interviewforge.report.dto.PerformanceReportResponse;
import com.interviewforge.report.service.PerformanceReportService;

@RestController
@RequestMapping("/api/v1/reports")
public class PerformanceReportController {

    private final PerformanceReportService reportService;

    public PerformanceReportController(
            PerformanceReportService reportService) {

        this.reportService = reportService;
    }

    @GetMapping
    public ApiResponse<PerformanceReportResponse> getReport() {

        return ApiResponse.success(
                reportService.generateReport(),
                "Performance report generated successfully"
        );
    }
}