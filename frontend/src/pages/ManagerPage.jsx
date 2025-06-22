// ManagerPage.jsx
import React, { useState, useEffect } from "react";
import { Card, Button, Input, Select } from "../components/ui/ui";
import "./ManagerPage.css"; // Đảm bảo file CSS này có các style cần thiết
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getAvatarColor, getInitials } from '../utils/avatarUtils'; // Đảm bảo utils này tồn tại
import { FaTachometerAlt, FaUsers, FaNewspaper, FaDollarSign, FaCreditCard, FaStar, FaVial, FaUserAlt } from 'react-icons/fa';

// Import các component con
import DashboardManager from './Manager/Dashboard';
import StaffManagement from './Manager/StaffManagement';
import BlogPost from './Manager/BlogPost';
import ServicePrice from './Manager/ServicePrice';
import Payment from './Manager/Payment';
import Feedback from './Manager/Feedback';
import TestResultManagement from './Manager/TestResultManagement';
import PersonalInfo from './Manager/PersonalInfo';


export default function ManagerPage() {
    const { user } = useAuth(); // Lấy thông tin người dùng từ AuthContext
    const navigate = useNavigate();

    const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
    const [employees, setEmployees] = useState([
        { id: 1, name: "Nguyễn Văn A", email: "a@example.com", role: "Nhân viên", status: "Active" },
        { id: 2, name: "Trần Thị B", email: "b@example.com", role: "Quản lý", status: "Inactive" },
        // ... (các dòng dữ liệu mẫu khác)
        { id: 3, name: "Lê Văn C", email: "c@example.com", role: "Nhân viên", status: "Active" },
        { id: 4, name: "Phạm Thị D", email: "d@example.com", role: "Nhân viên", status: "Active" },
        { id: 5, name: "Hoàng Đình E", email: "e@example.com", role: "Nhân viên", status: "Inactive" },
        { id: 6, name: "Đỗ Thị F", email: "f@example.com", role: "Quản lý", status: "Active" },
        { id: 7, name: "Ngô Văn G", email: "g@example.com", role: "Nhân viên", status: "Active" },
        { id: 8, name: "Bùi Thị H", email: "h@example.com", role: "Nhân viên", status: "Inactive" },
        { id: 9, name: "Trương Văn I", email: "i@example.com", role: "Nhân viên", status: "Active" },
        { id: 10, name: "Đặng Thị K", email: "k@example.com", role: "Quản lý", status: "Active" },
        { id: 11, name: "Võ Văn L", email: "l@example.com", role: "Nhân viên", status: "Active" },
        { id: 12, name: "Cao Thị M", email: "m@example.com", role: "Nhân viên", status: "Inactive" },
    ]);
    const [orders, setOrders] = useState([
        { id: "ORD001", customer: "Khách hàng X", date: "2023-01-15", status: "New" },
        { id: "ORD002", customer: "Khách hàng Y", date: "2023-01-10", status: "Processing" },
    ]);
    const [detailEmployee, setDetailEmployee] = useState(null);
    const [detailOrder, setDetailOrder] = useState(null);

    const [employeeSearchTerm, setEmployeeSearchTerm] = useState("");
    const [orderSearchTerm, setOrderSearchTerm] = useState("");

    const sidebarMenuItems = [
        { key: "dashboard", label: "Tổng quan", icon: <FaTachometerAlt /> }, // Icon cho Dashboard
        { key: "nhanvien", label: "Quản lý phân quyền nhân viên", icon: <FaUsers /> }, // Icon cho Nhân viên
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
            if (activeItem.key === "dashboard") {
                return "Tổng quan hệ thống";
            }
            return activeItem.label;
        }
        return "Trang quản lý";
    };

    const handleLogout = () => {
        console.log("Logged out");
        navigate('/login');
    };

    const employeeFilterOptions = [
        { value: "", label: "Tất cả vai trò" },
        { value: "nhanvien", label: "Nhân viên" },
        { value: "quanly", label: "Quản lý" },
    ];

    const getHeaderContent = () => {
        switch (activeMenuItem) {
            case "dashboard":
                return {
                    title: "Tổng quan hệ thống",
                    showSearch: false,
                    showFilter: false,
                    showAddNew: false,
                };
            case "nhanvien":
                return {
                    title: "Quản lý nhân viên",
                    showSearch: true,
                    onSearchChange: (value) => setEmployeeSearchTerm(value),
                    showFilter: true,
                    filterOptions: employeeFilterOptions,
                    onFilterChange: (value) => console.log("Lọc nhân viên theo:", value),
                    showAddNew: true,
                    addNewText: "Thêm nhân viên mới",
                    onAddNewClick: () => alert("Thêm nhân viên mới!"),
                };
            case "blogpost":
                return {
                    title: "Quản lý bài đăng",
                    showSearch: true,
                    onSearchChange: (value) => setOrderSearchTerm(value),
                    showFilter: false,
                    showAddNew: true,
                    addNewText: "Tạo bài đăng mới",
                    onAddNewClick: () => alert("Tạo bài đăng mới!"),
                };
            case "banggia":
                return {
                    title: "Quản lý giá dịch vụ",
                    showSearch: false,
                    showFilter: false,
                    showAddNew: true,
                    addNewText: "Thêm giá dịch vụ",
                    onAddNewClick: () => alert("Thêm giá dịch vụ mới!"),
                };
            case "payments":
                return {
                    title: "Quản lý thanh toán",
                    showSearch: true,
                    showFilter: true,
                    filterOptions: [{ value: "", label: "Tất cả" }, { value: "pending", label: "Đang chờ" }, { value: "completed", label: "Hoàn thành" }],
                    onFilterChange: (value) => console.log("Lọc thanh toán theo:", value),
                    showAddNew: false,
                };
            case "feedback":
                return {
                    title: "Quản lý Phản hồi & Đánh giá",
                    showSearch: true,
                    showFilter: true,
                    filterOptions: [{ value: "", label: "Tất cả" }, { value: "rating", label: "Đánh giá" }, { value: "feedback", label: "Phản hồi" }],
                    onFilterChange: (value) => console.log("Lọc phản hồi theo:", value),
                    showAddNew: false,
                };
            case "testResults":
                return {
                    title: "Quản lý kết quả xét nghiệm",
                    showSearch: true,
                    showFilter: false,
                    showAddNew: true,
                    addNewText: "Thêm kết quả",
                    onAddNewClick: () => alert("Thêm kết quả xét nghiệm mới!"),
                };
            case "personalInfo":
                return {
                    title: "Thông tin cá nhân",
                    showSearch: false,
                    showFilter: false,
                    showAddNew: false,
                };
            default:
                return {
                    title: "Trang quản lý",
                    showSearch: false,
                    showFilter: false,
                    showAddNew: false,
                };
        }
    };

    const headerConfig = getHeaderContent();

    const renderMainContent = () => {
        switch (activeMenuItem) {
            case "dashboard":
                return <DashboardManager />;
            case "nhanvien":
                return <StaffManagement employees={employees} setDetailEmployee={setDetailEmployee} />;
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