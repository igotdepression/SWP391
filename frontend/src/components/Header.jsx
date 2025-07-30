import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '../hooks/useNavigation';
import { getAvatarColor, getInitials } from '../utils/avatarUtils';
import './Header.css'; 

export default function Header() {
    const { user, logout } = useAuth();
    const { goToLogin, goToProfile, goToHistory, goToFeedback, goToSignUp } = useNavigation();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleProfileClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        logout();
        goToLogin();
    };

    return (
        <header className="adn-header"> {}
            <div className="adn-header-content"> {}

                <div className="adn-footer-logo">
                    {}
                    <Link to="/home">
                        <img src="/logo.png" alt="ADN Logo" />
                    </Link>
                </div>
                <nav className="adn-header-nav"> {}
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
                                to="/blogpost"
                                className={({ isActive }) => isActive ? "active" : ""}
                            >
                                THÔNG TIN
                            </NavLink>
                        </li>
                        <li>
                            {user && user.role !== 'GUEST' && (
                                <NavLink
                                    to="/booking-create"
                                    className={({ isActive }) => isActive ? "active" : ""}
                                >
                                    <span className="nav-icon"></span> ĐẶT LỊCH HẸN
                                </NavLink>
                            )}
                        </li>
                        <li>
                            {user && user.role === 'MANAGER' && (
                                <NavLink
                                    to="/manager"
                                    className={({ isActive }) => isActive ? "active" : ""}
                                >
                                    <span className="nav-icon"></span> BẢNG ĐIỀU KHIỂN
                                </NavLink>
                            )}
                            {user && user.role === 'STAFF' && (
                                <NavLink
                                    to="/staff"
                                    className={({ isActive }) => isActive ? "active" : ""}
                                >
                                    <span className="nav-icon"></span> BẢNG ĐIỀU KHIỂN
                                </NavLink>
                            )}
                        </li>
                    </ul>
                </nav>
                <div className="adn-header-right"> {}
                    <div className="adn-header-search"> {}
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
                                {user.avatarUrl ? (
                                    <img 
                                        src={user.avatarUrl} 
                                        alt="Avatar" 
                                        className="adn-header-user-avatar"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                ) : (
                                    <div className="adn-header-user-avatar" style={{ backgroundColor: getAvatarColor(user.fullName) }}> {/* Sử dụng class mới */}
                                        {getInitials(user.fullName)}
                                    </div>
                                )}
                                {showDropdown && (
                                    <div className="profile-dropdown">
                                        <div className="dropdown-item" onClick={goToProfile}>Thông tin cá nhân</div>
                                        <div className="dropdown-item" onClick={goToHistory}>Lịch sử xét nghiệm</div>
                                        <div className="dropdown-item" onClick={goToFeedback}>Lịch sử phản hồi</div>
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
