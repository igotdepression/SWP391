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
@Table(name = "Participant")
public class Participant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "participantID")
    private Integer participantID;

    @Column(name = "questionalbleRelationship")
    private String questionalbleRelationship;

    @Column(name = "fullName")
    private String fullName;

    @Column(name = "dateOfBirth")
    private LocalDate dateOfBirth;

    @Column(name = "gender")
    private String gender;

    @Column(name = "collectionMethod")
    private String collectionMethod;

    @Column(name = "relationshipToCustomer")
    private String relationshipToCustomer;

    @Column(name = "identityNumber")
    private String identityNumber;

    @Column(name = "address")
    private String address;

    @OneToMany(mappedBy = "participant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Sample> samples;

}