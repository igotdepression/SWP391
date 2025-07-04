package com.dna.entity;

import java.math.BigDecimal;
import java.util.Set;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "SurchargePrice")
public class IncludeSurcharge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "surchargeID")
    private Integer surchargeID;

    @Column(name = "sampleType", nullable = false, length = 100)
    private String sampleType;

    @Column(name = "surcharge")
    private BigDecimal surcharge;

    @Column(name = "note", columnDefinition = "TEXT")
    private String note;

    @ManyToMany(mappedBy = "surcharges")
    private Set<ServiceEntity> services;
}
