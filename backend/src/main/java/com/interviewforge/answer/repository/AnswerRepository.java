package com.interviewforge.answer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.interviewforge.answer.entity.Answer;

public interface AnswerRepository
        extends JpaRepository<Answer, Long> {
}