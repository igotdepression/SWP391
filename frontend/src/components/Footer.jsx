// Footer.jsx
import React from 'react';

export default function Footer() {
    return (
        <footer className="adn-footer">
            <div className="adn-footer-content">
                {/* Column 1: Logo, Name, and Slogan */}
                <div className="adn-footer-section adn-footer-col-logo-slogan">
                    <div className="adn-footer-logo">
                        <img src="/logo.png" alt="ADN Logo" />
                    </div>
                    {/* Tách DNAChain và khẩu hiệu ra */}
                    <div className="adn-brand-name-container"> {/* Container cho tên */}
                        <span className="adn-brand-name">DNAChain</span>
                    </div>
                    <div className="adn-slogan-container"> {/* Container cho khẩu hiệu */}
                        <span className="adn-slogan">Nền tảng xét nghiệm ADN đáng tin cậy</span>
                    </div>
                </div>

                {/* Column 2: Description + Social Links */}
                <div className="adn-footer-section adn-footer-col-description-social">
                    <p className="adn-footer-description">
                        Chúng tôi cung cấp các dịch vụ xét nghiệm ADN chính xác và đáng tin cậy.
                    </p>
                    <div className="adn-social-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>

                {/* Column 3: Location & Contact Us (grouped) */}
                <div className="adn-footer-section adn-footer-col-contact-location">
                    <span className="adn-footer-label">LOCATION</span>
                    <div className="contact-item">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>7 Đ. D1, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh</span>
                    </div>
                    <span className="adn-footer-label" style={{ marginTop: '1rem' }}>CONTACT US</span>
                    <div className="contact-item">
                        <i className="fas fa-phone-alt"></i>
                        <span>02020202304</span>
                    </div>
                    <div className="contact-item">
                        <i className="fas fa-envelope"></i>
                        <span>abc123@gmail.com</span>
                    </div>
                </div>

                {/* Column 4: Payment */}
                <div className="adn-footer-section adn-footer-col-payment">
                    <span className="adn-footer-label">PAYMENT</span>
                    <div className="payment-icons">
                        <img src="https://cdn.tgdd.vn/2020/04/GameApp/image-180x180.png" alt="ZaloPay" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/MoMo_Logo.svg/1200px-MoMo_Logo.svg.png" alt="Momo" />
                    </div>
                </div>
            </div>

            <div className="adn-footer-bottom">
                <p>&copy; {new Date().getFullYear()} Bloodline. All rights reserved.</p>
            </div>
        </footer>
    );
}