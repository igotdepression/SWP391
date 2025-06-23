package com.dna.repository;

import com.dna.entity.Services;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<Services, Integer> {
    List<Services> findByServiceNameAndTypeOfService(String serviceName, String typeOfService);
    List<Services> findByTypeOfService(String typeOfService);
    List<Services> findByStatus(String status);
    Optional<Services> findByServiceName(String serviceName);
}