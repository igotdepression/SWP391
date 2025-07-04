// src/main/java/com/dna/controller/StaffBookingController.java
package com.dna.controller;

import com.dna.dto.BookingResponseDTO;
import com.dna.service.BookingService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import lombok.extern.slf4j.Slf4j; // For logging

import java.io.IOException;
import java.util.List;
import java.util.Map; // For Map<String, String> body

@RestController
@RequestMapping("/api/staff/bookings")
@Slf4j // Use Lombok's Slf4j for logging
public class StaffBookingController {

    @Autowired
    private BookingService bookingService;

    // GET /api/staff/bookings: Lấy tất cả các booking cho trang Staff
    @GetMapping
    @PreAuthorize("hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<List<BookingResponseDTO>> getAllBookingsForStaff() {
        log.info("Fetching all bookings for staff access.");
        List<BookingResponseDTO> bookings = bookingService.getAllBookingsForStaff();
        return ResponseEntity.ok(bookings);
    }

    // PUT /api/staff/bookings/{bookingId}/status: Cập nhật trạng thái booking
    @PutMapping("/{bookingId}/status")
    @PreAuthorize("hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<?> updateBookingStatus(
            @PathVariable Integer bookingId,
            @RequestBody Map<String, String> body) { // Dùng Map để nhận JSON { "status": "NEW_STATUS" }
        String newStatus = body.get("status");
        if (newStatus == null || newStatus.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        log.info("Updating status for booking ID {} to: {}", bookingId, newStatus);
        try {
            BookingResponseDTO updatedBooking = bookingService.updateBookingStatus(bookingId, newStatus);
            return ResponseEntity.ok(updatedBooking);
        } catch (EntityNotFoundException e) {
            log.warn("Booking not found: {}", bookingId);
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            log.warn("Invalid status update for booking {}: {}", bookingId, e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // PUT /api/staff/bookings/{bookingId}/notes: Cập nhật ghi chú chuyên gia
    @PutMapping("/{bookingId}/notes")
    @PreAuthorize("hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<?> updateExpertNotes(
            @PathVariable Integer bookingId,
            @RequestBody Map<String, String> body) { // Dùng Map để nhận JSON { "expertNotes": "..." }
        String expertNotes = body.get("expertNotes");
        // Ghi chú có thể là null hoặc rỗng, không cần kiểm tra chặt như status
        
        log.info("Updating expert notes for booking ID {}.", bookingId);
        try {
            BookingResponseDTO updatedBooking = bookingService.updateExpertNotes(bookingId, expertNotes);
            return ResponseEntity.ok(updatedBooking);
        } catch (EntityNotFoundException e) {
            log.warn("Booking not found: {}", bookingId);
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{bookingId}/upload-result")
    @PreAuthorize("hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<?> uploadResultFile(
            @PathVariable Integer bookingId,
            @RequestParam("file") MultipartFile file) { // Sử dụng @RequestParam cho file
        log.info("Uploading result file for booking ID {}. File name: {}", bookingId, file.getOriginalFilename());
        try {
            BookingResponseDTO updatedBooking = bookingService.uploadResultFile(bookingId, file);
            return ResponseEntity.ok(updatedBooking);
        } catch (EntityNotFoundException e) {
            log.warn("Booking not found: {}", bookingId);
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            log.warn("File upload failed for booking {}: {}", bookingId, e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IOException e) {
            log.error("File upload I/O error for booking {}: {}", bookingId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not upload file: " + e.getMessage());
        }
    }
}