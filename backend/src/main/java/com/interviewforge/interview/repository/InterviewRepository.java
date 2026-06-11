package com.interviewforge.interview.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.interviewforge.interview.entity.Interview;

import java.util.List;

import com.interviewforge.auth.entity.User;


public interface InterviewRepository
        extends JpaRepository<Interview, Long> {
                List<Interview> findByUser(User user);
}
