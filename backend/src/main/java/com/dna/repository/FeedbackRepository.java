package com.dna.repository;

import com.dna.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
    
    // Tìm feedback theo bookingID
    Optional<Feedback> findByBookingBookingID(Integer bookingID);
    
    // Tìm tất cả feedback theo rating
    List<Feedback> findByRating(Integer rating);
    
    // Tìm feedback có rating >= giá trị nhất định
    List<Feedback> findByRatingGreaterThanEqual(Integer rating);
    
    // Kiểm tra booking đã có feedback chưa
    boolean existsByBookingBookingID(Integer bookingID);
}
