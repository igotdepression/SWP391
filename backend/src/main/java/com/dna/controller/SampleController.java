package com.dna.controller;

import java.util.List;

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
import org.springframework.web.bind.annotation.RestController;

import com.dna.dto.SampleRequestDTO;
import com.dna.dto.SampleResponseDTO;
import com.dna.service.SampleService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/samples")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tag(name = "Sample Management", description = "APIs for managing DNA test samples")
@SecurityRequirement(name = "bearerAuth")
public class SampleController {
    
    private final SampleService sampleService;
    
    @GetMapping
    @PreAuthorize("hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    @Operation(summary = "Get all samples", description = "Retrieve a list of all DNA test samples")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved samples"),
        @ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<List<SampleResponseDTO>> getAllSamples() {
        List<SampleResponseDTO> samples = sampleService.getAllSamples();
        return ResponseEntity.ok(samples);
    }
    
    @GetMapping("/{sampleID}")
    @PreAuthorize("hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    @Operation(summary = "Get sample by ID", description = "Retrieve a specific sample by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved sample"),
        @ApiResponse(responseCode = "404", description = "Sample not found"),
        @ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<SampleResponseDTO> getSampleById(
            @Parameter(description = "Sample ID") @PathVariable Integer sampleID) {
        SampleResponseDTO sample = sampleService.getSampleById(sampleID);
        return ResponseEntity.ok(sample);
    }
    
    @GetMapping("/booking/{bookingID}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    @Operation(summary = "Get samples by booking ID", description = "Retrieve all samples for a specific booking")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved samples"),
        @ApiResponse(responseCode = "404", description = "Booking not found"),
        @ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<List<SampleResponseDTO>> getSamplesByBookingId(
            @Parameter(description = "Booking ID") @PathVariable Integer bookingID) {
        List<SampleResponseDTO> samples = sampleService.getSamplesByBookingId(bookingID);
        return ResponseEntity.ok(samples);
    }
    
    @PostMapping
    @PreAuthorize("hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    @Operation(summary = "Create new sample", description = "Create a new DNA test sample")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Successfully created sample"),
        @ApiResponse(responseCode = "400", description = "Invalid input data"),
        @ApiResponse(responseCode = "404", description = "Booking or participant not found"),
        @ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<SampleResponseDTO> createSample(
            @Valid @RequestBody SampleRequestDTO requestDTO) {
        SampleResponseDTO createdSample = sampleService.createSample(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSample);
    }
    
    @PutMapping("/{sampleID}")
    @PreAuthorize("hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    @Operation(summary = "Update sample", description = "Update an existing DNA test sample")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully updated sample"),
        @ApiResponse(responseCode = "400", description = "Invalid input data"),
        @ApiResponse(responseCode = "404", description = "Sample not found"),
        @ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<SampleResponseDTO> updateSample(
            @Parameter(description = "Sample ID") @PathVariable Integer sampleID,
            @Valid @RequestBody SampleRequestDTO requestDTO) {
        SampleResponseDTO updatedSample = sampleService.updateSample(sampleID, requestDTO);
        return ResponseEntity.ok(updatedSample);
    }
    
    @DeleteMapping("/{sampleID}")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteSample(@PathVariable Integer sampleID) {
        sampleService.deleteSample(sampleID);
        return ResponseEntity.noContent().build();
    }
}