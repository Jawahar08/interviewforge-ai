package com.interviewforge.result.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.interviewforge.result.entity.InterviewResult;
import com.interviewforge.session.entity.InterviewSession;



public interface InterviewResultRepository
        extends JpaRepository<InterviewResult, Long> {
                List<InterviewResult> findAllByOrderByIdDesc();

    Optional<InterviewResult> findBySession(InterviewSession session);

    @Query("SELECT AVG(r.score) FROM InterviewResult r")
Double getAverageScore();

@Query("SELECT MAX(r.score) FROM InterviewResult r")
Double getHighestScore();

@Query("SELECT MIN(r.score) FROM InterviewResult r")
Double getLowestScore();

}