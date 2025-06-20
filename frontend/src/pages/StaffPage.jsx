import React, { useState } from "react";
import { Card, Button, Input, Select } from "../components/ui/ui"; // Add these imports
import "./StaffPage.css";

// Menu cho quản lý xét nghiệm DNA
const sidebarMenu = [
  { key: "dashboard", label: " Tổng quan", icon: "🏠" }, // This is the key we'll use
  { key: "consultations", label: " Quản lý Đơn tư vấn", icon: "💬" },
  { key: "tests", label: " Quản lý Đơn đặt lịch", icon: "📅" },
  { key: "samples", label: " Quản lý Mẫu xét nghiệm", icon: "🧪" },
  { key: "results", label: " Quản lý Kết quả xét nghiệm", icon: "📄" },
  { key: "profile", label: " Thông tin cá nhân", icon: "👤" }
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
            onChange={e => setDateRange({ ...dateRange, from: e.target.value })}
          />
          <Input
            type="date"
            value={dateRange.to}
            onChange={e => setDateRange({ ...dateRange, to: e.target.value })}
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