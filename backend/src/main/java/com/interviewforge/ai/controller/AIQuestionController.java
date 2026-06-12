package com.interviewforge.ai.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.ai.dto.GenerateQuestionRequest;
import com.interviewforge.ai.service.AIQuestionService;
import com.interviewforge.question.entity.Question;

@RestController
@RequestMapping("/api/v1/ai")
public class AIQuestionController {

    private final AIQuestionService aiQuestionService;

    public AIQuestionController(
            AIQuestionService aiQuestionService) {

        this.aiQuestionService = aiQuestionService;
    }

    @PostMapping("/generate")
    public List<Question> generateQuestions(
            @RequestBody GenerateQuestionRequest request) {

        return aiQuestionService.generateQuestions(
                request.getInterviewId());
    }
}