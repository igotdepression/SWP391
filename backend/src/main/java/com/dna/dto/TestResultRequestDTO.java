package com.dna.dto;

import java.time.LocalDate;
import java.util.List;

/**
 * DTO for TestResult creation/update requests
 */
public class TestResultRequestDTO {
    private Integer bookingID;
    private LocalDate resultDate;
    private String resultConclution;
    private String resultFile;
    private String resultFileUrl;
    private String createdBy;
    private String status;
    private List<DetailResultRequestDTO> detailResults;

    // Default constructor
    public TestResultRequestDTO() {
    }

    // Constructor with all parameters
    public TestResultRequestDTO(Integer bookingID, LocalDate resultDate, String resultConclution, 
                               String resultFile, String resultFileUrl, String createdBy, String status, List<DetailResultRequestDTO> detailResults) {
        this.bookingID = bookingID;
        this.resultDate = resultDate;
        this.resultConclution = resultConclution;
        this.resultFile = resultFile;
        this.resultFileUrl = resultFileUrl;
        this.createdBy = createdBy;
        this.status = status;
        this.detailResults = detailResults;
    }

    // Getters and Setters
    public Integer getBookingID() {
        return bookingID;
    }

    public void setBookingID(Integer bookingID) {
        this.bookingID = bookingID;
    }

    public LocalDate getResultDate() {
        return resultDate;
    }

    public void setResultDate(LocalDate resultDate) {
        this.resultDate = resultDate;
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

    public String getResultFileUrl() {
        return resultFileUrl;
    }

    public void setResultFileUrl(String resultFileUrl) {
        this.resultFileUrl = resultFileUrl;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public List<DetailResultRequestDTO> getDetailResults() {
        return detailResults;
    }

    public void setDetailResults(List<DetailResultRequestDTO> detailResults) {
        this.detailResults = detailResults;
    }
}
