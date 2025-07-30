package com.dna.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
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
@Table(name = "Consultant")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Consultant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "consultantID")
    private Integer consultantID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userID", nullable = true)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "password", "bookings", "samples", "blogPosts", "consultants"})
    private User staff;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "phone", nullable = false, length = 11)
    private String phone;

    @Column(name = "type", columnDefinition = "TEXT")
    private String type;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "consultantDate", nullable = true)
    private LocalDate consultantDate;

    @Column(name = "notes", length = 255, nullable = true)
    private String notes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "confirmBy", nullable = true)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "password", "bookings", "samples", "blogPosts", "consultants"})
    private User confirmedBy;

    @Column(name = "status", length = 255)
    private String status;

    @Column(name = "createdDate")
    private LocalDate createdDate;

} 