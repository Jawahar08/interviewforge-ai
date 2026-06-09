package com.interviewforge.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/v1/test/hello")
    public String hello() {
        return "Hello Jawahar";
    }
}