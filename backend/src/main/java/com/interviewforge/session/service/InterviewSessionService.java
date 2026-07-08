package com.interviewforge.session.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.interviewforge.ai.service.AIQuestionService;
import com.interviewforge.common.exception.SessionNotFoundException;
import com.interviewforge.interview.entity.Interview;
import com.interviewforge.interview.repository.InterviewRepository;
import com.interviewforge.question.entity.Question;
import com.interviewforge.question.repository.QuestionRepository;
import com.interviewforge.session.dto.InterviewSessionResponse;
import com.interviewforge.session.dto.SessionQuestionResponse;
import com.interviewforge.session.dto.SessionQuestionsResponse;
import com.interviewforge.session.entity.InterviewSession;
import com.interviewforge.session.entity.SessionStatus;
import com.interviewforge.session.repository.InterviewSessionRepository;

@Service
public class InterviewSessionService {

    private static final int DEFAULT_QUESTION_COUNT = 5;

    private final InterviewSessionRepository sessionRepository;
    private final InterviewRepository interviewRepository;
    private final QuestionRepository questionRepository;
    private final AIQuestionService aiQuestionService;

    public InterviewSessionService(
            InterviewSessionRepository sessionRepository,
            InterviewRepository interviewRepository,
            QuestionRepository questionRepository,
            AIQuestionService aiQuestionService) {

        this.sessionRepository = sessionRepository;
        this.interviewRepository = interviewRepository;
        this.questionRepository = questionRepository;
        this.aiQuestionService = aiQuestionService;
    }

    @Transactional
    public InterviewSessionResponse startSession(Long interviewId) {

        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() ->
                        new RuntimeException("Interview not found"));

        InterviewSession session = InterviewSession.builder()
                .interview(interview)
                .startedAt(LocalDateTime.now())
                .status(SessionStatus.IN_PROGRESS)
                .build();

        InterviewSession savedSession =
                sessionRepository.save(session);

        return mapToResponse(savedSession);
    }

    @Transactional(readOnly = true)
    public InterviewSessionResponse getSessionById(Long id) {

        InterviewSession session = getSessionEntity(id);

        return mapToResponse(session);
    }

    @Transactional
    public InterviewSessionResponse completeSession(Long id) {

        InterviewSession session = getSessionEntity(id);

        session.setStatus(SessionStatus.COMPLETED);
        session.setEndedAt(LocalDateTime.now());

        InterviewSession updatedSession =
                sessionRepository.save(session);

        return mapToResponse(updatedSession);
    }

    @Transactional
    public SessionQuestionsResponse getSessionQuestions(
            Long sessionId) {

        InterviewSession session =
                getSessionEntity(sessionId);

        Interview interview = session.getInterview();

        Long interviewId = interview.getId();

        List<Question> questions =
                questionRepository
                        .findByInterviewIdOrderByIdAsc(
                                interviewId
                        );

        if (questions.isEmpty()) {

            questions = aiQuestionService.generateQuestions(
                    interviewId,
                    DEFAULT_QUESTION_COUNT
            );
        }

        List<SessionQuestionResponse> questionResponses =
                mapQuestions(questions);

        return new SessionQuestionsResponse(
                session.getId(),
                interviewId,
                session.getStatus().name(),
                questionResponses.size(),
                questionResponses
        );
    }

    private InterviewSession getSessionEntity(Long id) {

        return sessionRepository.findById(id)
                .orElseThrow(() ->
                        new SessionNotFoundException(id));
    }

    private InterviewSessionResponse mapToResponse(
            InterviewSession session) {

        return new InterviewSessionResponse(
                session.getId(),
                session.getInterview().getId(),
                session.getStatus().name()
        );
    }

    private List<SessionQuestionResponse> mapQuestions(
            List<Question> questions) {

        int totalQuestions = questions.size();

        return java.util.stream.IntStream
                .range(0, totalQuestions)
                .mapToObj(index -> {

                    Question question =
                            questions.get(index);

                    return new SessionQuestionResponse(
                            question.getId(),
                            question.getQuestionText(),
                            question.getCategory(),
                            question.getDifficulty(),
                            index + 1,
                            totalQuestions
                    );
                })
                .toList();
    }
}