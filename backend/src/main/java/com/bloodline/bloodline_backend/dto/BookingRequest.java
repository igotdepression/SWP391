package com.bloodline.bloodline_backend.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
public class BookingRequest {
    
    // Personal Information
    private String fullName;
    private String phoneNumber;
    private String email;

    // Service Information
    private Integer serviceID;
    private String serviceType;    // From frontend dropdown
    private String testType;       // Dân sự / Hành chính
    private Integer numSamples;

    // Appointment Details
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String collectionMethod;  // Hình thức lấy mẫu
    private String collectionAddress; // Địa chỉ lấy mẫu (nếu tại nhà)

    // Additional Information
    private String notes;           // Ghi chú (nếu có)
    private String paymentMethod;   // Phương thức thanh toán

    // Participants Information
    private List<ParticipantDTO> participants;
} 