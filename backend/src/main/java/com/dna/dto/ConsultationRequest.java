package com.dna.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
public class ConsultationRequest {
    @NotNull(message = "User ID cannot be null")
    private Integer userId;

    @NotNull(message = "Consultant date cannot be null")
    private LocalDateTime consultantDate;

    private String notes; // Notes có thể là null
}