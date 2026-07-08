package com.interviewforge.session.dto;

public record SessionQuestionResponse(
        Long id,
        String questionText,
        String category,
        String difficulty,
        int questionNumber,
        int totalQuestions
) {
}