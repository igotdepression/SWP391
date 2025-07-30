package com.dna.dto;

import com.dna.entity.Payment;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequestDTO {
    @JsonProperty("bookingID")
    private Object bookingID; // Can be String or Integer
    
    @JsonProperty("amount")
    private Object amount; // Can be Number or BigDecimal
    
    @JsonProperty("paymentMethod")
    private String paymentMethod;

    public PaymentRequestDTO(Payment payment) {
        this.bookingID = payment.getBooking().getBookingID().toString();
        this.amount = payment.getAmount();
        this.paymentMethod = payment.getPaymentMethod();
    }

    // Getter method that converts bookingID to String
    public String getBookingID() {
        if (bookingID == null) {
            return null;
        }
        return bookingID.toString();
    }

    // Setter method that accepts both String and Integer
    public void setBookingID(Object bookingID) {
        this.bookingID = bookingID;
    }

    // Getter method that converts amount to BigDecimal
    public BigDecimal getAmount() {
        if (amount == null) {
            return null;
        }
        if (amount instanceof BigDecimal) {
            return (BigDecimal) amount;
        }
        if (amount instanceof Number) {
            return new BigDecimal(amount.toString());
        }
        return new BigDecimal(amount.toString());
    }

    // Setter method that accepts both Number and BigDecimal
    public void setAmount(Object amount) {
        this.amount = amount;
    }
} 