package com.dna.service;

import com.dna.entity.SurchargePrice;
import com.dna.repository.SurchargePriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SurchargeService {
    @Autowired
    private SurchargePriceRepository surchargeRepo;

    public List<SurchargePrice> findAll() {
        // Chỉ trả về các phụ phí chưa bị xóa mềm
        return surchargeRepo.findAll().stream()
            .filter(s -> s.getStatus() == null || !s.getStatus().equals("Ngừng hoạt động"))
            .toList();
    }

    public SurchargePrice save(SurchargePrice surcharge) {
        return surchargeRepo.save(surcharge);
    }

    public SurchargePrice update(Integer id, SurchargePrice surcharge) {
        SurchargePrice existing = surchargeRepo.findById(id).orElseThrow();
        existing.setSampleType(surcharge.getSampleType());
        existing.setSurcharge(surcharge.getSurcharge());
        existing.setNote(surcharge.getNote());
        return surchargeRepo.save(existing);
    }

    public void delete(Integer id) {
        SurchargePrice surcharge = surchargeRepo.findById(id).orElseThrow();
        surcharge.setStatus("Ngừng hoạt động");
        surchargeRepo.save(surcharge);
    }
} 