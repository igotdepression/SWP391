// src/main/java/com/dna/controller/BookingController.java
package com.dna.controller;

import com.dna.dto.BookingRequestDTO;
import com.dna.dto.BookingResponseDTO;
// import com.bloodline.bloodline_backend.model.User; // Có thể không cần import này nữa nếu chỉ lấy từ principal
// import com.bloodline.bloodline_backend.repository.UserRepository; // Có thể không cần import này nữa
import com.dna.security.CustomUserDetails; // <-- ĐẢM BẢO CÓ DÒNG IMPORT NÀY
import com.dna.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.UsernameNotFoundException; // Có thể không cần import này nữa
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;
    // @Autowired // Có thể bỏ @Autowired này nếu không cần UserRepository trực tiếp ở đây nữa
    // private UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createBooking(@Valid @RequestBody BookingRequestDTO request) {
        try {
            BookingResponseDTO newBooking = new BookingResponseDTO(bookingService.createBooking(request));
            return new ResponseEntity<>(newBooking, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            // Log lỗi chi tiết ở đây: e.g., logger.error("Error creating booking", e);
            return new ResponseEntity<>("An error occurred while creating the booking: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<BookingResponseDTO> getBookingDetails(@PathVariable Integer bookingId) {
        return bookingService.getBookingById(bookingId)
                .map(booking -> new ResponseEntity<>(new BookingResponseDTO(booking), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{bookingId}/status")
    public ResponseEntity<?> updateBookingStatus(@PathVariable Integer bookingId, @RequestParam String status) {
        try {
            bookingService.updateBookingStatus(bookingId, status);
            return new ResponseEntity<>("Booking status updated successfully.", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error updating booking status: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<List<BookingResponseDTO>> getBookingsByUserId(@PathVariable Integer userId) {
        List<BookingResponseDTO> bookings = bookingService.getBookingsByUserId(userId);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<String> cancelBooking(@PathVariable Integer bookingId) {
        try {
            bookingService.updateBookingStatus(bookingId, "CANCELLED");
            return new ResponseEntity<>("Booking cancelled successfully.", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error cancelling booking: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/customer/status/{bookingId}")
    public ResponseEntity<?> getBookingStatusForCustomer(@PathVariable Integer bookingId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return new ResponseEntity<>("User not authenticated.", HttpStatus.UNAUTHORIZED);
        }

        Integer currentUserId;
        // Kiểm tra nếu principal là CustomUserDetails của bạn
        if (authentication.getPrincipal() instanceof CustomUserDetails) {
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            currentUserId = userDetails.getUserId(); // Lấy userID trực tiếp từ CustomUserDetails
        } else {
            // Trường hợp này không nên xảy ra nếu CustomUserDetailsService của bạn luôn trả về CustomUserDetails
            // Nhưng có thể giữ lại để bắt lỗi nếu có gì đó không mong muốn
            return new ResponseEntity<>("Invalid user details in token. Please log in again.", HttpStatus.FORBIDDEN);
        }

        try {
            Optional<BookingResponseDTO> bookingDTO = bookingService.getBookingStatusForCustomer(bookingId, currentUserId);
            if (bookingDTO.isPresent()) {
                return new ResponseEntity<>(bookingDTO.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Booking not found or you don't have permission to view this booking.", HttpStatus.NOT_FOUND);
            }
        } catch (SecurityException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN); // Lỗi 403 Forbidden
        } catch (Exception e) {
            // Log lỗi chi tiết
            return new ResponseEntity<>("Error retrieving booking status: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}