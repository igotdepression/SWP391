package com.dna.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.dna.entity.Consultant;
import com.dna.entity.User;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConsultationResponseDTO {
    private Integer consultantID;
    private String staffName;
    private String staffEmail;
    private String name;
    private String phone;
    private String type;
    private String content;
    private LocalDate consultantDate;
    private String notes;
    private String confirmedByName;
    private String confirmedByEmail;
    private String status;
    private LocalDate createdDate;

    public ConsultationResponseDTO(Consultant consultation) {
        this.consultantID = consultation.getConsultantID();
        this.name = consultation.getName();
        this.phone = consultation.getPhone();
        this.type = consultation.getType();
        this.content = consultation.getContent();
        this.consultantDate = consultation.getConsultantDate();
        this.notes = consultation.getNotes();
        this.status = consultation.getStatus();
        this.createdDate = consultation.getCreatedDate();
        
        // Handle staff user
        if (consultation.getStaff() != null) {
            this.staffName = consultation.getStaff().getFullName();
            this.staffEmail = consultation.getStaff().getEmail();
        }
        
        // Handle confirmed by user
        if (consultation.getConfirmedBy() != null) {
            this.confirmedByName = consultation.getConfirmedBy().getFullName();
            this.confirmedByEmail = consultation.getConfirmedBy().getEmail();
        }
    }
} 