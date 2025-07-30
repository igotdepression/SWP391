package com.dna.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
public class ConsultationRequest {
    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    private String name;
    
    @NotBlank(message = "Phone is required")
    @Size(max = 11, message = "Phone must not exceed 11 characters")
    private String phone;
    
    @NotBlank(message = "Type is required")
    private String type;
    
    private String note;
}