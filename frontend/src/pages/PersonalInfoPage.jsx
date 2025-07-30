import React, { useState, useEffect } from 'react';
import './PersonalInfoPage.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAvatarColor, getInitials } from '../utils/avatarUtils';
import locations from '../data/vietnamLocations.json';
import { userAPI, bookingAPI, participantAPI, testResultAPI } from '../services/api';
import ImageUpload from '../components/ImageUpload';
import IdCardDisplay from '../components/IdCardDisplay';

const sampleList = [
  {
    id: 'M20250701A',
    type: 'Niêm mạc miệng',
    date: '10/07/2025',
    collector: 'Bs. Trần Minh',
    method: 'Tại phòng khám',
  },
  {
    id: 'M20250701B',
    type: 'Máu',
    date: '11/07/2025',
    collector: 'Bs. Nguyễn Văn B',
    method: 'Tại nhà',
  },
];

const appointmentList = [
  {
    id: 'ORD20250701',
    testType: 'Cha - Con',
    time: '10/07/2025 - 09:00 AM',
    status: 'Đang xét nghiệm',
    payment: {
      fee: '2.000.000đ',
      method: 'Chuyển khoản',
      status: 'Đã thanh toán',
      date: '09/07/2025',
    },
    serviceType: 'Xét nghiệm thai nhi',
    serviceCategory: 'Dân sự',
    servicePackage: 'Lấy nhanh',
    numSamples: 2,
    bookingDate: '2024-06-27',
    appointmentDate: '2024-06-28',
    totalPrice: '1.200.000',
    note: 'Tôi cần kết quả gấp.',
    participants: [
      { id: 1, name: 'Trần Thị B', gender: 'Nữ', birthYear: 1985, relation: 'Mẹ nghi vấn', sampleType: 'Máu', method: 'Tại trung tâm' },
      { id: 2, name: 'Trần Văn D', gender: 'Nam', birthYear: 2012, relation: 'Con', sampleType: 'Tóc', method: 'Tại nhà' },
    ],
    statusStep: 1,
  },
  {
    id: 'ORD20250702',
    testType: 'Mẹ - Con',
    time: '12/07/2025 - 14:00 PM',
    status: 'Đã hoàn thành',
    payment: {
      fee: '2.500.000đ',
      method: 'Tiền mặt',
      status: 'Chưa thanh toán',
      date: '-',
    },
    serviceType: 'Xét nghiệm cha con',
    serviceCategory: 'Pháp lý',
    servicePackage: 'Tiêu chuẩn',
    numSamples: 3,
    bookingDate: '2024-07-01',
    appointmentDate: '2024-07-02',
    totalPrice: '2.500.000',
    note: '',
    participants: [
      { id: 1, name: 'Nguyễn Văn A', gender: 'Nam', birthYear: 1980, relation: 'Cha', sampleType: 'Niêm mạc miệng', method: 'Tại trung tâm' },
      { id: 2, name: 'Nguyễn Văn B', gender: 'Nam', birthYear: 2010, relation: 'Con', sampleType: 'Máu', method: 'Tại nhà' },
      { id: 3, name: 'Nguyễn Thị C', gender: 'Nữ', birthYear: 1982, relation: 'Mẹ', sampleType: 'Tóc', method: 'Tại nhà' },
    ],
    statusStep: 3,
  },
];

const resultList = [
  {
    date: '15/07/2025',
    conclusion: '✔️ Xác nhận quan hệ cha - con',
    file: 'result-cha-con.pdf',
  },
  {
    date: '16/07/2025',
    conclusion: '❌ Không xác nhận quan hệ mẹ - con',
    file: 'result-me-con.pdf',
  },
];

const paymentList = [
  {
    id: 'ORD20250701',
    fee: '2.000.000đ',
    method: 'Chuyển khoản',
    status: 'Đã thanh toán',
    date: '09/07/2025',
  },
  {
    id: 'ORD20250702',
    fee: '2.500.000đ',
    method: 'Tiền mặt',
    status: 'Chưa thanh toán',
    date: '-',
  },
];

