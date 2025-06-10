package com.bloodline.bloodline_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "Surcharge")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Surcharge {
    @Id
    @Column(name = "surchargeID")
    private Integer surchargeID;

    @Column(name = "typeSample", nullable = false, length = 100)
    private String typeSample;

    @Column(name = "priceSur", nullable = false)
    private Double priceSur;
} 