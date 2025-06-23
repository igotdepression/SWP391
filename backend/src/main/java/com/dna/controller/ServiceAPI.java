package com.dna.controller;

import com.dna.service.ServiceManagementService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
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

import com.dna.entity.Services;

@RestController
@RequestMapping("/api/service")
public class ServiceAPI {

    @Autowired
    ServiceManagementService serviceManagementService;

    @PreAuthorize("hasRole('CUSTOMER') or hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    @GetMapping("/listService")
    public ResponseEntity getService(){
        List<Services> services = serviceManagementService.getAllServices();
        return ResponseEntity.ok(services);
    }

    @PreAuthorize("hasRole('MANAGER')")
    @PostMapping("/addService")
    public ResponseEntity addNewService(@Valid @RequestBody Services services){
        Services newServices = serviceManagementService.createService(services);
        return ResponseEntity.ok(newServices);
    }

    @PreAuthorize("hasRole('MANAGER')")
    @PutMapping("/updateService/{id}")
    public ResponseEntity updateService(@PathVariable Integer id, @RequestBody Services services){
        return ResponseEntity.ok(serviceManagementService.updateService(id, services));
    }

    @PreAuthorize("hasRole('MANAGER')")
    @DeleteMapping("/deleteService/{id}")
    public ResponseEntity deleteService(@PathVariable Integer id, @RequestBody Services services){
        serviceManagementService.deleteService(id);
        return ResponseEntity.ok("Deleted");
    }


}