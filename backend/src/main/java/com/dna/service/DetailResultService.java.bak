package com.dna.service;

import com.dna.dto.DetailResultRequestDTO;
import com.dna.dto.DetailResultResponseDTO;
import com.dna.entity.DetailResult;
import com.dna.entity.TestResult;
import com.dna.repository.DetailResultRepository;
import com.dna.repository.TestResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DetailResultService {
    
    private final DetailResultRepository detailResultRepository;
    private final TestResultRepository testResultRepository;
    
    public List<DetailResultResponseDTO> getAllDetailResults() {
        return detailResultRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }
    
    public DetailResultResponseDTO getDetailResultById(Integer detailResultID) {
        DetailResult detailResult = detailResultRepository.findById(detailResultID)
                .orElseThrow(() -> new RuntimeException("Detail result not found with ID: " + detailResultID));
        return mapToResponseDTO(detailResult);
    }
    
    public List<DetailResultResponseDTO> getDetailResultsByTestResultId(Integer testResultID) {
        return detailResultRepository.findByTestResultTestResultID(testResultID).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }
    
    public List<DetailResultResponseDTO> getDetailResultsByLocusName(String locusName) {
        return detailResultRepository.findByLocusName(locusName).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }
    
    public List<DetailResultResponseDTO> getDetailResultsByPaternityIndex(BigDecimal minIndex) {
        return detailResultRepository.findByPaternityIndexGreaterThan(minIndex).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }
    
    public DetailResultResponseDTO createDetailResult(DetailResultRequestDTO requestDTO, Integer testResultID) {
        // Validate test result exists
        TestResult testResult = testResultRepository.findById(testResultID)
                .orElseThrow(() -> new RuntimeException("Test result not found with ID: " + testResultID));
        
        DetailResult detailResult = DetailResult.builder()
                .testResult(testResult)
                .locusName(requestDTO.getLocusName())
                .p1Allele1(requestDTO.getP1Allele1())
                .p1Allele2(requestDTO.getP1Allele2())
                .p2Allele1(requestDTO.getP2Allele1())
                .p2Allele2(requestDTO.getP2Allele2())
                .paternityIndex(requestDTO.getPaternityIndex())
                .build();
        
        DetailResult savedDetailResult = detailResultRepository.save(detailResult);
        return mapToResponseDTO(savedDetailResult);
    }
    
    public DetailResultResponseDTO updateDetailResult(Integer detailResultID, DetailResultRequestDTO requestDTO) {
        DetailResult existingDetailResult = detailResultRepository.findById(detailResultID)
                .orElseThrow(() -> new RuntimeException("Detail result not found with ID: " + detailResultID));
        
        existingDetailResult.setLocusName(requestDTO.getLocusName());
        existingDetailResult.setP1Allele1(requestDTO.getP1Allele1());
        existingDetailResult.setP1Allele2(requestDTO.getP1Allele2());
        existingDetailResult.setP2Allele1(requestDTO.getP2Allele1());
        existingDetailResult.setP2Allele2(requestDTO.getP2Allele2());
        existingDetailResult.setPaternityIndex(requestDTO.getPaternityIndex());
        
        DetailResult updatedDetailResult = detailResultRepository.save(existingDetailResult);
        return mapToResponseDTO(updatedDetailResult);
    }
    
    public void deleteDetailResult(Integer detailResultID) {
        if (!detailResultRepository.existsById(detailResultID)) {
            throw new RuntimeException("Detail result not found with ID: " + detailResultID);
        }
        detailResultRepository.deleteById(detailResultID);
    }
    
    public void deleteDetailResultsByTestResultId(Integer testResultID) {
        detailResultRepository.deleteByTestResultTestResultID(testResultID);
    }
    
    public Long countDetailResultsByTestResultId(Integer testResultID) {
        return detailResultRepository.countByTestResultID(testResultID);
    }
    
    private DetailResultResponseDTO mapToResponseDTO(DetailResult detailResult) {
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