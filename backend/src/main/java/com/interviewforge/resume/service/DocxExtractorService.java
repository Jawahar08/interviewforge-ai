package com.interviewforge.resume.service;

import java.io.IOException;

import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class DocxExtractorService {

    public String extract(MultipartFile file)
            throws IOException {

        XWPFDocument document =
                new XWPFDocument(file.getInputStream());

        XWPFWordExtractor extractor =
                new XWPFWordExtractor(document);

        String text = extractor.getText();

        extractor.close();
        document.close();

        return text;
    }
}