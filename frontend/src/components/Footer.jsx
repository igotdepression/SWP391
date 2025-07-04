import React from 'react';
import './Footer.css'; // Import file CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Cột 1: Logo, Tên, và Khẩu hiệu */}
        <div className="footer-left">
          <div className="footer-logo">
            <div className="logo-icon">DNA</div>
            <div className="logo-name">DNAChain</div>
          </div>
          <p className="footer-slogan">
            Phòng xét nghiệm ADN hàng đầu Việt Nam với công nghệ tiên tiến và đội ngũ chuyên gia có kinh nghiệm hơn 15 năm trong lĩnh vực xét nghiệm di truyền học.
          </p>
          <div className="footer-certifications">
            <p>Chứng nhận ISO 15189:2012</p>
            <p>Giấy phép hoạt động số 123/BYT</p>
            <p>Hơn 50,000 khách hàng tin tưởng</p>
          </div>
        </div>

        {/* Cột 2: Dịch vụ */}
        <div className="footer-services">
          <h3>Dịch vụ xét nghiệm ADN</h3>
          <ul>
            <li>Xét nghiệm ADN xác định quan hệ huyết thống</li>
            <li>Test ADN cha con (Paternity test)</li>
            <li>Xét nghiệm ADN anh chị em ruột</li>
            <li>Test ADN ông bà - cháu</li>
            <li>Xét nghiệm ADN tiền sinh (Pre-natal)</li>
            <li>Giám định ADN pháp y</li>
            <li>Test ADN tìm nguồn gốc dân tộc</li>
          </ul>
        </div>

        {/* Cột 3: Hỗ trợ khách hàng */}
        <div className="footer-support">
          <h3>Hỗ trợ khách hàng</h3>
          <ul>
            <li>Hướng dẫn lấy mẫu xét nghiệm</li>
            <li>Quy trình xét nghiệm ADN</li>
            <li>Tra cứu kết quả online</li>
            <li>Câu hỏi thường gặp</li>
            <li>Chính sách bảo mật thông tin</li>
            <li>Điều khoản sử dụng dịch vụ</li>
            <li>Chế độ bảo hành kết quả</li>
          </ul>
        </div>

        {/* Cột 4: Liên hệ */}
        <div className="footer-contact">
          <h3>Liên hệ</h3>
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>Trụ sở chính: 123 Nguyễn Văn Cừ, Quận 5, TP.HCM</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-phone-alt"></i>
            <span>Hotline: 1900 2468 (24/7 - Miễn phí tư vấn)</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <span>Email: info@dnachain.vn</span>
          </div>
          <p>Giờ làm việc: T2-T6: 7:30 - 17:30 | T7-CN: 8:00 - 12:00</p>
          {/* Dấu gạch dưới trụ sở chính */}
          <div className="footer-divider"></div>
        </div>
      </div>

      {/* Phần thêm: Chịu trách nhiệm nội dung và Giám đốc */}
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <p>&copy; 2025 DNAChain - Phòng xét nghiệm ADN. Giấy phép hoạt động số 123/BYT-GP do Bộ Y tế cấp.</p>
          <p>Trụ sở chính: 123 Nguyễn Văn Cừ, Quận 5, TP.HCM</p>
        </div>
        <div className="footer-bottom-right">
          <p>Chịu trách nhiệm nội dung: Nguyễn Văn A</p>
          <p>Giám đốc: Trần Thị B</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;