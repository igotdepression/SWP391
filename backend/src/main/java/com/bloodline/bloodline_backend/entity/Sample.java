package com.bloodline.bloodline_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "Sample")
public class Sample {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sampleID")
    private Integer sampleID;

    @ManyToOne
    @JoinColumn(name = "bookingID", nullable = false)
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "participantID", nullable = false)
    private Participant participant;

    @Column(name = "typeOfCollection", nullable = false)
    private String typeOfCollection;

    @Column(name = "sampleType", nullable = false)
    private String sampleType;

    @Column(name = "receivedDate")
    private LocalDate receivedDate;

    @Column(name = "status", nullable = false)
    private String status;
} 