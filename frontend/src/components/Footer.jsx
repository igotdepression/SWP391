import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Cột 1: Logo và thông tin công ty */}
        <div className="footer-section logo-section">
          <div className="footer-logo">
            <div className="logo-container">
              <img src="/logo.png" alt="DNA CHAIN Logo" className="footer-logo-img" />
              <div className="logo-text-container">
                <span className="logo-text">DNA CHAIN</span>
                <span className="logo-subtitle">CHÍNH XÁC - NHANH CHÓNG - BẢO MẬT</span>
              </div>
            </div>
          </div>
          <div className="company-description">
            <p>Trung tâm xét nghiệm ADN hàng đầu Việt Nam, cung cấp dịch vụ xác định huyết thống với độ chính xác cao nhất.</p>
          </div>
        </div>

        {/* Cột 2: Liên hệ */}
        <div className="footer-section contact-section">
          <h3>LIÊN HỆ</h3>
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>7 Đ. D1, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <span>0899 265 999 | 0899 65 9999</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <span>dnachain@gmail.com</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-clock"></i>
              <span>Thứ 2 - Thứ 6: 8:00 - 17:00<br/>Thứ 7: 8:00 - 12:00</span>
            </div>
          </div>
        </div>

        {/* Cột 3: Dịch vụ */}
        <div className="footer-section service-section">
          <h3>DỊCH VỤ</h3>
          <ul>
            <li><a href="#paternity">Xét nghiệm ADN cha con</a></li>
            <li><a href="#maternity">Xét nghiệm ADN mẹ con</a></li>
            <li><a href="#grandparents">Xét nghiệm ADN ông bà cháu</a></li>
            <li><a href="#siblings">Xét nghiệm ADN anh em</a></li>
            <li><a href="#consultation">Tư vấn miễn phí</a></li>
          </ul>
          
          <h3 className="quick-links">HỖ TRỢ</h3>
          <ul>
            <li><a href="#booking">Đặt lịch hẹn</a></li>
            <li><a href="#pricing">Bảng giá dịch vụ</a></li>
            <li><a href="#guide">Hướng dẫn lấy mẫu</a></li>
            <li><a href="#faq">Câu hỏi thường gặp</a></li>
          </ul>
        </div>

        {/* Cột 4: Kết nối & Chính sách */}
        <div className="footer-section connect-section">
          <h3 className="social-section-title">KẾT NỐI VỚI CHÚNG TÔI</h3>
          <div className="social-links">
            <a href="#" className="social-link zalo" aria-label="Zalo">
              <span className="zalo-icon">Z</span>
            </a>
            <a href="#" className="social-link facebook" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
          
          <h3 className="quick-links">CHÍNH SÁCH</h3>
          <ul>
            <li><a href="#privacy">Chính sách bảo mật</a></li>
            <li><a href="#terms">Điều khoản sử dụng</a></li>
            <li><a href="#security">Bảo mật thông tin</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© 2025 Bản quyền DNA CHAIN - All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
