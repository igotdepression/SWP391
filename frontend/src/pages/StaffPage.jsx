<<<<<<< HEAD
import React, { useState } from "react";
import { Card, Button, Input, Select } from "../components/ui/ui"; // Add these imports
import "./StaffPage.css";

// Menu cho quản lý xét nghiệm DNA
const sidebarMenu = [
  { key: "tests", label: "Đơn xét nghiệm", icon: "📋" },
  { key: "samples", label: "Quản lý mẫu", icon: "🧪" },
  { key: "statistics", label: "Thống kê", icon: "📊" },
  { key: "history", label: "Lịch sử thao tác", icon: "🕒" },
  { key: "profile", label: "Tài khoản", icon: "👤" }
];

// Dữ liệu mẫu cho đơn xét nghiệm
const TEST_ORDERS = [
  {
    id: "TEST001",
    customerName: "Nguyễn Văn A",
    phone: "0123456789",
    email: "nguyenvana@example.com",
    testType: "Xét nghiệm ADN cha con",
    registerDate: "2024-03-15",
    status: "pending",
    updateDate: "2024-03-15",
    sampleStatus: "Đã nhận",
    resultFile: null,
    expertNotes: ""
  },
  // Thêm các đơn khác nếu cần
];

// Các tùy chọn trạng thái
const statusOptions = [
  { value: "pending", label: "Chờ xử lý" },
  { value: "processing", label: "Đang xử lý" },
  { value: "completed", label: "Hoàn thành" },
  { value: "cancelled", label: "Đã hủy" }
];

// Các tùy chọn loại xét nghiệm
const testTypeOptions = [
  { value: "father_son", label: "Xét nghiệm ADN cha con" },
  { value: "mother_son", label: "Xét nghiệm ADN mẹ con" },
  { value: "siblings", label: "Xét nghiệm ADN anh chị em" },
  { value: "grandparents", label: "Xét nghiệm ADN ông bà" }
];

