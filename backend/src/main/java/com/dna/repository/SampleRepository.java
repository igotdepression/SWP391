package com.dna.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dna.entity.Sample;

@Repository
public interface SampleRepository extends JpaRepository<Sample, Integer> {
    
    // Tìm sample theo bookingID
    List<Sample> findByBookingBookingID(Integer bookingID);
    
    // Tìm sample theo loại mẫu
    List<Sample> findBySampleType(String sampleType);
    
    // Tìm sample theo loại thu mẫu
    List<Sample> findByTypeOfCollection(String typeOfCollection);
    
    // Tìm sample theo participantID
    List<Sample> findByParticipantParticipantID(Integer participantID);
    
    // Tìm sample theo staff ID
    List<Sample> findByStaffUserID(Integer staffID);
    
    // Tìm sample theo ngày nhận
    List<Sample> findByReceivedDate(LocalDate receivedDate);
    
    // Tìm sample trong khoảng thời gian
    List<Sample> findByReceivedDateBetween(LocalDate startDate, LocalDate endDate);
    
    // Tìm sample theo booking status
    @Query("SELECT s FROM Sample s WHERE s.booking.status = :status")
    List<Sample> findByBookingStatus(@Param("status") String status);
    
    // Đếm số sample theo booking ID
    Long countByBookingBookingID(Integer bookingID);
}
