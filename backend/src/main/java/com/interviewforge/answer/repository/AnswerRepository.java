package com.interviewforge.answer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.interviewforge.answer.entity.Answer;
import com.interviewforge.session.entity.InterviewSession;

public interface AnswerRepository
        extends JpaRepository<Answer, Long> {
                List<Answer> findBySession(InterviewSession session);
}