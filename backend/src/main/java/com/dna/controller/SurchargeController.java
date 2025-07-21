package com.dna.controller;

import com.dna.entity.SurchargePrice;
import com.dna.service.SurchargeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/surcharges")
public class SurchargeController {
    @Autowired
    private SurchargeService surchargeService;

    @GetMapping
    public List<SurchargePrice> getAll() {
        return surchargeService.findAll();
    }

    @PostMapping
    public SurchargePrice add(@RequestBody SurchargePrice surcharge) {
        return surchargeService.save(surcharge);
    }

    @PutMapping("/{id}")
    public SurchargePrice update(@PathVariable Integer id, @RequestBody SurchargePrice surcharge) {
        return surchargeService.update(id, surcharge);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        surchargeService.delete(id);
    }
} 