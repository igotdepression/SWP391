package com.dna.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "DetailResult")
public class DetailResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "detailResultID")
    private Integer detailResultID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "testResultID", nullable = false)
    private TestResult testResult;

    @Column(name = "locusName", nullable = false, length = 50)
    private String locusName;

    @Column(name = "p1Allele1")
    private String p1Allele1;

    @Column(name = "p1Allele2")
    private String p1Allele2;

    @Column(name = "p2Allele1")
    private String p2Allele1;

    @Column(name = "p2Allele2")
    private String p2Allele2;

    @Column(name = "paternityIndex", precision = 18, scale = 9)
    private BigDecimal paternityIndex;
    
}
