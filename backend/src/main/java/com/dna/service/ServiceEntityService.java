package com.dna.service;

import com.dna.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dna.entity.ServiceEntity;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceEntityService {

    @Autowired
    private ServiceRepository serviceRepository;


    public List<ServiceEntity> getAllServices() {
        return serviceRepository.findAll();
    }

    public Optional<ServiceEntity> getServiceById(Integer id) {
        return serviceRepository.findById(id);
    }

    public ServiceEntity createService(ServiceEntity service) {
        return serviceRepository.save(service);
    }

    public ServiceEntity updateService(Integer id, ServiceEntity serviceDetails) {
        ServiceEntity service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found with id " + id));
        service.setServiceName(serviceDetails.getServiceName());
        service.setServiceType(serviceDetails.getServiceType());
        service.setPackageType(serviceDetails.getPackageType());
        service.setPrice(serviceDetails.getPrice());
        service.setStatus(serviceDetails.getStatus());
        return serviceRepository.save(service);
    }

    public void deleteService(Integer id) {
        ServiceEntity service = serviceRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Service not found with id: " + id));
    
        service.setStatus("Inactive"); // hoặc "INACTIVE" nếu dùng String
        serviceRepository.save(service);
    }

    public List<ServiceEntity> getServicesByType(String serviceType) {
        return serviceRepository.findByServiceType(serviceType);
    }

    public List<ServiceEntity> getServicesByNameAndType(String serviceName, String serviceType) {
        return serviceRepository.findByServiceNameAndServiceType(serviceName, serviceType);
    }

    public List<ServiceEntity> getServicesByStatus(String status) {
        return serviceRepository.findByStatus(status);
    }


} 