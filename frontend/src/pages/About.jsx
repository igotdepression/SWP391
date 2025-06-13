import React from "react";
import { Link, NavLink} from "react-router-dom";
import "./About.css";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


function About() {
  const { user } = useAuth(); // Get user info
  const navigate = useNavigate(); // To navigate

  // Placeholder functions for navigation
  const goToAbout = () => navigate('/about'); // Assuming /about route exists or will be created
  const goToServices = () => navigate('/services'); // Assuming /services route exists or will be created
  const goToInfo = () => navigate('/info'); // Assuming /info route exists or will be created
  const goToBookingCreate = () => navigate('/booking/create'); // Navigate to booking create page
  const goToLogin = () => navigate('/login');

  // Function to generate random avatar colors (copied from ManagerPage)
  const getRandomAvatarColors = () => {
    const rBg = Math.floor(Math.random() * 56) + 200;
    const gBg = Math.floor(Math.random() * 56) + 200;
    const bBg = Math.floor(Math.random() * 56) + 200;
    const bgColor = `rgb(${rBg}, ${gBg}, ${bBg})`;

    const rText = Math.max(0, rBg - 100);
    const gText = Math.max(0, gBg - 100);
    const bText = Math.max(0, bBg - 100);
    const textColor = `rgb(${rText}, ${gText}, ${bText})`;

    return { backgroundColor: bgColor, color: textColor };
  };

  // Function to navigate to user profile page
  const goToProfile = () => {
    if (user) { // Ensure user is logged in before navigating
      navigate('/personal-info'); // Navigate to the correct profile route
    }
  };

  return (
    <div className="homepage-container">
      {/* Header Section */}
      <header className="homepage-header">
        <div className="header-left">
          {/* Logo */}
          <div className="header-logo-container">
            <img src="/logo.png" alt="Bloodline Logo" className="header-logo" />
          </div>
          {/* Navigation Links */}
          <nav className="header-nav">
            <ul>
            <li><Link to="/home">TRANG CHỦ</Link></li>
            <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => isActive ? "active" : ""}
                >
                  <span className="nav-icon"></span> GIỚI THIỆU
                </NavLink>
              </li>              <li><a href="#" onClick={goToServices}>DỊCH VỤ</a></li>
              <li><a href="#" onClick={goToInfo}>THÔNG TIN</a></li>
              <li><a href="#" onClick={goToBookingCreate}>ĐĂNG KÝ DỊCH VỤ</a></li>
            </ul>
          </nav>
        </div>
        <div className="header-right">
          {/* Search Bar Placeholder */}
          <input type="text" placeholder="Search" className="header-search-input" />
          {/* User/Login Area */}
          {user ? (
            <div className="header-user-profile-area" onClick={goToProfile}> {/* Make this div clickable */}
              <span className="header-user-info">Chào, {user.fullName || user.email}</span>
              <div className="header-profile-icon-placeholder" style={getRandomAvatarColors()}>
                {user.fullName ? user.fullName.split(" ").map(n => n[0]).join("").toUpperCase() : ''}
              </div>
            </div>
          ) : (
<button className="header-login-button" onClick={goToLogin}>Login</button>
          )}
        </div>
      </header>
      <main className="adn-about-main">
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
                  Với sứ mệnh “Nâng tầm sức khỏe Việt bằng công nghệ di truyền”, ADN Chain không ngừng đổi mới, ứng dụng các công nghệ sinh học tiên tiến nhất, hợp tác cùng các viện nghiên cứu, bệnh viện hàng đầu trong và ngoài nước, góp phần nâng cao chất lượng sống và sức khỏe cộng đồng.
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
                <h2>Cam kết của ADN Chain</h2>
                <ul>
                  <li>Kết quả xét nghiệm chính xác, bảo mật, trả kết quả nhanh chóng</li>
                  <li>Hỗ trợ khách hàng từ lấy mẫu, phân tích đến tư vấn kết quả</li>
                  <li>Trang thiết bị hiện đại, đội ngũ chuyên gia hàng đầu</li>
                  <li>Chi phí hợp lý, minh bạch</li>
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
      <footer className="adn-footer">
        <div className="adn-footer-content">
          <div className="adn-footer-logo">
            <img src="/logo.png" alt="ADN Logo" />
          </div>
          <div className="adn-footer-info">
            <div className="adn-footer-section">
              <span className="adn-footer-label">LOCATION</span>
              <div>7 Đ. D1, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh</div>
            </div>
            <div className="adn-footer-section">
              <span className="adn-footer-label">CONTACT US</span>
              <div>02020202304</div>
              <div>abc123@gmail.com</div>
            </div>
            <div className="adn-footer-section">
              <span className="adn-footer-label">PAYMENT</span>
              <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                <img src="https://cdn.tgdd.vn/2020/04/GameApp/image-180x180.png" alt="ZaloPay" style={{height: 32}} />
                <img src="data:image/png;base64,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" alt="Momo" style={{height: 32}} />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default About;