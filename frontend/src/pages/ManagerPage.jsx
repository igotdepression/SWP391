<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { Card, Button, Input, Select } from "../components/ui/ui";
import "./ManagerPage.css";
import { useAuth } from '../context/AuthContext'; // Assuming useAuth is needed for login/user info
import { useNavigate } from 'react-router-dom';
import { getAvatarColor, getInitials } from '../utils/avatarUtils';

export default function ManagerPage() {
  // eslint-disable-next-line no-unused-vars
  const { user } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [employees, setEmployees] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeMenuItem, setActiveMenuItem] = useState("nhanvien");
  // eslint-disable-next-line no-unused-vars
  const [detailEmployee, setDetailEmployee] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [detailOrder, setDetailOrder] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = useState({
    name: "",
    role: "",
    avatar: null
  });

  // Dashboard data
  const [dashboardStats, setDashboardStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    totalEmployees: 0,
    activeEmployees: 0
  });

  // Report data
  const [reportData, setReportData] = useState({
    revenueByMonth: [],
    ordersByStatus: [],
    topServices: [],
    employeePerformance: []
  });

  // Thêm state cho tooltip
  const [pieTooltip, setPieTooltip] = useState({ show: false, x: 0, y: 0, label: '', value: 0, percent: 0, color: '' });

  // Handle ResizeObserver errors
  useEffect(() => {
    const resizeObserverError = (e) => {
      if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
        e.stopPropagation();
      }
    };
    window.addEventListener('error', resizeObserverError);
    return () => window.removeEventListener('error', resizeObserverError);
  }, []);

  useEffect(() => {
    // Mock data for employees
    setEmployees([
      { id: "NV001", name: "Nguyễn Văn An", email: "nv_an@example.com", phone: "0901234567", role: "Admin", status: "Đang hoạt động", createdAt: "01/01/2023" },
      // ... thêm tới 20 nhân viên
    ]);

    // Mock data for orders
    setOrders([
      { id: "DH001", name: "Nguyễn Văn A", status: "Chưa giao", date: "01/01/2023" },
      // ... thêm đơn hàng
    ]);

    // Mock dashboard data
    setDashboardStats({
      totalOrders: 150,
      pendingOrders: 45,
      completedOrders: 105,
      totalRevenue: 375000000,
      monthlyRevenue: 45000000,
      totalEmployees: 20,
      activeEmployees: 18
    });

    // Mock report data
    setReportData({
      revenueByMonth: [
        { month: "T1", revenue: 35000000 },
        { month: "T2", revenue: 42000000 },
        { month: "T3", revenue: 38000000 },
        { month: "T4", revenue: 45000000 },
        { month: "T5", revenue: 50000000 },
        { month: "T6", revenue: 48000000 }
      ],
      ordersByStatus: [
        { status: "Chưa giao", count: 45 },
        { status: "Đang giao", count: 30 },
        { status: "Đã giao", count: 75 }
      ],
      topServices: [
        { name: "Xét nghiệm ADN cha con", count: 80, revenue: 200000000 },
        { name: "Xét nghiệm ADN mẹ con", count: 45, revenue: 112500000 },
        { name: "Xét nghiệm ADN ông cháu", count: 25, revenue: 62500000 }
      ],
      employeePerformance: [
        { name: "Nguyễn Văn An", orders: 45, revenue: 112500000 },
        { name: "Trần Thị B", orders: 38, revenue: 95000000 },
        { name: "Lê Văn C", orders: 32, revenue: 80000000 }
      ]
    });

    // Using user from useAuth() to set currentUser
    if (user) {
      setCurrentUser({
        name: user.fullName || user.email,
        role: user.role,
        avatar: user.avatar
      });
    }
  }, [user]);

  const filteredEmployees = employees.filter(e =>
    e.name.toLowerCase().includes(searchText.toLowerCase()) &&
    (!statusFilter || e.status === statusFilter) &&
    (!roleFilter || e.role === roleFilter)
  );
  const filteredOrders = orders.filter(o =>
    o.name.toLowerCase().includes(searchText.toLowerCase()) &&
    (!statusFilter || o.status === statusFilter)
  );

  const renderToolbar = () => (
    <div className="toolbar">
      <Input
        placeholder={activeMenuItem === "nhanvien" ? "Tìm kiếm nhân viên..." : "Tìm kiếm đơn..."}
        className="flex-1"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />
      {activeMenuItem === "nhanvien" && (
        <Select value={roleFilter} onChange={setRoleFilter}>
          <option value="">Tất cả vai trò</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Staff">Staff</option>
        </Select>
      )}
      <Select value={statusFilter} onChange={setStatusFilter}>
        <option value="">Tất cả trạng thái</option>
        {activeMenuItem === "nhanvien"
          ? ["Đang hoạt động", "Vô hiệu hóa"].map(s => <option key={s} value={s}>{s}</option>)
          : ["Chưa giao", "Đang giao", "Đã giao"].map(s => <option key={s} value={s}>{s}</option>)
        }
      </Select>
      <Button className="ml-auto primary-action-button">
        {activeMenuItem === "nhanvien" ? "+ Nhân viên mới" : "+ Đơn mới"}
      </Button>
    </div>
  );

  const renderTable = () => (
    <div className="overflow-x-auto">
      <Card>
        <table>
          <thead>
            <tr>
              {(activeMenuItem === "nhanvien"
                ? ["ID","Họ & Tên","Email","SĐT","Vai trò","Trạng thái","Ngày tạo","Thao tác"]
                : ["Mã đơn","Họ & Tên","Trạng thái","Ngày YC","Thao tác"]
              ).map(h => <th key={h}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {activeMenuItem === "nhanvien"
              ? filteredEmployees.map(emp => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td className="employee-name-cell">
                      <div className="avatar" style={{ backgroundColor: getAvatarColor(emp.name) }}>
                        {getInitials(emp.name)}
                      </div>
                      <span>{emp.name}</span>
                    </td>
                    <td>{emp.email}</td>
                    <td>{emp.phone}</td>
                    <td>
                      <span className={`role-badge role-badge-${emp.role.toLowerCase()}`}>
                        {emp.role}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge status-badge-${emp.status==="Đang hoạt động"?"active":"inactive"}`}>
                        {emp.status}
                      </span>
                    </td>
                    <td>{emp.createdAt}</td>
                    <td className="manager-actions-cell">
                      <Button variant="outline" size="sm" className="outline-action-button">✏️</Button>
                      <Button variant="outline" size="sm" className="outline-action-button">🗑️</Button>
                    </td>
                  </tr>
                ))
              : filteredOrders.map(ord => (
                  <tr key={ord.id}>
                    <td>{ord.id}</td>
                    <td className="employee-name-cell">
                      <div className="avatar" style={{ backgroundColor: getAvatarColor(ord.name) }}>
                        {getInitials(ord.name)}
                      </div>
                      <span>{ord.name}</span>
                    </td>
                    <td>
                      <span className={`status-badge status-badge-${ord.status==="Đang giao"?"active":"inactive"}`} style={{ backgroundColor: getAvatarColor(ord.status) }}>
                        {getInitials(ord.status)}
                      </span>
                    </td>
                    <td>{ord.date}</td>
                    <td><Button variant="outline" size="sm" className="outline-action-button">Chi tiết</Button></td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </Card>
    </div>
  );

  const renderDashboard = () => (
    <div className="dashboard-grid">
      {/* Stats Cards */}
      <div className="stats-grid">
        <Card className="stat-card">
          <h3>Tổng đơn hàng</h3>
          <div className="stat-value">{dashboardStats.totalOrders}</div>
          <div className="stat-details">
            <span className="stat-detail pending">Đang xử lý: {dashboardStats.pendingOrders}</span>
            <span className="stat-detail completed">Hoàn thành: {dashboardStats.completedOrders}</span>
          </div>
        </Card>
        <Card className="stat-card">
          <h3>Doanh thu</h3>
          <div className="stat-value">{formatCurrency(dashboardStats.totalRevenue)}</div>
          <div className="stat-details">
            <span className="stat-detail">Tháng này: {formatCurrency(dashboardStats.monthlyRevenue)}</span>
          </div>
        </Card>
        <Card className="stat-card">
          <h3>Nhân viên</h3>
          <div className="stat-value">{dashboardStats.totalEmployees}</div>
          <div className="stat-details">
            <span className="stat-detail active">Đang hoạt động: {dashboardStats.activeEmployees}</span>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <Card className="chart-card">
          <h3>Doanh thu theo tháng</h3>
          <div className="chart-container revenue-chart">
            <div className="chart-y-axis">
              {[50, 40, 30, 20, 10, 0].map(value => (
                <div key={value} className="y-axis-label">
                  {formatCurrency(value * 1000000)}
                </div>
              ))}
            </div>
            <div className="chart-bars">
              {reportData.revenueByMonth.map((item, index) => (
                <div key={index} className="chart-bar">
                  <div className="bar-value" style={{ 
                    height: `${(item.revenue / 50000000) * 250}px`,
                    background: `linear-gradient(180deg, 
                      ${getGradientColor(item.revenue / 50000000)} 0%, 
                      ${getGradientColor(item.revenue / 50000000, true)} 100%)`
                  }}>
                    <div className="bar-tooltip">
                      <div className="tooltip-title">{item.month}</div>
                      <div className="tooltip-value">{formatCurrency(item.revenue)}</div>
                    </div>
                  </div>
                  <div className="bar-label">{item.month}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <Card className="chart-card">
          <h3>Đơn hàng theo trạng thái</h3>
          <div className="chart-container pie-chart">
            <div className="pie-chart-container">
              <svg viewBox="0 0 130 130" className="pie-svg">
                {calculatePieSegments(reportData.ordersByStatus).map((segment, index) => (
                  <g key={index} className="pie-segment-group">
                    <path
                      d={segment.path}
                      fill={segment.color}
                      className="pie-segment-path"
                      onMouseEnter={e => handlePieSegmentHover(e, segment, reportData.ordersByStatus[index])}
                      onMouseLeave={handlePieSegmentLeave}
                    />
                    <text
                      x={segment.labelX}
                      y={segment.labelY}
                      className="pie-segment-label"
                      textAnchor="middle"
                    >
                      {segment.percentage}%
                    </text>
                  </g>
                ))}
                {/* Tổng số đơn ở giữa */}
                <text x="65" y="70" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0a3d62">{reportData.ordersByStatus.reduce((sum, item) => sum + item.count, 0)}</text>
                <text x="65" y="88" textAnchor="middle" fontSize="10" fill="#666">Tổng đơn</text>
              </svg>
              <div className="pie-legend">
                {reportData.ordersByStatus.map((item, index) => (
                  <div key={index} className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: getStatusColor(item.status) }}></div>
                    <div className="legend-text">
                      <span className="legend-label">{item.status}</span>
                      <span className="legend-value">{item.count} đơn</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Tooltip */}
              {pieTooltip.show && (
                <div className="pie-tooltip" style={{ left: pieTooltip.x, top: pieTooltip.y, background: pieTooltip.color }}>
                  <div><b>{pieTooltip.label}</b></div>
                  <div>{pieTooltip.value} đơn</div>
                  <div>{pieTooltip.percent}%</div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="activity-card">
        <h3>Hoạt động gần đây</h3>
        <div className="activity-list">
          {orders.slice(0, 5).map((order, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">📦</div>
              <div className="activity-content">
                <div className="activity-title">Đơn hàng {order.id}</div>
                <div className="activity-details">
                  <span>{order.name}</span>
                  <span className={`status-badge status-badge-${order.status === "Đang giao" ? "active" : "inactive"}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="activity-time">{order.date}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const calculatePieSegments = (data) => {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    let startAngle = 0;
    const radius = 48;
    const centerX = 65;
    const centerY = 65;

    return data.map((item, index) => {
      const percentage = (item.count / total) * 100;
      const angle = (percentage / 100) * 360;
      const endAngle = startAngle + angle;
      // Calculate path
      const startRad = (startAngle - 90) * (Math.PI / 180);
      const endRad = (endAngle - 90) * (Math.PI / 180);
      const x1 = centerX + radius * Math.cos(startRad);
      const y1 = centerY + radius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(endRad);
      const y2 = centerY + radius * Math.sin(endRad);
      const largeArcFlag = angle > 180 ? 1 : 0;
      const path = `M ${centerX},${centerY} L ${x1},${y1} A ${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;
      // Calculate label position
      const labelAngle = (startAngle + angle / 2) * (Math.PI / 180);
      const labelRadius = radius * 0.7;
      const labelX = centerX + labelRadius * Math.cos(labelAngle - Math.PI / 2);
      const labelY = centerY + labelRadius * Math.sin(labelAngle - Math.PI / 2);
      startAngle = endAngle;
      return {
        path,
        percentage: Math.round(percentage),
        labelX,
        labelY,
        color: getStatusColor(item.status)
      };
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Chưa giao":
        return "#ef4444"; // Đỏ
      case "Đang giao":
        return "#f59e0b"; // Cam
      case "Đã giao":
        return "#10b981"; // Xanh lá
      default:
        return "#94a3b8"; // Xám
    }
  };

  const handlePieSegmentHover = (e, segment, item) => {
    e.currentTarget.style.transform = 'scale(1.08)';
    e.currentTarget.style.filter = 'brightness(1.2)';
    const svgRect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
    setPieTooltip({
      show: true,
      x: svgRect.left + segment.labelX * (svgRect.width / 100),
      y: svgRect.top + segment.labelY * (svgRect.height / 100) - 30,
      label: item.status,
      value: item.count,
      percent: segment.percentage,
      color: segment.color
    });
  };

  const handlePieSegmentLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.filter = 'brightness(1)';
    setPieTooltip({ show: false });
  };

  const getGradientColor = (ratio, isEnd = false) => {
    // Color scale from blue to green based on ratio
    const r = Math.floor(37 + (ratio * 50));
    const g = Math.floor(99 + (ratio * 100));
    const b = Math.floor(235 - (ratio * 50));
    return `rgb(${r}, ${g}, ${b})`;
  };

  const renderReports = () => (
    <>
      <Card className="report-card">
        <h3>Dịch vụ phổ biến</h3>
        <div className="report-table">
          <table>
            <thead>
              <tr>
                <th>Dịch vụ</th>
                <th>Số lượng</th>
                <th>Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {reportData.topServices.map((service, index) => (
                <tr key={index}>
                  <td>{service.name}</td>
                  <td>{service.count}</td>
                  <td>{formatCurrency(service.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card className="report-card">
        <h3>Hiệu suất nhân viên</h3>
        <div className="report-table">
          <table>
            <thead>
              <tr>
                <th>Nhân viên</th>
                <th>Số đơn</th>
                <th>Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {reportData.employeePerformance.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.name}</td>
                  <td>{employee.orders}</td>
                  <td>{formatCurrency(employee.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card className="report-card full-width">
        <h3>Biểu đồ doanh thu</h3>
        <div className="chart-container revenue-chart">
          <svg width="100%" height="300" viewBox="0 0 600 300">
            {reportData.revenueByMonth.map((item, index) => {
              const x = index * 100 + 50;
              const height = (item.revenue / 50000000) * 250;
              const y = 300 - height;
              return (
                <g key={index} className="chart-bar-group">
                  <rect
                    x={x - 30}
                    y={y}
                    width="60"
                    height={height}
                    fill="#3b82f6"
                    className="chart-bar"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.fill = '#2563eb';
                      const tooltip = document.createElement('div');
                      tooltip.className = 'chart-tooltip';
                      tooltip.innerHTML = `<div>${item.month}</div><div>${formatCurrency(item.revenue)}</div>`;
                      tooltip.style.left = `${e.clientX}px`;
                      tooltip.style.top = `${e.clientY - 40}px`;
                      document.body.appendChild(tooltip);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.fill = '#3b82f6';
                      const tooltip = document.querySelector('.chart-tooltip');
                      if (tooltip) tooltip.remove();
                    }}
                  />
                  <text x={x} y="290" textAnchor="middle" fill="#666" fontSize="12">{item.month}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </Card>
    </>
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <img src="/logo.png" alt="Logo" className="logo" />
        {["dashboard","nhanvien","quanlidon","thongke"].map(key => (
          <div
            key={key}
            className={`menu-item ${activeMenuItem===key?"active":""}`}
            onClick={()=>setActiveMenuItem(key)}
          >
            {key==="dashboard"?"🏠 Dashboard":key==="nhanvien"?"👥 Nhân viên":
             key==="quanlidon"?"📦 Đơn hàng":"📊 Báo cáo"}
          </div>
        ))}
        <div className="footer">© 2025 Company</div>
      </aside>
      <main className="main-content">
        <div className="content-wrapper">
          <div className="page-header">
            <h1>
              {activeMenuItem==="nhanvien"?"Quản lý Nhân viên":
               activeMenuItem==="quanlidon"?"Quản lý Đơn hàng":
               activeMenuItem==="dashboard"?"Dashboard":"Báo cáo & Thống kê"}
            </h1>
            <div className="header-user-profile-area" onClick={() => { /* Add navigation to user profile here if needed */ }}>
              <span className="header-user-info">{currentUser.name || currentUser.email}</span>
              <div className="header-profile-icon-placeholder" style={{ backgroundColor: getAvatarColor(user.fullName) }}>
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} />
                ) : (
                  currentUser.name ? getInitials(currentUser.name) : ''
                )}
              </div>
            </div>
          </div>
          {activeMenuItem === "dashboard" && renderDashboard()}
          {activeMenuItem === "thongke" && renderReports()}
          {activeMenuItem !== "dashboard" && activeMenuItem !== "thongke" && (
            <>
              {renderToolbar()}
              {renderTable()}
            </>
          )}
        </div>

        {detailEmployee && (
          <div className="modal-overlay">
            <div className="modal-content">
              {/* Chi tiết nhân viên */}
              <Button onClick={()=>setDetailEmployee(null)}>Đóng</Button>
            </div>
          </div>
        )}
        {detailOrder && (
          <div className="modal-overlay">
            <div className="modal-content">
              {/* Chi tiết đơn hàng */}
              <Button onClick={()=>setDetailOrder(null)}>Đóng</Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
=======
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
>>>>>>> 8e0ece6428b87162344c8e84a8b730fb73989ce8
