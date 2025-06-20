package com.bloodline.bloodline_backend.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserDTO {
    private Integer id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String role;
    private String status;
    private String address;
    private LocalDate dateOfBirth;
    private String gender;
}