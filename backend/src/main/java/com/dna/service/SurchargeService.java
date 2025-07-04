package com.dna.service;

import com.dna.entity.SurchargePrice;
import com.dna.repository.ServicePriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SurchargeService {

    @Autowired
    private ServicePriceRepository surchargeRepository;

    public List<SurchargePrice> findAll() {
        return surchargeRepository.findAll();
    }

    public Optional<SurchargePrice> findById(Integer id) {
        return surchargeRepository.findById(id);
    }

    public SurchargePrice save(SurchargePrice surcharge) {
        return surchargeRepository.save(surcharge);
    }

    public void deleteById(Integer id) {
        surchargeRepository.deleteById(id);
    }
} 