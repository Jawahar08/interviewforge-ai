package com.interviewforge.resume.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HrEvaluationRequest {
    private String question;
    private String resumeContext;
    private String candidateAnswer;
}
