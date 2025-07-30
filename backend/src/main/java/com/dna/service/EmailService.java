package com.dna.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    public void sendPasswordResetEmail(String to, String resetLink) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Đặt lại mật khẩu - Bloodline");
            message.setText(
                "Xin chào,\n\n" +
                "Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản Bloodline.\n\n" +
                "Vui lòng click vào link bên dưới để đặt lại mật khẩu:\n" +
                resetLink + "\n\n" +
                "Link này có hiệu lực trong 1 giờ.\n\n" +
                "Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.\n\n" +
                "Trân trọng,\n" +
                "Đội ngũ Bloodline"
            );
            
            mailSender.send(message);
            System.out.println("Email sent successfully to: " + to);
            System.out.println("Reset link: " + resetLink);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
            // Trong môi trường development, vẫn trả về thành công và in link ra console
            System.out.println("=== DEVELOPMENT MODE ===");
            System.out.println("Email would be sent to: " + to);
            System.out.println("Reset link: " + resetLink);
            System.out.println("========================");
        }
    }
} 