# 🚀 InterviewForge AI

An AI-Powered Interview Preparation Platform built using Spring Boot, PostgreSQL, JWT Authentication, Resume Analysis, and AI-driven Interview Evaluation.

InterviewForge helps candidates prepare for technical interviews through interview simulations, answer evaluations, performance tracking, resume analysis, role recommendations, and personalized feedback.

---

# 📌 Project Status

### Current Progress: Day 27

✅ Authentication Module

✅ Interview Management

✅ Question Management

✅ AI Question Generation

✅ Interview Session Management

✅ Interview Results Module

✅ Dashboard Analytics

✅ Answer Submission Module

✅ Answer Evaluation Module

✅ Gemini Integration Infrastructure

✅ Performance Reporting Module

✅ Resume Analysis Module

✅ Resume Upload Module

✅ PDF Resume Text Extraction

✅ AI-Style Resume Analysis

✅ User Profile Module

✅ Role Recommendation Engine

✅ Interview History Module

✅ Advanced Statistics Module

🚧 API Documentation Cleanup

🚧 Dockerization

🚧 Production Deployment

---

# 🏗️ Tech Stack

## Backend

- Java 21+
- Spring Boot 3
- Spring Security
- Spring Data JPA
- Hibernate
- PostgreSQL
- JWT Authentication
- Lombok
- Maven

## AI Layer

- Gemini Integration Ready
- Mock AI Evaluation Engine
- Resume Analysis Engine
- Role Recommendation Engine

## Documentation

- Swagger UI
- OpenAPI 3

---

# 📂 Project Structure

```text
backend
│
├── auth
├── interview
├── question
├── session
├── answer
├── result
├── dashboard
├── ai
│   └── gemini
├── resume
├── profile
├── recommendation
├── history
├── statistics
├── report
├── security
├── config
└── exception
```

---

# ✨ Features Implemented

## 🔐 Authentication

### Features

- User Registration
- User Login
- JWT Token Generation
- Protected Endpoints

