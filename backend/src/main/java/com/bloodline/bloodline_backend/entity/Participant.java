package com.bloodline.bloodline_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "Participant")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "participantID")
    private Integer participantID;

    @Column(name = "fullName", nullable = false, length = 100)
    private String fullName;

    @Column(name = "dateOfBirth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "gender", nullable = false, length = 10)
    private String gender;

    @Column(name = "relationshipToCustomer", length = 100)
    private String relationshipToCustomer;

    @Column(name = "identityNumber", length = 20)
    private String identityNumber;

    @Column(name = "phoneNumber", length = 15)
    private String phoneNumber;

    @Column(name = "address", length = 200)
    private String address;

    @Column(name = "note", columnDefinition = "TEXT")
    private String note;
} 