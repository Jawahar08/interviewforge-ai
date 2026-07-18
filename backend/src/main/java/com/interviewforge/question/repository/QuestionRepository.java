package com.interviewforge.question.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.interviewforge.auth.entity.User;
import com.interviewforge.question.entity.Question;

public interface QuestionRepository
        extends JpaRepository<Question, Long> {

    List<Question> findByInterviewIdOrderByIdAsc(
            Long interviewId
    );

    long countByInterviewId(
            Long interviewId
    );

    @Query("SELECT COUNT(q) FROM Question q WHERE q.interview.user = :user")
    long countByUser(@Param("user") User user);
}