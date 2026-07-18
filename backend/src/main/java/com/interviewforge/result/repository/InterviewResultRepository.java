package com.interviewforge.result.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.interviewforge.auth.entity.User;
import com.interviewforge.result.entity.InterviewResult;
import com.interviewforge.session.entity.InterviewSession;

public interface InterviewResultRepository
        extends JpaRepository<InterviewResult, Long> {

    List<InterviewResult> findAllByOrderByIdDesc();

    Optional<InterviewResult> findBySession(InterviewSession session);

    @Query("SELECT AVG(r.overallScore) FROM InterviewResult r")
    Double getAverageScore();

    @Query("SELECT MAX(r.overallScore) FROM InterviewResult r")
    Double getHighestScore();

    @Query("SELECT MIN(r.overallScore) FROM InterviewResult r")
    Double getLowestScore();

    @Query("SELECT r FROM InterviewResult r WHERE r.session.user = :user")
    List<InterviewResult> findByUser(@Param("user") User user);

    @Query("SELECT AVG(r.overallScore) FROM InterviewResult r WHERE r.session.user = :user")
    Double getAverageScoreByUser(@Param("user") User user);

    @Query("SELECT MAX(r.overallScore) FROM InterviewResult r WHERE r.session.user = :user")
    Double getHighestScoreByUser(@Param("user") User user);

    @Query("SELECT MIN(r.overallScore) FROM InterviewResult r WHERE r.session.user = :user")
    Double getLowestScoreByUser(@Param("user") User user);
}