const PersonalInfoPage = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('personal-info');
  const [toggleStates, setToggleStates] = useState({
    twoFactor: true,
    shareResults: true
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  // Địa chỉ động
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingProfileData, setPendingProfileData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [showTestResultModal, setShowTestResultModal] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showIdCardUpload, setShowIdCardUpload] = useState(false);

  // Lấy danh sách tỉnh
  const provinces = locations.provinces;
  // Lấy danh sách quận/huyện theo tỉnh
  const districts = selectedProvince && provinces.find(p => p.code === selectedProvince)?.districts ? provinces.find(p => p.code === selectedProvince).districts : [];
  // Lấy danh sách xã/phường theo quận/huyện
  const communes = selectedDistrict && districts.find(d => d.code === selectedDistrict)?.communes ? districts.find(d => d.code === selectedDistrict).communes : [];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userAPI.getUserProfile();
        setProfile(res.data);
      } catch (err) {
        console.error('Lỗi lấy thông tin cá nhân:', err);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (showAppointmentModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showAppointmentModal]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = user?.userID || localStorage.getItem('userID');
        if (!userId) return;
        const res = await bookingAPI.getBookingsByUserId(userId);
        setBookings(res.data);
        console.log('Bookings:', res.data); // Log dữ liệu lấy từ API
      } catch (err) {
        setBookings([]);
        console.log('Bookings API error:', err);
      }
    };
    fetchBookings();
  }, [user]);

  const handleMenuItemClick = (menuId) => {
    setActiveMenuItem(menuId);
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleDownloadClick = (file) => {
    alert(`Đang tải xuống file: ${file || 'PDF kết quả xét nghiệm'}...`);
  };

  const handleViewClick = async (bookingID) => {
    // Lấy chi tiết booking từ API
    try {
      const res = await bookingAPI.getBookingDetails(bookingID);
      setSelectedAppointment(res.data); // res.data đã có participants
      setShowAppointmentModal(true);
    } catch (err) {
      alert('Không lấy được chi tiết đơn hàng!');
    }
  };

  const handleCloseModal = () => {
    setShowAppointmentModal(false);
    setSelectedAppointment(null);
  };

  const handleToggleSwitch = (toggleName) => {
    setToggleStates(prev => ({
      ...prev,
      [toggleName]: !prev[toggleName]
    }));
  };

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      logout();
      navigate('/login');
    }
  };

  const handleViewPayment = (id) => {
    const found = paymentList.find(p => p.id === id);
    if (found) {
      setSelectedPayment(found);
      setShowPaymentModal(true);
    }
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedPayment(null);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const form = e.target.form || document.querySelector('.modal-content form');
    let address = '';
    const provinceObj = provinces.find(p => p.code === selectedProvince);
    const districtObj = selectedProvince && districts.find(d => d.code === selectedDistrict);
    const communeObj = selectedDistrict && communes.find(c => c.code === selectedCommune);
    if (provinceObj && districtObj && communeObj) {
      address = `${communeObj.name}, ${districtObj.name}, ${provinceObj.name}`;
    }
    const profileData = {
      fullName: form.fullName?.value || '',
      phoneNumber: form.phoneNumber?.value || '',
      email: form.email?.value || '',
      dateOfBirth: form.dateOfBirth?.value || '',
      gender: form.gender?.value || '',
      address: address || form.address?.value || '',
    };
    setPendingProfileData(profileData);
    setShowConfirmModal(true);
  };

  const handleConfirmSave = async () => {
    if (!pendingProfileData) return;
    try {
      await userAPI.updateUserProfile(pendingProfileData);
      alert('Cập nhật thành công!');
      setShowEditModal(false);
      setShowConfirmModal(false);
      setPendingProfileData(null);
      // Reload lại profile sau khi cập nhật
      const res = await userAPI.getUserProfile();
      setProfile(res.data);
    } catch (err) {
      alert(err.message || 'Cập nhật thất bại!');
      setShowConfirmModal(false);
      setPendingProfileData(null);
    }
  };

  const handleCancelConfirm = () => {
    setShowConfirmModal(false);
    setPendingProfileData(null);
  };

  const handleImageUploadSuccess = (imageUrl) => {
    // Cập nhật profile với ảnh mới
    setProfile(prev => ({
      ...prev,
      avatarUrl: imageUrl
    }));
    setShowImageUpload(false);
  };

  const handleOpenImageUpload = () => {
    setShowImageUpload(true);
  };

  const handleCloseImageUpload = () => {
    setShowImageUpload(false);
  };

  const handleIdCardUploadSuccess = (imageUrl) => {
    setProfile(prev => ({
      ...prev,
      idCardUrl: imageUrl
    }));
    setShowIdCardUpload(false);
  };

  const handleOpenIdCardUpload = () => {
    setShowIdCardUpload(true);
  };

  const handleCloseIdCardUpload = () => {
    setShowIdCardUpload(false);
  };

  const handleViewTestResult = async (bookingID) => {
    try {
      console.log('=== Fetching test result ===');
      console.log('Booking ID:', bookingID);
      console.log('User token:', localStorage.getItem('token'));
      console.log('User role:', user?.role);
      
      const res = await testResultAPI.getTestResultByBookingId(bookingID);
      console.log('Test result response:', res);
      console.log('Test result data:', res.data);
      
      if (res.data) {
        setTestResult(res.data);
        setShowTestResultModal(true);
      } else {
        alert('Không có dữ liệu kết quả!');
      }
    } catch (err) {
      console.error('=== Error fetching test result ===');
      console.error('Error:', err);
      console.error('Error response:', err.response);
      console.error('Error status:', err.response?.status);
      console.error('Error data:', err.response?.data);
      console.error('Error message:', err.message);
      
      let errorMessage = 'Không lấy được kết quả xét nghiệm!';
      if (err.response?.status === 404) {
        errorMessage = 'Không tìm thấy kết quả xét nghiệm cho booking này!';
      } else if (err.response?.status === 403) {
        errorMessage = 'Không có quyền truy cập kết quả xét nghiệm!';
      } else if (err.response?.data) {
        errorMessage = 'Lỗi: ' + err.response.data;
      }
      
      alert(errorMessage);
    }
  };

  const handleDownloadFile = async (fileUrl, fileName) => {
    try {
      console.log('Downloading file from:', fileUrl);
      
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || 'test-result.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      console.log('File downloaded successfully');
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Không thể tải xuống file! Lỗi: ' + error.message);
    }
  };

  // Render content based on active menu item
  const renderContent = () => {
    switch (activeMenuItem) {
      case 'personal-info':
        return (
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                <span className="card-title-icon">👤</span>
                Thông tin cá nhân
              </h4>
              <button className="edit-btn-yellow" onClick={handleEditClick}>
                <span role="img" aria-label="edit">📝</span> Chỉnh sửa
              </button>
            </div>
            <div className="card-body">
              <div style={{marginBottom: 24}}>
                <h5 style={{color: 'var(--primary-dark-blue)', marginBottom: 12}}>Thông tin cơ bản</h5>
                
                {/* Avatar Section */}
                <div style={{marginBottom: 20}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 15}}>
                    {profile?.avatarUrl ? (
                      <img 
                        src={profile.avatarUrl} 
                        alt="Avatar" 
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          border: '3px solid #007bff'
                        }}
                      />
                    ) : (
                      <div 
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          backgroundColor: getAvatarColor(profile?.fullName || ''),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '24px',
                          fontWeight: 'bold'
                        }}
                      >
                        {getInitials(profile?.fullName || '')}
                      </div>
                    )}
                    <div>
                      <button 
                        onClick={handleOpenImageUpload}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        {profile?.avatarUrl ? 'Thay đổi ảnh' : 'Thêm ảnh đại diện'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="info-row"><span className="info-label">Họ và tên:</span><span className="info-value">{profile?.fullName || ''}</span></div>
                <div className="info-row"><span className="info-label">Số điện thoại:</span><span className="info-value">{profile?.phoneNumber || ''}</span></div>
                <div className="info-row"><span className="info-label">Email:</span><span className="info-value">{profile?.email || ''}</span></div>
                <div className="info-row"><span className="info-label">Ngày sinh:</span><span className="info-value">{profile?.dateOfBirth || ''}</span></div>
                <div className="info-row"><span className="info-label">Giới tính:</span><span className="info-value">{profile?.gender || ''}</span></div>
                <div className="info-row"><span className="info-label">Địa chỉ:</span><span className="info-value">{profile?.address || ''}</span></div>
              </div>

              {/* ID Card Section */}
              <div style={{marginTop: 30}}>
                <IdCardDisplay 
                  idCardUrl={profile?.idCardUrl}
                  onUploadClick={handleOpenIdCardUpload}
                />
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                <span className="card-title-icon">📋</span>
                Danh sách đơn hàng & dịch vụ
              </h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="info-table">
                  <thead>
                    <tr>
                      <th>Mã đặt lịch</th>
                      <th>Loại dịch vụ</th>
                      <th>Gói</th>
                      <th>Ngày hẹn</th>
                      <th>Khách hàng</th>
                      <th>Trạng thái</th>
                      <th>Giá</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 ? (
                      <tr><td colSpan={8} style={{textAlign:'center', color: 'red'}}>Không có đơn hàng nào hoặc không lấy được dữ liệu từ API</td></tr>
                    ) : (
                      bookings.map(item => (
                        <tr key={item.bookingID}>
                          <td>{item.bookingID}</td>
                          <td>{item.serviceName}</td>
                          <td>{item.packageType}</td>
                          <td>{item.appointmentDate ? new Date(item.appointmentDate).toLocaleDateString('vi-VN') : '-'}</td>
                          <td>{item.customerName}</td>
                          <td>
                            <span className={
                              item.status === 'Hoàn thành' ? 'status-badge status-success' : 'status-badge status-info'
                            }>{item.status}</span>
                          </td>
                          <td>{item.totalPrice ? item.totalPrice.toLocaleString('vi-VN') + 'đ' : '-'}</td>
                          <td>
                            <button className="download-btn" onClick={() => handleViewClick(item.bookingID)}>Xem</button>
                            {item.status && item.status.trim() === 'Hoàn thành' && (
                              <button className="download-btn" style={{marginLeft: 8}} onClick={() => handleViewTestResult(item.bookingID)}>Xem kết quả</button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                <span className="card-title-icon">🔐</span>
                Bảo mật & quyền riêng tư
              </h4>
            </div>
            <div className="card-body">
              <div className="security-item">
                <span className="security-icon">✅</span>
                <span className="security-text">Đã bật xác thực hai bước (2FA)</span>
                <div 
                  className={`toggle-switch ${toggleStates.twoFactor ? 'active' : ''}`}
                  onClick={() => handleToggleSwitch('twoFactor')}
                ></div>
              </div>
              <div className="security-item">
                <span className="security-icon">🔒</span>
                <span className="security-text">Thay đổi mật khẩu</span>
                <button className="card-edit-btn" onClick={handleEditClick}>Thay đổi</button>
              </div>
              <div className="security-item">
                <span className="security-icon">🧾</span>
                <span className="security-text">Cho phép chia sẻ kết quả với người khác</span>
                <div 
                  className={`toggle-switch ${toggleStates.shareResults ? 'active' : ''}`}
                  onClick={() => handleToggleSwitch('shareResults')}
                ></div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                <span className="card-title-icon">ℹ️</span>
                Chào mừng
              </h4>
            </div>
            <div className="card-body">
              <p>Vui lòng chọn một mục từ menu bên trái để xem thông tin chi tiết.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile-summary">
        <div className="sidebar-header">
                    <img src="/logo.png" onClick={() => navigate('/home')} alt="Logo" className="logo" />
                </div>
          <div className="profile-name">{user?.fullName || 'Chưa đăng nhập'}</div>
          <div className="profile-info">
            <div>{user?.email || ''}</div>
          </div>
        </div>

        <ul className="menu">
          <li>
            <a 
              href="#" 
              className={activeMenuItem === 'personal-info' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick('personal-info');
              }}
            >
              <span className="menu-icon">👤</span> Thông tin cá nhân
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activeMenuItem === 'orders' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick('orders');
              }}
            >
              <span className="menu-icon">📋</span> Đơn hàng & Dịch vụ
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activeMenuItem === 'security' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick('security');
              }}
            >
              <span className="menu-icon">🔐</span> Bảo mật
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activeMenuItem === 'notes' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick('notes');
              }}
            >
   
            </a>
          </li>
        </ul>
        <button className="logout-btn" onClick={handleLogout} style={{marginTop: 'auto'}}>Đăng xuất</button>
      </div>
      {/* Main Content */}
      <div className="main-content">
        {renderContent()}
      </div>
      {/* Modal chỉnh sửa thông tin cá nhân */}
      {showEditModal && (
        <div className="modal-overlay" onClick={handleCloseEditModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: 700}}>
            <h3>Chỉnh sửa thông tin cá nhân</h3>
            <form>
              <div className="info-row">
                <span className="info-label">Họ và tên:</span>
                <input name="fullName" type="text" defaultValue={profile?.fullName || ''} style={{flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc'}} />
              </div>
              <div className="info-row">
                <span className="info-label">Số điện thoại:</span>
                <input name="phoneNumber" type="text" defaultValue={profile?.phoneNumber || ''} style={{flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc'}} />
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <input name="email" type="email" defaultValue={profile?.email || ''} style={{flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc'}} />
              </div>
              <div className="info-row">
                <span className="info-label">Ngày sinh:</span>
                <input name="dateOfBirth" type="date" defaultValue={profile?.dateOfBirth || ''} style={{flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc'}} />
              </div>
              <div className="info-row">
                <span className="info-label">Giới tính:</span>
                <select name="gender" defaultValue={profile?.gender || ''} style={{flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc'}}>
                  <option value="">Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
              <div className="info-row">
                <span className="info-label">Địa chỉ:</span>
                <div style={{flex: 1, display: 'flex', gap: 8}}>
                  <select value={selectedProvince} onChange={e => {setSelectedProvince(e.target.value); setSelectedDistrict(''); setSelectedCommune('');}} style={{flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc'}}>
                    <option value="">Chọn tỉnh/thành</option>
                    {provinces.map(p => <option value={p.code} key={p.code}>{p.name}</option>)}
                  </select>
                  <select value={selectedDistrict} onChange={e => {setSelectedDistrict(e.target.value); setSelectedCommune('');}} disabled={!selectedProvince} style={{flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc'}}>
                    <option value="">Chọn quận/huyện</option>
                    {districts.map(d => <option value={d.code} key={d.code}>{d.name}</option>)}
                  </select>
                  <select value={selectedCommune} onChange={e => setSelectedCommune(e.target.value)} disabled={!selectedDistrict} style={{flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc'}}>
                    <option value="">Chọn xã/phường</option>
                    {communes.map(c => <option value={c.code} key={c.code}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div style={{textAlign: 'right', marginTop: 24}}>
                <button type="button" className="download-btn" onClick={handleCloseEditModal} style={{marginRight: 8}}>Đóng</button>
                <button type="button" className="edit-btn-yellow" onClick={handleSaveProfile}>Lưu</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showConfirmModal && (
        <div className="modal-overlay" onClick={handleCancelConfirm}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: 400, textAlign: 'center'}}>
            <h3>Xác nhận cập nhật</h3>
            <p>Bạn có chắc chắn muốn lưu thay đổi thông tin cá nhân?</p>
            <div style={{marginTop: 24, display: 'flex', justifyContent: 'center', gap: 16}}>
              <button className="download-btn" onClick={handleCancelConfirm}>Hủy</button>
              <button className="edit-btn-yellow" onClick={handleConfirmSave}>Xác nhận</button>
            </div>
          </div>
        </div>
      )}
      {showAppointmentModal && selectedAppointment && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: 600}}>
            <h3>Chi tiết đơn hàng</h3>
            <div style={{marginBottom: 16}}>
              <div><b>Mã đặt lịch:</b> {selectedAppointment.bookingID}</div>
              <div><b>Khách hàng:</b> {selectedAppointment.customerName}</div>
              <div><b>Dịch vụ:</b> {selectedAppointment.serviceName}</div>
              <div><b>Gói:</b> {selectedAppointment.packageType}</div>
              <div><b>Ngày hẹn:</b> {selectedAppointment.appointmentDate ? new Date(selectedAppointment.appointmentDate).toLocaleDateString('vi-VN') : '-'}</div>
              <div><b>Trạng thái:</b> {selectedAppointment.status}</div>
              <div><b>Giá:</b> {selectedAppointment.totalPrice ? selectedAppointment.totalPrice.toLocaleString('vi-VN') + 'đ' : '-'}</div>
              <div><b>Địa chỉ:</b> {selectedAppointment.address}</div>
              <div><b>Số mẫu:</b> {selectedAppointment.numberSample}</div>
            </div>
            {/* Hiển thị danh sách participant */}
            {selectedAppointment.participants && selectedAppointment.participants.length > 0 && (
              <div style={{marginBottom: 16}}>
                <b>Danh sách người tham gia:</b>
                <table className="info-table" style={{marginTop: 8}}>
                  <thead>
                    <tr>
                      <th>Họ tên</th>
                      <th>Giới tính</th>
                      <th>Ngày sinh</th>
                      <th>Quan hệ</th>
                      <th>Loại mẫu</th>
                      <th>Cách lấy mẫu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedAppointment.participants.map((p, idx) => (
                      <tr key={p.participantID || idx}>
                        <td>{p.fullName}</td>
                        <td>{p.gender}</td>
                        <td>{p.dateOfBirth}</td>
                        <td>{p.relationshipToCustomer}</td>
                        <td>{p.sampleType || '-'}</td>
                        <td>{p.collectionMethod || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <button className="download-btn" onClick={handleCloseModal}>Đóng</button>
          </div>
        </div>
      )}
      
      {/* Image Upload Modal */}
      {showImageUpload && (
        <div className="modal-overlay" onClick={handleCloseImageUpload}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: 500}}>
            <h3>Upload Ảnh Đại Diện</h3>
            <ImageUpload 
              userId={profile?.id}
              type="avatar"
              onUploadSuccess={handleImageUploadSuccess}
              currentImageUrl={profile?.avatarUrl}
            />
            <div style={{textAlign: 'right', marginTop: 20}}>
              <button className="download-btn" onClick={handleCloseImageUpload}>Đóng</button>
            </div>
          </div>
        </div>
      )}

      {/* ID Card Upload Modal */}
      {showIdCardUpload && (
        <div className="modal-overlay" onClick={handleCloseIdCardUpload}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: 500}}>
            <h3>Upload Ảnh CMND/CCCD</h3>
            <ImageUpload 
              userId={profile?.id}
              type="idcard"
              onUploadSuccess={handleIdCardUploadSuccess}
              currentImageUrl={profile?.idCardUrl}
            />
            <div style={{textAlign: 'right', marginTop: 20}}>
              <button className="download-btn" onClick={handleCloseIdCardUpload}>Đóng</button>
            </div>
          </div>
        </div>
      )}
      
      {showTestResultModal && testResult && (
        <div className="modal-overlay" onClick={() => setShowTestResultModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: 800}}>
            <h3>Kết quả xét nghiệm</h3>
            <div style={{marginBottom: 16}}>
              <div><b>Mã kết quả:</b> {testResult.testResultID}</div>
              <div><b>Kết luận:</b> {testResult.resultConclution || testResult.resultConclusion || '-'}</div>
              <div><b>Ngày có kết quả:</b> {testResult.resultDate ? new Date(testResult.resultDate).toLocaleDateString('vi-VN') : '-'}</div>
              <div><b>Người tạo:</b> {testResult.createdBy || '-'}</div>
              <div><b>Ngày tạo:</b> {testResult.createdDate ? new Date(testResult.createdDate).toLocaleDateString('vi-VN') : '-'}</div>
              
              {/* File kết quả từ S3 */}
              <div style={{marginTop: 16}}>
                <b>File kết quả:</b>
                {testResult.resultFileUrl ? (
                  <div style={{marginTop: 8}}>
                    <a 
                      href={testResult.resultFileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        padding: '8px 16px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '4px',
                        marginRight: '8px'
                      }}
                    >
                      📄 Xem file kết quả
                    </a>
                                         <button 
                       onClick={() => handleDownloadFile(testResult.resultFileUrl, testResult.resultFile)}
                       style={{
                         display: 'inline-block',
                         padding: '8px 16px',
                         backgroundColor: '#28a745',
                         color: 'white',
                         textDecoration: 'none',
                         borderRadius: '4px',
                         border: 'none',
                         cursor: 'pointer'
                       }}
                     >
                       ⬇️ Tải xuống file
                     </button>
                  </div>
                ) : testResult.resultFile ? (
                  <div style={{marginTop: 8}}>
                    <span style={{color: '#666'}}>File: {testResult.resultFile}</span>
                    <a 
                      href={`http://localhost:8080/uploads/results/${testResult.resultFile}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        padding: '8px 16px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '4px',
                        marginLeft: '8px'
                      }}
                    >
                      📄 Xem file
                    </a>
                  </div>
                ) : (
                  <span style={{color: '#999'}}>Chưa có file kết quả</span>
                )}
              </div>
            </div>
            
            {/* Hiển thị chi tiết kết quả nếu có */}
            {testResult.detailResults && testResult.detailResults.length > 0 && (
              <div style={{marginTop: 20}}>
                <b>Chi tiết kết quả:</b>
                <div style={{maxHeight: '300px', overflowY: 'auto', marginTop: 8}}>
                  <table className="info-table" style={{fontSize: '12px'}}>
                    <thead>
                      <tr>
                        <th>Locus</th>
                        <th>P1 Allele 1</th>
                        <th>P1 Allele 2</th>
                        <th>P2 Allele 1</th>
                        <th>P2 Allele 2</th>
                        <th>Paternity Index</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testResult.detailResults.map((detail, idx) => (
                        <tr key={idx}>
                          <td>{detail.locusName}</td>
                          <td>{detail.p1Allele1}</td>
                          <td>{detail.p1Allele2}</td>
                          <td>{detail.p2Allele1}</td>
                          <td>{detail.p2Allele2}</td>
                          <td>{detail.paternityIndex}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            <div style={{textAlign: 'right', marginTop: 20}}>
              <button className="download-btn" onClick={() => setShowTestResultModal(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoPage;