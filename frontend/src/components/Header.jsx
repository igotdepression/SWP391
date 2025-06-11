import React from "react";
import { Link } from "react-router-dom";
import "../styles/layout.css";

function Header() {
  return (
    <header className="adn-header">
      <div className="adn-header-bar">
        <div className="adn-header-logo">
          <img src="/img/logo.png" alt="Logo ADN Chain" />
        </div>
        <div className="adn-header-search-login">
          <div className="adn-header-search">
            <input type="text" placeholder="Search" />
          </div>
          <div className="adn-header-login">
            <a href="#login">
              <img
                src="/img/user-icon.png"
                alt="User Icon"
                className="adn-header-usericon"
              />
              <span>Login</span>
            </a>
          </div>
        </div>
      </div>
      <nav className="adn-nav">
        <ul>
          <li><Link to="/">TRANG CHỦ</Link></li>
          <li><Link to="/about">GIỚI THIỆU</Link></li>
          <li><a href="#services">DỊCH VỤ</a></li>
          <li><a href="#info">THÔNG TIN</a></li>
          <li><a href="#register">ĐĂNG KÝ DỊCH VỤ</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;