import React from "react";
import "../styles/layout.css";

function Footer() {
  return (
    <footer className="adn-footer">
      <div className="adn-footer-content">
        <div className="adn-footer-logo">
          <img src="/img/logo-footer.png" alt="ADN Logo" />
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
              <img src="/img/zalo-pay.png" alt="ZaloPay" style={{ height: 32 }} />
              <img src="/img/momo.png" alt="Momo" style={{ height: 32 }} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;