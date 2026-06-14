package com.interviewforge.result.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.interviewforge.result.entity.InterviewResult;

public interface InterviewResultRepository
        extends JpaRepository<InterviewResult, Long> {

    @Query("""
            SELECT AVG(r.score)
            FROM InterviewResult r
            """)
    Double getAverageScore();
}