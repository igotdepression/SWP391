package com.dna.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SampleRequestDTO {
    
    @NotNull(message = "Booking ID không được để trống")
    private Integer bookingID;
    
    private Integer userID; // Staff ID (có thể null nếu tự thu mẫu)
    
    @NotNull(message = "Participant ID không được để trống")
    private Integer participantID;
    
    @NotBlank(message = "Loại thu mẫu không được để trống")
    private String typeOfCollection;
    
    @NotBlank(message = "Loại mẫu không được để trống")
    private String sampleType;
    
    private LocalDate receivedDate;
}