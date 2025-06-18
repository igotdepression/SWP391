package com.bloodline.bloodline_backend.repository;

import com.bloodline.bloodline_backend.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Integer> {
} 