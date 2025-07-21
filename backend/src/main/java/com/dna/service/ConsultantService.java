package com.dna.service;

import com.dna.entity.Consultant;
import com.dna.entity.User;
import com.dna.repository.ConsultantRepository;
import com.dna.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class ConsultantService {

    @Autowired
    private ConsultantRepository consultantRepository;

    @Autowired
    private UserRepository userRepository; // Để tìm User theo ID

    public Consultant requestConsultation(String name, String phone, String type, String note) {
        Consultant consultation = new Consultant();
        consultation.setName(name);
        consultation.setPhone(phone);
        consultation.setType(type);
        consultation.setContent(note); // mapping note vào content
        consultation.setStatus("đang chờ xử lý"); // Trạng thái mặc định
        consultation.setCreatedDate(java.time.LocalDate.now());
        consultation.setConsultantDate(java.time.LocalDate.now()); // Luôn set ngày hiện tại
        return consultantRepository.save(consultation);
    }

    // Các phương thức khác: lấy danh sách tư vấn, cập nhật trạng thái, ...
    public Optional<Consultant> getConsultationById(Integer id) {
        return consultantRepository.findById(id);
    }

    public java.util.List<Consultant> getAllConsultations() {
        return consultantRepository.findAll();
    }
}