package com.dna.dto;

import lombok.Data;

@Data
public class PaymentRequestDTO {
    private Integer bookingID;
    private String paymentMethod;
    private Double amount;
    // Có thể thêm các trường khác nếu cần
} 