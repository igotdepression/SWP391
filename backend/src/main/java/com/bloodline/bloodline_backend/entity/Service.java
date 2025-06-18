package com.bloodline.bloodline_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "Service")
public class Service {
    @Id
    @Column(name = "serviceID")
    private Integer serviceID;

    @Column(name = "serviceName", nullable = false)
    private String serviceName;

    @Column(name = "typeOfService", nullable = false)
    private String typeOfService;

    @Column(name = "typeSample", nullable = false)
    private String typeSample;

    @Column(name = "priceSur", nullable = false)
    private BigDecimal priceSur;

    @Column(name = "status", nullable = false)
    private String status;
} 