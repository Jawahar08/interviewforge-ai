package com.interviewforge.resume.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HrQuestionDto {
    private String id;
    private String question;
    private String category;
    private String whyHrAsksThis;
    private String resumeContext;
    private String sampleAnswer;
}
