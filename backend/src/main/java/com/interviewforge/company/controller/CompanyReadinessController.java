package com.interviewforge.company.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.common.dto.ApiResponse;
import com.interviewforge.company.dto.CompanyReadinessResponse;
import com.interviewforge.company.service.CompanyReadinessService;

@RestController
@RequestMapping("/api/v1/company-readiness")
public class CompanyReadinessController {

    private final CompanyReadinessService service;

    public CompanyReadinessController(
            CompanyReadinessService service) {

        this.service = service;
    }

    @GetMapping
    public ApiResponse<List<CompanyReadinessResponse>> generateReadiness() {

        return ApiResponse.success(
                service.generateReadiness(),
                "Company readiness generated successfully");
    }

}