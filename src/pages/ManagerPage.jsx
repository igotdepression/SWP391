// ManagerPage.jsx
import React, { useState, useEffect } from "react";
import { Card, Button, Input, Select } from "../components/ui/ui";
import "./ManagerPage.css"; // Đảm bảo file CSS này có các style cần thiết
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getAvatarColor, getInitials } from '../utils/avatarUtils'; // Đảm bảo utils này tồn tại
import { FaTachometerAlt, FaNewspaper, FaDollarSign, FaCreditCard, FaStar, FaVial, FaUserAlt } from 'react-icons/fa';

// Import các component con
import DashboardManager from './Manager/Dashboard';
import BlogPost from './Manager/BlogPost';
import ServicePrice from './Manager/ServicePrice';
import Payment from './Manager/Payment';
import Feedback from './Manager/Feedback';
import TestResultManagement from './Manager/TestResultManagement';
import PersonalInfo from './Manager/PersonalInfo';

export default function ManagerPage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Khôi phục menu từ localStorage hoặc mặc định là "dashboard"
    const [activeMenuItem, setActiveMenuItem] = useState(() => {
        const savedMenuItem = localStorage.getItem('manager-active-menu');
        return savedMenuItem || "dashboard";
    });

    const [orders, setOrders] = useState([
        { id: "ORD001", customer: "Khách hàng X", date: "2023-01-15", status: "New" },
        { id: "ORD002", customer: "Khách hàng Y", date: "2023-01-10", status: "Processing" },
    ]);
    const [detailOrder, setDetailOrder] = useState(null);
    const [orderSearchTerm, setOrderSearchTerm] = useState("");

    // Lưu activeMenuItem vào localStorage mỗi khi thay đổi
    useEffect(() => {
        localStorage.setItem('manager-active-menu', activeMenuItem);
    }, [activeMenuItem]);

    // Cleanup localStorage khi component unmount (optional)
    useEffect(() => {
        return () => {
            // Có thể giữ lại hoặc xóa localStorage tùy theo yêu cầu
            // localStorage.removeItem('manager-active-menu');
        };
    }, []);

    const sidebarMenuItems = [
        { key: "dashboard", label: "Tổng quan", icon: <FaTachometerAlt /> },
        { key: "blogpost", label: "Quản lý bài đăng", icon: <FaNewspaper /> },
        { key: "banggia", label: "Quản lý giá dịch vụ", icon: <FaDollarSign /> },
        { key: "payments", label: "Quản lý thanh toán", icon: <FaCreditCard /> },
        { key: "feedback", label: "Quản lý Phản hồi & Đánh giá", icon: <FaStar /> },
        { key: "testResults", label: "Quản lý kết quả xét nghiệm", icon: <FaVial /> },
        { key: "personalInfo", label: "Thông tin cá nhân", icon: <FaUserAlt /> },
    ];

    const getActiveMenuLabel = () => {
        const activeItem = sidebarMenuItems.find(item => item.key === activeMenuItem);
        if (activeItem) {
            if (activeItem.key === "dashboard") {
                return "Tổng quan hệ thống";
            }
            return activeItem.label;
        }
        return "Trang quản lý";
    };

    const handleLogout = () => {
        // Xóa localStorage khi logout
        localStorage.removeItem('manager-active-menu');
        console.log("Logged out");
        navigate('/login');
    };

    // Hàm xử lý thay đổi menu item
    const handleMenuItemClick = (menuKey) => {
        setActiveMenuItem(menuKey);
        // localStorage sẽ được cập nhật tự động thông qua useEffect
    };

    const getHeaderContent = () => {
        switch (activeMenuItem) {
            case "dashboard":
                return {
                    title: "Tổng quan hệ thống",
                };
            case "blogpost":
                return {
                    title: "Quản lý bài đăng",
                };
            case "banggia":
                return {
                    title: "Quản lý giá dịch vụ",
                };
            case "payments":
                return {
                    title: "Quản lý thanh toán",
                };
            case "feedback":
                return {
                    title: "Quản lý Phản hồi & Đánh giá",
                };
            case "testResults":
                return {
                    title: "Quản lý kết quả xét nghiệm",
                };
            case "personalInfo":
                return {
                    title: "Thông tin cá nhân",
                };
            default:
                return {
                    title: "Trang quản lý",
                };
        }
    };

    const headerConfig = getHeaderContent();

    const renderMainContent = () => {
        switch (activeMenuItem) {
            case "dashboard":
                return <DashboardManager />;
            case "blogpost":
                return <BlogPost/>;
            case "banggia":
                return <ServicePrice />;
            case "payments":
                return <Payment />;
            case "feedback":
                return <Feedback />;
            case "testResults":
                return <TestResultManagement />;
            case "personalInfo":
                return <PersonalInfo />;
            default:
                return (
                    <Card className="info-card">
                        <p>Chọn một mục từ menu bên trái để xem nội dung.</p>
                    </Card>
                );
        }
    };

    return (
        <div className="manager-page-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <img src="/logo.png" onClick={() => navigate('/home')} alt="Logo" className="logo" />
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        {sidebarMenuItems.map((item) => (
                            <li
                                key={item.key}
                                className={activeMenuItem === item.key ? "active" : ""}
                                onClick={() => handleMenuItemClick(item.key)}
                            >
                                <button>
                                    <span className="icon">{item.icon}</span> {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <Button className="logout-button" onClick={handleLogout}>Đăng xuất</Button>
                    <div className="note">
                        © 2024 Bloodline. All rights reserved.
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                {/* Main Header - Chứa tiêu đề trang và thông tin manager */}
                <div className="main-header">
                    <h1>{headerConfig.title}</h1>
                    <div className="header-actions">
                        {headerConfig.showSearch && (
                            <Input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="search-input"
                                onChange={(e) => headerConfig.onSearchChange && headerConfig.onSearchChange(e.target.value)}
                            />
                        )}
                        {headerConfig.showFilter && headerConfig.filterOptions && (
                            <Select
                                className="filter-select"
                                onChange={(e) => headerConfig.onFilterChange && headerConfig.onFilterChange(e.target.value)}
                            >
                                {headerConfig.filterOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </Select>
                        )}
                        {headerConfig.showAddNew && (
                            <Button className="action-button" onClick={headerConfig.onAddNewClick}>
                                {headerConfig.addNewText || "Thêm mới"}
                            </Button>
                        )}
                    </div>

                    {/* Phần thông tin manager mới ở góc phải */}
                    {user && (
                        <div className="manager-profile-info">
                            <div className="header-user-profile-area">
                                <div className="header-profile-icon-placeholder">
                                    {user.name ? getInitials(user.name) : 'MN'}
                                </div>
                                <div className="header-user-info">
                                    <div>Chào, {user.name || 'Manager'}!</div>
                                    <div className="user-id">ID: {user.id || 'MN001'}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Container cho nội dung cuộn của main-content */}
                <div className="main-content-scrollable">
                    <div className="content-area">
                        {renderMainContent()}
                    </div>
                </div>
            </main>
        </div>
    );
}