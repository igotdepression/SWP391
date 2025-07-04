package com.dna.dto;

import com.dna.entity.Participant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParticipantDTO {
    private Integer participantID;
    private String fullName;
    private String gender;
    private String dateOfBirth;
    private String relationshipToCustomer;
    private String sampleType;
    private String collectionMethod;

    public ParticipantDTO(Participant p) {
        this.participantID = p.getParticipantID();
        this.fullName = p.getFullName();
        this.gender = p.getGender();
        this.dateOfBirth = p.getDateOfBirth() != null ? p.getDateOfBirth().toString() : null;
        this.relationshipToCustomer = p.getRelationshipToCustomer();
        this.collectionMethod = p.getCollectionMethod();
        this.sampleType = (p.getSamples() != null && !p.getSamples().isEmpty()) ? p.getSamples().get(0).getSampleType() : null;
    }
} 