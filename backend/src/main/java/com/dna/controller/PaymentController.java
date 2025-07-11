package com.dna.controller;

import com.dna.dto.PaymentRequestDTO;
import com.dna.entity.Booking;
import com.dna.entity.Payment;
import com.dna.repository.BookingRepository;
import com.dna.repository.PaymentRepository;
import com.dna.service.VNPayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private VNPayService vnPayService;

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

    @PostMapping("/vnpay/create")
    public ResponseEntity<?> createVNPayPayment(@RequestBody PaymentRequestDTO paymentRequest) {
        // Kiểm tra booking tồn tại
        Booking booking = bookingRepository.findById(paymentRequest.getBookingID())
                .orElse(null);
        if (booking == null) {
            return ResponseEntity.badRequest().body(java.util.Collections.singletonMap("message", "Booking không tồn tại!"));
        }

        try {
            String orderInfo = "Thanh toan xet nghiem ADN - Booking " + paymentRequest.getBookingID();
            String paymentUrl = vnPayService.createPaymentUrl(
                paymentRequest.getBookingID(), 
                paymentRequest.getAmount().longValue(), 
                orderInfo
            );
            
            return ResponseEntity.ok(java.util.Collections.singletonMap("paymentUrl", paymentUrl));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(java.util.Collections.singletonMap("message", "Lỗi tạo thanh toán VNPAY: " + e.getMessage()));
        }
    }

    @GetMapping("/vnpay/return")
    public ResponseEntity<?> vnpayReturn(@RequestParam Map<String, String> queryParams) {
        try {
            // Verify signature
            if (!vnPayService.verifyPaymentResponse(queryParams)) {
                return ResponseEntity.badRequest().body(java.util.Collections.singletonMap("message", "Chữ ký không hợp lệ!"));
            }

            String vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
            String vnp_TxnRef = queryParams.get("vnp_TxnRef");
            String vnp_Amount = queryParams.get("vnp_Amount");
            String vnp_OrderInfo = queryParams.get("vnp_OrderInfo");

            if ("00".equals(vnp_ResponseCode)) {
                // Thanh toán thành công
                Integer bookingId = Integer.parseInt(vnp_TxnRef);
                Booking booking = bookingRepository.findById(bookingId).orElse(null);
                
                if (booking != null) {
                    // Cập nhật trạng thái booking
                    booking.setStatus("PAID");
                    bookingRepository.save(booking);

                    // Tạo payment record
                    Payment payment = new Payment();
                    payment.setBooking(booking);
                    payment.setAmount(BigDecimal.valueOf(Long.parseLong(vnp_Amount) / 100)); // Chia cho 100 vì VNPAY nhân với 100
                    payment.setPaymentMethod("VNPAY");
                    payment.setPaymentDate(LocalDateTime.now());
                    payment.setStatus("SUCCESS");
                    paymentRepository.save(payment);
                }

                return ResponseEntity.ok(java.util.Collections.singletonMap("message", "Thanh toán thành công!"));
            } else {
                return ResponseEntity.badRequest().body(java.util.Collections.singletonMap("message", "Thanh toán thất bại!"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(java.util.Collections.singletonMap("message", "Lỗi xử lý thanh toán: " + e.getMessage()));
        }
    }
} 