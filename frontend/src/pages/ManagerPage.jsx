// ManagerPage.jsx
import React, { useState, useEffect } from "react";
import { Card, Button, Input, Select } from "../components/ui/ui";
import "./ManagerPage.css"; // Đảm bảo file CSS này có các style cần thiết
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getAvatarColor, getInitials } from '../utils/avatarUtils'; // Đảm bảo utils này tồn tại
import { FaTachometerAlt, FaNewspaper, FaDollarSign, FaCreditCard, FaStar, FaVial, FaUserAlt } from 'react-icons/fa';
// Đã xóa FaUsers vì không còn sử dụng cho quản lý nhân viên

// Import các component con
// Đã xóa import StaffManagement từ đây
import BlogPost from './Manager/BlogPost';
import ServicePrice from './Manager/ServicePrice';
import Payment from './Manager/Payment';
import Feedback from './Manager/Feedback';
import TestResultManagement from './Manager/TestResultManagement';
import PersonalInfo from './Manager/PersonalInfo';


export default function ManagerPage() {
    const { user } = useAuth(); // Lấy thông tin người dùng từ AuthContext
    const navigate = useNavigate();
    const [activeMenuItem, setActiveMenuItem] = useState("blogpost");

    const [orders, setOrders] = useState([
        { id: "ORD001", customer: "Khách hàng X", date: "2023-01-15", status: "New" },
        { id: "ORD002", customer: "Khách hàng Y", date: "2023-01-10", status: "Processing" },
    ]);
    const [detailOrder, setDetailOrder] = useState(null);

    const [orderSearchTerm, setOrderSearchTerm] = useState("");

    const sidebarMenuItems = [
        { key: "blogpost", label: "Quản lý bài đăng", icon: <FaNewspaper /> }, // Icon cho Bài đăng
        { key: "banggia", label: "Quản lý giá dịch vụ", icon: <FaDollarSign /> }, // Icon cho Giá dịch vụ
        { key: "payments", label: "Quản lý thanh toán", icon: <FaCreditCard /> }, // Icon cho Thanh toán
        { key: "feedback", label: "Quản lý Phản hồi & Đánh giá", icon: <FaStar /> }, // Icon cho Phản hồi & Đánh giá
        { key: "testResults", label: "Quản lý kết quả xét nghiệm", icon: <FaVial /> }, // Icon cho Kết quả xét nghiệm
        { key: "personalInfo", label: "Thông tin cá nhân", icon: <FaUserAlt /> }, // Icon cho Thông tin cá nhân
    ];

    const getActiveMenuLabel = () => {
        const activeItem = sidebarMenuItems.find(item => item.key === activeMenuItem);
        if (activeItem) {
            if (activeItem.key === "blogpost") {
                return "Quản lý bài đăng";
            }
            return activeItem.label;
        }
        return "Trang quản lý";
    };

    const handleLogout = () => {
        console.log("Logged out");
        navigate('/login');
    };

    // Đã xóa employeeFilterOptions vì không còn sử dụng
    // const employeeFilterOptions = [
    //     { value: "", label: "Tất cả vai trò" },
    //     { value: "nhanvien", label: "Nhân viên" },
    //     { value: "quanly", label: "Quản lý" },
    // ];

    const getHeaderContent = () => {
        switch (activeMenuItem) {
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
            case "blogpost":
                return <BlogPost orders={orders} setDetailOrder={setDetailOrder} />;
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
                                onClick={() => setActiveMenuItem(item.key)}
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
                    {user && ( // Chỉ hiển thị nếu có thông tin user
                        <div className="manager-profile-info">
                            {/* Phần Avatar */}
                            <div className="header-user-profile-area">
                                <div className="header-profile-icon-placeholder">
                                    CN
                                </div>
                                <div className="header-user-info">
                                    <div>Chào, Staff!</div>
                                    <div className="user-id">ID: ST001</div>
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