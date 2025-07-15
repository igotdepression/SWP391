package com.dna.service;

import com.dna.entity.Booking;
import com.dna.entity.Feedback;
import com.dna.repository.BookingRepository;
import com.dna.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportServiceImpl implements ReportService {
    // BookingRepository dùng để truy vấn thông tin các đơn đặt dịch vụ (booking)
    @Autowired
    private BookingRepository bookingRepository;
    // FeedbackRepository dùng để truy vấn thông tin đánh giá của khách hàng
    @Autowired
    private FeedbackRepository feedbackRepository;

    /**
     * Lấy báo cáo doanh thu trong khoảng thời gian (theo ngày/tháng/năm)
     * @param type kiểu báo cáo (day/month/year) - hiện tại chưa dùng, có thể mở rộng sau
     * @param from ngày bắt đầu (yyyy-MM-dd)
     * @param to ngày kết thúc (yyyy-MM-dd)
     * @return Map gồm tổng doanh thu và tổng số đơn hàng
     */
    
    @Override
    public Map<String, Object> getRevenueReport(String type, String from, String to) {
        LocalDate fromDate = LocalDate.parse(from); // Chuyển chuỗi ngày sang LocalDate
        LocalDate toDate = LocalDate.parse(to);
        // Lấy danh sách booking trong khoảng thời gian
        List<Booking> bookings = bookingRepository.findByBookingDateBetween(fromDate, toDate);
        int totalOrders = bookings.size(); // Tổng số đơn hàng
        // Tính tổng doanh thu từ các booking
        double totalRevenue = bookings.stream()
                .map(b -> b.getTotalPrice() != null ? b.getTotalPrice().doubleValue() : 0)
                .reduce(0.0, Double::sum);
        Map<String, Object> result = new HashMap<>();
        result.put("totalRevenue", totalRevenue);
        result.put("totalOrders", totalOrders);
        return result;
    }

    /**
     * Lấy báo cáo phản hồi trong khoảng thời gian
     * @param from
     * @param to
     * @return Map
     */
    @Override
    public Map<String, Object> getFeedbackReport(String from, String to) {
        LocalDate fromDate = LocalDate.parse(from);
        LocalDate toDate = LocalDate.parse(to);
        // Lấy danh sách feedback trong khoảng thời gian
        List<Feedback> feedbacks = feedbackRepository.findByCreateDateBetween(fromDate, toDate);
        // Tính điểm trung bình đánh giá
        double avgRating = feedbacks.stream()
                .mapToInt(f -> f.getRating() != null ? f.getRating() : 0)
                .average().orElse(0.0);
        Map<String, Object> result = new HashMap<>();
        result.put("averageRating", avgRating);
        result.put("feedbacks", feedbacks); // Trả về danh sách feedback chi tiết
        return result;
    }
}
