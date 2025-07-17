package com.dna.controller;

import com.dna.dto.DetailResultRequestDTO;
import com.dna.dto.DetailResultResponseDTO;
import com.dna.service.DetailResultService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/detail-results")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DetailResultController {
    
    private final DetailResultService detailResultService;
    
    @GetMapping
    @PreAuthorize("hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<List<DetailResultResponseDTO>> getAllDetailResults() {
        List<DetailResultResponseDTO> detailResults = detailResultService.getAllDetailResults();
        return ResponseEntity.ok(detailResults);
    }
    
    @GetMapping("/{detailResultID}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<DetailResultResponseDTO> getDetailResultById(@PathVariable Integer detailResultID) {
        DetailResultResponseDTO detailResult = detailResultService.getDetailResultById(detailResultID);
        return ResponseEntity.ok(detailResult);
    }
    
    @GetMapping("/test-result/{testResultID}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<List<DetailResultResponseDTO>> getDetailResultsByTestResultId(@PathVariable Integer testResultID) {
        List<DetailResultResponseDTO> detailResults = detailResultService.getDetailResultsByTestResultId(testResultID);
        return ResponseEntity.ok(detailResults);
    }
    
    @GetMapping("/locus/{locusName}")
    @PreAuthorize("hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<List<DetailResultResponseDTO>> getDetailResultsByLocusName(@PathVariable String locusName) {
        List<DetailResultResponseDTO> detailResults = detailResultService.getDetailResultsByLocusName(locusName);
        return ResponseEntity.ok(detailResults);
    }
    
    @GetMapping("/paternity-index/{minIndex}")
    @PreAuthorize("hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<List<DetailResultResponseDTO>> getDetailResultsByPaternityIndex(@PathVariable BigDecimal minIndex) {
        List<DetailResultResponseDTO> detailResults = detailResultService.getDetailResultsByPaternityIndex(minIndex);
        return ResponseEntity.ok(detailResults);
    }
    
    @PostMapping("/test-result/{testResultID}")
    @PreAuthorize("hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<DetailResultResponseDTO> createDetailResult(
            @PathVariable Integer testResultID,
            @Valid @RequestBody DetailResultRequestDTO requestDTO) {
        DetailResultResponseDTO createdDetailResult = detailResultService.createDetailResult(requestDTO, testResultID);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDetailResult);
    }
    
    @PutMapping("/{detailResultID}")
    @PreAuthorize("hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<DetailResultResponseDTO> updateDetailResult(
            @PathVariable Integer detailResultID,
            @Valid @RequestBody DetailResultRequestDTO requestDTO) {
        DetailResultResponseDTO updatedDetailResult = detailResultService.updateDetailResult(detailResultID, requestDTO);
        return ResponseEntity.ok(updatedDetailResult);
    }
    
    @DeleteMapping("/{detailResultID}")
    @PreAuthorize("hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteDetailResult(@PathVariable Integer detailResultID) {
        detailResultService.deleteDetailResult(detailResultID);
        return ResponseEntity.noContent().build();
    }
    
    @DeleteMapping("/test-result/{testResultID}")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteDetailResultsByTestResultId(@PathVariable Integer testResultID) {
        detailResultService.deleteDetailResultsByTestResultId(testResultID);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/test-result/{testResultID}/count")
    @PreAuthorize("hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<Long> countDetailResultsByTestResultId(@PathVariable Integer testResultID) {
        Long count = detailResultService.countDetailResultsByTestResultId(testResultID);
        return ResponseEntity.ok(count);
    }
}