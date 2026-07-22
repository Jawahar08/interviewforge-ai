package com.interviewforge.resume.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.interviewforge.auth.entity.User;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "resumes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({
    "hibernateLazyInitializer",
    "handler"
})
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String filename;

    @Column(columnDefinition = "TEXT")
    private String rawText;

    private String status; // "PENDING", "PROCESSING", "COMPLETED", "FAILED"

    @Column(columnDefinition = "TEXT")
    private String errorMessage;

    private Integer atsScore;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private LocalDateTime createdAt;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "resume_strengths", joinColumns = @JoinColumn(name = "resume_id"))
    @Column(name = "strength", columnDefinition = "TEXT")
    @Builder.Default
    private List<String> strengths = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "resume_weaknesses", joinColumns = @JoinColumn(name = "resume_id"))
    @Column(name = "weakness", columnDefinition = "TEXT")
    @Builder.Default
    private List<String> weaknesses = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "resume_missing_skills", joinColumns = @JoinColumn(name = "resume_id"))
    @Column(name = "missing_skill", columnDefinition = "TEXT")
    @Builder.Default
    private List<String> missingSkills = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "resume_improvements", joinColumns = @JoinColumn(name = "resume_id"))
    @Column(name = "improvement", columnDefinition = "TEXT")
    @Builder.Default
    private List<String> improvements = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "resume_suggested_projects", joinColumns = @JoinColumn(name = "resume_id"))
    @Column(name = "suggested_project", columnDefinition = "TEXT")
    @Builder.Default
    private List<String> suggestedProjects = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "resume_interview_questions", joinColumns = @JoinColumn(name = "resume_id"))
    @Column(name = "interview_question", columnDefinition = "TEXT")
    @Builder.Default
    private List<String> interviewQuestions = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "resume_learning_resources", joinColumns = @JoinColumn(name = "resume_id"))
    @Column(name = "learning_resource", columnDefinition = "TEXT")
    @Builder.Default
    private List<String> learningResources = new ArrayList<>();
}
