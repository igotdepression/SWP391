package com.dna.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for Sample response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SampleResponseDTO {
    private Integer sampleID;
    private Integer bookingID;
    private Integer participantID;
    private Integer userID;

    private String customerName;
    private String staffName;
    private String sampleType;
    private String status;
    private String sampleCode;
    private String typeOfCollection;
    private LocalDate collectionDate;
    private LocalDate receivedDate;
    private String notes;

    private String bookingStatus;

}
