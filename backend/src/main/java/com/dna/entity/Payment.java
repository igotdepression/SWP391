package com.dna.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "Payment")
@Data
@Getter
@Setter
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paymentID;

    @OneToOne
    @JoinColumn(name = "bookingID", unique = true)
    private Booking booking;

    private Double amount;

    private LocalDateTime paymentDate;

    private String paymentMethod;

    private String status;
} 