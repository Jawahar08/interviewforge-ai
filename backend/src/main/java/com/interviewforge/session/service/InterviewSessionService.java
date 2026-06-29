package com.interviewforge.session.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.interviewforge.common.exception.SessionNotFoundException;
import com.interviewforge.interview.entity.Interview;
import com.interviewforge.interview.repository.InterviewRepository;
import com.interviewforge.session.dto.InterviewSessionResponse;
import com.interviewforge.session.entity.InterviewSession;
import com.interviewforge.session.entity.SessionStatus;
import com.interviewforge.session.repository.InterviewSessionRepository;

@Service
public class InterviewSessionService {

    private final InterviewSessionRepository sessionRepository;
    private final InterviewRepository interviewRepository;

    

    public InterviewSessionService(
            InterviewSessionRepository sessionRepository,
            InterviewRepository interviewRepository) {

        this.sessionRepository = sessionRepository;
        this.interviewRepository = interviewRepository;
    }

    public InterviewSessionResponse startSession(Long interviewId) {
        

        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() ->
                        new RuntimeException("Interview not found"));

        InterviewSession session = InterviewSession.builder()
                .interview(interview)
                .startedAt(LocalDateTime.now())
                .status(SessionStatus.IN_PROGRESS)
                .build();
                InterviewSession savedSession = sessionRepository.save(session);

return new InterviewSessionResponse(
        savedSession.getId(),
        savedSession.getInterview().getId(),
        savedSession.getStatus().name()
);

       
    }
    public InterviewSessionResponse getSessionById(Long id) {

    InterviewSession session = sessionRepository.findById(id)
            .orElseThrow(() ->
                    new SessionNotFoundException(id));

    return new InterviewSessionResponse(
            session.getId(),
            session.getInterview().getId(),
            session.getStatus().name()
    );
}

public InterviewSessionResponse completeSession(Long id) {

    InterviewSession session = sessionRepository.findById(id)
            .orElseThrow(() ->
                    new SessionNotFoundException(id));

    session.setStatus(SessionStatus.COMPLETED);

    InterviewSession updatedSession =
            sessionRepository.save(session);

    return new InterviewSessionResponse(
            updatedSession.getId(),
            updatedSession.getInterview().getId(),
            updatedSession.getStatus().name()
    );
}
}