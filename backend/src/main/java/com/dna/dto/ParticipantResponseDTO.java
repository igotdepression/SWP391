package com.dna.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ParticipantResponseDTO {
    private Integer participantId;
    private String fullName;
    private LocalDate dateOfBirth;
    private String gender;
    private String relationshipToCustomer;
    private String sampleType;
}
