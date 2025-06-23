package com.dna.service;

import com.dna.entity.ServicePrice;
import com.dna.repository.ServicePriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SurchargeService {

    @Autowired
    private ServicePriceRepository surchargeRepository;

    public List<ServicePrice> findAll() {
        return surchargeRepository.findAll();
    }

    public Optional<ServicePrice> findById(Integer id) {
        return surchargeRepository.findById(id);
    }

    public ServicePrice save(ServicePrice surcharge) {
        return surchargeRepository.save(surcharge);
    }

    public void deleteById(Integer id) {
        surchargeRepository.deleteById(id);
    }
} 