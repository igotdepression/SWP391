import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Adjusted path for context
import { getAvatarColor, getInitials } from '.components'; // Adjusted path for utils
import './HeaderStaff.css'; // <--- CORRECTED: Import the CSS file

export default function HeaderStaff() { // <--- Component name is HeaderStaff
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleProfileClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect to login after logout
    };

    // Navigation links specific to staff
    const staffNavLinks = [
        { to: '/home', label: 'TRANG CHỦ' }, // Link to customer homepage
        { to: '/staff', label: 'QUẢN LÝ ADN' }, // Link to the main staff page (StaffPage)
        // You can add more staff-specific links here if needed, e.g., '/staff/reports', '/staff/users'
    ];

    return (
        <header className="staff-header">
            <div className="staff-header-left">
                <div className="staff-header-logo-container">
                    <img src="/logo.png" alt="Bloodline Logo" className="staff-header-logo" />
                </div>
                <nav className="staff-header-nav">
                    <ul>
                        {staffNavLinks.map((link) => (
                            <li key={link.to}>
                                <NavLink
                                    to={link.to}
                                    className={({ isActive }) => isActive ? "active" : ""}
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="staff-header-right">
                <input type="text" placeholder="Tìm kiếm..." className="staff-header-search-input" />
                {user ? (
                    <div className="staff-header-user-profile-area" onClick={handleProfileClick}>
                        <span className="staff-header-user-info">{user.fullName || user.email}</span>
                        <div className="staff-header-profile-icon-placeholder" style={{ backgroundColor: getAvatarColor(user.fullName) }}>
                            {getInitials(user.fullName)}
                        </div>
                        {showDropdown && (
                            <div className="staff-profile-dropdown">
                                {/* Assuming staff profile page is /staff/profile. Adjust as needed. */}
                                <div className="dropdown-item" onClick={() => navigate('/staff/profile')}>Thông tin cá nhân</div>
                                <div className="dropdown-item" onClick={handleLogout}>Đăng xuất</div>
                            </div>
                        )}
                    </div>
                ) : (
                    <button className="staff-header-login-button" onClick={() => navigate('/login')}>Đăng nhập</button>
                )}
            </div>
        </header>
    );
}