export default function StaffPage() {
  const [activeMenu, setActiveMenu] = useState("tests");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [testType, setTestType] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [orders, setOrders] = useState(TEST_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Lọc đơn xét nghiệm
  const filteredOrders = orders.filter(order => {
    const matchesSearch = search === "" || 
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customerName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "" || order.status === status;
    const matchesTestType = testType === "" || order.testType === testType;
    const matchesDateRange = (!dateRange.from || order.registerDate >= dateRange.from) &&
      (!dateRange.to || order.registerDate <= dateRange.to);
    return matchesSearch && matchesStatus && matchesTestType && matchesDateRange;
  });

  // Xử lý cập nhật trạng thái
  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, updateDate: new Date().toISOString().split('T')[0] }
        : order
    ));
  };

  // Xử lý upload kết quả
  const handleUploadResult = (orderId, file) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, resultFile: file }
        : order
    ));
  };

  // Xử lý thêm ghi chú
  const handleAddNote = (orderId, note) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, expertNotes: note }
        : order
    ));
  };

  // Render sidebar
  const renderSidebar = () => (
    <aside className="sidebar">
      <div className="logo">
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>
      <nav>
        <ul className="sidebar-menu">
          {sidebarMenu.map((item) => (
            <li key={item.key}>
              <a
                href="#"
                className={`menu-item ${activeMenu === item.key ? "active" : ""}`}
                onClick={() => setActiveMenu(item.key)}
              >
                <span className="icon">{item.icon}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="footer">
          © 2024 Bloodline. All rights reserved.
        </div>
      </nav>
    </aside>
  );

  // Render bảng đơn xét nghiệm
  const renderTestsTable = () => (
    <>
      {/* Bộ lọc */}
      <div className="toolbar">
        <Input
          type="text"
          placeholder="Tìm theo mã đơn, tên khách..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Select
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          {statusOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </Select>
        <Select
          value={testType}
          onChange={e => setTestType(e.target.value)}
        >
          {testTypeOptions.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </Select>
        <div className="date-range-group">
          <Input
            type="date"
            value={dateRange.from}
            onChange={e => setDateRange({...dateRange, from: e.target.value})}
          />
          <Input
            type="date"
            value={dateRange.to}
            onChange={e => setDateRange({...dateRange, to: e.target.value})}
          />
        </div>
        <Button className="ml-auto primary-action-button">
          + Đơn mới
        </Button>
      </div>

      {/* Bảng đơn xét nghiệm */}
      <div className="overflow-x-auto">
        <Card>
          <table className="data-table">
            <thead>
              <tr className="table-header-row">
                <th className="table-header">Mã đơn</th>
                <th className="table-header">Tên khách</th>
                <th className="table-header">Loại xét nghiệm</th>
                <th className="table-header">Ngày ĐK</th>
                <th className="table-header">Trạng thái</th>
                <th className="table-header">Ngày cập nhật</th>
                <th className="table-header">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="table-row">
                  <td className="table-cell">{order.id}</td>
                  <td className="table-cell employee-name-cell">
                    <div className="avatar" style={{ backgroundColor: '#0A3D62' }}>
                      {order.customerName.charAt(0).toUpperCase()}
                    </div>
                    <span>{order.customerName}</span>
                    <span className="customer-contact">{order.phone}</span>
                    <span className="customer-contact">{order.email}</span>
                  </td>
                  <td className="table-cell">{order.testType}</td>
                  <td className="table-cell">{order.registerDate}</td>
                  <td className="table-cell">
                    <span className={`status-badge status-badge-${order.status}`}>
                      {statusOptions.find(s => s.value === order.status)?.label}
                    </span>
                  </td>
                  <td className="table-cell">{order.updateDate}</td>
                  <td className="table-cell manager-actions-cell">
                    <Button 
                      variant="outline" size="sm" className="outline-action-button"
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowDetailModal(true);
                      }}
                    >
                      Chi tiết
                    </Button>
                    <Button 
                      variant="outline" size="sm" className="outline-action-button"
                      onClick={() => handleUpdateStatus(order.id, "completed")}
                    >
                      Cập nhật
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Modal chi tiết đơn */}
      {showDetailModal && selectedOrder && (
        <div className="modal-overlay">
          <Card className="modal-content">
            <button
              className="modal-close-button"
              onClick={() => setShowDetailModal(false)}
            >×</button>
            
            <h2 className="modal-title">Chi tiết đơn xét nghiệm #{selectedOrder.id}</h2>
            
            {/* Thông tin khách hàng */}
            <div className="modal-section">
              <h3 className="section-title">Thông tin khách hàng</h3>
              <div className="grid-cols-2-layout">
                <div>
                  <p><span className="field-label">Họ tên:</span> {selectedOrder.customerName}</p>
                  <p><span className="field-label">SĐT:</span> {selectedOrder.phone}</p>
                  <p><span className="field-label">Email:</span> {selectedOrder.email}</p>
                </div>
                <div>
                  <p><span className="field-label">Loại xét nghiệm:</span> {selectedOrder.testType}</p>
                  <p><span className="field-label">Ngày đăng ký:</span> {selectedOrder.registerDate}</p>
                  <p><span className="field-label">Trạng thái:</span> {statusOptions.find(s => s.value === selectedOrder.status)?.label}</p>
                </div>
              </div>
            </div>

            {/* Thông tin mẫu và kết quả */}
            <div className="modal-section">
              <h3 className="section-title">Thông tin mẫu và kết quả</h3>
              <div className="grid-cols-2-layout">
                <div>
                  <p><span className="field-label">Tình trạng mẫu:</span> {selectedOrder.sampleStatus}</p>
                  <p><span className="field-label">File kết quả:</span> 
                    {selectedOrder.resultFile ? 
                      <a href={URL.createObjectURL(selectedOrder.resultFile)} target="_blank" rel="noopener noreferrer">Xem file</a> 
                      : "Chưa có"
                    }
                  </p>
                  <Input 
                    type="file" 
                    className="file-input" 
                    onChange={e => handleUploadResult(selectedOrder.id, e.target.files[0])}
                  />
                </div>
                <div>
                  <p><span className="field-label">Ghi chú chuyên gia:</span></p>
                  <Input 
                    as="textarea" 
                    className="text-area-input" 
                    value={selectedOrder.expertNotes}
                    onChange={e => handleAddNote(selectedOrder.id, e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
                Đóng
              </Button>
              <Button onClick={() => handleUpdateStatus(selectedOrder.id, "completed")}>
                Lưu thay đổi
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );

  return (
    <div className="layout-container">
      {renderSidebar()}
      <main className="main-content">
        <div className="page-header">
          <h1>Quản lý Xét nghiệm DNA</h1>
          {/* User info in header */}
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
        <div className="content-wrapper">
          {activeMenu === "tests" && renderTestsTable()}
          {activeMenu === "samples" && <div>Nội dung quản lý mẫu...</div>}
          {activeMenu === "statistics" && <div>Nội dung thống kê...</div>}
          {activeMenu === "history" && <div>Nội dung lịch sử thao tác...</div>}
          {activeMenu === "profile" && <div>Nội dung tài khoản...</div>}
        </div>
      </main>
    </div>
  );
}
=======
// StaffPage.jsx
import React, { useState, useEffect } from "react";
import { Card, Button, Input, Select } from "../components/ui/ui";
import "./ManagerPage.css"; // Vẫn sử dụng ManagerPage.css như bạn yêu cầu
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getAvatarColor, getInitials } from '../utils/avatarUtils'; // Đảm bảo utils này tồn tại
import { FaTachometerAlt, FaCalendarAlt, FaVial, FaUserAlt, FaQuestionCircle } from 'react-icons/fa'; // Import FaQuestionCircle

// Import các component con từ thư mục Staff
// (Giả định các file này đã tồn tại hoặc sẽ được tạo trong cấu trúc Staff/)
import DashboardStaff from './Staff/Dashboard'; // Đổi tên thành DashboardStaff để tránh nhầm lẫn
import Booking from './Staff/Booking'; // Quản lý Đơn đặt dịch vụ
import Consultation from './Staff/Consultation'; // Quản lý Đơn tư vấn
import Sample from './Staff/Sample'; // Quản lý Mẫu xét nghiệm
import TestResultManagement from './Staff/TestResultManagement'; // Quản lý Kết quả xét nghiệm
import PersonalInfo from './Staff/PersonalInfo'; // Thông tin cá nhân


export default function StaffPage() {
    const { user } = useAuth(); // Lấy thông tin người dùng từ AuthContext
    const navigate = useNavigate();

    const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

    // Các state dữ liệu mẫu cho Staff (không còn employee hay order chung)
    const [bookings, setBookings] = useState([
        { id: "BOOK001", customer: "Khách hàng An", date: "2024-06-25", status: "Chưa xác nhận" },
        { id: "BOOK002", customer: "Khách hàng Bình", date: "2024-06-25", status: "Đã xác nhận" },
    ]);
    const [consultations, setConsultations] = useState([
        { id: "CONS001", customer: "Khách hàng C", date: "2024-06-26", status: "Mới" },
        { id: "CONS002", customer: "Khách hàng D", date: "2024-06-27", status: "Đã phản hồi" },
    ]);
    const [samples, setSamples] = useState([
        { id: "SAMPLE001", bookingId: "BOOK001", status: "Chưa nhận mẫu" },
        { id: "SAMPLE002", bookingId: "BOOK002", status: "Đang xử lý" },
    ]);
    const [testResultsData, setTestResultsData] = useState([ // Đổi tên để tránh trùng với component TestResultManagement
        { id: "TR001", sampleId: "SAMPLE001", status: "Đang chờ" },
        { id: "TR002", sampleId: "SAMPLE002", status: "Đã có kết quả" },
    ]);

    // Các state cho tìm kiếm
    const [bookingSearchTerm, setBookingSearchTerm] = useState("");
    const [consultationSearchTerm, setConsultationSearchTerm] = useState("");
    const [sampleSearchTerm, setSampleSearchTerm] = useState("");
    const [testResultSearchTerm, setTestResultSearchTerm] = useState("");


    // Sidebar menu items với FaQuestionCircle cho Consultation
    const sidebarMenuItems = [
        { key: "dashboard", label: "Tổng quan", icon: <FaTachometerAlt /> },
        { key: "booking", label: "Quản lý Đơn đặt dịch vụ", icon: <FaCalendarAlt /> },
        { key: "consultation", label: "Quản lý Đơn tư vấn", icon: <FaQuestionCircle /> },
        { key: "sample", label: "Quản lý Mẫu xét nghiệm", icon: <FaVial /> },
        { key: "testResults", label: "Quản lý Kết quả xét nghiệm", icon: <FaVial /> }, // Sử dụng FaVial hoặc FaFileAlt tùy thích
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
            case "dashboard":
                return {
                    title: "Tổng quan hệ thống (Staff)", // Điều chỉnh tiêu đề cho rõ ràng hơn
                    showSearch: false,
                    showFilter: false,
                    showAddNew: false,
                };
            case "booking":
                return {
                    title: "Quản lý Đơn đặt dịch vụ",
                    showSearch: true,
                    onSearchChange: (value) => setBookingSearchTerm(value),
                    showFilter: true,
                    filterOptions: bookingFilterOptions,
                    onFilterChange: (value) => console.log("Lọc đơn đặt dịch vụ theo:", value),
                    showAddNew: true,
                    addNewText: "Tạo đơn đặt dịch vụ mới",
                    onAddNewClick: () => alert("Chức năng tạo đơn đặt dịch vụ mới!"),
                };
            case "consultation":
                return {
                    title: "Quản lý Đơn tư vấn",
                    showSearch: true,
                    onSearchChange: (value) => setConsultationSearchTerm(value),
                    showFilter: true,
                    filterOptions: consultationFilterOptions,
                    onFilterChange: (value) => console.log("Lọc đơn tư vấn theo:", value),
                    showAddNew: true,
                    addNewText: "Thêm đơn tư vấn",
                    onAddNewClick: () => alert("Chức năng thêm đơn tư vấn mới!"),
                };
            case "sample":
                return {
                    title: "Quản lý Mẫu xét nghiệm",
                    showSearch: true,
                    onSearchChange: (value) => setSampleSearchTerm(value),
                    showFilter: true,
                    filterOptions: sampleFilterOptions,
                    onFilterChange: (value) => console.log("Lọc mẫu xét nghiệm theo:", value),
                    showAddNew: true,
                    addNewText: "Thêm mẫu xét nghiệm",
                    onAddNewClick: () => alert("Chức năng thêm mẫu xét nghiệm mới!"),
                };
            case "testResults":
                return {
                    title: "Quản lý Kết quả xét nghiệm",
                    showSearch: true,
                    onSearchChange: (value) => setTestResultSearchTerm(value),
                    showFilter: true,
                    filterOptions: testResultFilterOptions,
                    onFilterChange: (value) => console.log("Lọc kết quả xét nghiệm theo:", value),
                    showAddNew: true,
                    addNewText: "Thêm kết quả",
                    onAddNewClick: () => alert("Chức năng thêm kết quả xét nghiệm mới!"),
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
                    title: "Trang nhân viên",
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
                return <DashboardStaff />; // Component Dashboard riêng cho Staff
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
        <div className="manager-page-container"> {/* Giữ nguyên classname này */}
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
                {/* Main Header - Chứa tiêu đề trang và thông tin staff */}
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

                    {/* Phần thông tin staff ở góc phải */}
                    {user && ( // Chỉ hiển thị nếu có thông tin user
                        <div className="manager-profile-info"> {/* Giữ nguyên classname này */}
                            <div className="header-user-profile-area">
                                <div className="header-profile-icon-placeholder" style={{ backgroundColor: getAvatarColor(user.name || 'Staff') }}>
                                    {getInitials(user.name || 'Staff')}
                                </div>
                                <div className="header-user-info">
                                    <div>Chào, {user.name || 'Staff'}!</div>
                                    <div className="user-id">ID: {user.id || 'ST001'}</div>
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
                <div className="content-wrapper">
                    {renderMainContent()} {/* Gọi hàm renderMainContent */}
                </div>
            </main>
        </div>
    );
}
>>>>>>> 8e0ece6428b87162344c8e84a8b730fb73989ce8
