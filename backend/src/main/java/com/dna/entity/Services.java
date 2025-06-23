package com.dna.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "Service")
@Setter
@Getter
public class Services {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer serviceID;

    @NotBlank(message="Service name is not blank!!!")
    private String serviceName;

    private String typeOfService;

    private String typeSample;

    private BigDecimal priceSur;

    private String status;

    @OneToOne(mappedBy = "service", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private ServicePrice servicePrice;
} 