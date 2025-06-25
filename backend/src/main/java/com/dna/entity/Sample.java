package com.dna.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "Sample")
@Getter
@Setter
public class Sample {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    private String typeOfCollection;

    private String sampleType;

    private LocalDate receivedDate;

    private String status;
} 