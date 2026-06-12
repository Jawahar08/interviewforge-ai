package com.interviewforge.ai.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/ai")
public class AIQuestionController {

    @GetMapping("/generate")
    public String generateQuestions() {

        return "AI Question Generator Ready";
    }
}