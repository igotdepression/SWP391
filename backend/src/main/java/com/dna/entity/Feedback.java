package com.dna.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "Feedback")
@Getter
@Setter
public class Feedback {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedbackID")
    private Integer feedbackID;

    @OneToOne
    @JoinColumn(name = "bookingID", unique = true)
    private Booking booking;

    @Column(name = "comments", columnDefinition = "NVARCHAR(MAX)")
    private String comments;

    @Column(name = "rating")
    @Min(value = 1, message = "Rating phải từ 1 đến 5")
    @Max(value = 5, message = "Rating phải từ 1 đến 5")
    private Integer rating;

    @Column(name = "createDate")
    private LocalDate createDate;
}
