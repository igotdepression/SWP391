// src/main/java/com/dna/dto/BookingResponseDTO.java
package com.dna.dto;

import com.dna.entity.Booking;
//import com.dna.entity.Services; // Import Service
//import com.dna.entity.User; // Import User
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//import java.math.BigDecimal;
import java.time.LocalDate;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponseDTO {
    private Integer bookingID;
    private Integer userID; // Thêm userID
    private String customerName; // Tên khách hàng
    private String phone;        // SĐT khách hàng
    private String email;        // Email khách hàng
    private String address;      // Thêm
    private String gender;       // Thêm
    private String dateOfBirth;  // Thêm
    private String serviceName;     // Đổi từ testType sang serviceName
    private String serviceType;  // Thêm
    private String packageType;  // Thêm
    private Integer numberSample; // Thêm
    private BigDecimal totalPrice; // Thêm
    private LocalDate bookingDate; // Ngày đăng ký
    private LocalDate appointmentDate; // Ngày lấy mẫu/hẹn
    private String status;       // Trạng thái booking (PENDING, PROCESSING, etc.)
    private String sampleStatus; // Tình trạng mẫu (giả định có trong Booking hoặc Service/Sample)
    private String resultFileUrl; // URL của file kết quả
    private String expertNotes;  // Ghi chú của chuyên gia
    private LocalDate updateDate; // Ngày cập nhật gần nhất
    private List<ParticipantDTO> participants;

    // Constructor để ánh xạ từ Booking entity
    public BookingResponseDTO(Booking booking) {
        this.bookingID = booking.getBookingID();
        this.userID = booking.getUser() != null ? booking.getUser().getUserID() : null; // Ánh xạ userID
        this.customerName = booking.getUser() != null ? booking.getUser().getFullName() : null;
        this.phone = booking.getUser() != null ? booking.getUser().getPhoneNumber() : null;
        this.email = booking.getUser() != null ? booking.getUser().getEmail() : null;
        this.address = booking.getUser() != null ? booking.getUser().getAddress() : null;
        this.gender = booking.getUser() != null ? booking.getUser().getGender() : null;
        this.dateOfBirth = booking.getUser() != null && booking.getUser().getDateOfBirth() != null ? booking.getUser().getDateOfBirth().toString() : null;
        this.serviceName = booking.getService() != null ? booking.getService().getServiceName() : null;
        this.serviceType = booking.getService() != null ? booking.getService().getServiceType() : null;
        this.packageType = booking.getService() != null ? booking.getService().getPackageType() : null;
        this.numberSample = booking.getNumberSample();
        this.totalPrice = booking.getTotalPrice();
        this.bookingDate = booking.getBookingDate();
        this.appointmentDate = booking.getAppointmentDate();
        this.status = booking.getStatus();
        // SampleStatus có thể lấy từ Booking hoặc liên quan đến Sample
        // Nếu Booking không trực tiếp có sampleStatus, bạn cần điều chỉnh logic này
        this.sampleStatus = "Đã nhận"; // <-- Cần thay đổi tùy theo logic thực tế của bạn
        this.expertNotes = booking.getNote(); // Giả định Booking entity có expertNotes
        this.updateDate = booking.getUpdateDate(); // Giả định Booking entity có updateDate
        this.resultFileUrl = null;
        this.participants = booking.getParticipants() != null ? booking.getParticipants().stream().map(ParticipantDTO::new).collect(Collectors.toList()) : null;
    }
}