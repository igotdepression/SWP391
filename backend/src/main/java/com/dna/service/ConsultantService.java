package com.dna.service;

import com.dna.entity.Consultant;
import com.dna.entity.User;
import com.dna.entity.Role;
import com.dna.repository.ConsultantRepository;
import com.dna.repository.UserRepository;
import com.dna.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;
import java.util.List;

@Service
@Transactional
public class ConsultantService {

    private static final Logger logger = LoggerFactory.getLogger(ConsultantService.class);

    @Autowired
    private ConsultantRepository consultantRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

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
            
            // Find a default staff user to assign to this consultation
            // Since userID is NOT NULL in the database, we need to assign a staff user
            User defaultStaff = findDefaultStaffUser();
            consultation.setStaff(defaultStaff);
            
            // Set other nullable fields
            consultation.setConfirmedBy(null); // confirmBy field
            consultation.setNotes(null); // notes field
            
            logger.info("Saving consultation: name={}, phone={}, type={}, staff={}", 
                name, phone, type, defaultStaff.getEmail());
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

    /**
     * Find a default staff user to assign to consultation requests
     * This is needed because the database requires a userID (NOT NULL)
     */
    private User findDefaultStaffUser() {
        try {
            // First try to find a STAFF role
            Optional<Role> staffRole = roleRepository.findByRoleName("STAFF");
            if (staffRole.isPresent()) {
                // Find users with STAFF role
                List<User> staffUsers = userRepository.findByRoleRoleID(staffRole.get().getRoleID());
                if (!staffUsers.isEmpty()) {
                    // Return the first available staff user
                    User staffUser = staffUsers.get(0);
                    logger.info("Found default staff user: {}", staffUser.getEmail());
                    return staffUser;
                }
            }
            
            // If no staff users found, try to find any active user
            List<User> activeUsers = userRepository.findByStatus("active");
            if (!activeUsers.isEmpty()) {
                User defaultUser = activeUsers.get(0);
                logger.warn("No staff users found, using default user: {}", defaultUser.getEmail());
                return defaultUser;
            }
            
            // If no users found at all, this is a critical error
            throw new IllegalStateException("No users found in the system. Cannot create consultation request.");
            
        } catch (Exception e) {
            logger.error("Error finding default staff user", e);
            throw new IllegalStateException("Unable to assign staff user to consultation request: " + e.getMessage());
        }
    }

    // Các phương thức khác: lấy danh sách tư vấn, cập nhật trạng thái, ...
    @Transactional(readOnly = true)
    public Optional<Consultant> getConsultationById(Integer id) {
        return consultantRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public java.util.List<Consultant> getAllConsultations() {
        return consultantRepository.findAll();
    }
}