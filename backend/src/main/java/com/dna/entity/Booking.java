// src/main/java/com/dna/entity/Booking.java
package com.dna.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor; 

import java.math.BigDecimal;
import java.time.LocalDate;

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
    private ServiceEntity service; // Đối tượng Services liên kết

    @Column(name = "numberSample")
    private Integer numberSample;

    @Column(name = "bookingDate")
    private LocalDate bookingDate;

    @Column(name = "status")
    private String status;

    @Column(name = "totalPrice")
    private BigDecimal totalPrice;

    @Column(name = "appointmentDate")
    private LocalDate appointmentDate;

    @Column(name = "note")
    private String note;

    @Column(name = "updateDate")
    private LocalDate updateDate;

    @Column(name = "updateBy")
    private String updateBy;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "updateBy")
    private User staff;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private Payment payment;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private Feedback feedback;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private TestResult testResult;
}