package com.bloodline.bloodline_backend.repository;

import com.bloodline.bloodline_backend.entity.Surcharge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurchargeRepository extends JpaRepository<Surcharge, Integer> {
} 