import React, { useState, useEffect } from 'react';
import './PersonalInfoPage.css';
import { useNavigate } from 'react-router-dom';

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
    statusStep: 1, // 0: Đã đặt, 1: Chờ lấy mẫu, 2: Đang xét nghiệm, 3: Đã có kết quả
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
  const [activeMenuItem, setActiveMenuItem] = useState('basic-info');
  const [toggleStates, setToggleStates] = useState({
    twoFactor: true,
    shareResults: true
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showAppointmentModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showAppointmentModal]);

  const handleMenuItemClick = (menuId) => {
    setActiveMenuItem(menuId);
  };

  const handleEditClick = () => {
    alert('Chức năng chỉnh sửa sẽ được triển khai trong phiên bản tiếp theo!');
  };

  const handleDownloadClick = (file) => {
    alert(`Đang tải xuống file: ${file || 'PDF kết quả xét nghiệm'}...`);
  };

  const handleViewClick = (id) => {
    // For appointments, show modal
    const found = appointmentList.find(a => a.id === id);
    if (found) {
      setSelectedAppointment(found);
      setShowAppointmentModal(true);
    } else {
      alert(`Xem chi tiết cho mã: ${id}`);
    }
  };

  const handleCloseModal = () => {
    setShowAppointmentModal(false);
    setSelectedAppointment(null);
  };

  const handleChatClick = () => {
    alert('Chức năng chat hỗ trợ sẽ được mở ra!');
  };

  const handleToggleSwitch = (toggleName) => {
    setToggleStates(prev => ({
      ...prev,
      [toggleName]: !prev[toggleName]
    }));
  };

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      alert('Đã đăng xuất thành công!');
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

  // Render content based on active menu item
  const renderContent = () => {
    switch (activeMenuItem) {
      case 'basic-info':
        return (
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                <span className="card-title-icon">👤</span>
                Thông tin cơ bản
              </h4>
              <button className="card-edit-btn" onClick={handleEditClick}>Chỉnh sửa</button>
            </div>
            <div className="card-body">
              <div className="info-row">
                <span className="info-label">Họ và tên:</span>
                <span className="info-value">Nguyễn Văn An</span>
              </div>
              <div className="info-row">
                <span className="info-label">Giới tính:</span>
                <span className="info-value">Nam</span>
              </div>
              <div className="info-row">
                <span className="info-label">Ngày sinh:</span>
                <span className="info-value">15/03/1985</span>
              </div>
              <div className="info-row">
                <span className="info-label">CMND/CCCD:</span>
                <span className="info-value">123456789</span>
              </div>
              <div className="info-row">
                <span className="info-label">Quốc tịch:</span>
                <span className="info-value">Việt Nam</span>
              </div>
              <div className="info-row">
                <span className="info-label">Nghề nghiệp:</span>
                <span className="info-value">Kỹ sư</span>
                </div>
            </div>
        </div>
        );

      case 'contact':
        return (
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                <span className="card-title-icon">📞</span>
                        Thông tin liên hệ
                    </h4>
              <button className="card-edit-btn" onClick={handleEditClick}>Chỉnh sửa</button>
                </div>
            <div className="card-body">
              <div className="info-row">
                <span className="info-label">Số điện thoại:</span>
                <span className="info-value">0987 654 321</span>
                    </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">nguyenvana@email.com</span>
                    </div>
              <div className="info-row">
                <span className="info-label">Địa chỉ thường trú:</span>
                <span className="info-value">123 Lê Lợi, Quận 1, TP.HCM</span>
                    </div>
              <div className="info-row">
                <span className="info-label">Địa chỉ nhận kết quả:</span>
                <span className="info-value">456 Nguyễn Huệ, Quận 1, TP.HCM</span>
                    </div>
                </div>
            </div>
        );

      case 'samples':
        return (
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                <span className="card-title-icon">🧪</span>
                Danh sách mẫu xét nghiệm
                    </h4>
                </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="info-table">
                  <thead>
                    <tr>
                      <th>Mã mẫu</th>
                      <th>Loại mẫu</th>
                      <th>Ngày thu mẫu</th>
                      <th>Người thu mẫu</th>
                      <th>Hình thức</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleList.map((s) => (
                      <tr key={s.id}>
                        <td>{s.id}</td>
                        <td>{s.type}</td>
                        <td>{s.date}</td>
                        <td>{s.collector}</td>
                        <td>{s.method}</td>
                        <td>
                          <button className="download-btn" onClick={() => handleViewClick(s.id)}>Xem</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                    </div>
                </div>
            </div>
        );

      case 'appointments':
        return (
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                <span className="card-title-icon">📅</span>
                Danh sách lịch hẹn & đơn hàng
                    </h4>
                </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="info-table">
                  <thead>
                    <tr>
                      <th>Mã đơn hàng</th>
                      <th>Loại xét nghiệm</th>
                      <th>Thời gian hẹn</th>
                      <th>Tình trạng</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointmentList.map((a) => (
                      <tr key={a.id}>
                        <td>{a.id}</td>
                        <td>{a.testType}</td>
                        <td>{a.time}</td>
                        <td>
                          <span className={
                            a.status === 'Đã hoàn thành' ? 'status-badge status-success' : 'status-badge status-info'
                          }>{a.status}</span>
                        </td>
                        <td>
                          <button className="download-btn" onClick={() => handleViewClick(a.id)}>Xem</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Modal chi tiết đơn hàng */}
              {showAppointmentModal && selectedAppointment && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                  <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: 700}}>
                    <h2 style={{textAlign: 'center', color: 'var(--primary-blue)', marginBottom: 12}}>Chi tiết đơn #{selectedAppointment.id.replace(/\D/g, '')}</h2>
                    <hr />
                    <div style={{marginBottom: 18}}>
                      <div><b>Mã Đơn:</b> {selectedAppointment.id}</div>
                      <div><b>Mã KH:</b> 102</div>
                      <div><b>Dịch vụ:</b> {selectedAppointment.serviceType}</div>
                      <div><b>Loại dịch vụ:</b> {selectedAppointment.serviceCategory}</div>
                      <div><b>Gói dịch vụ:</b> {selectedAppointment.servicePackage}</div>
                      <div><b>Số mẫu:</b> {selectedAppointment.numSamples}</div>
                      <div><b>Ngày đặt:</b> {selectedAppointment.bookingDate}</div>
                      <div><b>Ngày hẹn:</b> {selectedAppointment.appointmentDate}</div>
                      <div><b>Tổng tiền:</b> {selectedAppointment.totalPrice}</div>
                      <div><b>Trạng thái:</b> {selectedAppointment.status}</div>
                      <div><b>Ghi chú:</b> {selectedAppointment.note || 'Không có.'}</div>
                    </div>
                    {/* Thanh trạng thái ngang */}
                    <div className="customer-progress-bar-wrapper">
                      <div className="customer-progress-bar">
                        {['Đã đặt', 'Chờ lấy mẫu', 'Đang xét nghiệm', 'Đã có kết quả'].map((label, idx) => (
                          <div key={label} className="customer-progress-bar-step">
                            <div className="customer-progress-bar-circle"
                              style={{
                                background: idx <= selectedAppointment.statusStep ? 'var(--primary-blue)' : '#eaf0fa',
                                color: idx <= selectedAppointment.statusStep ? '#fff' : '#888',
                                border: idx === selectedAppointment.statusStep ? '2px solid var(--primary-green)' : '2px solid #eaf0fa',
                              }}
                            >{idx+1}</div>
                            {idx < 3 && (
                              <div className="customer-progress-bar-line"
                                style={{background: idx < selectedAppointment.statusStep ? 'var(--primary-blue)' : '#eaf0fa'}}></div>
                            )}
                            <div className="customer-progress-bar-label" style={{color: idx <= selectedAppointment.statusStep ? 'var(--primary-blue)' : '#888'}}>{label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Bảng người tham gia */}
                    <div style={{marginTop: 18}}>
                      <b>Thông tin người tham gia:</b>
                      <div className="table-responsive" style={{marginTop: 8}}>
                        <table className="info-table">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>HỌ TÊN</th>
                              <th>GIỚI TÍNH</th>
                              <th>NĂM SINH</th>
                              <th>QUAN HỆ</th>
                              <th>LOẠI MẪU</th>
                              <th>PHƯƠNG PHÁP THU MẪU</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedAppointment.participants.map((p) => (
                              <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.name}</td>
                                <td>{p.gender}</td>
                                <td>{p.birthYear}</td>
                                <td>{p.relation}</td>
                                <td>{p.sampleType}</td>
                                <td>{p.method}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div style={{textAlign: 'center', marginTop: 24}}>
                      <button className="download-btn" style={{minWidth: 120}} onClick={handleCloseModal}>Đóng</button>
                        </div>
                    </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'results':
        return (
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                <span className="card-title-icon">📄</span>
                Danh sách kết quả xét nghiệm
                    </h4>
                </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="info-table">
                  <thead>
                    <tr>
                      <th>Ngày trả kết quả</th>
                      <th>Kết luận</th>
                      <th>File kết quả</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultList.map((r, idx) => (
                      <tr key={idx}>
                        <td>{r.date}</td>
                        <td>{r.conclusion}</td>
                        <td>{r.file}</td>
                        <td>
                          <button className="download-btn" onClick={() => handleDownloadClick(r.file)}>Tải về</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                    </div>
                </div>
            </div>
        );

      case 'payment':
        return (
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                <span className="card-title-icon">💳</span>
                Danh sách thanh toán
                    </h4>
                </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="info-table">
                  <thead>
                    <tr>
                      <th>Mã đơn hàng</th>
                      <th>Phí xét nghiệm</th>
                      <th>Hình thức</th>
                      <th>Tình trạng</th>
                      <th>Ngày thanh toán</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentList.map((p) => (
                      <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.fee}</td>
                        <td>{p.method}</td>
                        <td>
                          <span className={
                            p.status === 'Đã thanh toán' ? 'status-badge status-success' : 'status-badge status-info'
                          }>{p.status}</span>
                        </td>
                        <td>{p.date}</td>
                        <td>
                          <button className="download-btn" onClick={() => handleViewPayment(p.id)}>Xem</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                    </div>
              {/* Modal chi tiết thanh toán */}
              {showPaymentModal && selectedPayment && (
                <div className="modal-overlay" onClick={handleClosePaymentModal}>
                  <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <h3>Chi tiết thanh toán</h3>
                    <div className="info-row"><span className="info-label">Mã đơn hàng:</span><span className="info-value">{selectedPayment.id}</span></div>
                    <div className="info-row"><span className="info-label">Phí xét nghiệm:</span><span className="info-value">{selectedPayment.fee}</span></div>
                    <div className="info-row"><span className="info-label">Hình thức thanh toán:</span><span className="info-value">{selectedPayment.method}</span></div>
                    <div className="info-row"><span className="info-label">Tình trạng:</span><span className="info-value">{selectedPayment.status}</span></div>
                    <div className="info-row"><span className="info-label">Ngày thanh toán:</span><span className="info-value">{selectedPayment.date}</span></div>
                    <div style={{textAlign: 'right', marginTop: 20}}>
                      {selectedPayment.status === 'Chưa thanh toán' && (
                        <button className="download-btn" style={{background: 'var(--primary-green)', marginRight: 8}}
                          onClick={() => {
                            setShowPaymentModal(false);
                            const bookingData = appointmentList.find(a => a.id === selectedPayment.id) || { bookingID: selectedPayment.id };
                            navigate('/booking-payment', { state: { bookingData } });
                          }}
                        >Thanh toán ngay</button>
                      )}
                      <button className="download-btn" onClick={handleClosePaymentModal}>Đóng</button>
                    </div>
                    </div>
                </div>
              )}
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

      case 'notes':
        return (
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                <span className="card-title-icon">📝</span>
                        Yêu cầu đặc biệt / Ghi chú
                    </h4>
              <button className="card-edit-btn" onClick={handleEditClick}>Chỉnh sửa</button>
            </div>
            <div className="card-body">
              <div className="info-row">
                <span className="info-label">Ghi chú của khách hàng:</span>
                <span className="info-value">"Vui lòng không gọi điện vào giờ làm việc"</span>
                </div>
              <div className="info-row">
                <span className="info-label">Yêu cầu hỗ trợ gần nhất:</span>
                <span className="info-value">"Tôi muốn nhận kết quả qua Zalo"</span>
                    </div>
              <div style={{ marginTop: '15px' }}>
                <textarea className="notes-textarea" placeholder="Thêm ghi chú mới..."></textarea>
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
          <button className="edit-btn" onClick={handleEditClick}>✏️ Chỉnh sửa</button>
          <div className="avatar">NVA</div>
          <div className="profile-name">Nguyễn Văn An</div>
          <div className="profile-info">
            <div>Nam • 15/03/1985</div>
            <div>CMND: 123456789</div>
        </div>
    </div>

        <ul className="menu">
          <li>
            <a 
              href="#" 
              className={activeMenuItem === 'basic-info' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick('basic-info');
              }}
            >
              <span className="menu-icon">📄</span> Thông tin cơ bản
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activeMenuItem === 'contact' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick('contact');
              }}
            >
              <span className="menu-icon">📞</span> Thông tin liên hệ
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activeMenuItem === 'samples' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick('samples');
              }}
            >
              <span className="menu-icon">🧪</span> Mẫu xét nghiệm
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activeMenuItem === 'appointments' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick('appointments');
              }}
            >
              <span className="menu-icon">📅</span> Lịch hẹn & đơn hàng
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activeMenuItem === 'payment' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick('payment');
              }}
            >
              <span className="menu-icon">💳</span> Thanh toán
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activeMenuItem === 'results' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick('results');
              }}
            >
              <span className="menu-icon">📄</span> Kết quả xét nghiệm
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
              <span className="menu-icon">📝</span> Ghi chú
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="logout"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              <span className="menu-icon">🔚</span> Đăng xuất
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="main-content-scrollable">
          <div className="dashboard-content">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoPage;