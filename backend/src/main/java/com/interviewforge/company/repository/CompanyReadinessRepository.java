package com.interviewforge.company.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.interviewforge.company.entity.CompanyReadiness;

public interface CompanyReadinessRepository
        extends JpaRepository<CompanyReadiness,Long>{

    List<CompanyReadiness> findByUserId(UUID userId);

}