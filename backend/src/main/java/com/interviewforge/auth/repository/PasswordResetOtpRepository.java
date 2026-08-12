package com.interviewforge.auth.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import com.interviewforge.auth.entity.PasswordResetOtp;

public interface PasswordResetOtpRepository extends JpaRepository<PasswordResetOtp, UUID> {

    Optional<PasswordResetOtp> findTopByEmailIgnoreCaseOrderByCreatedAtDesc(String email);

    @Transactional
    @Modifying
    void deleteByEmailIgnoreCase(String email);
}
