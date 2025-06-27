package com.dna.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "ServicePrice")
@Getter
@Setter
public class ServicePrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer servicePriceID;

    @OneToOne
    @JoinColumn(name = "serviceID", referencedColumnName = "serviceID", nullable = false)
    private Services service;

    private BigDecimal basePrice;

    private BigDecimal thirdSamplePrice;
} 