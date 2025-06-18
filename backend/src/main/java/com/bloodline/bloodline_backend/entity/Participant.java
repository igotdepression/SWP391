package com.bloodline.bloodline_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Table(name = "Participant")
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "participantID")
    private Integer participantID;

    @ManyToOne
    @JoinColumn(name = "bookingID", nullable = false)
    private Booking booking;

    @Column(name = "fullName", nullable = false)
    private String fullName;

    @Column(name = "dateOfBirth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "gender")
    private String gender;

    @Column(name = "relationshipToCustomer")
    private String relationshipToCustomer;

    @Column(name = "identityNumber")
    private String identityNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "collectionMethod", nullable = false)
    private String collectionMethod;

    @Column(name = "phoneNumber")
    private String phoneNumber;

    @Column(name = "note")
    private String note;

    @OneToMany(mappedBy = "participant", cascade = CascadeType.ALL)
    private List<Sample> samples;
} 