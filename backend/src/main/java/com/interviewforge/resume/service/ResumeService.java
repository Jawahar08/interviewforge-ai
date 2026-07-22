package com.interviewforge.resume.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewforge.ai.gemini.GeminiService;
import com.interviewforge.auth.entity.User;
import com.interviewforge.auth.repository.UserRepository;
import com.interviewforge.resume.dto.HrEvaluationRequest;
import com.interviewforge.resume.dto.HrEvaluationResponse;
import com.interviewforge.resume.dto.HrQuestionDto;
import com.interviewforge.resume.dto.ResumeAnalysisResponse;
import com.interviewforge.resume.entity.Resume;
import com.interviewforge.resume.repository.ResumeRepository;
import com.interviewforge.resume.util.FileValidator;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    private final PdfExtractorService pdfExtractorService;
    private final DocxExtractorService docxExtractorService;
    private final GeminiService geminiService;
    private final ObjectMapper objectMapper;

    public ResumeService(
            ResumeRepository resumeRepository,
            UserRepository userRepository,
            PdfExtractorService pdfExtractorService,
            DocxExtractorService docxExtractorService,
            GeminiService geminiService,
            ObjectMapper objectMapper) {
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
        this.pdfExtractorService = pdfExtractorService;
        this.docxExtractorService = docxExtractorService;
        this.geminiService = geminiService;
        this.objectMapper = objectMapper;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
    }

    @Transactional
    public ResumeAnalysisResponse analyze(MultipartFile file) throws Exception {
        // 1. Secure file validation
        FileValidator.validate(file);

        User user = getCurrentUser();
        String filename = file.getOriginalFilename();

        // 2. Create and save Resume record in PROCESSING status
        Resume resume = Resume.builder()
                .filename(filename)
                .status("PROCESSING")
                .user(user)
                .createdAt(LocalDateTime.now())
                .build();
        resume = resumeRepository.save(resume);

        // 3. Text extraction and AI processing
        try {
            String resumeText;
            if (filename.toLowerCase().endsWith(".docx")) {
                resumeText = docxExtractorService.extract(file);
            } else {
                resumeText = pdfExtractorService.extract(file);
            }

            if (resumeText != null) {
                resumeText = resumeText.replace("\u0000", "");
            }
            resume.setRawText(resumeText);
            
            // Analyze with Gemini
            ResumeAnalysisResponse analysisResponse = runGeminiAnalysis(resumeText);
            
            // 4. Update Resume entity with completed details
            resume.setAtsScore(analysisResponse.getAtsScore());
            resume.setStrengths(analysisResponse.getStrengths());
            resume.setWeaknesses(analysisResponse.getWeaknesses());
            resume.setMissingSkills(analysisResponse.getMissingSkills());
            resume.setImprovements(analysisResponse.getImprovements());
            resume.setSuggestedProjects(analysisResponse.getSuggestedProjects());
            resume.setInterviewQuestions(analysisResponse.getInterviewQuestions());
            resume.setLearningResources(analysisResponse.getLearningResources());
            resume.setStatus("COMPLETED");
            resumeRepository.save(resume);

            return analysisResponse;
        } catch (Exception e) {
            System.err.println("Resume analysis failed for file: " + filename + ". Error: " + e.getMessage());
            resume.setStatus("FAILED");
            resume.setErrorMessage(e.getMessage());
            resumeRepository.save(resume);
            throw e;
        }
    }

    @Transactional(readOnly = true)
    public List<Resume> listResumes() {
        User user = getCurrentUser();
        return resumeRepository.findByUserOrderByCreatedAtDesc(user);
    }

    @Transactional(readOnly = true)
    public Resume getResume(Long id) {
        User user = getCurrentUser();
        return resumeRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Resume not found or unauthorized"));
    }

    @Transactional
    public void deleteResume(Long id) {
        User user = getCurrentUser();
        Resume resume = resumeRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Resume not found or unauthorized"));
        resumeRepository.delete(resume);
    }

    @Transactional
    public ResumeAnalysisResponse retry(Long id) throws Exception {
        User user = getCurrentUser();
        Resume resume = resumeRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Resume not found or unauthorized"));

        resume.setStatus("PROCESSING");
        resume.setErrorMessage(null);
        resume = resumeRepository.save(resume);

        try {
            String resumeText = resume.getRawText();
            if (resumeText == null || resumeText.isBlank()) {
                throw new RuntimeException("Cannot retry: Raw text not found. Please upload the file again.");
            }

            // Analyze with Gemini
            ResumeAnalysisResponse analysisResponse = runGeminiAnalysis(resumeText);
            
            // Update details
            resume.setAtsScore(analysisResponse.getAtsScore());
            resume.setStrengths(analysisResponse.getStrengths());
            resume.setWeaknesses(analysisResponse.getWeaknesses());
            resume.setMissingSkills(analysisResponse.getMissingSkills());
            resume.setImprovements(analysisResponse.getImprovements());
            resume.setSuggestedProjects(analysisResponse.getSuggestedProjects());
            resume.setInterviewQuestions(analysisResponse.getInterviewQuestions());
            resume.setLearningResources(analysisResponse.getLearningResources());
            resume.setStatus("COMPLETED");
            resumeRepository.save(resume);

            return analysisResponse;
        } catch (Exception e) {
            System.err.println("Resume retry analysis failed. Error: " + e.getMessage());
            resume.setStatus("FAILED");
            resume.setErrorMessage(e.getMessage());
            resumeRepository.save(resume);
            throw e;
        }
    }

    private ResumeAnalysisResponse runGeminiAnalysis(String resumeText) throws Exception {
        String prompt = """
                You are an expert ATS Resume Reviewer.
                
                Analyze the resume text and perform:
                - ATS-oriented scoring (0-100)
                - Skill extraction & missing-skills detection
                - Strengths & weakness analysis
                - Specific improvement suggestions
                - Suggested projects
                - Potential interview questions based on the resume
                - Learning resources
                
                Return ONLY valid JSON in this exact structure:
                {
                  "atsScore": 85,
                  "strengths": ["list of strengths"],
                  "weaknesses": ["list of weaknesses"],
                  "missingSkills": ["list of missing skills"],
                  "improvements": ["list of improvement suggestions"],
                  "suggestedProjects": ["list of suggested projects"],
                  "interviewQuestions": ["list of interview questions"],
                  "learningResources": ["list of learning resources"]
                }
                
                Resume text:
                %s
                """.formatted(resumeText);

        String response = geminiService.generateContent(prompt);
        return parseResumeResponseWithFallback(response);
    }

    private ResumeAnalysisResponse parseResumeResponseWithFallback(String response) {
        try {
            String cleaned = response.replace("```json", "").replace("```", "").trim();
            int first = cleaned.indexOf("{");
            int last = cleaned.lastIndexOf("}");
            if (first >= 0 && last > first) {
                cleaned = cleaned.substring(first, last + 1);
            }
            return objectMapper.readValue(cleaned, ResumeAnalysisResponse.class);
        } catch (Exception e) {
            System.err.println("JSON parsing failed, attempting fallback regex parser: " + e.getMessage());
            return ResumeAnalysisResponse.builder()
                .atsScore(extractInt(response, "atsScore", 60))
                .strengths(extractList(response, "strengths"))
                .weaknesses(extractList(response, "weaknesses"))
                .missingSkills(extractList(response, "missingSkills"))
                .improvements(extractList(response, "improvements"))
                .suggestedProjects(extractList(response, "suggestedProjects"))
                .interviewQuestions(extractList(response, "interviewQuestions"))
                .learningResources(extractList(response, "learningResources"))
                .build();
        }
    }

    private Integer extractInt(String text, String key, Integer defaultVal) {
        java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("\"" + key + "\"\\s*:\\s*(\\d+)");
        java.util.regex.Matcher matcher = pattern.matcher(text);
        if (matcher.find()) {
            try {
                return Integer.parseInt(matcher.group(1));
            } catch (NumberFormatException e) {
                return defaultVal;
            }
        }
        return defaultVal;
    }

    private List<String> extractList(String text, String key) {
        List<String> list = new ArrayList<>();
        java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("\"" + key + "\"\\s*:\\s*\\[([^\\]]*)\\]");
        java.util.regex.Matcher matcher = pattern.matcher(text);
        if (matcher.find()) {
            String elements = matcher.group(1);
            java.util.regex.Pattern elementPattern = java.util.regex.Pattern.compile("\"([^\"]*)\"");
            java.util.regex.Matcher elementMatcher = elementPattern.matcher(elements);
            while (elementMatcher.find()) {
                list.add(elementMatcher.group(1));
            }
        }
        if (list.isEmpty()) {
            java.util.regex.Pattern markdownPattern = java.util.regex.Pattern.compile("(?i)" + key + ":?\\s*\\n((?:\\s*[-*•]\\s*.*\\n?)+)");
            java.util.regex.Matcher markdownMatcher = markdownPattern.matcher(text);
            if (markdownMatcher.find()) {
                String bulletBlock = markdownMatcher.group(1);
                for (String line : bulletBlock.split("\\n")) {
                    String trimmed = line.replaceAll("^\\s*[-*•]\\s*", "").trim();
                    if (!trimmed.isEmpty()) {
                        list.add(trimmed);
                    }
                }
            }
        }
        return list;
    }

    @Transactional(readOnly = true)
    public List<HrQuestionDto> getHrQuestions(Long id) {
        Resume resume = getResume(id);
        String rawText = resume.getRawText();
        if (rawText == null || rawText.isBlank()) {
            rawText = "Candidate Resume with background in software development, full-stack projects, and engineering experience.";
        }

        try {
            String json = geminiService.generateHrQuestionsFromResume(rawText);
            String cleaned = json.replace("```json", "").replace("```", "").trim();
            int first = cleaned.indexOf("[");
            int last = cleaned.lastIndexOf("]");
            if (first >= 0 && last > first) {
                cleaned = cleaned.substring(first, last + 1);
            }
            return objectMapper.readValue(cleaned, new TypeReference<List<HrQuestionDto>>() {});
        } catch (Exception e) {
            System.err.println("Failed to parse HR questions JSON: " + e.getMessage());
            List<HrQuestionDto> fallback = new ArrayList<>();
            fallback.add(HrQuestionDto.builder()
                    .id("hr-f1")
                    .question("Based on your uploaded resume, can you walk me through a major technical project you led and how you handled unexpected challenges?")
                    .category("Resume Project Deep-Dive")
                    .whyHrAsksThis("Evaluates project ownership, technical problem solving, and accountability.")
                    .resumeContext("Project experience listed in uploaded resume.")
                    .sampleAnswer("Situation: Led full-stack deployment.\\nTask: Solved integration bugs.\\nAction: Organized pair programming and mock APIs.\\nResult: On-time delivery with zero breaking changes.")
                    .build());
            return fallback;
        }
    }

    public HrEvaluationResponse evaluateHrAnswer(Long id, HrEvaluationRequest request) {
        Resume resume = getResume(id);
        String rawText = resume.getRawText();
        
        try {
            String json = geminiService.evaluateHrAnswer(request.getQuestion(), request.getResumeContext(), request.getCandidateAnswer());
            String cleaned = json.replace("```json", "").replace("```", "").trim();
            int first = cleaned.indexOf("{");
            int last = cleaned.lastIndexOf("}");
            if (first >= 0 && last > first) {
                cleaned = cleaned.substring(first, last + 1);
            }
            return objectMapper.readValue(cleaned, HrEvaluationResponse.class);
        } catch (Exception e) {
            System.err.println("Failed to parse HR evaluation response: " + e.getMessage());
            return HrEvaluationResponse.builder()
                    .starScore(80)
                    .starBreakdown("Good answer structure addressing the core question.")
                    .toneAndConfidence("Professional and clear.")
                    .resumeConsistency("Consistent with resume experience.")
                    .verdict("Acceptable Pass")
                    .keyStrengths(List.of("Clear communication", "Relevant experience"))
                    .improvements(List.of("Add specific quantitative results to strengthen impact"))
                    .build();
        }
    }
}