### Endpoints

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
```

---

## 📋 Interview Management

### Features

- Create Interview
- Get Interview
- Update Interview
- Delete Interview

### Endpoints

```http
POST /api/v1/interviews
GET /api/v1/interviews
GET /api/v1/interviews/{id}
PUT /api/v1/interviews/{id}
DELETE /api/v1/interviews/{id}
```

---

## ❓ Question Management

### Features

- Create Questions
- Retrieve Questions
- Delete Questions
- Interview Association

### Endpoints

```http
POST /api/v1/questions
GET /api/v1/questions
GET /api/v1/questions/{id}
DELETE /api/v1/questions/{id}
```

---

## 🤖 AI Question Generation

### Features

- Generate Interview Questions
- AI Integration Layer Ready

### Endpoint

```http
POST /api/v1/ai/generate
```

---

## 🎯 Interview Sessions

### Features

- Start Session
- Complete Session
- Track Session Status

### Endpoints

```http
POST /api/v1/sessions/start
GET /api/v1/sessions/{id}
PATCH /api/v1/sessions/{id}/complete
```

---

## 📝 Answer Management

### Features

- Submit Answers
- Store Responses
- Question Mapping

### Endpoint

```http
POST /api/v1/answers
```

---

## 🧠 Answer Evaluation

### Features

- Evaluate Answers
- Generate Score
- Generate Feedback
- Gemini Service Layer Ready

### Endpoint

```http
POST /api/v1/answers/evaluate
```

---

## 📊 Dashboard Analytics

### Features

- Total Interviews
- Total Questions
- Total Sessions
- Average Score

### Endpoint

```http
GET /api/v1/dashboard
```

---

## 📈 Performance Reports

### Features

- Overall Interview Score
- Strengths
- Weaknesses
- Recommendations

### Endpoint

```http
GET /api/v1/reports
```

---

## 📄 Resume Analysis

### Features

- Resume Text Analysis
- Strength Detection
- Skill Gap Detection
- Career Recommendations

### Endpoint

```http
POST /api/v1/resume/analyze
```

---

## 📤 Resume Upload

### Features

- PDF Upload Support
- Resume File Validation

### Endpoint

```http
POST /api/v1/resume/upload
```

---

## 📚 PDF Resume Extraction

### Features

- PDF Parsing
- Resume Text Extraction
- Apache PDFBox Integration

### Endpoint

```http
POST /api/v1/resume/extract
```

---

## 🤖 AI Resume Analysis

### Features

- Dynamic Resume Evaluation
- Skill Identification
- Missing Skill Detection
- Personalized Recommendations

### Endpoint

```http
POST /api/v1/resume/analyze-pdf
```

---

## 👤 User Profile

### Features

- User Profile Information
- Career Goal Tracking

### Endpoint

```http
GET /api/v1/profile
```

---

## 💼 Role Recommendation Engine

### Features

- Resume-Based Role Suggestions
- Skill-Based Matching

### Endpoint

```http
POST /api/v1/recommendations
```

### Example Roles

- Backend Developer
- Frontend Developer
- Full Stack Developer
- AI/ML Engineer

---

## 📜 Interview History

### Features

- Previous Sessions
- Status Tracking
- Historical Scores

### Endpoint

```http
GET /api/v1/history
```

---

## 📊 Advanced Statistics

### Features

- Total Sessions
- Completed Sessions
- Average Score
- Success Rate

### Endpoint

```http
GET /api/v1/statistics
```

---

# 🗄️ Database Entities

Current Tables

- User
- Interview
- Question
- InterviewSession
- InterviewResult
- Answer

---

# 🔒 Security

Implemented:

- JWT Authentication
- BCrypt Password Encoding
- Protected APIs
- Custom JWT Filter

Environment Variables:

```properties
DB_PASSWORD=${DB_PASSWORD}
JWT_SECRET=${JWT_SECRET}
GEMINI_API_KEY=${GEMINI_API_KEY:test-key}
```

---

# 📖 Swagger Documentation

```text
http://localhost:8080/swagger-ui/index.html
```

---

# 🚀 Running The Project

Clone Repository

```bash
git clone https://github.com/Jawahar08/interviewforge-ai.git
```

Navigate

```bash
cd interviewforge-ai/backend
```

Run

```bash
mvn spring-boot:run
```

Build

```bash
mvn clean install
```

---

# 📈 Development Progress

| Module | Status |
|----------|----------|
| Authentication | ✅ |
| Interview Management | ✅ |
| Question Management | ✅ |
| AI Question Generation | ✅ |
| Session Management | ✅ |
| Results Module | ✅ |
| Dashboard Analytics | ✅ |
| Answer Submission | ✅ |
| Answer Evaluation | ✅ |
| Performance Reports | ✅ |
| Resume Analysis | ✅ |
| Resume Upload | ✅ |
| PDF Text Extraction | ✅ |
| AI Resume Analysis | ✅ |
| User Profile | ✅ |
| Role Recommendation Engine | ✅ |
| Interview History | ✅ |
| Advanced Statistics | ✅ |
| API Documentation Cleanup | 🚧 |
| Dockerization | 🚧 |
| Deployment | 🚧 |

---

# 🎯 Next Milestones

### Day 28

- API Cleanup
- Standard Response Wrapper
- Exception Handling Improvements
- Swagger Documentation Enhancement

### Day 29

- Dockerization
- Docker Compose
- PostgreSQL Container

### Day 30

- Deployment Preparation
- Production Configuration
- Environment Management

---

# 👨‍💻 Author

### Jawahar Bharathi

Full Stack Developer | AI & Software Engineering Enthusiast

Building InterviewForge AI to help students prepare for interviews through intelligent evaluation, resume analysis, and personalized career guidance.

---

## ⭐ Current Backend Completion

### ~97% Complete

Remaining:

- API Cleanup
- Dockerization
- Deployment

InterviewForge has evolved from a simple interview practice system into a complete AI-powered interview preparation and career guidance platform.