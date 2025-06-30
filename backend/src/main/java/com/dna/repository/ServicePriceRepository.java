package com.dna.repository;

import com.dna.entity.SurchargePrice;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicePriceRepository extends JpaRepository<SurchargePrice, Integer> {
    // Removed the incorrect method findByService_ServiceID
    // SurchargePrice doesn't have a direct relationship with Service
    // The relationship is through IncludeSurcharge table
} 