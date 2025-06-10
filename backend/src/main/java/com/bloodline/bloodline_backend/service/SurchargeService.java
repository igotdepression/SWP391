package com.bloodline.bloodline_backend.service;

import com.bloodline.bloodline_backend.entity.Surcharge;
import com.bloodline.bloodline_backend.repository.SurchargeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SurchargeService {

    @Autowired
    private SurchargeRepository surchargeRepository;

    public List<Surcharge> findAll() {
        return surchargeRepository.findAll();
    }

    public Optional<Surcharge> findById(Integer id) {
        return surchargeRepository.findById(id);
    }

    public Surcharge save(Surcharge surcharge) {
        return surchargeRepository.save(surcharge);
    }

    public void deleteById(Integer id) {
        surchargeRepository.deleteById(id);
    }
} 