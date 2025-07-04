package com.dna.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class SampleResponseDTO {
    
    private Integer sampleID;
    private Integer bookingID;
    private String customerName; // Tên khách hàng từ booking
    private Integer userID; // Staff ID
    private String staffName; // Tên staff
    private Integer participantID;
    private String participantName; // Tên participant
    private String typeOfCollection;
    private String sampleType;
    private LocalDate receivedDate;
    private String bookingStatus; // Trạng thái booking
}
