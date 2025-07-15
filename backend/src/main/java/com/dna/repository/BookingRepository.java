package com.dna.repository;

import com.dna.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    List<Booking> findByUser_UserID(Integer userID);
    List<Booking> findByStatus(String status);
    List<Booking> findByServiceServiceID(Integer serviceID);
    // Báo cáo doanh thu theo ngày/tháng/năm
    List<Booking> findByBookingDateBetween(LocalDate from, LocalDate to);
}





