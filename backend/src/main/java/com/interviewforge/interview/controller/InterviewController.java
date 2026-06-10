package com.interviewforge.interview.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewforge.interview.dto.CreateInterviewRequest;
import com.interviewforge.interview.entity.Interview;
import com.interviewforge.interview.service.InterviewService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/v1/interviews")
public class InterviewController {

    private final InterviewService interviewService;

    public InterviewController(
            InterviewService interviewService) {
        this.interviewService = interviewService;
    }
    

    @PostMapping
    public Interview createInterview(
            @Valid @RequestBody CreateInterviewRequest request) {

        return interviewService.createInterview(request);
    }
    @GetMapping
public List<Interview> getAllInterviews() {
    return interviewService.getAllInterviews();
}
@GetMapping("/{id}")
public Interview getInterviewById(
        @PathVariable Long id) {

    return interviewService.getInterviewById(id);
}
@PutMapping("/{id}")
public Interview updateInterview(
        @PathVariable Long id,
        @Valid @RequestBody CreateInterviewRequest request) {

    return interviewService.updateInterview(id, request);
}
@DeleteMapping("/{id}")
public String deleteInterview(
        @PathVariable Long id) {

    interviewService.deleteInterview(id);

    return "Interview deleted successfully";
}
    
}
