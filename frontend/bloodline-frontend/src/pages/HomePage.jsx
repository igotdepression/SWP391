import React from 'react';
import { useAuth } from '../context/AuthContext'; // Assuming useAuth is needed for login/user info
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file

export default function HomePage() {
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
              <li><a href="#"><span className="nav-icon">★</span> TRANG CHỦ</a></li>
              <li><a href="#" onClick={goToAbout}>GIỚI THIỆU</a></li>
              <li><a href="#" onClick={goToServices}>DỊCH VỤ</a></li>
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

      {/* Banner Section */}
      <section className="homepage-banner">
        <div className="banner-left">
          <img src="/banner.png" alt="Banner" className="banner-image" />
        </div>
        <div className="banner-right">
          <div className="banner-content">
            <h1>ADN CHAIN</h1>
            <p className="subtitle">Accurate - Fast - Confidential</p>
            <p className="description">"Chuyên nghiệp trong từng kết quả, tận tâm trong từng bước"</p>
            <div className="banner-buttons">
              <button className="banner-button primary" onClick={goToBookingCreate}>Đăng ký xét nghiệm ngay</button>
              <span>or</span>
              <button className="banner-button secondary">Đặt lịch tư vấn miễn phí</button>
            </div>
          </div>
        </div>
      </section>

      {/* Giới thiệu Section */}
      <section className="homepage-section about-section">
        <div className="section-header">
          <div className="section-icon">+</div> {/* Placeholder for icon */}
          <h2>GIỚI THIỆU</h2>
        </div>
        <div className="about-content">
          <div className="about-text">
            <p>ADN CHAIN là đơn vị tiên phong trong lĩnh vực xét nghiệm di truyền và phân tích ADN tại Việt Nam, cung cấp các dịch vụ xét nghiệm huyết thống dân sự và hành chính, cũng như các xét nghiệm di truyền y học tiên tiến như NIPT, phát hiện đột biến gen, bệnh lý di truyền, và nhiều hơn thế nữa.</p>
            <button className="read-more-button">Xem thêm &gt;&gt;</button>
          </div>
          <div className="about-image">
            <img src="/about.png" alt="About Us" className="about-image-content" /> {/* Assuming an image specific to about section */} 
          </div>
        </div>
      </section>

      {/* Dịch vụ Chính Section */}
      <section className="homepage-section services-section">
        <div className="section-header">
          <div className="section-icon">+</div> {/* Placeholder for icon */}
          <h2>DỊCH VỤ CHÍNH</h2>
        </div>
        <div className="services-grid">
          {/* Service Item 1 */}
          <div className="service-item">
            <div className="service-item-image">
              <img src="/service1.png" alt="Xét nghiệm ADN cha con" /> {/* Assuming images for each service */} 
            </div>
            <div className="service-item-text">
              <p className="service-title">Xét nghiệm ADN cha con</p>
              <p className="service-description">Quá trình tách chiết, phân tích và so sánh ADN của người con và người cha giả định nhằm xác định huyết thống.</p>
              <button className="service-detail-button">Xem chi tiết</button>
            </div>
          </div>
          {/* Service Item 2 */}
          <div className="service-item">
            <div className="service-item-image">
              <img src="/service2.png" alt="Xét nghiệm ADN mẹ con" /> {/* Assuming images for each service */} 
            </div>
            <div className="service-item-text">
              <p className="service-title">Xét nghiệm ADN mẹ con</p>
              <p className="service-description">Quá trình tách chiết ADN của mẹ và con rồi tiến hành phân tích so sánh nhằm xác định mối quan hệ mẹ con ruột thịt.</p>
              <button className="service-detail-button">Xem chi tiết</button>
            </div>
          </div>
          {/* Service Item 3 */}
          <div className="service-item">
            <div className="service-item-image">
              <img src="/service3.png" alt="Xét nghiệm ADN ông cháu" /> {/* Assuming images for each service */} 
            </div>
            <div className="service-item-text">
              <p className="service-title">Xét nghiệm ADN ông cháu</p>
              <p className="service-description">Kỹ thuật nhằm xác định mối quan hệ huyết thống giữa ông/bà và cháu. Mỗi quá trình xác định huyết thống.</p>
              <button className="service-detail-button">Xem chi tiết</button>
            </div>
          </div>
          {/* Service Item 4 */}
          <div className="service-item">
            <div className="service-item-image">
              <img src="/service4.png" alt="Xét nghiệm ADN bà cháu" /> {/* Assuming images for each service */} 
            </div>
            <div className="service-item-text">
              <p className="service-title">Xét nghiệm ADN bà cháu</p>
              <p className="service-description">Quá trình phân tích so sánh ADN nhằm xác định mối quan hệ huyết thống giữa bà và cháu.</p>
              <button className="service-detail-button">Xem chi tiết</button>
            </div>
          </div>
        </div>
      </section>

      {/* Đăng ký Tư vấn Section */}
      <section className="homepage-section consultation-section">
        <div className="section-header">
          <div className="section-icon">+</div> {/* Placeholder for icon */}
          <h2>ĐĂNG KÝ TƯ VẤN</h2>
        </div>
        <div className="consultation-content">
          {/* Form Placeholder */}
          <div className="consultation-form-placeholder">Form Đăng kýPlaceholder</div>
          <button className="consultation-button">ĐĂNG KÝ</button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="homepage-footer">
        {/* Logo and Text */}
        <div className="footer-section footer-logo-section">
           {/* Logo */}
          <img src="/logo.png" alt="Bloodline Logo" className="footer-logo" />
          <p>Bloodline DNA Testing Service</p>
        </div>
        {/* Location */}
        <div className="footer-section">
          <h3>LOCATION</h3>
          <p>70, D1, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh</p>
        </div>
        {/* Contact */}
        <div className="footer-section">
          <h3>CONTACT US</h3>
          <p>02020202304</p>
        </div>
         {/* Payment Icons */}
         <div className="footer-section">
          <h3>PAYMENT</h3>
          <div className="payment-icons">
             {/* Icons Placeholder */}
             <div className="payment-icon-placeholder">Pay1</div>
             <div className="payment-icon-placeholder">Pay2</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
