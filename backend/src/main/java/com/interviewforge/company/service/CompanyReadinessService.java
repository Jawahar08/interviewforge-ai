package com.interviewforge.company.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.interviewforge.ai.gemini.GeminiService;
import com.interviewforge.auth.entity.User;
import com.interviewforge.auth.repository.UserRepository;
import com.interviewforge.company.dto.CompanyReadinessResponse;
import com.interviewforge.company.entity.CompanyReadiness;
import com.interviewforge.company.repository.CompanyReadinessRepository;

@Service
public class CompanyReadinessService {

    private final CompanyReadinessRepository repository;
    private final UserRepository userRepository;
    private final GeminiService geminiService;

    public CompanyReadinessService(
            CompanyReadinessRepository repository,
            UserRepository userRepository,
            GeminiService geminiService) {

        this.repository = repository;
        this.userRepository = userRepository;
        this.geminiService = geminiService;
    }

    public List<CompanyReadinessResponse> generateReadiness() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        String[] companies = {
                "Google",
                "Amazon",
                "Microsoft",
                "Zoho",
                "TCS",
                "Infosys"
        };

        List<CompanyReadinessResponse> responses =
                new ArrayList<>();

        int score = 95;

        for (String company : companies) {

            String prompt = """
You are an AI career coach.

Evaluate readiness for %s.

Return only a short recommendation.
""".formatted(company);

            String recommendation =
                    geminiService.generateContent(prompt);

            CompanyReadiness readiness =
                    CompanyReadiness.builder()
                            .user(user)
                            .company(company)
                            .readinessScore(score)
                            .missingSkills(
                                    "Docker, Kubernetes, System Design")
                            .recommendation(recommendation)
                            .createdAt(LocalDateTime.now())
                            .build();

            repository.save(readiness);

            responses.add(
                    CompanyReadinessResponse.builder()
                            .company(company)
                            .readinessScore(score)
                            .missingSkills(
                                    "Docker, Kubernetes, System Design")
                            .recommendation(recommendation)
                            .build());

            score -= 4;
        }

        return responses;
    }

}