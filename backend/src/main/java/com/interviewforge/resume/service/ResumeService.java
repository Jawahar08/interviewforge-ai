package com.interviewforge.resume.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewforge.ai.gemini.GeminiService;
import com.interviewforge.resume.dto.ResumeAnalysisResponse;
@Service
public class ResumeService {
    private final ObjectMapper objectMapper;
    private final PdfExtractorService pdfExtractorService;
    private final GeminiService geminiService;

    public ResumeService(
        GeminiService geminiService,
        PdfExtractorService pdfExtractorService,
        ObjectMapper objectMapper) {

    this.geminiService = geminiService;
    this.pdfExtractorService = pdfExtractorService;
    this.objectMapper = objectMapper;
}

    public ResumeAnalysisResponse analyze(
            MultipartFile file) throws Exception {

        String resumeText = pdfExtractorService.extract(file);

System.out.println("===== RESUME TEXT =====");
System.out.println(resumeText);
System.out.println("=======================");

        String prompt = """
You are an expert ATS Resume Reviewer.

Analyze the resume.

Return ONLY valid JSON.

{
  "atsScore":0,
  "strengths":[],
  "weaknesses":[],
  "missingSkills":[],
  "improvements":[],
  "suggestedProjects":[],
  "interviewQuestions":[],
  "learningResources":[]
}

Resume:

%s
""".formatted(resumeText);

        String response =
                geminiService.generateContent(prompt);
                System.out.println("========== GEMINI RESPONSE ==========");
System.out.println(response);
System.out.println("=====================================");

        System.out.println(response);

        response = response
        .replace("```json", "")
        .replace("```", "")
        .trim();

int first = response.indexOf("{");
int last = response.lastIndexOf("}");

response = response.substring(first, last + 1);

return objectMapper.readValue(
        response,
        ResumeAnalysisResponse.class
);
    }
}