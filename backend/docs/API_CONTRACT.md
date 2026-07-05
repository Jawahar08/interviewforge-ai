# InterviewForge AI - Backend API Contract

**Base URL**

http://localhost:8080/api/v1

---

# Standard Response Format

Every successful API returns

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

Every failed request returns

```json
{
  "success": false,
  "message": "Error message"
}
```

---

# Authentication Module

## Register User

POST /auth/register

### Request

```json
{
  "name": "Jawahar Bharathi",
  "email": "jawahar@gmail.com",
  "password": "Password@123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "...",
    "name": "...",
    "email": "..."
  }
}
```

---

## Login

POST /auth/login

### Request

```json
{
  "email": "jawahar@gmail.com",
  "password": "Password@123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "JWT_TOKEN"
  }
}
```

---

# User Profile Module

## Get Current User

GET /profile

Authorization Required

### Response

```json
{
  "success": true,
  "message": "Profile fetched successfully",
  "data": {
    "id": "...",
    "name": "...",
    "email": "...",
    "createdAt": "..."
  }
}
```

---

# Resume Analyzer Module

## Analyze Resume

POST /resume/analyze

Content-Type

multipart/form-data

### Request

Resume PDF

### Response

```json
{
  "success": true,
  "message": "Resume analyzed successfully",
  "data": {
    "atsScore": 86,
    "strengths": [],
    "weaknesses": [],
    "missingSkills": [],
    "improvementSuggestions": []
  }
}
```

---

# Learning Roadmap Module

## Generate Learning Roadmap

POST /roadmap/generate

### Request

```json
{
  "careerGoal": "Java Backend Developer",
  "experienceLevel": "Intermediate"
}
```

### Response

```json
{
  "success": true,
  "message": "Roadmap generated successfully",
  "data": {
    "title": "...",
    "weeks": []
  }
}
```

---

# AI Mock Interview Module

## Start Interview

POST /mock-interview/start

### Request

```json
{
  "role": "Java Backend Developer",
  "difficulty": "Medium",
  "numberOfQuestions": 5
}
```

### Response

```json
{
  "success": true,
  "message": "Interview started successfully",
  "data": {
    "sessionId": "...",
    "question": "...",
    "questionNumber": 1,
    "totalQuestions": 5
  }
}
```

---

## Submit Answer

POST /mock-interview/{sessionId}/answer

### Request

```json
{
  "answer": "..."
}
```

### Response

```json
{
  "success": true,
  "message": "Answer evaluated successfully",
  "data": {
    "score": 8,
    "feedback": "...",
    "nextQuestion": "...",
    "completed": false
  }
}
```

---

## Final Interview Report

GET /mock-interview/{sessionId}/report

### Response

```json
{
  "success": true,
  "message": "Interview report generated successfully",
  "data": {
    "overallScore": 82,
    "performance": "...",
    "recommendation": "...",
    "strengths": [],
    "weaknesses": [],
    "improvementPlan": [],
    "learningResources": []
  }
}
```

---

# Question Management Module

## Get Question

GET /questions/{id}

Authorization Required

---

# Answer Module

## Submit Coding Answer

POST /answers

Authorization Required

---

# Error Codes

| Status | Meaning |
|---------|----------|
|200|Success|
|201|Created|
|400|Validation Error|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|
|500|Internal Server Error|

---

# Authentication

JWT Bearer Token

Authorization

Bearer <token>

---

# Modules Completed

- Authentication
- Resume Analyzer
- AI Mock Interview
- User Profile

---

# Modules Planned

- Dashboard
- Coding Assessment
- Interview History
- Notifications
- Analytics
- Leaderboard
- Admin Panel
- Payment Module