import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '../hooks/useNavigation';
import { getAvatarColor, getInitials } from '../utils/avatarUtils';
import './Header.css';

export default function Header() {
    const { user, logout } = useAuth();
    const { goToLogin, goToProfile, goToHistory, goToSignUp } = useNavigation();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    // Các hàm điều hướng
    const goToAbout = () => navigate('/about');
    const goToServices = () => navigate('/services');
    const goToInfo = () => navigate('/info');
    const goToBookingCreate = () => navigate('/booking/create');

    const handleProfileClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        logout();
        goToLogin();
    };

    return (
        <header className="homepage-header">
            <div className="header-left">
                <div className="header-logo-container">
                    <img src="/logo.png" alt="Bloodline Logo" className="header-logo" />
                </div>
                <nav className="header-nav">
                    <ul>
                        <li>
                            <NavLink
                                to="/home"
                                className={({ isActive }) => isActive ? "active" : ""}
                            >
                                TRANG CHỦ
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                className={({ isActive }) => isActive ? "active" : ""}
                            >
                                GIỚI THIỆU
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/services"
                                className={({ isActive }) => isActive ? "active" : ""}
                            >
                                DỊCH VỤ
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/info"
                                className={({ isActive }) => isActive ? "active" : ""}
                            >
                                THÔNG TIN
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/booking/create"
                                className={({ isActive }) => isActive ? "active" : ""}
                            >
                                <span className="nav-icon"></span> ĐĂNG KÍ DỊCH VỤ
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="header-right">
                <input type="text" placeholder="Search" className="header-search-input" />
                {user ? (
                    user.role === 'GUEST' ? (
                        <div className="header-login-register-buttons">
                            <button className="header-button" onClick={goToLogin}>Đăng nhập</button>
                            <button className="header-button" onClick={goToSignUp}>Đăng kí</button>
                        </div>
                    ) : (
                        <div className="header-user-profile-area" onClick={handleProfileClick}>
                            <span className="header-user-info">Chào, {user.fullName || user.email}</span>
                            <div className="header-profile-icon-placeholder" style={{ backgroundColor: getAvatarColor(user.fullName) }}>
                                {getInitials(user.fullName)}
                            </div>
                            {showDropdown && (
                                <div className="profile-dropdown">
                                    <div className="dropdown-item" onClick={goToProfile}>Thông tin cá nhân</div>
                                    <div className="dropdown-item" onClick={goToHistory}>Lịch sử xét nghiệm</div>
                                    <div className="dropdown-item" onClick={handleLogout}>Đăng xuất</div>
                                </div>
                            )}
                        </div>
                    )
                ) : (
                    <button className="header-login-button" onClick={goToLogin}>Login</button>
                )}
            </div>
        </header>
    );
} 