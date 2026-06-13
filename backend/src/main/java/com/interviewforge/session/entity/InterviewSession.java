package com.interviewforge.session.entity;

import java.time.LocalDateTime;

import com.interviewforge.auth.entity.User;
import com.interviewforge.interview.entity.Interview;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "interview_sessions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "interview_id")
    private Interview interview;

    private LocalDateTime startedAt;

    private LocalDateTime endedAt;

    @Enumerated(EnumType.STRING)
    private SessionStatus status;

    private Double score;
}