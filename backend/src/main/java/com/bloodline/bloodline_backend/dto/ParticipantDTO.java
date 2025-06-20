package com.bloodline.bloodline_backend.dto;

import lombok.Data;

@Data
public class ParticipantDTO {
    private String fullName;
    private Integer age;
    private Integer dob;
    private String gender;
    private String cccd;
    private String address;
    private String relationship;
    private String collectionMethod;
} 