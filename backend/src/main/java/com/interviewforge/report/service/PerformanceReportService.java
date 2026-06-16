package com.interviewforge.report.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.interviewforge.answer.entity.Answer;
import com.interviewforge.answer.repository.AnswerRepository;
import com.interviewforge.report.dto.PerformanceReportResponse;

@Service
public class PerformanceReportService {

    private final AnswerRepository answerRepository;

    public PerformanceReportService(
            AnswerRepository answerRepository) {

        this.answerRepository = answerRepository;
    }

    public PerformanceReportResponse generateReport() {

        List<Answer> answers =
                answerRepository.findAll();

        double averageScore =
                answers.stream()
                        .mapToDouble(
                                a -> a.getScore() == null
                                        ? 0
                                        : a.getScore())
                        .average()
                        .orElse(0);

        return new PerformanceReportResponse(
                averageScore,
                "Spring Boot, Dependency Injection",
                "Microservices, Security",
                "Practice system design and security concepts.");
    }
}