# InterviewForge AI

AI-powered interview preparation platform built with Spring Boot, PostgreSQL, JWT Authentication, and REST APIs.

## Features

### Authentication Module

* User Registration
* User Login
* JWT Token Generation
* Password Encryption using BCrypt
* Protected API Endpoints
* Role-Based User Entity

### Interview Management

* Create Interview
* Get All User Interviews
* Get Interview By ID
* Update Interview
* Delete Interview
* Interview Ownership Validation
* JWT Protected Interview APIs

### Question Management

* Create Question
* Get All Questions
* Get Question By ID
* Delete Question
* Question to Interview Mapping
* JPA Entity Relationships

---

## Tech Stack

### Backend

* Java 21
* Spring Boot 3
* Spring Security
* Spring Data JPA
* Hibernate
* JWT Authentication
* PostgreSQL
* Maven
* Lombok

### API Documentation

* Swagger OpenAPI 3

---

## Database Schema

### Users

| Field         | Type   |
| ------------- | ------ |
| id            | UUID   |
| full_name     | String |
| email         | String |
| password_hash | String |
| role          | String |

### Interviews

| Field      | Type          |
| ---------- | ------------- |
| id         | Long          |
| title      | String        |
| role       | String        |
| difficulty | String        |
| created_at | LocalDateTime |
| user_id    | UUID          |

### Questions

| Field         | Type   |
| ------------- | ------ |
| id            | Long   |
| question_text | String |
| answer        | Text   |
| category      | String |
| difficulty    | String |
| interview_id  | Long   |

---

## Entity Relationships

User (1) ----> (Many) Interviews

Interview (1) ----> (Many) Questions

---

## API Endpoints

### Authentication

POST /api/v1/auth/register

POST /api/v1/auth/login

### Interviews

GET /api/v1/interviews

GET /api/v1/interviews/{id}

POST /api/v1/interviews

PUT /api/v1/interviews/{id}

DELETE /api/v1/interviews/{id}

### Questions

GET /api/v1/questions

GET /api/v1/questions/{id}

POST /api/v1/questions

DELETE /api/v1/questions/{id}

---

## Current Progress

### Completed

* JWT Authentication
* User Registration & Login
* Global Exception Handling
* Input Validation
* Interview CRUD
* Interview Ownership Security
* Question Module
* Swagger Documentation
* PostgreSQL Integration

### In Progress

* AI Question Generation
* Interview Session Module
* Answer Evaluation Engine
* Dashboard Analytics

---

## Author

Jawahar Bharathi

Aspiring Full Stack Developer building InterviewForge AI as a portfolio-grade SaaS project.
