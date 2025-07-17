package com.dna.repository;

import com.dna.entity.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TestResultRepository extends JpaRepository<TestResult, Integer> {
    
    /**
     * Find test result by booking ID
     */
    Optional<TestResult> findByBookingBookingID(Integer bookingID);
    
    /**
     * Check if test result exists for a booking
     */
    boolean existsByBookingBookingID(Integer bookingID);
    
    /**
     * Find test results within a date range
     */
    List<TestResult> findByResultDateBetween(LocalDate startDate, LocalDate endDate);
    
    /**
     * Find test results by created date
     */
    List<TestResult> findByCreatedDate(LocalDate createdDate);
    
    /**
     * Find test results by created by user
     */
    List<TestResult> findByCreatedBy(String createdBy);
    
    /**
     * Find test results by result conclusion containing text
     */
    @Query("SELECT tr FROM TestResult tr WHERE tr.resultConclution LIKE %:keyword%")
    List<TestResult> findByResultConclusionContaining(@Param("keyword") String keyword);
    
    /**
     * Find test results with booking status
     */
    @Query("SELECT tr FROM TestResult tr WHERE tr.booking.status = :status")
    List<TestResult> findByBookingStatus(@Param("status") String status);
    
    /**
     * Find test results by customer name
     */
    @Query("SELECT tr FROM TestResult tr WHERE tr.booking.user.fullName LIKE %:customerName%")
    List<TestResult> findByCustomerNameContaining(@Param("customerName") String customerName);
}
