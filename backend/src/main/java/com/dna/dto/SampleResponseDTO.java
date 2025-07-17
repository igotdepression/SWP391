package com.dna.dto;

import java.time.LocalDate;

/**
 * DTO for Sample response
 */
public class SampleResponseDTO {
    private Integer sampleID;
    private Integer bookingID;
    private String customerName;
    private String staffName;
    private String sampleType;
    private String status;
    private String sampleCode;
    private String collectionMethod;
    private LocalDate collectionDate;
    private LocalDate receivedDate;
    private String notes;

    // Default constructor
    public SampleResponseDTO() {
    }

    // Constructor with all parameters
    public SampleResponseDTO(Integer sampleID, Integer bookingID, String customerName, 
                            String staffName, String sampleType, String status, 
                            String sampleCode, String collectionMethod, LocalDate collectionDate, 
                            LocalDate receivedDate, String notes) {
        this.sampleID = sampleID;
        this.bookingID = bookingID;
        this.customerName = customerName;
        this.staffName = staffName;
        this.sampleType = sampleType;
        this.status = status;
        this.sampleCode = sampleCode;
        this.collectionMethod = collectionMethod;
        this.collectionDate = collectionDate;
        this.receivedDate = receivedDate;
        this.notes = notes;
    }

    // Getters and Setters
    public Integer getSampleID() {
        return sampleID;
    }

    public void setSampleID(Integer sampleID) {
        this.sampleID = sampleID;
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

    public String getStaffName() {
        return staffName;
    }

    public void setStaffName(String staffName) {
        this.staffName = staffName;
    }

    public String getSampleType() {
        return sampleType;
    }

    public void setSampleType(String sampleType) {
        this.sampleType = sampleType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSampleCode() {
        return sampleCode;
    }

    public void setSampleCode(String sampleCode) {
        this.sampleCode = sampleCode;
    }

    public String getCollectionMethod() {
        return collectionMethod;
    }

    public void setCollectionMethod(String collectionMethod) {
        this.collectionMethod = collectionMethod;
    }

    public LocalDate getCollectionDate() {
        return collectionDate;
    }

    public void setCollectionDate(LocalDate collectionDate) {
        this.collectionDate = collectionDate;
    }

    public LocalDate getReceivedDate() {
        return receivedDate;
    }

    public void setReceivedDate(LocalDate receivedDate) {
        this.receivedDate = receivedDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
