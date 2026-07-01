package com.interviewforge.mockinterview.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.interviewforge.mockinterview.entity.MockInterviewSession;

public interface MockInterviewSessionRepository
        extends JpaRepository<MockInterviewSession, UUID> {
}