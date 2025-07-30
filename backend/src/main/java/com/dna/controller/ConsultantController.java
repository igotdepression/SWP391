package com.dna.controller;

import com.dna.dto.ConsultationRequest;
import com.dna.dto.ConsultationResponseDTO;
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
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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
            return new ResponseEntity<>(new ConsultationResponseDTO(newConsultation), HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            logger.warn("Invalid consultation request: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (IllegalStateException e) {
            logger.error("System state error while creating consultation: {}", e.getMessage());
            return new ResponseEntity<>("System configuration error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (DataIntegrityViolationException e) {
            logger.error("Database constraint violation while creating consultation", e);
            return new ResponseEntity<>("Database constraint error: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            logger.error("Error creating consultation request", e);
            return new ResponseEntity<>("An error occurred while processing your request: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<ConsultationResponseDTO> getConsultationDetails(@PathVariable Integer id) {
        return consultantService.getConsultationById(id)
                .map(consultation -> new ResponseEntity<>(new ConsultationResponseDTO(consultation), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping
    @Transactional(readOnly = true)
    public ResponseEntity<?> getAllConsultations() {
        try {
            List<Consultant> consultations = consultantService.getAllConsultations();
            List<ConsultationResponseDTO> consultationDTOs = consultations.stream()
                    .map(ConsultationResponseDTO::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(consultationDTOs);
        } catch (Exception e) {
            logger.error("Error fetching consultations", e);
            return new ResponseEntity<>("An error occurred while fetching consultations: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Có thể thêm các endpoint khác như:
    // @PutMapping("/{id}/status") để cập nhật trạng thái tư vấn
    // @GetMapping("/user/{userId}") để lấy tất cả lịch tư vấn của một user
}