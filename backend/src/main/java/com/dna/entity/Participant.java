package com.dna.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Table(name = "Participant")
@Getter
@Setter
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer participantID;

    @ManyToOne
    @JoinColumn(name = "bookingID", nullable = false)
    private Booking booking;

    private String fullName;

    private LocalDate dateOfBirth;

    private String gender;

    private String relationshipToCustomer;

    private String identityNumber;

    private String address;

    private String collectionMethod;

    private String phoneNumber;

    private String note;

    @OneToMany(mappedBy = "participant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Sample> samples;
} 