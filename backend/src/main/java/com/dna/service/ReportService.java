package com.dna.service;

import java.util.Map;

public interface ReportService {
    Map<String, Object> getRevenueReport(String type, String from, String to);
    Map<String, Object> getFeedbackReport(String from, String to);
}
