package com.interviewforge.answer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.interviewforge.auth.entity.User;
import com.interviewforge.answer.entity.Answer;
import com.interviewforge.session.entity.InterviewSession;

public interface AnswerRepository
        extends JpaRepository<Answer, Long> {
                List<Answer> findBySession(InterviewSession session);
                long count();

                @Query("SELECT COUNT(a) FROM Answer a WHERE a.session.user = :user")
                long countByUser(@Param("user") User user);
}