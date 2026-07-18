package com.interviewforge.resume.util;

import org.springframework.web.multipart.MultipartFile;

public class FileValidator {
    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    public static void validate(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File must not be empty");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("File size must not exceed 5MB");
        }

        String filename = file.getOriginalFilename();
        if (filename == null) {
            throw new IllegalArgumentException("Filename must not be null");
        }

        String lowercaseFilename = filename.toLowerCase();
        if (!lowercaseFilename.endsWith(".pdf") && !lowercaseFilename.endsWith(".docx")) {
            throw new IllegalArgumentException("Only PDF and DOCX files are allowed");
        }
    }
}
