package com.dna.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

import java.math.BigDecimal;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "SurchargePrice")
public class SurchargePrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "surchargeID")
    private Integer surchargeID;

    @Column(name = "sampleType")
    private String sampleType;

    @Column(name = "surcharge")
    private BigDecimal surcharge;

    @Column(name = "note")
    private String note;

    @ManyToMany(mappedBy = "surcharges")
    private Set<ServiceEntity> services;
}
