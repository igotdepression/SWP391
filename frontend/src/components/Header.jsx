import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '../hooks/useNavigation';
import { getAvatarColor, getInitials } from '../utils/avatarUtils';
<<<<<<< HEAD
import './Header.css';
=======
import './Header.css'; // Đảm bảo import CSS
>>>>>>> 8e0ece6428b87162344c8e84a8b730fb73989ce8

export default function Header() {
    const { user, logout } = useAuth();
    const { goToLogin, goToProfile, goToHistory, goToSignUp } = useNavigation();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

<<<<<<< HEAD
    // Các hàm điều hướng
    const goToAbout = () => navigate('/about');
    const goToServices = () => navigate('/services');
    const goToInfo = () => navigate('/info');
    const goToBookingCreate = () => navigate('/booking/create');

=======
>>>>>>> 8e0ece6428b87162344c8e84a8b730fb73989ce8
    const handleProfileClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        logout();
        goToLogin();
    };

    return (
<<<<<<< HEAD
        <header className="homepage-header">
            <div className="header-left">
                <div className="header-logo-container">
                    <img src="/logo.png" alt="Bloodline Logo" className="header-logo" />
                </div>
                <nav className="header-nav">
=======
        <header className="adn-header"> {/* Sử dụng class mới */}
            <div className="adn-header-content"> {/* Thêm div bọc nội dung */}

                <div className="adn-footer-logo">
                    {/* Đảm bảo logo là một phần của Link để click được */}
                    <Link to="/home">
                        <img src="/logo.png" alt="ADN Logo" />
                    </Link>
                </div>
                <nav className="adn-header-nav"> {/* Sử dụng class mới */}
>>>>>>> 8e0ece6428b87162344c8e84a8b730fb73989ce8
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
<<<<<<< HEAD
                                to="/booking/create"
                                className={({ isActive }) => isActive ? "active" : ""}
                            >
                                <span className="nav-icon"></span> ĐĂNG KÍ DỊCH VỤ
=======
                                to="/booking-create"
                                className={({ isActive }) => isActive ? "active" : ""}
                            >
                                <span className="nav-icon"></span> ĐẶT LỊCH HẸN
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/manager"
                                className={({ isActive }) => isActive ? "active" : ""}
                            >
                                <span className="nav-icon"></span> BẢNG ĐIỀU KHIỂN
>>>>>>> 8e0ece6428b87162344c8e84a8b730fb73989ce8
                            </NavLink>
                        </li>
                    </ul>
                </nav>
<<<<<<< HEAD
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
=======
                <div className="adn-header-right"> {/* Thêm div bọc phần bên phải */}
                    <div className="adn-header-search"> {/* Sử dụng class mới */}
                        <input type="text" placeholder="Tìm kiếm..." className="header-search-input" />
                    </div>

                    {user ? (
                        user.role === 'GUEST' ? (
                            <div className="header-login-register-buttons">
                                <button className="header-button" onClick={goToLogin}>Đăng nhập</button>
                                <button className="header-button" onClick={goToSignUp}>Đăng kí</button>
                            </div>
                        ) : (
                            <div className="header-user-profile-area" onClick={handleProfileClick}>
                                <span className="adn-header-user-name">Chào, {user.fullName || user.email}</span> {/* Sử dụng class mới */}
                                <div className="adn-header-user-avatar" style={{ backgroundColor: getAvatarColor(user.fullName) }}> {/* Sử dụng class mới */}
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
                        <button className="adn-header-login-btn" onClick={goToLogin}>Đăng nhập</button>
                    )}
                </div>
            </div>
        </header>
    );
}
>>>>>>> 8e0ece6428b87162344c8e84a8b730fb73989ce8
