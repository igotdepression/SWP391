package com.dna.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Data;

@Data
public class TestResultResponseDTO {
    
    private Integer testResultID;
    private Integer bookingID;
    private String customerName; // Tên khách hàng từ booking
    private LocalDate resultDate;
    private String createdBy;
    private LocalDate createdDate;
    private String resultConclution;
    private String resultFile;
    private String updatedBy;
    private LocalDate updatedDate;
    private String bookingStatus; // Trạng thái booking
    
    // Danh sách detail results
    private List<DetailResultResponseDTO> detailResults;
}
