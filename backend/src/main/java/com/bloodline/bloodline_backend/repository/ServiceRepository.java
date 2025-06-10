package com.bloodline.bloodline_backend.repository;

import com.bloodline.bloodline_backend.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Integer> {
} 