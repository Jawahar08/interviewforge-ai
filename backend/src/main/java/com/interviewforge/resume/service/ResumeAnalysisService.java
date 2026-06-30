package com.interviewforge.resume.service;

import java.io.IOException;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.interviewforge.ai.gemini.GeminiService;
import com.interviewforge.resume.dto.ResumeAnalysisResponse;
import com.interviewforge.resume.parser.GeminiResumeParser;

@Service
public class ResumeAnalysisService {

    private final GeminiService geminiService;

    private final GeminiResumeParser parser;

    public ResumeAnalysisService(
            GeminiService geminiService,
            GeminiResumeParser parser) {

        this.geminiService = geminiService;
        this.parser = parser;
    }

    public ResumeAnalysisResponse analyzeResume(
            String resumeText) {

        String aiResponse =
                geminiService.analyzeResume(resumeText);

        return parser.parse(aiResponse);
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
}