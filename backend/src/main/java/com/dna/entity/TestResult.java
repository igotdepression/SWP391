package com.dna.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "TestResult")
public class TestResult {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "testResultID")
    private Integer testResultID;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bookingID", nullable = false)
    private Booking booking;

    @Column(name = "resultDate")
    private LocalDate resultDate;

    @Column(name = "createdBy")
    private String createdBy;

    @Column(name = "createdDate")
    private LocalDate createdDate;

    @Column(name = "resultConclution", columnDefinition = "TEXT")
    private String resultConclution;

    @Column(name = "resultFile", length = 255)
    private String resultFile;

    @Column(name = "updatedBy")
    private String updatedBy;

    @Column(name = "updatedDate")
    private LocalDate updatedDate;

    @OneToMany(mappedBy = "testResult", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetailResult> detailResults;
} 