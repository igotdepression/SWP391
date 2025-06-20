package com.bloodline.bloodline_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@Entity
@Table(name = "Booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookingID")
    private Integer bookingID;

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "serviceID", nullable = false)
    private Service service;

    @Column(name = "serviceType", nullable = false)
    private String serviceType;

    @Column(name = "testType", nullable = false)
    private String testType;

    @Column(name = "appointmentDate", nullable = false)
    private LocalDate appointmentDate;

    @Column(name = "appointmentTime", nullable = false)
    private LocalTime appointmentTime;

    @Column(name = "notes", length = 1000)
    private String notes;

    @Column(name = "numSamples", nullable = false)
    private Integer numSamples;

    @Column(name = "status")
    private String status;

    @Column(name = "totalPrice")
    private BigDecimal totalPrice;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Participant> participants;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Sample> samples;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private Payment payment;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private TestResult testResult;
} 