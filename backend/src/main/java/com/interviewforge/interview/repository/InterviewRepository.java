package com.interviewforge.interview.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.interviewforge.interview.entity.Interview;

public interface InterviewRepository
        extends JpaRepository<Interview, Long> {
}
