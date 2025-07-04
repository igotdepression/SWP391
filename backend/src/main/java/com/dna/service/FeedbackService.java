package com.dna.service;

import com.dna.dto.FeedbackRequestDTO;
import com.dna.dto.FeedbackResponseDTO;
import com.dna.entity.Booking;
import com.dna.entity.Feedback;
import com.dna.repository.BookingRepository;
import com.dna.repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedbackService {
    
    private final FeedbackRepository feedbackRepository;
    private final BookingRepository bookingRepository;
    
    public List<FeedbackResponseDTO> getAllFeedbacks() {
        return feedbackRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }
    
    public FeedbackResponseDTO getFeedbackById(Integer feedbackID) {
        Feedback feedback = feedbackRepository.findById(feedbackID)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy feedback với ID: " + feedbackID));
        return mapToResponseDTO(feedback);
    }
    
    public FeedbackResponseDTO getFeedbackByBookingId(Integer bookingID) {
        Feedback feedback = feedbackRepository.findByBookingBookingID(bookingID)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy feedback cho booking ID: " + bookingID));
        return mapToResponseDTO(feedback);
    }
    
    public FeedbackResponseDTO createFeedback(FeedbackRequestDTO requestDTO) {
        // Kiểm tra booking có tồn tại không
        Booking booking = bookingRepository.findById(requestDTO.getBookingID())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy booking với ID: " + requestDTO.getBookingID()));
        
        // Kiểm tra booking đã có feedback chưa
        if (feedbackRepository.existsByBookingBookingID(requestDTO.getBookingID())) {
            throw new RuntimeException("Booking này đã có feedback rồi!");
        }
        
        // Tạo feedback mới
        Feedback feedback = new Feedback();
        feedback.setBooking(booking);
        feedback.setComments(requestDTO.getComments());
        feedback.setRating(requestDTO.getRating());
        feedback.setCreateDate(LocalDate.now());
        
        Feedback savedFeedback = feedbackRepository.save(feedback);
        return mapToResponseDTO(savedFeedback);
    }
    
    public FeedbackResponseDTO updateFeedback(Integer feedbackID, FeedbackRequestDTO requestDTO) {
        Feedback feedback = feedbackRepository.findById(feedbackID)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy feedback với ID: " + feedbackID));
        
        feedback.setComments(requestDTO.getComments());
        feedback.setRating(requestDTO.getRating());
        
        Feedback updatedFeedback = feedbackRepository.save(feedback);
        return mapToResponseDTO(updatedFeedback);
    }
    
    public void deleteFeedback(Integer feedbackID) {
        if (!feedbackRepository.existsById(feedbackID)) {
            throw new RuntimeException("Không tìm thấy feedback với ID: " + feedbackID);
        }
        feedbackRepository.deleteById(feedbackID);
    }
    
    public List<FeedbackResponseDTO> getFeedbacksByRating(Integer rating) {
        return feedbackRepository.findByRating(rating).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }
    
    private FeedbackResponseDTO mapToResponseDTO(Feedback feedback) {
        FeedbackResponseDTO responseDTO = new FeedbackResponseDTO();
        responseDTO.setFeedbackID(feedback.getFeedbackID());
        responseDTO.setBookingID(feedback.getBooking().getBookingID());
        responseDTO.setComments(feedback.getComments());
        responseDTO.setRating(feedback.getRating());
        responseDTO.setCreateDate(feedback.getCreateDate());
        
        // Thêm thông tin customer từ booking
        if (feedback.getBooking().getUser() != null) {
            responseDTO.setCustomerName(feedback.getBooking().getUser().getFullName());
            responseDTO.setCustomerEmail(feedback.getBooking().getUser().getEmail());
        }
        
        return responseDTO;
    }
}
