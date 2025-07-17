package com.dna.controller;

import com.dna.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    @Autowired
    private ReportService reportService;

    // Báo cáo doanh thu
    @GetMapping("/revenue")
    public Map<String, Object> getRevenueReport(
            @RequestParam String type,
            @RequestParam String from,
            @RequestParam String to) {
        return reportService.getRevenueReport(type, from, to);
    }

    // Báo cáo đánh giá khách hàng
    @GetMapping("/feedback")
    public Map<String, Object> getFeedbackReport(
            @RequestParam String from,
            @RequestParam String to) {
        return reportService.getFeedbackReport(from, to);
    }
}
