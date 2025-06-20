package com.bloodline.bloodline_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "ServicePrice")
public class ServicePrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "servicePriceID")
    private Integer servicePriceID;

    @OneToOne
    @JoinColumn(name = "serviceID", nullable = false)
    private Service service;

    @Column(name = "basePrice", nullable = false)
    private BigDecimal basePrice;

    @Column(name = "thirdSamplePrice", nullable = false)
    private BigDecimal thirdSamplePrice;
} 