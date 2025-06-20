package com.bloodline.bloodline_backend.repository;

import com.bloodline.bloodline_backend.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Integer> {
    List<Service> findByServiceNameAndTypeOfService(String serviceName, String typeOfService);
    List<Service> findByTypeOfService(String typeOfService);
    List<Service> findByStatus(String status);
    Optional<Service> findByServiceName(String serviceName);
} 