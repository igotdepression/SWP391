package com.dna.controller;

import com.dna.dto.ConsultationRequest;
import com.dna.entity.Consultant;
import com.dna.service.ConsultantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;

@RestController
@RequestMapping("/api/consultations")
@CrossOrigin(origins = "*")
public class ConsultantController {

    private static final Logger logger = LoggerFactory.getLogger(ConsultantController.class);

    @Autowired
    private ConsultantService consultantService;

    @PostMapping("/request")
    public ResponseEntity<?> requestConsultation(@Valid @RequestBody ConsultationRequest requestConsultation) {
        try {
            logger.info("Received consultation request: name={}, phone={}, type={}", 
                requestConsultation.getName(), requestConsultation.getPhone(), requestConsultation.getType());
            
            Consultant newConsultation = consultantService.requestConsultation(
                requestConsultation.getName(),
                requestConsultation.getPhone(),
                requestConsultation.getType(),
                requestConsultation.getNote()
            );
            
            logger.info("Successfully created consultation with ID: {}", newConsultation.getConsultantID());
            return new ResponseEntity<>(newConsultation, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            logger.warn("Invalid consultation request: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (DataIntegrityViolationException e) {
            logger.error("Database constraint violation while creating consultation", e);
            return new ResponseEntity<>("Database constraint error: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            logger.error("Error creating consultation request", e);
            return new ResponseEntity<>("An error occurred while processing your request: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Consultant> getConsultationDetails(@PathVariable Integer id) {
        return consultantService.getConsultationById(id)
                .map(consultation -> new ResponseEntity<>(consultation, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping
    public ResponseEntity<?> getAllConsultations() {
        return ResponseEntity.ok(consultantService.getAllConsultations());
    }

    // Có thể thêm các endpoint khác như:
    // @PutMapping("/{id}/status") để cập nhật trạng thái tư vấn
    // @GetMapping("/user/{userId}") để lấy tất cả lịch tư vấn của một user
}