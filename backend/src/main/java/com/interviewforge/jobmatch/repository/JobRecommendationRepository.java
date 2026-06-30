package com.interviewforge.jobmatch.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.interviewforge.jobmatch.entity.JobRecommendation;

public interface JobRecommendationRepository
        extends JpaRepository<JobRecommendation, Long> {

    Optional<JobRecommendation> findTopByUserIdOrderByCreatedAtDesc(UUID userId);
}