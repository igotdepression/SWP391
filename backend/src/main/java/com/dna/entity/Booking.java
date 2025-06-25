// src/main/java/com/dna/entity/Booking.java
package com.dna.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor; // Thêm NoArgsConstructor
import lombok.AllArgsConstructor; // Thêm AllArgsConstructor

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime; // Thêm import LocalTime

import java.util.List;

@Data
@Entity
@Table(name = "Booking") // Đảm bảo tên bảng khớp chính xác với database của bạn
@Setter
@Getter
@NoArgsConstructor // Thêm constructor không đối số
@AllArgsConstructor // Thêm constructor có tất cả đối số
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookingID")
    private Integer bookingID;

    @ManyToOne(fetch = FetchType.LAZY) // Đảm bảo mối quan hệ ManyToOne với User
    @JoinColumn(name = "userID", nullable = false)
    private User user; // Đối tượng User liên kết

    @ManyToOne(fetch = FetchType.LAZY) // Đảm bảo mối quan hệ ManyToOne với Services
    @JoinColumn(name = "serviceID", nullable = false)
    private Services service; // Đối tượng Services liên kết

    private LocalDate bookingDate;

    @Column(name = "appointmentDate")
    private LocalDate appointmentDate;

    @Column(name = "appointmentTime") // <-- Thêm cột giờ hẹn
    private LocalTime appointmentTime; // <-- Kiểu dữ liệu LocalTime

    private String status;

    private BigDecimal totalPrice;

    @Column(columnDefinition = "NVARCHAR(MAX)") // Có thể cần nếu ghi chú dài
    private String expertNotes;
    private String resultFileUrl; // để lưu URL của file kết quả
    private LocalDate updateDate;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Participant> participants;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Sample> samples; // Một booking có nhiều sample

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private Payment payment;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private TestResult testResult;
    
    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private Feedback feedback;
}