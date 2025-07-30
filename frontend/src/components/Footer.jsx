import React from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';


const Footer = () => {
  const navigate = useNavigate();
  // Hàm xử lý khi người dùng click vào loại xét nghiệm ADN
  const handleAdnTypeClick = (route) => {
    navigate(route);
    setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
  };

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
              <span>Thứ 2 - Thứ 6: 8:00 - 17:00<br />Thứ 7: 8:00 - 12:00</span>
            </div>
          </div>
        </div>

        {/* Cột 3: Dịch vụ */}
        <div className="footer-section service-section">
          <h3>DỊCH VỤ</h3>
          <ul>
            <li>
              <a onClick={() => handleAdnTypeClick("/services/father-child")}>Xét nghiệm ADN cha con</a>
            </li>
            <li>
              <a onClick={() => handleAdnTypeClick("/services/mother-child")}>Xét nghiệm ADN mẹ con</a>
            </li>
            <li>
              <a onClick={() => handleAdnTypeClick("/services/grandfather-grandchild")}>Xét nghiệm ADN ông cháu</a>
            </li>
            <li>
              <a onClick={() => handleAdnTypeClick("/services/grandmother-grandchild")}>Xét nghiệm ADN bà cháu</a>
            </li>
            <li>
              <a onClick={() => handleAdnTypeClick("/services/siblings")}>Xét nghiệm ADN anh em</a>
            </li>
            <li>
              <a onClick={() => handleAdnTypeClick("/services/pretanal")}>Xét nghiệm ADN thai nhi</a>
            </li>
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
          <h3 className="quick-links">HỖ TRỢ</h3>
          <ul>
            <li><a href="#booking" onClick={() => handleAdnTypeClick("/booking")}>Đặt lịch hẹn</a></li>
            <li><a href="#consultation" onClick={() => handleAdnTypeClick("/consultation")}>Đăng ký tư vấn</a></li>
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