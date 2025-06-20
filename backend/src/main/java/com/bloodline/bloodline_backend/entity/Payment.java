package com.bloodline.bloodline_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "Payment")
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paymentID")
    private Integer paymentID;

    @OneToOne
    @JoinColumn(name = "bookingID")
    private Booking booking;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "paymentDate")
    private LocalDateTime paymentDate;

    @Column(name = "paymentMethod")
    private String paymentMethod;

    @Column(name = "status")
    private String status;

    @Column(name = "transactionID")
    private String transactionID;
} 