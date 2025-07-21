package com.dna.controller;

import com.dna.service.ServiceEntityService;
import com.dna.service.SurchargeService;
import com.dna.entity.SurchargePrice;

import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;

import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dna.entity.ServiceEntity;

@RestController
@RequestMapping("/api/service")
public class ServiceAPI {

    @Autowired
    ServiceEntityService serviceManagementService;

    @Autowired
    SurchargeService surchargeService;

    @GetMapping("/listService")
    public ResponseEntity<List<ServiceEntity>> getService(){
        List<ServiceEntity> services = serviceManagementService.getAllServices();
        return ResponseEntity.ok(services);
    }

    @PreAuthorize("hasRole('MANAGER')")
    @PostMapping("/addService")
    public ResponseEntity<ServiceEntity> addNewService(@Valid @RequestBody ServiceEntity services){
        ServiceEntity newServices = serviceManagementService.createService(services);
        return ResponseEntity.ok(newServices);
    }

    @PreAuthorize("hasRole('MANAGER')")
    @PutMapping("/updateService/{id}")
    public ResponseEntity<ServiceEntity> updateService(@PathVariable Integer id, @RequestBody ServiceEntity services){
        return ResponseEntity.ok(serviceManagementService.updateService(id, services));
    }

    @PreAuthorize("hasRole('MANAGER')")
    @DeleteMapping("/deleteService/{id}")
    public ResponseEntity<String> deleteService(@PathVariable Integer id) {
        serviceManagementService.deleteService(id);
        return ResponseEntity.ok("Deleted (soft)");
    }

    @PreAuthorize("hasRole('MANAGER')")
    @DeleteMapping("/surcharges/{id}")
    public ResponseEntity<String> deleteSurcharge(@PathVariable Integer id) {
        surchargeService.delete(id);
        return ResponseEntity.ok("Surcharge deleted (soft)");
    }

    @GetMapping("/sample-types")
    public ResponseEntity<List<String>> getSampleTypes() {
        List<SurchargePrice> surcharges = surchargeService.findAll();
        List<String> sampleTypes = surcharges.stream()
            .map(SurchargePrice::getSampleType)
            .distinct()
            .toList();
        return ResponseEntity.ok(sampleTypes);
    }

}