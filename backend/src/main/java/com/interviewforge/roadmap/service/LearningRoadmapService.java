package com.interviewforge.roadmap.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewforge.ai.gemini.GeminiService;
import com.interviewforge.roadmap.dto.LearningRoadmapRequest;
import com.interviewforge.roadmap.dto.LearningRoadmapResponse;

@Service
public class LearningRoadmapService {

    private final GeminiService geminiService;
    private final ObjectMapper objectMapper;

    public LearningRoadmapService(
            GeminiService geminiService,
            ObjectMapper objectMapper) {

        this.geminiService = geminiService;
        this.objectMapper = objectMapper;
    }

    public LearningRoadmapResponse generateRoadmap(
            LearningRoadmapRequest request) throws Exception {

        String prompt = """
You are an expert software engineering mentor.

Create a personalized learning roadmap.

Return ONLY valid JSON.

Format:

{
  "title":"",
  "overallScore":0,
  "estimatedDuration":"",
  "weeks":[
    {
      "week":1,
      "topic":"",
      "tasks":[]
    }
  ],
  "projects":[
    {
      "title":"",
      "description":"",
      "keyTechnologies":[]
    }
  ],
  "resources":[
    {
      "name":"",
      "type":"",
      "url":""
    }
  ]
}

For resources use ONLY this structure:

{
  "name":"",
  "type":"",
  "url":""
}

Do NOT return resources as strings.
Do NOT return category headings.
Every resource must be a JSON object.

For projects use ONLY:

{
  "title":"",
  "description":"",
  "keyTechnologies":[]
}

Do NOT use "technologies". Use "keyTechnologies" only.

Return ONLY valid JSON.
No markdown.
No explanation.
No code fences.

Target Role:
%s

Experience:
%s

Resume:
%s
"""
.formatted(
        request.getTargetRole(),
        request.getExperience(),
        request.getResumeText());

        String response = geminiService.generateContent(prompt);

System.out.println("RAW GEMINI RESPONSE:");
System.out.println(response);

// Remove markdown
response = response
        .replace("```json", "")
        .replace("```", "")
        .trim();

// Extract JSON
int first = response.indexOf("{");
int last = response.lastIndexOf("}");

response = response.substring(first, last + 1);

return objectMapper.readValue(
        response,
        LearningRoadmapResponse.class
);
    }
}