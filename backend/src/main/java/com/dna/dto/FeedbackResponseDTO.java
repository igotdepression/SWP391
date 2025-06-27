package com.dna.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class FeedbackResponseDTO {
    
    private Integer feedbackID;
    private Integer bookingID;
    private String comments;
    private Integer rating;
    private LocalDate createDate;
    
    // Thông tin booking liên quan
    private String customerName;
    private String customerEmail;
}
