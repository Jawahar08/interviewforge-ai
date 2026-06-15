# 🚀 InterviewForge AI

An AI-Powered Interview Preparation Platform built using Spring Boot, PostgreSQL, JWT Authentication, and Gemini AI.

InterviewForge helps candidates prepare for technical interviews through AI-generated questions, interview session management, answer evaluation, performance tracking, and personalized feedback.

---

## 📌 Project Status

### Current Progress: Day 16

✅ Authentication Module

✅ Interview Management

✅ Question Management

✅ AI Question Generation (Mock)

✅ Interview Session Management

✅ Interview Results Module

✅ Dashboard Analytics

✅ Answer Submission Module

✅ Gemini Evaluation Layer

🚧 Real Gemini API Integration

🚧 Resume Analysis

🚧 Performance Reports

🚧 Frontend Integration

---

# 🏗️ Tech Stack

## Backend

* Java 21
* Spring Boot 3
* Spring Security
* Spring Data JPA
* Hibernate
* PostgreSQL
* JWT Authentication
* Lombok
* Maven

## AI

* Google Gemini API (Integration Ready)

## API Documentation

* Swagger UI
* OpenAPI 3

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
├── security
├── config
└── exception
```

---

# ✨ Features Implemented

## 🔐 Authentication

* User Registration
* User Login
* JWT Token Generation
* Route Protection

Endpoints:

POST /api/v1/auth/register

POST /api/v1/auth/login

---

## 📋 Interview Management

* Create Interview
* View Interviews
* Update Interview
* Delete Interview
* User Ownership Support

Endpoints:

POST /api/v1/interviews

GET /api/v1/interviews

GET /api/v1/interviews/{id}

PUT /api/v1/interviews/{id}

DELETE /api/v1/interviews/{id}

---

## ❓ Question Management

* Create Questions
* Retrieve Questions
* Delete Questions
* Interview Mapping

Endpoints:

POST /api/v1/questions

GET /api/v1/questions

GET /api/v1/questions/{id}

DELETE /api/v1/questions/{id}

---

## 🤖 AI Question Generator

Endpoint:

POST /api/v1/ai/generate

Current Status:

* Mock Implementation Complete
* Ready for Gemini Integration

---

## 🎯 Interview Sessions

Features:

* Start Session
* Retrieve Session
* Complete Session
* Status Tracking

Endpoints:

POST /api/v1/sessions/start

GET /api/v1/sessions/{id}

PATCH /api/v1/sessions/{id}/complete

---

## 📝 Answer Management

Features:

* Submit Candidate Answers
* Store Responses
* Session Mapping
* Question Mapping

Endpoint:

POST /api/v1/answers

---

## 🧠 AI Answer Evaluation

Features:

* Evaluate Submitted Answers
* Generate Scores
* Generate Feedback
* Gemini Service Integration

Endpoint:

POST /api/v1/answers/evaluate

Current Status:

* Mock Evaluation Working
* Gemini Service Layer Implemented
* Real API Calls Coming Next

---

## 📊 Dashboard Analytics

Endpoint:

GET /api/v1/dashboard

Metrics:

* Total Interviews
* Total Questions
* Total Sessions
* Completed Sessions
* Average Score

---

## 🗄️ Database Tables

Current Entities:

* User
* Interview
* Question
* InterviewSession
* InterviewResult
* Answer

---

## 🔒 Security

Implemented:

* JWT Authentication
* Password Encryption (BCrypt)
* Protected APIs
* Role-Based Foundation

Environment Variables:

```properties
DB_PASSWORD=${DB_PASSWORD}
JWT_SECRET=${JWT_SECRET}
GEMINI_API_KEY=${GEMINI_API_KEY}
```

---

## 📖 Swagger Documentation

```text
http://localhost:8080/swagger-ui/index.html
```

---

## 🚀 Running the Project

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
./mvnw spring-boot:run
```

Windows

```bash
mvnw.cmd spring-boot:run
```

---

# 📈 Development Progress

| Phase                   | Status |
| ----------------------- | ------ |
| Authentication          | ✅      |
| Interview Module        | ✅      |
| Question Module         | ✅      |
| AI Question Generator   | ✅      |
| Session Management      | ✅      |
| Result Management       | ✅      |
| Dashboard Analytics     | ✅      |
| Answer Management       | ✅      |
| Gemini Evaluation Layer | ✅      |
| Real Gemini API Calls   | 🚧     |
| Resume Analysis         | 🚧     |
| Frontend Development    | 🚧     |
| Deployment              | 🚧     |

---

# 🎯 Next Milestone

### Day 17

* Real Gemini API Calls
* AI-Based Answer Evaluation
* Dynamic Scoring
* Detailed Feedback Generation

---

## 👨‍💻 Author

Jawahar Bharathi

Full Stack Developer

Building InterviewForge AI to help candidates prepare smarter interviews with AI-powered evaluation and feedback.
