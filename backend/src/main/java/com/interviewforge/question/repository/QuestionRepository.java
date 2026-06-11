package com.interviewforge.question.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.interviewforge.interview.entity.Interview;
import com.interviewforge.question.entity.Question;

public interface QuestionRepository
        extends JpaRepository<Question, Long> {

    List<Question> findByInterview(Interview interview);
}