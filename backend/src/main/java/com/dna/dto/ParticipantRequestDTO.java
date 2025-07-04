package com.dna.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ParticipantRequestDTO {
    @NotBlank(message = "Full name cannot be empty")
    private String fullName;

    @NotNull(message = "Date of birth cannot be null")
    private LocalDate dateOfBirth;

    @NotBlank(message = "Gender cannot be empty")
    private String gender;

    private String relationshipToCustomer;

    private String identityNumber;

    private String phoneNumber;

    private String address;

    private String note;

    @NotBlank(message = "Type of collection cannot be empty")
    private String typeOfCollection; // Cho mẫu

    @NotBlank(message = "Sample type cannot be empty")
    private String sampleType; // Cho mẫu
}

