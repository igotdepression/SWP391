package com.bloodline.bloodline_backend.repository;

import com.bloodline.bloodline_backend.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    List<Booking> findByUserUserID(Integer userID);
    List<Booking> findByStatus(String status);
    List<Booking> findByServiceServiceID(Integer serviceID);
} 