package com.dna.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paymentID")
    private Integer paymentID;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bookingID", nullable = false)
    private Booking booking;

    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "paymentDate")
    private LocalDateTime paymentDate;

    @Column(name = "paymentMethod")
    private String paymentMethod;

    @Column(name = "status")
    private String status;
} 