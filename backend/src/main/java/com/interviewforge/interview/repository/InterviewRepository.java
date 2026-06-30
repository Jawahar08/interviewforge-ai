package com.interviewforge.interview.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.interviewforge.auth.entity.User;
import com.interviewforge.interview.entity.Interview;


public interface InterviewRepository
        extends JpaRepository<Interview, Long> {
                List<Interview> findByUser(User user);
                long count();
}
