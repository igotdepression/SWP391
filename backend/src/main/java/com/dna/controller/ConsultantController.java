package com.dna.controller;

import com.dna.dto.ConsultationRequest;
import com.dna.entity.Consultant;
import com.dna.service.ConsultantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/consultations")
public class ConsultantController {

    @Autowired
    private ConsultantService consultantService;

    @PostMapping("/request")
    public ResponseEntity<?> requestConsultation(@Valid @RequestBody ConsultationRequest requestConsultation) {
        try {
            Consultant newConsultation = consultantService.requestConsultation(
                requestConsultation.getName(),
                requestConsultation.getPhone(),
                requestConsultation.getType(),
                requestConsultation.getNote()
            );
            return new ResponseEntity<>(newConsultation, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            // Log lỗi chi tiết ở đây
            return new ResponseEntity<>("An error occurred while processing your request.", HttpStatus.INTERNAL_SERVER_ERROR);
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