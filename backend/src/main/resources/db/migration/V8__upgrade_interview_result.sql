ALTER TABLE interview_results
DROP COLUMN score;

ALTER TABLE interview_results
DROP COLUMN feedback;

ALTER TABLE interview_results
ADD COLUMN overall_score DOUBLE PRECISION;

ALTER TABLE interview_results
ADD COLUMN technical_score DOUBLE PRECISION;

ALTER TABLE interview_results
ADD COLUMN communication_score DOUBLE PRECISION;

ALTER TABLE interview_results
ADD COLUMN confidence_score DOUBLE PRECISION;

ALTER TABLE interview_results
ADD COLUMN recommendation TEXT;

ALTER TABLE interview_results
ADD COLUMN summary TEXT;