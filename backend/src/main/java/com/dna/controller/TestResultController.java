package com.dna.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dna.dto.TestResultRequestDTO;
import com.dna.dto.TestResultResponseDTO;
import com.dna.service.TestResultService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/test-results")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TestResultController {
    
    private final TestResultService testResultService;
    
    @GetMapping
    @PreAuthorize("hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<List<TestResultResponseDTO>> getAllTestResults() {
        List<TestResultResponseDTO> testResults = testResultService.getAllTestResults();
        return ResponseEntity.ok(testResults);
    }
    
    @GetMapping("/{testResultID}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<TestResultResponseDTO> getTestResultById(@PathVariable Integer testResultID) {
        TestResultResponseDTO testResult = testResultService.getTestResultById(testResultID);
        return ResponseEntity.ok(testResult);
    }
    
    @GetMapping("/booking/{bookingID}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<TestResultResponseDTO> getTestResultByBookingId(@PathVariable Integer bookingID) {
        TestResultResponseDTO testResult = testResultService.getTestResultByBookingId(bookingID);
        return ResponseEntity.ok(testResult);
    }
    
    @GetMapping("/date-range")
    @PreAuthorize("hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<List<TestResultResponseDTO>> getTestResultsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<TestResultResponseDTO> testResults = testResultService.getTestResultsByDateRange(startDate, endDate);
        return ResponseEntity.ok(testResults);
    }
    
    @PostMapping
    @PreAuthorize("hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<TestResultResponseDTO> createTestResult(@Valid @RequestBody TestResultRequestDTO requestDTO) {
        TestResultResponseDTO createdTestResult = testResultService.createTestResult(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTestResult);
    }
    
    @PutMapping("/{testResultID}")
    @PreAuthorize("hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<TestResultResponseDTO> updateTestResult(
            @PathVariable Integer testResultID,
            @Valid @RequestBody TestResultRequestDTO requestDTO) {
        TestResultResponseDTO updatedTestResult = testResultService.updateTestResult(testResultID, requestDTO);
        return ResponseEntity.ok(updatedTestResult);
    }
    
    @DeleteMapping("/{testResultID}")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteTestResult(@PathVariable Integer testResultID) {
        testResultService.deleteTestResult(testResultID);
        return ResponseEntity.noContent().build();
    }
}
