package com.dna.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class DetailResultResponseDTO {
    
    private Integer detailResultID;
    private Integer testResultID;
    private String locusName;
    private String p1Allele1;
    private String p1Allele2;
    private String p2Allele1;
    private String p2Allele2;
    private BigDecimal paternityIndex;
}
