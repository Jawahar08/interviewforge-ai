package com.interviewforge.resume.parser;

import org.springframework.stereotype.Component;

import com.interviewforge.resume.dto.ResumeAnalysisResponse;

@Component
public class GeminiResumeParser {

    public ResumeAnalysisResponse parse(String response) {

        ResumeAnalysisResponse result =
                ResumeAnalysisResponse.builder()
                        .atsScore(0)
                        .summary("")
                        .strengths("")
                        .weaknesses("")
                        .missingSkills("")
                        .suggestions("")
                        .build();

        String[] lines = response.split("\n");

        for (String line : lines) {

            line = line.trim();

            if (line.startsWith("ATS Score")) {

                String score =
                        line.replaceAll("[^0-9]", "");

                if (!score.isEmpty()) {
                    result.setAtsScore(
                            Integer.parseInt(score));
                }

            } else if (line.startsWith("Summary")) {

                result.setSummary(
                        line.substring(
                                line.indexOf(":") + 1).trim());

            } else if (line.startsWith("Strengths")) {

                result.setStrengths(
                        line.substring(
                                line.indexOf(":") + 1).trim());

            } else if (line.startsWith("Weaknesses")) {

                result.setWeaknesses(
                        line.substring(
                                line.indexOf(":") + 1).trim());

            } else if (line.startsWith("Missing Skills")) {

                result.setMissingSkills(
                        line.substring(
                                line.indexOf(":") + 1).trim());

            } else if (line.startsWith("Suggestions")) {

                result.setSuggestions(
                        line.substring(
                                line.indexOf(":") + 1).trim());
            }

        }

        return result;
    }
}