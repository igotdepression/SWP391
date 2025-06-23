import React from "react";
import { Link } from "react-router-dom";
import "./About.css";
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '../hooks/useNavigation';
import Header from '../components/Header';
import Footer from '../components/Footer';

function About() {
  const { user } = useAuth(); // Get user info
  const { goToProfile } = useNavigation(); // Use navigation hook

  return (
    <div className="about-container">
      <Header />
      <main className="about-content">
        <section className="adn-about-banner">
          <img src="/img/about-full-banner.jpg" alt="Banner Giới thiệu ADN Chain" className="adn-about-banner-img" />
        </section>
        <section className="adn-about-content-box">
          <div className="adn-about-row">
            <div className="adn-about-col-left">
              <h1 className="adn-about-title">Giới thiệu về ADN Chain</h1>
              <div className="adn-about-description">
                <p>
                  <strong>ADN Chain</strong> là đơn vị tiên phong trong lĩnh vực xét nghiệm di truyền tại Việt Nam, cung cấp các dịch vụ xét nghiệm ADN, giải trình tự gen, tầm soát bệnh lý di truyền, sàng lọc trước sinh NIPT, kiểm tra huyết thống và tư vấn di truyền cho cộng đồng. Với đội ngũ chuyên gia đầu ngành, trang thiết bị hiện đại nhập khẩu từ châu Âu, ADN Chain cam kết mang lại kết quả xét nghiệm chính xác, nhanh chóng, bảo mật tuyệt đối và dịch vụ chăm sóc khách hàng tận tâm.
                </p>
                <p>
                  Với sứ mệnh "Nâng tầm sức khỏe Việt bằng công nghệ di truyền", ADN Chain không ngừng đổi mới, ứng dụng các công nghệ sinh học tiên tiến nhất, hợp tác cùng các viện nghiên cứu, bệnh viện hàng đầu trong và ngoài nước, góp phần nâng cao chất lượng sống và sức khỏe cộng đồng.
                </p>
              </div>
              <div className="adn-about-section">
                <h2>Tầm nhìn – Sứ mệnh</h2>
                <ul>
                  <li>
                    <strong>Tầm nhìn:</strong> Trở thành trung tâm xét nghiệm di truyền và tư vấn gen hàng đầu Việt Nam, hướng tới chuẩn quốc tế.
                  </li>
                  <li>
                    <strong>Sứ mệnh:</strong> Ứng dụng công nghệ di truyền hiện đại, hỗ trợ cộng đồng Việt Nam phòng ngừa, phát hiện và điều trị bệnh lý di truyền, nâng cao chất lượng sống cho mọi gia đình.
                  </li>
                </ul>
              </div>
              <div className="adn-about-section">
                <h2>Giá trị cốt lõi</h2>
                <ul>
                  <li>
                    <b>Chính xác:</b> Quy trình kiểm soát chất lượng nghiêm ngặt, thiết bị hiện đại chuẩn quốc tế.
                  </li>
                  <li>
                    <b>Bảo mật:</b> Thông tin khách hàng được bảo mật tuyệt đối theo tiêu chuẩn quốc tế.
                  </li>
                  <li>
                    <b>Tận tâm:</b> Đội ngũ tư vấn, chuyên gia đồng hành, hỗ trợ chu đáo trước – trong – sau xét nghiệm.
                  </li>
                  <li>
                    <b>Vì cộng đồng:</b> Cam kết nâng cao sức khỏe, mang lại giá trị cho xã hội.
                  </li>
                </ul>
              </div>
              <div className="adn-about-section">
                <h2>Các dịch vụ nổi bật</h2>
                <ul>
                  <li>Xét nghiệm ADN huyết thống cha – con, mẹ – con, ông/bà – cháu</li>
                  <li>Sàng lọc trước sinh NIPT</li>
                  <li>Xét nghiệm di truyền phát hiện gen bệnh, đột biến gen</li>
                  <li>Giải trình tự gen cá nhân, tầm soát nguy cơ bệnh lý di truyền</li>
                  <li>Tư vấn di truyền, tư vấn kết quả xét nghiệm</li>
                </ul>
              </div>
              <div className="adn-about-section">
                <h2>Liên hệ</h2>
                <p>
                  Địa chỉ: 7 Đ. D1, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh<br />
                  Hotline: 0899 655 996<br />
                  Email: info@adnchain.vn<br />
                  Website: www.adnchain.vn
                </p>
              </div>
            </div>
            <div className="adn-about-col-right">
              <img src="/img/about-right-1.jpg" alt="ADN Chain phòng lab" className="adn-about-img-right" />
              <img src="/img/about-right-2.jpg" alt="ADN Chain công nghệ" className="adn-about-img-right" />
            </div>
          </div>
          <div className="adn-about-back">
            <Link to="/home" className="adn-btn adn-btn-main">Quay về trang chủ</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default About;