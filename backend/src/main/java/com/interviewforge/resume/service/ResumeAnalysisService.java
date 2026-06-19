package com.interviewforge.resume.service;

import java.io.IOException;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.Loader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.interviewforge.resume.dto.ResumeAiAnalysisResponse;
import com.interviewforge.resume.dto.ResumeAnalysisResponse;


@Service
public class ResumeAnalysisService {

    public ResumeAnalysisResponse analyzeResume(
            String resumeText) {

        return new ResumeAnalysisResponse(
                "Spring Boot, PostgreSQL, REST APIs",
                "Docker, Kubernetes, System Design",
                "Focus on cloud deployment and system design concepts."
        );
    }
    public String extractTextFromPdf(
        MultipartFile file) {

    try {

        PDDocument document =
                Loader.loadPDF(file.getBytes());

        PDFTextStripper stripper =
                new PDFTextStripper();

        String text =
                stripper.getText(document);

        document.close();

        return text;

    } catch (IOException e) {

        throw new RuntimeException(
                "Failed to read PDF");
    }
}
public ResumeAiAnalysisResponse analyzeResumeText(
        String resumeText) {

    String strengths = "";
    String gaps = "";
    String recommendation = "";

    if (resumeText.toLowerCase().contains("java")) {
        strengths += "Java, ";
    }

    if (resumeText.toLowerCase().contains("spring")) {
        strengths += "Spring Boot, ";
    }

    if (resumeText.toLowerCase().contains("postgres")) {
        strengths += "PostgreSQL, ";
    }

    if (!resumeText.toLowerCase().contains("docker")) {
        gaps += "Docker, ";
    }

    if (!resumeText.toLowerCase().contains("kubernetes")) {
        gaps += "Kubernetes, ";
    }

    if (!resumeText.toLowerCase().contains("aws")) {
        gaps += "AWS, ";
    }

    recommendation =
            "Improve cloud deployment, containerization and system design skills.";

    return new ResumeAiAnalysisResponse(
            strengths,
            gaps,
            recommendation
    );
}
}
