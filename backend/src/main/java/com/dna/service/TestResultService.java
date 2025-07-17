package com.dna.service;

import com.dna.dto.DetailResultRequestDTO;
import com.dna.dto.DetailResultResponseDTO;
import com.dna.dto.TestResultRequestDTO;
import com.dna.dto.TestResultResponseDTO;
import com.dna.entity.Booking;
import com.dna.entity.DetailResult;
import com.dna.entity.TestResult;
import com.dna.repository.BookingRepository;
import com.dna.repository.DetailResultRepository;
import com.dna.repository.TestResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TestResultService {
    
    private final TestResultRepository testResultRepository;
    private final DetailResultRepository detailResultRepository;
    private final BookingRepository bookingRepository;
    
    public List<TestResultResponseDTO> getAllTestResults() {
        return testResultRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }
    
    public TestResultResponseDTO getTestResultById(Integer testResultID) {
        TestResult testResult = testResultRepository.findById(testResultID)
                .orElseThrow(() -> new RuntimeException("Test result not found with ID: " + testResultID));
        return mapToResponseDTO(testResult);
    }
    
    public TestResultResponseDTO getTestResultByBookingId(Integer bookingID) {
        TestResult testResult = testResultRepository.findByBookingBookingID(bookingID)
                .orElseThrow(() -> new RuntimeException("Test result not found for booking ID: " + bookingID));
        return mapToResponseDTO(testResult);
    }
    
    public List<TestResultResponseDTO> getTestResultsByDateRange(LocalDate startDate, LocalDate endDate) {
        return testResultRepository.findByResultDateBetween(startDate, endDate).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public TestResultResponseDTO createTestResult(TestResultRequestDTO requestDTO) {
        // Validate booking exists
        Booking booking = bookingRepository.findById(requestDTO.getBookingID())
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + requestDTO.getBookingID()));
        
        // Check if test result already exists for this booking
        if (testResultRepository.existsByBookingBookingID(requestDTO.getBookingID())) {
            throw new RuntimeException("Test result already exists for booking ID: " + requestDTO.getBookingID());
        }
        
        TestResult testResult = TestResult.builder()
                .booking(booking)
                .resultDate(requestDTO.getResultDate() != null ? 
                    requestDTO.getResultDate() : LocalDate.now())
                .createdBy(requestDTO.getCreatedBy())
                .createdDate(LocalDate.now())
                .resultConclution(requestDTO.getResultConclution())
                .resultFile(requestDTO.getResultFile())
                .build();
        
        TestResult savedTestResult = testResultRepository.save(testResult);
        
        // Create detail results if provided
        if (requestDTO.getDetailResults() != null && !requestDTO.getDetailResults().isEmpty()) {
            List<DetailResult> detailResults = new ArrayList<>();
            for (DetailResultRequestDTO detailDTO : requestDTO.getDetailResults()) {
                DetailResult detailResult = DetailResult.builder()
                        .testResult(savedTestResult)
                        .locusName(detailDTO.getLocusName())
                        .p1Allele1(detailDTO.getP1Allele1())
                        .p1Allele2(detailDTO.getP1Allele2())
                        .p2Allele1(detailDTO.getP2Allele1())
                        .p2Allele2(detailDTO.getP2Allele2())
                        .paternityIndex(detailDTO.getPaternityIndex())
                        .build();
                detailResults.add(detailResult);
            }
            detailResultRepository.saveAll(detailResults);
            savedTestResult.setDetailResults(detailResults);
        }
        
        return mapToResponseDTO(savedTestResult);
    }
    
    @Transactional
    public TestResultResponseDTO updateTestResult(Integer testResultID, TestResultRequestDTO requestDTO) {
        TestResult existingTestResult = testResultRepository.findById(testResultID)
                .orElseThrow(() -> new RuntimeException("Test result not found with ID: " + testResultID));
        
        // Update basic fields
        existingTestResult.setResultDate(requestDTO.getResultDate());
        existingTestResult.setResultConclution(requestDTO.getResultConclution());
        existingTestResult.setResultFile(requestDTO.getResultFile());
        existingTestResult.setUpdatedBy(requestDTO.getCreatedBy()); // Use same user for update
        existingTestResult.setUpdatedDate(LocalDate.now());
        
        TestResult updatedTestResult = testResultRepository.save(existingTestResult);
        
        // Update detail results if provided
        if (requestDTO.getDetailResults() != null) {
            // Delete existing detail results
            detailResultRepository.deleteByTestResultTestResultID(testResultID);
            
            // Create new detail results
            List<DetailResult> detailResults = new ArrayList<>();
            for (DetailResultRequestDTO detailDTO : requestDTO.getDetailResults()) {
                DetailResult detailResult = DetailResult.builder()
                        .testResult(updatedTestResult)
                        .locusName(detailDTO.getLocusName())
                        .p1Allele1(detailDTO.getP1Allele1())
                        .p1Allele2(detailDTO.getP1Allele2())
                        .p2Allele1(detailDTO.getP2Allele1())
                        .p2Allele2(detailDTO.getP2Allele2())
                        .paternityIndex(detailDTO.getPaternityIndex())
                        .build();
                detailResults.add(detailResult);
            }
            detailResultRepository.saveAll(detailResults);
            updatedTestResult.setDetailResults(detailResults);
        }
        
        return mapToResponseDTO(updatedTestResult);
    }
    
    @Transactional
    public void deleteTestResult(Integer testResultID) {
        if (!testResultRepository.existsById(testResultID)) {
            throw new RuntimeException("Test result not found with ID: " + testResultID);
        }
        
        // Delete detail results first (cascade should handle this, but explicit is safer)
        detailResultRepository.deleteByTestResultTestResultID(testResultID);
        
        // Delete test result
        testResultRepository.deleteById(testResultID);
    }
    
    private TestResultResponseDTO mapToResponseDTO(TestResult testResult) {
        TestResultResponseDTO responseDTO = new TestResultResponseDTO();
        responseDTO.setTestResultID(testResult.getTestResultID());
        responseDTO.setBookingID(testResult.getBooking().getBookingID());
        responseDTO.setCustomerName(testResult.getBooking().getUser().getFullName());
        responseDTO.setResultDate(testResult.getResultDate());
        responseDTO.setCreatedBy(testResult.getCreatedBy());
        responseDTO.setCreatedDate(testResult.getCreatedDate());
        responseDTO.setResultConclution(testResult.getResultConclution());
        responseDTO.setResultFile(testResult.getResultFile());
        responseDTO.setUpdatedBy(testResult.getUpdatedBy());
        responseDTO.setUpdatedDate(testResult.getUpdatedDate());
        responseDTO.setBookingStatus(testResult.getBooking().getStatus());
        
        // Map detail results
        if (testResult.getDetailResults() != null) {
            List<DetailResultResponseDTO> detailDTOs = testResult.getDetailResults().stream()
                    .map(this::mapDetailToResponseDTO)
                    .collect(Collectors.toList());
            responseDTO.setDetailResults(detailDTOs);
        }
        
        return responseDTO;
    }
    
    private DetailResultResponseDTO mapDetailToResponseDTO(DetailResult detailResult) {
        DetailResultResponseDTO responseDTO = new DetailResultResponseDTO();
        responseDTO.setDetailResultID(detailResult.getDetailResultID());
        responseDTO.setTestResultID(detailResult.getTestResult().getTestResultID());
        responseDTO.setLocusName(detailResult.getLocusName());
        responseDTO.setP1Allele1(detailResult.getP1Allele1());
        responseDTO.setP1Allele2(detailResult.getP1Allele2());
        responseDTO.setP2Allele1(detailResult.getP2Allele1());
        responseDTO.setP2Allele2(detailResult.getP2Allele2());
        responseDTO.setPaternityIndex(detailResult.getPaternityIndex());
        return responseDTO;
    }
}