package com.dna.repository;

import com.dna.entity.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceEntity, Integer> {
    List<ServiceEntity> findByServiceNameAndServiceType(String serviceName, String serviceType);
    List<ServiceEntity> findByServiceType(String serviceType);
    List<ServiceEntity> findByStatus(String status);
    Optional<ServiceEntity> findByServiceName(String serviceName);
}