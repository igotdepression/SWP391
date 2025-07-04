package com.dna.controller;

import com.dna.dto.PaymentRequestDTO;
import com.dna.entity.Booking;
import com.dna.entity.Payment;
import com.dna.repository.BookingRepository;
import com.dna.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createPayment(@RequestBody PaymentRequestDTO paymentRequest) {
        // Kiểm tra booking tồn tại
        Booking booking = bookingRepository.findById(paymentRequest.getBookingID())
                .orElse(null);
        if (booking == null) {
            return ResponseEntity.badRequest().body(java.util.Collections.singletonMap("message", "Booking không tồn tại!"));
        }

        // Tạo payment mới
        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(BigDecimal.valueOf(paymentRequest.getAmount()));
        payment.setPaymentMethod(paymentRequest.getPaymentMethod());
        payment.setPaymentDate(LocalDateTime.now());
        payment.setStatus("PENDING");

        paymentRepository.save(payment);

        return ResponseEntity.ok(java.util.Collections.singletonMap("message", "Thanh toán đã được ghi nhận!"));
    }
} 