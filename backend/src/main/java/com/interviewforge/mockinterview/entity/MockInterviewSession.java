package com.interviewforge.mockinterview.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "mock_interview_sessions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MockInterviewSession {

    @Id
    private UUID id;

    private String role;

    private String difficulty;

    private Integer totalQuestions;

    private Integer currentQuestionIndex;

    private Integer overallScore;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String currentQuestion;

    private Boolean completed;

    private LocalDateTime startedAt;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "mock_interview_answers",
            joinColumns = @JoinColumn(name = "session_id")
    )
    @Column(name = "answer", columnDefinition = "TEXT")
    @Builder.Default
    private List<String> answers = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "mock_interview_scores",
            joinColumns = @JoinColumn(name = "session_id")
    )
    @Column(name = "score")
    @Builder.Default
    private List<Integer> scores = new ArrayList<>();
}