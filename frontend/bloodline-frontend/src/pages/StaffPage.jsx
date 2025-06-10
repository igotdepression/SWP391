import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Input, Select } from "../components/ui/ui";
import './StaffPage.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CreateModal from '../components/CreateModal';

const StaffPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    role: "",
    avatar: null
  });

  // Data states
  const [bookings, setBookings] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [samples, setSamples] = useState([]);
  const [testResults, setTestResults] = useState([]);

  // Dashboard data
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    totalConsultations: 0,
    pendingConsultations: 0,
    totalSamples: 0,
    pendingSamples: 0,
    totalTestResults: 0,
    pendingTestResults: 0
  });

  useEffect(() => {
    fetchDashboardStats();
    fetchData();
  }, [activeTab]);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get('/api/staff/dashboard', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const fetchData = async () => {
    try {
      switch (activeTab) {
        case 'bookings':
          const bookingsResponse = await axios.get('/api/staff/bookings', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setBookings(bookingsResponse.data);
          break;
        case 'consultations':
          const consultationsResponse = await axios.get('/api/staff/consultations', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setConsultations(consultationsResponse.data);
          break;
        case 'samples':
          const samplesResponse = await axios.get('/api/staff/samples', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setSamples(samplesResponse.data);
          break;
        case 'test-results':
          const testResultsResponse = await axios.get('/api/staff/test-results', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setTestResults(testResultsResponse.data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleStatusUpdate = async (type, id, newStatus) => {
    try {
      switch (type) {
        case 'booking':
          await axios.patch(`/api/staff/bookings/${id}/status`, 
            { status: newStatus },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }
          );
          break;
        case 'sample':
          await axios.patch(`/api/staff/samples/${id}/status`,
            { status: newStatus },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }
          );
          break;
        default:
          break;
      }
      fetchData();
      fetchDashboardStats();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleCreateNew = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  const getStatusClass = (status) => {
    const activeStatuses = [
      "Đã xác nhận", "Đang thực hiện", "Hoàn thành", // Booking
      "Đang làm việc", "Đang tư vấn", // Consultant
      "Đã nhận mẫu", "Đang xử lý", "Đã xử lý xong", // Sample
      "Đang xử lý", "Đã xử lý xong", "Đã xác nhận", "Đã gửi cho khách" // Test Result
    ];
    const inactiveStatuses = [
      "Chờ xác nhận", "Đã hủy", // Booking
      "Nghỉ phép", "Nghỉ việc", // Consultant
      "Chờ nhận mẫu", "Đã hủy" // Sample (Test Result 'Đã hủy' covered if not in activeStatuses)
    ];

    if (activeStatuses.includes(status)) {
      return "active";
    } else if (inactiveStatuses.includes(status)) {
      return "inactive";
    } else {
      // Default to inactive if not explicitly defined
      return "inactive";
    }
  };

  const renderToolbar = () => {
    const placeholder = {
      booking: "Tìm kiếm booking...",
      consultant: "Tìm kiếm tư vấn viên...",
      sample: "Tìm kiếm mẫu...",
      result: "Tìm kiếm kết quả..."
    }[activeTab];

    return (
      <div className="toolbar">
        <Input
          placeholder={placeholder}
          className="flex-1"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <Select value={statusFilter} onChange={setStatusFilter}>
          <option value="">Tất cả trạng thái</option>
          {getStatusOptions().map(s => 
            <option key={s} value={s}>{s}</option>
          )}
        </Select>
        <Button className="ml-auto primary-action-button" onClick={handleCreateNew}>
          {getAddButtonText()}
        </Button>
      </div>
    );
  };

  const getStatusOptions = () => {
    switch (activeTab) {
      case "booking":
        return ["Chờ xác nhận", "Đã xác nhận", "Đang thực hiện", "Hoàn thành", "Đã hủy"];
      case "consultant":
        return ["Đang làm việc", "Đang tư vấn", "Nghỉ phép", "Nghỉ việc"];
      case "sample":
        return ["Chờ nhận mẫu", "Đã nhận mẫu", "Đang xử lý", "Đã xử lý xong", "Đã hủy"];
      case "result":
        return ["Đang xử lý", "Đã xử lý xong", "Đã xác nhận", "Đã gửi cho khách", "Đã hủy"];
      default:
        return [];
    }
  };

  const getAddButtonText = () => {
    switch (activeTab) {
      case "booking":
        return "+ Booking mới";
      case "consultant":
        return "+ Tư vấn viên mới";
      case "sample":
        return "+ Mẫu mới";
      case "result":
        return "+ Kết quả mới";
      default:
        return "+ Thêm mới";
    }
  };

  const renderTable = (data, type) => {
    const headers = {
      bookings: ['ID', 'User', 'Service', 'Date', 'Status', 'Total Price'],
      consultations: ['ID', 'Booking', 'Consultant', 'Date', 'Mode', 'Status'],
      samples: ['ID', 'Type', 'Booking', 'Participant', 'Received Date', 'Status'],
      'test-results': ['ID', 'Booking', 'Date', 'Status', 'Content']
    };

    const headerKeyMap = {
      bookings: ['bookingID', 'user', 'service', 'bookingDate', 'status', 'totalPrice'],
      consultations: ['consultationID', 'booking', 'consultant', 'consultationDate', 'consultationMode', 'status'],
      samples: ['sampleID', 'sampleType', 'booking', 'participant', 'receivedDate', 'status'],
      'test-results': ['testResultID', 'booking', 'resultDate', 'resultStatus', 'resultContent']
    };

    return (
      <div className="overflow-x-auto">
        <Card>
          <table>
            <thead>
              <tr>
                {headers[type].map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
                {type === 'bookings' || type === 'samples' ? <th>Actions</th> : null}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item[headerKeyMap[type][0]]}>
                  {headerKeyMap[type].map((key, index) => (
                    <td key={index}>
                      {key.includes('.') ? 
                        item[key.split('.')[0]]?.[key.split('.')[1]] : 
                        item[key]}
                    </td>
                  ))}
                  {(type === 'bookings' || type === 'samples') && (
                    <td>
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusUpdate(type, item[headerKeyMap[type][0]], e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="dashboard-grid">
      <div className="dashboard-card">
        <h3>Bookings</h3>
        <p>Total: {stats.totalBookings}</p>
        <p>Pending: {stats.pendingBookings}</p>
      </div>
      <div className="dashboard-card">
        <h3>Consultations</h3>
        <p>Total: {stats.totalConsultations}</p>
        <p>Pending: {stats.pendingConsultations}</p>
      </div>
      <div className="dashboard-card">
        <h3>Samples</h3>
        <p>Total: {stats.totalSamples}</p>
        <p>Pending: {stats.pendingSamples}</p>
      </div>
      <div className="dashboard-card">
        <h3>Test Results</h3>
        <p>Total: {stats.totalTestResults}</p>
        <p>Pending: {stats.pendingTestResults}</p>
      </div>
    </div>
  );

  const getPageTitle = () => {
    switch (activeTab) {
      case "dashboard":
        return "Dashboard";
      case "bookings":
        return "Quản lý Booking";
      case "consultations":
        return "Quản lý Tư vấn";
      case "samples":
        return "Quản lý Mẫu xét nghiệm";
      case "test-results":
        return "Quản lý Kết quả xét nghiệm";
      default:
        return "Staff Page";
    }
  };

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <img src="/logo.png" alt="Logo" className="logo" />
        {[
          { key: "dashboard", label: "🏠 Dashboard" },
          { key: "bookings", label: "📅 Quản lý Booking" },
          { key: "consultant", label: "👥 Quản lý Tư vấn viên" },
          { key: "samples", label: "🧪 Quản lý Mẫu xét nghiệm" },
          { key: "test-results", label: "📊 Quản lý Kết quả xét nghiệm" }
        ].map(item => (
          <div
            key={item.key}
            className={`menu-item ${activeTab === item.key ? "active" : ""}`}
            onClick={() => setActiveTab(item.key)}
          >
            {item.label}
          </div>
        ))}
        <div className="footer">© 2025 Company</div>
      </aside>
      <main className="main-content">
        <div className="content-wrapper">
          <div className="page-header">
            <h1>{getPageTitle()}</h1>
            <div className="header-user-profile-area">
              <span className="header-user-info">{currentUser.name || currentUser.email}</span>
              <div className="header-profile-icon-placeholder">
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} />
                ) : (
                  currentUser.name ? currentUser.name.split(" ").map(n => n[0]).join("").toUpperCase() : ''
                )}
              </div>
            </div>
          </div>
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab !== "dashboard" && (
            <>
              {renderToolbar()}
              {renderTable(bookings, 'bookings')}
            </>
          )}
        </div>
      </main>
      {showCreateModal && (
        <CreateModal
          type={activeTab}
          onClose={handleCloseModal}
          onSuccess={() => { fetchData(); fetchDashboardStats(); handleCloseModal(); }}
        />
      )}
    </div>
  );
};

export default StaffPage; 