package com.interviewforge.session.dto;

import java.util.List;

public record SessionQuestionsResponse(
        Long sessionId,
        Long interviewId,
        String status,
        int totalQuestions,
        List<SessionQuestionResponse> questions
) {
}