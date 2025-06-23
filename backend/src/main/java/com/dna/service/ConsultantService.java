package com.dna.service;

import com.dna.entity.Consultant;
import com.dna.entity.User;
import com.dna.repository.ConsultantRepository;
import com.dna.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ConsultantService {

    @Autowired
    private ConsultantRepository consultantRepository;

    @Autowired
    private UserRepository userRepository; // Để tìm User theo ID

    public Consultant requestConsultation(Integer userId, LocalDateTime consultantDate, String notes) {
        // 1. Kiểm tra userId có tồn tại không
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User with ID " + userId + " not found.");
        }
        User user = userOptional.get();

        // 2. Tạo đối tượng Consultant
        Consultant consultation = new Consultant();
        consultation.setUser(user);
        consultation.setConsultantDate(consultantDate);
        consultation.setNotes(notes);
        consultation.setStatus("Pending"); // Trạng thái mặc định

        // 3. Lưu vào cơ sở dữ liệu
        return consultantRepository.save(consultation);
    }

    // Các phương thức khác: lấy danh sách tư vấn, cập nhật trạng thái, ...
    public Optional<Consultant> getConsultationById(Integer id) {
        return consultantRepository.findById(id);
    }
}