package com.bloodline.bloodline_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Table(name = "[User]")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userID")
    private Integer userID;

    @ManyToOne
    @JoinColumn(name = "roleID")
    private Role role;

    @Column(name = "fullName", nullable = false)
    private String fullName;

    @Column(name = "phoneNumber")
    private String phoneNumber;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "dateOfBirth")
    private LocalDate dateOfBirth;

    @Column(name = "gender")
    private String gender;

    @Column(name = "address")
    private String address;

    @Column(name = "status", nullable = false)
    private String status = "Active";

    @OneToMany(mappedBy = "user")
    private List<Booking> bookings;

    @OneToMany(mappedBy = "user")
    private List<Sample> samples;

    @OneToMany(mappedBy = "user")
    private List<BlogPost> blogPosts;

    @OneToMany(mappedBy = "user")
    private List<Consultant> consultants;
} 