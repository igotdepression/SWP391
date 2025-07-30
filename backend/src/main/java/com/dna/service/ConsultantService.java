package com.dna.service;

import com.dna.entity.Consultant;
import com.dna.entity.User;
import com.dna.repository.ConsultantRepository;
import com.dna.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class ConsultantService {

    private static final Logger logger = LoggerFactory.getLogger(ConsultantService.class);

    @Autowired
    private ConsultantRepository consultantRepository;

    @Autowired
    private UserRepository userRepository; // Để tìm User theo ID

    public Consultant requestConsultation(String name, String phone, String type, String note) {
        try {
            // Validate input parameters
            if (name == null || name.trim().isEmpty()) {
                throw new IllegalArgumentException("Name cannot be null or empty");
            }
            if (phone == null || phone.trim().isEmpty()) {
                throw new IllegalArgumentException("Phone cannot be null or empty");
            }
            if (type == null || type.trim().isEmpty()) {
                throw new IllegalArgumentException("Type cannot be null or empty");
            }

            Consultant consultation = new Consultant();
            
            // Set required fields
            consultation.setName(name.trim());
            consultation.setPhone(phone.trim());
            consultation.setType(type.trim());
            consultation.setContent(note != null ? note.trim() : ""); // mapping note vào content
            consultation.setStatus("đang chờ xử lý"); // Trạng thái mặc định
            consultation.setCreatedDate(LocalDate.now());
            consultation.setConsultantDate(LocalDate.now()); // Luôn set ngày hiện tại
            
            // Explicitly set nullable fields to null to avoid database constraint issues
            consultation.setStaff(null); // userID field
            consultation.setConfirmedBy(null); // confirmBy field
            consultation.setNotes(null); // notes field
            
            logger.info("Saving consultation: name={}, phone={}, type={}", name, phone, type);
            Consultant savedConsultation = consultantRepository.save(consultation);
            logger.info("Successfully saved consultation with ID: {}", savedConsultation.getConsultantID());
            
            return savedConsultation;
        } catch (DataIntegrityViolationException e) {
            logger.error("Database constraint violation while creating consultation", e);
            // Try to provide more specific error message
            if (e.getMessage().contains("userID")) {
                throw new IllegalArgumentException("Database constraint error: userID column does not allow null values. Please contact administrator.");
            } else if (e.getMessage().contains("confirmBy")) {
                throw new IllegalArgumentException("Database constraint error: confirmBy column does not allow null values. Please contact administrator.");
            } else {
                throw new IllegalArgumentException("Database constraint error: " + e.getMessage());
            }
        } catch (Exception e) {
            logger.error("Error creating consultation: name={}, phone={}, type={}", name, phone, type, e);
            throw e;
        }
    }

    // Các phương thức khác: lấy danh sách tư vấn, cập nhật trạng thái, ...
    public Optional<Consultant> getConsultationById(Integer id) {
        return consultantRepository.findById(id);
    }

    public java.util.List<Consultant> getAllConsultations() {
        return consultantRepository.findAll();
    }
}