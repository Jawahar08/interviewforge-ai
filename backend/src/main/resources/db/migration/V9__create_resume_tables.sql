-- Create resumes table
CREATE TABLE resumes (
    id BIGSERIAL PRIMARY KEY,
    filename VARCHAR(255),
    raw_text TEXT,
    status VARCHAR(50),
    error_message TEXT,
    ats_score INTEGER,
    user_id UUID NOT NULL,
    created_at TIMESTAMP,
    CONSTRAINT fk_resumes_user FOREIGN KEY(user_id) REFERENCES user_details(id) ON DELETE CASCADE
);

-- Create resume strengths collection table
CREATE TABLE resume_strengths (
    resume_id BIGINT NOT NULL,
    strength TEXT,
    CONSTRAINT fk_resume_strengths_resume FOREIGN KEY(resume_id) REFERENCES resumes(id) ON DELETE CASCADE
);

-- Create resume weaknesses collection table
CREATE TABLE resume_weaknesses (
    resume_id BIGINT NOT NULL,
    weakness TEXT,
    CONSTRAINT fk_resume_weaknesses_resume FOREIGN KEY(resume_id) REFERENCES resumes(id) ON DELETE CASCADE
);

-- Create resume missing skills collection table
CREATE TABLE resume_missing_skills (
    resume_id BIGINT NOT NULL,
    missing_skill TEXT,
    CONSTRAINT fk_resume_missing_skills_resume FOREIGN KEY(resume_id) REFERENCES resumes(id) ON DELETE CASCADE
);

-- Create resume improvements collection table
CREATE TABLE resume_improvements (
    resume_id BIGINT NOT NULL,
    improvement TEXT,
    CONSTRAINT fk_resume_improvements_resume FOREIGN KEY(resume_id) REFERENCES resumes(id) ON DELETE CASCADE
);

-- Create resume suggested projects collection table
CREATE TABLE resume_suggested_projects (
    resume_id BIGINT NOT NULL,
    suggested_project TEXT,
    CONSTRAINT fk_resume_suggested_projects_resume FOREIGN KEY(resume_id) REFERENCES resumes(id) ON DELETE CASCADE
);

-- Create resume interview questions collection table
CREATE TABLE resume_interview_questions (
    resume_id BIGINT NOT NULL,
    interview_question TEXT,
    CONSTRAINT fk_resume_interview_questions_resume FOREIGN KEY(resume_id) REFERENCES resumes(id) ON DELETE CASCADE
);

-- Create resume learning resources collection table
CREATE TABLE resume_learning_resources (
    resume_id BIGINT NOT NULL,
    learning_resource TEXT,
    CONSTRAINT fk_resume_learning_resources_resume FOREIGN KEY(resume_id) REFERENCES resumes(id) ON DELETE CASCADE
);
