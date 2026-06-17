package com.interviewforge.resume.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.interviewforge.resume.dto.ResumeAnalysisResponse;
import java.io.IOException;


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
                PDDocument.load(file.getBytes());

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
}
