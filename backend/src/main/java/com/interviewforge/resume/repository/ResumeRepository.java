package com.interviewforge.resume.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.interviewforge.auth.entity.User;
import com.interviewforge.resume.entity.Resume;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
    List<Resume> findByUserOrderByCreatedAtDesc(User user);
    Optional<Resume> findByIdAndUser(Long id, User user);
}
