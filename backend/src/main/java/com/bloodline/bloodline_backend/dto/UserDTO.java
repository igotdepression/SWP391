package com.bloodline.bloodline_backend.dto;

import lombok.Data;

@Data
public class UserDTO {
    private Integer id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String role;
    private String status;
    private String address;
}