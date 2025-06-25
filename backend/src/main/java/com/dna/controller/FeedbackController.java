package com.dna.controller;

import com.dna.dto.FeedbackRequestDTO;
import com.dna.dto.FeedbackResponseDTO;
import com.dna.service.FeedbackService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedbacks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {
    
    private final FeedbackService feedbackService;
    
    // Lấy tất cả feedback (chỉ ADMIN và STAFF)
    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public ResponseEntity<List<FeedbackResponseDTO>> getAllFeedbacks() {
        List<FeedbackResponseDTO> feedbacks = feedbackService.getAllFeedbacks();
        return ResponseEntity.ok(feedbacks);
    }
    
    // Lấy feedback theo ID
    @GetMapping("/{feedbackId}")
    public ResponseEntity<FeedbackResponseDTO> getFeedbackById(@PathVariable Integer feedbackId) {
        try {
            FeedbackResponseDTO feedback = feedbackService.getFeedbackById(feedbackId);
            return ResponseEntity.ok(feedback);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Lấy feedback theo booking ID
    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<FeedbackResponseDTO> getFeedbackByBookingId(@PathVariable Integer bookingId) {
        try {
            FeedbackResponseDTO feedback = feedbackService.getFeedbackByBookingId(bookingId);
            return ResponseEntity.ok(feedback);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Tạo feedback mới (CUSTOMER có thể tạo cho booking của mình)
    @PostMapping
    public ResponseEntity<?> createFeedback(@Valid @RequestBody FeedbackRequestDTO requestDTO) {
        try {
            FeedbackResponseDTO feedback = feedbackService.createFeedback(requestDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(feedback);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    // Cập nhật feedback
    @PutMapping("/{feedbackId}")
    public ResponseEntity<?> updateFeedback(@PathVariable Integer feedbackId, 
                                          @Valid @RequestBody FeedbackRequestDTO requestDTO) {
        try {
            FeedbackResponseDTO feedback = feedbackService.updateFeedback(feedbackId, requestDTO);
            return ResponseEntity.ok(feedback);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    // Xóa feedback (chỉ ADMIN)
    @DeleteMapping("/{feedbackId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteFeedback(@PathVariable Integer feedbackId) {
        try {
            feedbackService.deleteFeedback(feedbackId);
            return ResponseEntity.ok("Xóa feedback thành công!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    // Lấy feedback theo rating
    @GetMapping("/rating/{rating}")
    public ResponseEntity<List<FeedbackResponseDTO>> getFeedbacksByRating(@PathVariable Integer rating) {
        if (rating < 1 || rating > 5) {
            return ResponseEntity.badRequest().build();
        }
        List<FeedbackResponseDTO> feedbacks = feedbackService.getFeedbacksByRating(rating);
        return ResponseEntity.ok(feedbacks);
    }
    
    // Lấy feedback có rating cao (>= 4 sao) - dành cho hiển thị public
    @GetMapping("/positive")
    public ResponseEntity<List<FeedbackResponseDTO>> getPositiveFeedbacks() {
        List<FeedbackResponseDTO> feedbacks = feedbackService.getFeedbacksByRating(4);
        feedbacks.addAll(feedbackService.getFeedbacksByRating(5));
        return ResponseEntity.ok(feedbacks);
    }
}
