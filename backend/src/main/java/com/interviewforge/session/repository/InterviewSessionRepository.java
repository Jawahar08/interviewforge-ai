package com.interviewforge.session.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.interviewforge.session.entity.InterviewSession;

public interface InterviewSessionRepository
        extends JpaRepository<InterviewSession, Long> {
}