package com.interviewforge.question.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.interviewforge.interview.entity.Interview;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "questions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String questionText;

    @Column(columnDefinition = "TEXT")
    private String answer;

    private String category;

    private String difficulty;

    @ManyToOne
@JoinColumn(name = "interview_id")
@JsonIgnoreProperties({"user", "questions"})
private Interview interview;
}