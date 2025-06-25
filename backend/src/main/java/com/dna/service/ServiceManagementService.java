package com.dna.service;

import com.dna.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dna.entity.Services;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceManagementService {

    @Autowired
    private ServiceRepository serviceRepository;


    public List<Services> getAllServices() {
        return serviceRepository.findAll();
    }

    public Optional<Services> getServiceById(Integer id) {
        return serviceRepository.findById(id);
    }

    public Services createService(Services services) {
        return serviceRepository.save(services);
    }

    public Services updateService(Integer id, Services serviceDetails) {
        Services services = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found with id " + id));
        services.setServiceName(serviceDetails.getServiceName());
        services.setTypeOfService(serviceDetails.getTypeOfService());
        services.setTypeSample(serviceDetails.getTypeSample());
        services.setPriceSur(serviceDetails.getPriceSur());
        services.setStatus(serviceDetails.getStatus());
        return serviceRepository.save(services);
    }

    public void deleteService(Integer id) {
        Services service = serviceRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Service not found with id: " + id));
    
        service.setStatus("Inactive"); // hoặc "INACTIVE" nếu dùng String
        serviceRepository.save(service);
    }

    public List<Services> getServicesByType(String typeOfService) {
        return serviceRepository.findByTypeOfService(typeOfService);
    }

    public List<Services> getServicesByNameAndType(String serviceName, String typeOfService) {
        return serviceRepository.findByServiceNameAndTypeOfService(serviceName, typeOfService);
    }

    public List<Services> getServicesByStatus(String status) {
        return serviceRepository.findByStatus(status);
    }


} 