package com.dna.dto;

import java.time.LocalDate;
import java.util.List;

/**
 * DTO for TestResult response
 */
public class TestResultResponseDTO {
    private Integer testResultID;
    private Integer bookingID;
    private String customerName;
    private LocalDate resultDate;
    private String createdBy;
    private LocalDate createdDate;
    private String resultConclution;
    private String resultFile;
    private String updatedBy;
    private LocalDate updatedDate;
    private String status;
    private List<DetailResultResponseDTO> detailResults;

    // Default constructor
    public TestResultResponseDTO() {
    }

    // Constructor with all parameters
    public TestResultResponseDTO(Integer testResultID, Integer bookingID, String customerName, 
                                LocalDate resultDate, String createdBy, LocalDate createdDate,
                                String resultConclution, String resultFile, String updatedBy,
                                LocalDate updatedDate, String status, List<DetailResultResponseDTO> detailResults) {
        this.testResultID = testResultID;
        this.bookingID = bookingID;
        this.customerName = customerName;
        this.resultDate = resultDate;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.resultConclution = resultConclution;
        this.resultFile = resultFile;
        this.updatedBy = updatedBy;
        this.updatedDate = updatedDate;
        this.status = status;
        this.detailResults = detailResults;
    }

    // Getters and Setters
    public Integer getTestResultID() {
        return testResultID;
    }

    public void setTestResultID(Integer testResultID) {
        this.testResultID = testResultID;
    }

    public Integer getBookingID() {
        return bookingID;
    }

    public void setBookingID(Integer bookingID) {
        this.bookingID = bookingID;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public LocalDate getResultDate() {
        return resultDate;
    }

    public void setResultDate(LocalDate resultDate) {
        this.resultDate = resultDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public String getResultConclution() {
        return resultConclution;
    }

    public void setResultConclution(String resultConclution) {
        this.resultConclution = resultConclution;
    }

    public String getResultFile() {
        return resultFile;
    }

    public void setResultFile(String resultFile) {
        this.resultFile = resultFile;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public LocalDate getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(LocalDate updatedDate) {
        this.updatedDate = updatedDate;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public List<DetailResultResponseDTO> getDetailResults() {
        return detailResults;
    }

    public void setDetailResults(List<DetailResultResponseDTO> detailResults) {
        this.detailResults = detailResults;
    }
}
