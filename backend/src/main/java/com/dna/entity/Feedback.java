package com.dna.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import lombok.NoArgsConstructor;


import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Feedback")
public class Feedback {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedbackID")
    private Integer feedbackID;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bookingID", nullable = false)
    private Booking booking;

    @Column(name = "comments")
    private String comments;

    @Column(name = "answers")
    private String answers;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "createDate")
    private LocalDate createDate;

    @Column(name = "returnDate")
    private LocalDate returnDate;

    @Column(name = "status")
    private String status;
}