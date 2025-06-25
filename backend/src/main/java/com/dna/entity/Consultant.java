package com.dna.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "Consultant")
@Data
@Getter
@Setter
public class Consultant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "consultantID")
    private Integer consultantID;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;

    @Column(name = "specialization")
    private String specialization;

    @Column(name = "experience")
    private Integer experience;

    @Column(name = "qualification")
    private String qualification;

    @Column(name = "status")
    private String status;

    @Column(name = "createdDate")
    private LocalDateTime createdDate;

    @Column(name = "updatedDate")
    private LocalDateTime updatedDate;

    @Column(name = "consultantDate")
    private LocalDateTime consultantDate;

    @Column(name = "notes")
    private String notes;

    public void setConsultantDate(LocalDateTime consultantDate) {
        this.consultantDate = consultantDate;
    }

    public LocalDateTime getConsultantDate() {
        return consultantDate;
    }
} 