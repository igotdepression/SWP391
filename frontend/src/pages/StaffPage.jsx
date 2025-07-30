// StaffPage.jsx
import React, { useState, useEffect } from "react";
import { Card, Button, Input, Select } from "../components/ui/ui";
import "./ManagerPage.css"; // Vẫn sử dụng ManagerPage.css như bạn yêu cầu
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getAvatarColor, getInitials } from '../utils/avatarUtils'; // Đảm bảo utils này tồn tại
import { FaTachometerAlt, FaCalendarAlt, FaVial, FaFileAlt, FaUserAlt, FaQuestionCircle } from 'react-icons/fa'; // Import FaQuestionCircle

// Import các component con từ thư mục Staff
// (Giả định các file này đã tồn tại hoặc sẽ được tạo trong cấu trúc Staff/)
import Booking from './Staff/Booking'; // Quản lý Đơn đặt dịch vụ
import Consultation from './Staff/Consultation'; // Quản lý Đơn tư vấn
import Sample from './Staff/Sample'; // Quản lý Mẫu xét nghiệm
import TestResultManagement from './Staff/TestResultManagement'; // Quản lý Kết quả xét nghiệm
import PersonalInfo from './Staff/PersonalInfo'; // Thông tin cá nhân


export default function StaffPage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Lấy menu đang chọn từ localStorage, nếu chưa có thì mặc định là "booking"
    const [activeMenuItem, setActiveMenuItem] = useState(() => {
        return localStorage.getItem("staff_active_menu") || "booking";
    });

    // Khi activeMenuItem thay đổi thì lưu vào localStorage
    useEffect(() => {
        localStorage.setItem("staff_active_menu", activeMenuItem);
    }, [activeMenuItem]);

    useEffect(() => {
        const handleSwitchToTestResults = (event) => {
            const { bookingID, bookingInfo, openAddModal } = event.detail;
            
            // Chuyển sang tab test results
            setActiveMenuItem('testResults');
            
            // Store data để TestResultManagement component sử dụng
            sessionStorage.setItem('pendingTestResult', JSON.stringify({
                bookingID,
                bookingInfo,
                openAddModal
            }));
        };

        window.addEventListener('switchToTestResults', handleSwitchToTestResults);
        
        return () => {
            window.removeEventListener('switchToTestResults', handleSwitchToTestResults);
        };
    }, []);

    // Các state dữ liệu mẫu cho Staff (không còn employee hay order chung)
    const [bookings, setBookings] = useState([]);
    const [consultations, setConsultations] = useState([]);
    const [samples, setSamples] = useState([]);
    const [testResultsData, setTestResultsData] = useState([]);

    // Các state cho tìm kiếm
    const [bookingSearchTerm, setBookingSearchTerm] = useState("");
    const [consultationSearchTerm, setConsultationSearchTerm] = useState("");
    const [sampleSearchTerm, setSampleSearchTerm] = useState("");
    const [testResultSearchTerm, setTestResultSearchTerm] = useState("");


    // Sidebar menu items với FaQuestionCircle cho Consultation
    const sidebarMenuItems = [
        { key: "consultation", label: "Quản lý Đơn tư vấn", icon: <FaQuestionCircle /> },
        { key: "booking", label: "Quản lý Đơn đặt dịch vụ", icon: <FaCalendarAlt /> },
        { key: "sample", label: "Quản lý Mẫu xét nghiệm", icon: <FaVial /> },
        { key: "testResults", label: "Quản lý Kết quả xét nghiệm", icon: <FaFileAlt /> }, // Sử dụng FaVial hoặc FaFileAlt tùy thích
        { key: "personalInfo", label: "Thông tin cá nhân", icon: <FaUserAlt /> },
    ];

    const getActiveMenuLabel = () => {
        const activeItem = sidebarMenuItems.find(item => item.key === activeMenuItem);
        if (activeItem) {
            if (activeItem.key === "booking") {
                return "Quản lý Đơn đặt dịch vụ";
            }
            return activeItem.label;
        }
        return "Trang nhân viên"; // Thay đổi từ "Trang quản lý"
    };

    const handleLogout = () => {
        console.log("Logged out");
        // Logic đăng xuất thực tế của bạn
        navigate('/login');
    };

    // Các tùy chọn bộ lọc mẫu cho Staff
    const bookingFilterOptions = [
        { value: "", label: "Tất cả trạng thái" },
        { value: "confirmed", label: "Đã xác nhận" },
        { value: "pending", label: "Chưa xác nhận" },
    ];

    const consultationFilterOptions = [
        { value: "", label: "Tất cả trạng thái" },
        { value: "new", label: "Mới" },
        { value: "responded", label: "Đã phản hồi" },
        { value: "closed", label: "Đã đóng" },
    ];

    const sampleFilterOptions = [
        { value: "", label: "Tất cả trạng thái" },
        { value: "received", label: "Đã nhận mẫu" },
        { value: "processing", label: "Mẫu đang xử lý" },
        { value: "has_result", label: "Đã có kết quả" },
    ];

    const testResultFilterOptions = [
        { value: "", label: "Tất cả trạng thái" },
        { value: "pending", label: "Đang chờ kết quả" },
        { value: "completed", label: "Đã hoàn thành" },
    ];


    const getHeaderContent = () => {
        switch (activeMenuItem) {
            case "booking":
                return {
                    title: "Quản lý Đơn đặt dịch vụ"
                };
            case "consultation":
                return {
                    title: "Quản lý Đơn tư vấn"
                };
            case "sample":
                return {
                    title: "Quản lý Mẫu xét nghiệm"
                };
            case "testResults":
                return {
                    title: "Quản lý Kết quả xét nghiệm"
                };
            case "personalInfo":
                return {
                    title: "Thông tin cá nhân"
                };
            default:
                return {
                    title: "Trang nhân viên"
                };
        }
    };

    const headerConfig = getHeaderContent();

    const renderMainContent = () => {
        switch (activeMenuItem) {
            case "booking":
                return <Booking bookings={bookings} setBookings={setBookings} searchTerm={bookingSearchTerm} />;
            case "consultation":
                return <Consultation consultations={consultations} setConsultations={setConsultations} searchTerm={consultationSearchTerm} />;
            case "sample":
                return <Sample samples={samples} setSamples={setSamples} searchTerm={sampleSearchTerm} />;
            case "testResults":
                return <TestResultManagement testResults={testResultsData} setTestResults={setTestResultsData} searchTerm={testResultSearchTerm} />;
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
        <div className="staff-page-container">
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