package com.dna.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "TestResult")
@Data
@Getter
@Setter
public class TestResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "resultID")
    private Integer resultID;

    @OneToOne
    @JoinColumn(name = "bookingID")
    private Booking booking;

    @Column(name = "resultDate")
    private LocalDateTime resultDate;

    @Column(name = "resultStatus")
    private String resultStatus;

    @Column(name = "resultDescription", columnDefinition = "TEXT")
    private String resultDescription;

    @Column(name = "resultFile")
    private String resultFile;

    @Column(name = "createdBy")
    private String createdBy;

    @Column(name = "createdDate")
    private LocalDateTime createdDate;

    @Column(name = "updatedBy")
    private String updatedBy;

    @Column(name = "updatedDate")
    private LocalDateTime updatedDate;
} 