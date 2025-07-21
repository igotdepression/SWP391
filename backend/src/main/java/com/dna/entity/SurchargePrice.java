package com.dna.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class SurchargePrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer surchargeID;

    private String sampleType;
    private Double surcharge;
    private String note;
    
    private String status; // Thêm trường trạng thái để xóa mềm
}
