import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAvatarColor, getInitials } from '../utils/avatarUtils';

export default function Header() {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Các hàm điều hướng
    const goToAbout = () => navigate('/about');
    const goToServices = () => navigate('/services');
    const goToInfo = () => navigate('/info');
    const goToBookingCreate = () => navigate('/booking/create');
    const goToLogin = () => navigate('/login');
    const goToProfile = () => {
        if (user) {
            navigate('/personal-info');
        }
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
                    <div className="header-user-profile-area" onClick={goToProfile}>
                        <span className="header-user-info">Chào, {user.fullName || user.email}</span>
                        <div className="header-profile-icon-placeholder" style={{ backgroundColor: getAvatarColor(user.fullName) }}>
                            {getInitials(user.fullName)}
                        </div>
                    </div>
                ) : (
                    <button className="header-login-button" onClick={goToLogin}>Login</button>
                )}
            </div>
        </header>
    );
} 