package com.bloodline.bloodline_backend.service;

import com.bloodline.bloodline_backend.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceManagementService {

    @Autowired
    private ServiceRepository serviceRepository;

    public List<com.bloodline.bloodline_backend.entity.Service> getAllServices() {
        return serviceRepository.findAll();
    }

    public Optional<com.bloodline.bloodline_backend.entity.Service> getServiceById(Integer id) {
        return serviceRepository.findById(id);
    }

    public com.bloodline.bloodline_backend.entity.Service createService(com.bloodline.bloodline_backend.entity.Service service) {
        return serviceRepository.save(service);
    }

    public com.bloodline.bloodline_backend.entity.Service updateService(Integer id, com.bloodline.bloodline_backend.entity.Service serviceDetails) {
        com.bloodline.bloodline_backend.entity.Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found with id " + id));
        service.setServiceName(serviceDetails.getServiceName());
        service.setTypeOfService(serviceDetails.getTypeOfService());
        service.setTypeSample(serviceDetails.getTypeSample());
        service.setPriceSur(serviceDetails.getPriceSur());
        service.setStatus(serviceDetails.getStatus());
        return serviceRepository.save(service);
    }

    public void deleteService(Integer id) {
        serviceRepository.deleteById(id);
    }

    public List<com.bloodline.bloodline_backend.entity.Service> getServicesByType(String typeOfService) {
        return serviceRepository.findByTypeOfService(typeOfService);
    }

    public List<com.bloodline.bloodline_backend.entity.Service> getServicesByNameAndType(String serviceName, String typeOfService) {
        return serviceRepository.findByServiceNameAndTypeOfService(serviceName, typeOfService);
    }

    public List<com.bloodline.bloodline_backend.entity.Service> getServicesByStatus(String status) {
        return serviceRepository.findByStatus(status);
    }
} 