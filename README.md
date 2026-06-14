# 🚀 InterviewForge AI

An AI-Powered Interview Preparation Platform built with Spring Boot, PostgreSQL, JWT Authentication, and REST APIs.

InterviewForge helps candidates practice interviews, manage interview sessions, answer technical questions, and receive AI-powered feedback.

---

## 📌 Project Status

### Current Progress: Day 14

✅ Authentication Module

✅ Interview Management

✅ Question Management

✅ AI Question Generation (Mock Version)

✅ Interview Session Management

✅ Dashboard Analytics

✅ Answer Submission Module

🚧 AI Evaluation Engine

🚧 Resume Analysis

🚧 Performance Reports

🚧 Frontend Integration

---

# 🏗️ Tech Stack

## Backend

- Java 21
- Spring Boot 3
- Spring Security
- Spring Data JPA
- Hibernate
- PostgreSQL
- JWT Authentication
- Lombok
- Maven

## API Documentation

- Swagger UI
- OpenAPI 3

---

# 📂 Project Structure

```text
backend
│
├── auth
│   ├── controller
│   ├── dto
│   ├── entity
│   ├── repository
│   └── service
│
├── interview
│   ├── controller
│   ├── entity
│   ├── repository
│   └── service
│
├── question
│   ├── controller
│   ├── dto
│   ├── entity
│   ├── repository
│   └── service
│
├── ai
│   ├── controller
│   ├── dto
│   └── service
│
├── session
│   ├── controller
│   ├── dto
│   ├── entity
│   ├── repository
│   └── service
│
├── dashboard
│   ├── controller
│   ├── dto
│   └── service
│
├── answer
│   ├── controller
│   ├── dto
│   ├── entity
│   ├── repository
│   └── service
│
└── security
    ├── JwtService
    ├── JwtAuthenticationFilter
    └── SecurityConfig
```

---

# ✨ Features Implemented

## 🔐 Authentication

### Register User

POST

```http
/api/v1/auth/register
```

### Login User

POST

```http
/api/v1/auth/login
```

---

## 📋 Interview Management

### Create Interview

POST

```http
/api/v1/interviews
```

### Get All Interviews

GET

```http
/api/v1/interviews
```

### Get Interview By ID

GET

```http
/api/v1/interviews/{id}
```

### Update Interview

PUT

```http
/api/v1/interviews/{id}
```

### Delete Interview

DELETE

```http
/api/v1/interviews/{id}
```

---

## ❓ Question Management

### Create Question

POST

```http
/api/v1/questions
```

### Get Questions

GET

```http
/api/v1/questions
```

### Get Question By ID

GET

```http
/api/v1/questions/{id}
```

### Delete Question

DELETE

```http
/api/v1/questions/{id}
```

---

## 🤖 AI Question Generator

### Generate Questions

POST

```http
/api/v1/ai/generate
```

Generates interview questions based on the selected interview.

(Currently Mock Data)

---

## 🎯 Interview Sessions

### Start Session

POST

```http
/api/v1/sessions/start
```

### Get Session

GET

```http
/api/v1/sessions/{id}
```

### Complete Session

PATCH

```http
/api/v1/sessions/{id}/complete
```

---

## 📝 Answer Submission

### Submit Answer

POST

```http
/api/v1/answers
```

Stores candidate answers for evaluation.

---

## 📊 Dashboard Analytics

### Dashboard Statistics

GET

```http
/api/v1/dashboard
```

Returns:

- Total Interviews
- Total Questions
- Total Sessions
- Completed Sessions
- Average Score

---

# 🗄️ Database Tables

Current Tables:

- users
- interviews
- questions
- interview_sessions
- interview_results
- answers

---

# 📸 API Testing

All APIs are tested using:

- Swagger UI
- PostgreSQL
- Spring Boot REST Endpoints

Swagger:

```text
http://localhost:8080/swagger-ui/index.html
```

---

# 🚀 Running the Project

## Clone Repository

```bash
git clone https://github.com/Jawahar08/interviewforge-ai.git
```

## Navigate

```bash
cd interviewforge-ai/backend
```

## Run

```bash
./mvnw spring-boot:run
```

or on Windows

```bash
mvnw.cmd spring-boot:run
```

---

# 🎯 Upcoming Features

## Phase 2

- AI Answer Evaluation
- OpenAI Integration
- Resume Parsing
- Performance Reports
- Session Recovery
- User Dashboard UI
- React Frontend

---

# 📈 Development Progress

| Day | Module |
|------|----------|
| 1-3 | Project Setup |
| 4-5 | Authentication |
| 6-7 | Interview CRUD |
| 8 | Question CRUD |
| 9 | AI Question Generator |
| 10-11 | Interview Sessions |
| 12-13 | Dashboard Analytics |
| 14 | Answer Submission |
| Next | AI Evaluation Engine |

---

## 👨‍💻 Author

Jawahar Bharathi

Full Stack Developer

Building InterviewForge AI to help candidates practice smarter interviews with AI-driven feedback.