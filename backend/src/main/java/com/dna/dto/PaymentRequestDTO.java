package com.dna.dto;

import com.dna.entity.Payment;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PaymentRequestDTO {
    private Integer paymentID;
    private String bookingID;
    private String customerName;
    private String email;
    private BigDecimal amount;
    private LocalDateTime paymentDate;
    private String paymentMethod;
    private String status;

    public PaymentRequestDTO(Payment payment) {
        this.paymentID = payment.getPaymentID();
        this.bookingID = payment.getBooking().getBookingID().toString();
        this.customerName = payment.getBooking().getUser().getFullName();
        this.email = payment.getBooking().getUser().getEmail();
        this.amount = payment.getAmount();
        this.paymentDate = payment.getPaymentDate();
        this.paymentMethod = payment.getPaymentMethod();
        this.status = payment.getStatus();
    }
} 