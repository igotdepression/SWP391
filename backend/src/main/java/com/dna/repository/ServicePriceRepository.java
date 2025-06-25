package com.dna.repository;

import com.dna.entity.ServicePrice;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicePriceRepository extends JpaRepository<ServicePrice, Integer> {
    Optional<ServicePrice> findByService_ServiceID(Integer serviceId);
} 