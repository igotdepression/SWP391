package com.dna.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
public class ConsultationRequest {
    private String name;
    private String phone;
    private String type;
    private String note;
}