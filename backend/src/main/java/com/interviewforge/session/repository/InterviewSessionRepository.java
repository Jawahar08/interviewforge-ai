package com.interviewforge.session.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.interviewforge.session.entity.InterviewSession;

import com.interviewforge.session.entity.SessionStatus;
public interface InterviewSessionRepository
        extends JpaRepository<InterviewSession, Long> {
                long countByStatus(SessionStatus status);
}