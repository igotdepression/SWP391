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

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponseDTO {
    private Integer bookingID;
    private String customerName; // Tên khách hàng
    private String phone;        // SĐT khách hàng
    private String email;        // Email khách hàng
    private String testType;     // Loại xét nghiệm (tên dịch vụ)
    private LocalDate bookingDate; // Ngày đăng ký
    private LocalDate appointmentDate; // Ngày lấy mẫu/hẹn
    private String status;       // Trạng thái booking (PENDING, PROCESSING, etc.)
    private String sampleStatus; // Tình trạng mẫu (giả định có trong Booking hoặc Service/Sample)
    private String resultFileUrl; // URL của file kết quả
    private String expertNotes;  // Ghi chú của chuyên gia
    private LocalDate updateDate; // Ngày cập nhật gần nhất

    // Constructor để ánh xạ từ Booking entity
    public BookingResponseDTO(Booking booking) {
        this.bookingID = booking.getBookingID();
        this.customerName = booking.getUser() != null ? booking.getUser().getFullName() : null;
        this.phone = booking.getUser() != null ? booking.getUser().getPhoneNumber() : null;
        this.email = booking.getUser() != null ? booking.getUser().getEmail() : null;
        this.testType = booking.getService() != null ? booking.getService().getServiceName() : null; // Giả định Service có getServiceName()
        this.bookingDate = booking.getBookingDate();
        this.appointmentDate = booking.getAppointmentDate();
        this.status = booking.getStatus();
        // Giả định sampleStatus có thể lấy từ Booking hoặc liên quan đến Sample
        // Nếu Booking không trực tiếp có sampleStatus, bạn cần điều chỉnh logic này
        this.sampleStatus = "Đã nhận"; // <-- Cần thay đổi tùy theo logic thực tế của bạn
        this.resultFileUrl = booking.getResultFileUrl(); // Giả định Booking entity có resultFileUrl
        this.expertNotes = booking.getExpertNotes(); // Giả định Booking entity có expertNotes
        this.updateDate = booking.getUpdateDate(); // Giả định Booking entity có updateDate
    }
}