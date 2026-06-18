package com.interviewforge.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.common.dto.ApiResponse;

@RestController
public class TestController {

    @GetMapping("/api/v1/test/hello")
    public ApiResponse<String> hello() {
        return ApiResponse.success(
                "Hello Jawahar",
                "Hello retrieved successfully"
        );
    }
}