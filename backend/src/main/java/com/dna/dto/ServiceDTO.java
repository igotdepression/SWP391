package com.dna.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ServiceDTO {
    private Integer serviceID;
    private String serviceName;
    private String typeOfService;
    private String typeSample;
    private BigDecimal priceSur;
    private String status;
} 