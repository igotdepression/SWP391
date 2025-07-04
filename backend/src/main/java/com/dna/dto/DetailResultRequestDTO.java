package com.dna.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DetailResultRequestDTO {
    
    @NotBlank(message = "Locus name không được để trống")
    private String locusName;
    
    private String p1Allele1;
    private String p1Allele2;
    private String p2Allele1;
    private String p2Allele2;
    private BigDecimal paternityIndex;
}
