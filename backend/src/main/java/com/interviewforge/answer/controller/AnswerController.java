package com.interviewforge.answer.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.answer.dto.EvaluateAnswerRequest;
import com.interviewforge.answer.dto.SubmitAnswerRequest;
import com.interviewforge.answer.entity.Answer;
import com.interviewforge.answer.service.AnswerService;

@RestController
@RequestMapping("/api/v1/answers")
public class AnswerController {

    private final AnswerService answerService;

    public AnswerController(
            AnswerService answerService) {

        this.answerService = answerService;
    }

    @PostMapping
    public Answer submitAnswer(
            @RequestBody SubmitAnswerRequest request) {

        return answerService.submitAnswer(request);
    }
    @PostMapping("/evaluate")
public Answer evaluateAnswer(
        @RequestBody EvaluateAnswerRequest request) {

    return answerService.evaluateAnswer(
            request.getAnswerId());
}
}