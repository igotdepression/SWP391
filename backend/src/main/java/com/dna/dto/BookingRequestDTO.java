package com.dna.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequestDTO {
    
    @NotNull(message = "User ID cannot be null")
    private Integer userId;

    @NotNull(message = "Service ID cannot be null")
    private Integer serviceId;

    @NotNull(message = "Appointment date cannot be null")
    private LocalDateTime appointmentDate;

    @NotNull(message = "Participants list cannot be null")
    private List<@Valid ParticipantRequestDTO> participants; // Danh sách người tham gia và mẫu
}
