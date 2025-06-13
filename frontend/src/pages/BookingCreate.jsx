// src/pages/BookingCreate.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './BookingCreate.css';


export default function BookingCreatePage() {
    const { user, loading: authLoading } = useAuth(); // Get user info and loading state
    const navigate = useNavigate(); // To navigate
    
    // Function to generate random avatar colors (copied from ManagerPage)
    const getRandomAvatarColors = () => {
      const rBg = Math.floor(Math.random() * 56) + 200;
      const gBg = Math.floor(Math.random() * 56) + 200;
      const bBg = Math.floor(Math.random() * 56) + 200;
      const bgColor = `rgb(${rBg}, ${gBg}, ${bBg})`;
  
      const rText = Math.max(0, rBg - 100);
      const gText = Math.max(0, gBg - 100);
      const bText = Math.max(0, bBg - 100);
      const textColor = `rgb(${rText}, ${gText}, ${bText})`;
  
      return { backgroundColor: bgColor, color: textColor };
    };
  
    // Function to navigate to user profile page
    const goToProfile = () => {
      if (user) { // Ensure user is logged in before navigating
        navigate('/personal-info'); // Navigate to the correct profile route
      }
    };

    // Placeholder functions for navigation
    const goToAbout = () => navigate('/about'); // Assuming /about route exists or will be created
    const goToServices = () => navigate('/services'); // Assuming /services route exists or will be created
    const goToInfo = () => navigate('/info'); // Assuming /info route exists or will be created
    const goToBookingCreate = () => navigate('/booking/create'); // Navigate to booking create page
    const goToLogin = () => navigate('/login');

    // === State cho Form đặt lịch ===
    const [serviceType, setServiceType] = useState(''); // Loại dịch vụ (vd: Cha con)
    const [numSamples, setNumSamples] = useState(2); // Số mẫu cần xét nghiệm, mặc định 2
    const [testType, setTestType] = useState(''); // Loại xét nghiệm (Dân sự / Hành chính)
    const [collectionMethod, setCollectionMethod] = useState(''); // Phương pháp thu mẫu (Tự thu mẫu, Thu mẫu tại nhà/văn phòng, Thu mẫu tại trung tâm)
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState(''); // Đã sửa tên state
    const [notes, setNotes] = useState('');

    // State cho thông tin người tham gia
    // participants sẽ tự động được tạo dựa trên numSamples
    const [participants, setParticipants] = useState([]);

    // State để quản lý bước của form (form điền / trang xác nhận)
    const [currentStep, setCurrentStep] = useState('form'); // 'form' hoặc 'confirmation'

    // Danh sách các loại dịch vụ (tạm thời hardcode, bạn có thể lấy từ API nếu cần)
    const serviceOptions = [
        'Xét nghiệm ADN Cha con',
        'Xét nghiệm ADN Mẹ con',
        'Xét nghiệm ADN Ông cháu',
        'Xét nghiệm ADN Bà cháu',
        'Xét nghiệm ADN Anh em ruột',
        'Xét nghiệm ADN Thai nhi',
    ];

    // === Redirect nếu chưa đăng nhập ===
    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
        }
    }, [user, authLoading, navigate]);

    // === useEffect để tự động tạo số lượng participants dựa trên numSamples ===
    useEffect(() => {
        setParticipants(prevParticipants => {
            const newParticipants = Array.from({ length: numSamples }, (_, i) => {
                const existingParticipant = prevParticipants[i];
                if (existingParticipant) {
                    return existingParticipant;
                } else {
                    if (testType === 'Hành chính') {
                        return { fullName: '', age: '', dob: '', gender: '', cccd: '', address: '', relationship: '' };
                    } else { // Dân sự
                        return { fullName: '', age: '', dob: '' };
                    }
                }
            });
            return newParticipants;
        });
    }, [numSamples, testType]); // Thêm testType vào dependency để cập nhật trường khi đổi loại xét nghiệm

    // === Hàm xử lý thay đổi thông tin người tham gia ===
    const handleParticipantChange = (index, field, value) => {
        const updatedParticipants = [...participants];
        updatedParticipants[index] = { ...updatedParticipants[index], [field]: value };
        setParticipants(updatedParticipants);
    };

    // === Hàm xử lý submit form ===
    const handleSubmitBooking = (e) => {
        e.preventDefault();

        // Kiểm tra các trường bắt buộc
        if (!serviceType || !testType || !collectionMethod || !appointmentDate || !appointmentTime) {
            alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
            return;
        }

        // Kiểm tra số mẫu dựa trên loại dịch vụ
        if (serviceType === 'Xét nghiệm ADN Thai nhi') {
            if (numSamples !== 2) { // Thai nhi luôn là 2 mẫu
                alert('Dịch vụ Xét nghiệm ADN Thai nhi yêu cầu chính xác 2 mẫu.');
                return;
            }
        } else {
            if (numSamples < 2) { // Các dịch vụ khác tối thiểu 2 mẫu
                alert('Số mẫu xét nghiệm phải tối thiểu là 2 cho dịch vụ này.');
                return;
            }
        }

        // Kiểm tra xem tất cả thông tin participant đã được điền đầy đủ chưa
        const allParticipantsFilled = participants.every(p => {
            if (testType === 'Hành chính') {
                return p.fullName && p.age && p.dob && p.gender && p.cccd && p.address && p.relationship;
            } else { // Dân sự
                return p.fullName && p.age && p.dob;
            }
        });

        if (!allParticipantsFilled) {
            alert('Vui lòng điền đầy đủ thông tin cho tất cả người tham gia.');
            return;
        }

        // Chuyển sang trang xác nhận
        setCurrentStep('confirmation');
    };

    // === Render Loading State ===
    if (authLoading || !user) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontSize: '24px' }}>
                Đang tải...
            </div>
        );
    }

    // === Render Confirmation Page ===
    if (currentStep === 'confirmation') {
        return (
            <div className="homepage-container">
                {/* Header Section */}
                <header className="homepage-header">
                    <div className="header-left">
                        {/* Logo */}
                        <div className="header-logo-container">
                            <img src="/logo.png" alt="Bloodline Logo" className="header-logo" />
                        </div>
                        {/* Navigation Links */}
                        <nav className="header-nav">
                            <ul>
                                <li><Link to="/home">TRANG CHỦ</Link></li>
                                <li><Link to="/about">GIỚI THIỆU</Link></li>
                                <li><Link to="/#">DỊCH VỤ</Link></li>
                                <li><Link to="/personal-info">THÔNG TIN</Link></li>
                                <li>
                <NavLink
                  to="/booking/create"
                  className={({ isActive }) => isActive ? "active" : ""}
                >
                  <span className="nav-icon"></span> ĐĂNG KÍ DỊCH VỤ
                </NavLink>
              </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="header-right">
                        {/* Search Bar Placeholder */}
                        <input type="text" placeholder="Search" className="header-search-input" />
                        {/* User/Login Area */}
                        {user ? (
                            <div className="header-user-profile-area" onClick={goToProfile}>
                                <span className="header-user-info">Chào, {user.fullName || user.email}</span>
                                <div className="header-profile-icon-placeholder" style={getRandomAvatarColors()}>
                                    {user.fullName ? user.fullName.split(" ").map(n => n[0]).join("").toUpperCase() : ''}
                                </div>
                            </div>
                        ) : (
                            <button className="header-login-button" onClick={goToLogin}>Login</button>
                        )}
                    </div>
                </header>
        

                <main className="booking-create-content">
                    <section className="confirmation-section">
                        <h2>Xác nhận thông tin đặt lịch</h2>
                        <div className="confirmation-details">
                            <p><strong>Loại dịch vụ:</strong> {serviceType}</p>
                            <p><strong>Số mẫu:</strong> {numSamples}</p> {/* Luôn hiển thị số mẫu */}
                            <p><strong>Loại xét nghiệm:</strong> {testType}</p>
                            <p><strong>Phương pháp thu mẫu:</strong> {collectionMethod}</p>
                            <p><strong>Ngày hẹn:</strong> {appointmentDate}</p>
                            <p><strong>Giờ hẹn:</strong> {appointmentTime}</p>
                            <p><strong>Ghi chú:</strong> {notes || 'Không có'}</p>

                            <h3>Thông tin người tham gia:</h3>
                            {participants.length > 0 ? (
                                participants.map((p, index) => (
                                    <div key={index} className="participant-summary">
                                        <h4>Người tham gia {index + 1}</h4>
                                        <p>Họ và tên: {p.fullName || 'Chưa điền'}</p>
                                        <p>Tuổi: {p.age || 'Chưa điền'}</p>
                                        <p>Năm sinh: {p.dob || 'Chưa điền'}</p>
                                        {testType === 'Hành chính' && (
                                            <>
                                                <p>Giới tính: {p.gender || 'Chưa điền'}</p>
                                                <p>CCCD: {p.cccd || 'Chưa điền'}</p>
                                                <p>Địa chỉ: {p.address || 'Chưa điền'}</p>
                                                <p>Quan hệ: {p.relationship || 'Chưa điền'}</p>
                                            </>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>Không có thông tin người tham gia được yêu cầu.</p>
                            )}
                        </div>
                        <div className="confirmation-actions">
                            <button className="btn-back" onClick={() => setCurrentStep('form')}>Chỉnh sửa</button>
                            <button className="btn-confirm" onClick={() => alert('Xác nhận đặt lịch...')}>Xác nhận đặt lịch</button>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="adn-footer">
                    <div className="adn-footer-content">
                        <div className="adn-footer-logo">
                            <img src="/logo.png" alt="ADN Logo" />
                        </div>
                        <div className="adn-footer-info">
                            <div className="adn-footer-section">
                                <span className="adn-footer-label">LOCATION</span>
                                <div>7 Đ. D1, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh</div>
                            </div>
                            <div className="adn-footer-section">
                                <span className="adn-footer-label">CONTACT US</span>
                                <div>02020202304</div>
                                <div>abc123@gmail.com</div>
                            </div>
                            <div className="adn-footer-section">
                                <span className="adn-footer-label">PAYMENT</span>
                                <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                                    <img src="https://cdn.tgdd.vn/2020/04/GameApp/image-180x180.png" alt="ZaloPay" style={{height: 32}} />
                                    <img src="data:image/png;base64,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" alt="Momo" style={{height: 32}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }

    // === Render Booking Form (Default) ===
    return (
        <div className="homepage-container">
          {/* Header Section */}
          <header className="homepage-header">
            <div className="header-left">
              {/* Logo */}
              <div className="header-logo-container">
                <img src="/logo.png" alt="Bloodline Logo" className="header-logo" />
              </div>
              {/* Navigation Links */}
              <nav className="header-nav">
                            <ul>
                                <li><Link to="/home">TRANG CHỦ</Link></li>
                                <li><Link to="/about">GIỚI THIỆU</Link></li>
                                <li><Link to="/#">DỊCH VỤ</Link></li>
                                <li><Link to="/personal-info">THÔNG TIN</Link></li>
                                <li>
                <NavLink
                  to="/booking/create"
                  className={({ isActive }) => isActive ? "active" : ""}
                >
                  <span className="nav-icon"></span> ĐĂNG KÍ DỊCH VỤ
                </NavLink>
              </li>
                            </ul>
                        </nav>
            </div>
            <div className="header-right">
              {/* Search Bar Placeholder */}
              <input type="text" placeholder="Search" className="header-search-input" />
              {/* User/Login Area */}
              {user ? (
                <div className="header-user-profile-area" onClick={goToProfile}>
                  <span className="header-user-info">Chào, {user.fullName || user.email}</span>
                  <div className="header-profile-icon-placeholder" style={getRandomAvatarColors()}>
                    {user.fullName ? user.fullName.split(" ").map(n => n[0]).join("").toUpperCase() : ''}
                  </div>
                </div>
              ) : (
                <button className="header-login-button" onClick={goToLogin}>Login</button>
              )}
            </div>
          </header>
            {/* Main content of Booking Create page */}
            <main className="booking-create-content">
                <form className="booking-form-section" onSubmit={handleSubmitBooking}>
                    <h2>Tạo Lịch Hẹn Mới</h2>
                    <p>Vui lòng điền thông tin dưới đây để đặt lịch xét nghiệm ADN.</p>

                    <div className="form-group">
                        <label htmlFor="serviceType">Loại dịch vụ:</label>
                        <select
                            id="serviceType"
                            value={serviceType}
                            onChange={(e) => {
                                const selectedService = e.target.value;
                                setServiceType(selectedService);
                                if (selectedService === 'Xét nghiệm ADN Thai nhi') {
                                    setNumSamples(2); // THAY ĐỔI: Thai nhi luôn 2 mẫu
                                    setCollectionMethod('Thu mẫu tại trung tâm'); // Thai nhi mặc định thu tại trung tâm
                                    setTestType(''); // Reset test type nếu cần
                                } else {
                                    setNumSamples(2); // Mặc định 2 mẫu cho các loại khác
                                    setCollectionMethod(''); // Reset collection method
                                    setTestType('');
                                }
                                // Participants sẽ được cập nhật tự động bởi useEffect khi numSamples thay đổi
                            }}
                            required
                        >
                            <option value="">Chọn loại dịch vụ</option>
                            {serviceOptions.map((service, index) => (
                                <option key={index} value={service}>{service}</option>
                            ))}
                        </select>
                    </div>

                    {/* Hiển thị input số mẫu hoặc số mẫu cố định */}
                    {serviceType === 'Xét nghiệm ADN Thai nhi' ? (
                        <div className="form-group">
                            <label>Số mẫu cần xét nghiệm:</label>
                            <p className="static-option">2</p> {/* THAY ĐỔI: Giá trị cố định là 2 */}
                        </div>
                    ) : (
                        <div className="form-group">
                            <label htmlFor="numSamples">Số mẫu cần xét nghiệm:</label>
                            <input
                                type="number"
                                id="numSamples"
                                value={numSamples}
                                onChange={(e) => setNumSamples(Math.max(2, parseInt(e.target.value) || 2))} // Mặc định min 2 mẫu
                                min="2"
                                required
                            />
                        </div>
                    )}


                    <div className="form-group">
                        <label htmlFor="testType">Loại xét nghiệm:</label>
                        <select
                            id="testType"
                            value={testType}
                            onChange={(e) => {
                                const selectedTestType = e.target.value;
                                setTestType(selectedTestType);
                                if (selectedTestType === 'Hành chính') {
                                    setCollectionMethod('Thu mẫu tại trung tâm'); // Hành chính mặc định thu tại trung tâm
                                } else {
                                    setCollectionMethod(''); // Reset cho dân sự
                                }
                                // Participants sẽ được cập nhật tự động bởi useEffect khi testType thay đổi
                            }}
                            required
                        >
                            <option value="">Chọn loại xét nghiệm</option>
                            <option value="Dân sự">Dân sự</option>
                            <option value="Hành chính">Hành chính</option>
                        </select>
                    </div>

                    {testType === 'Dân sự' && serviceType !== 'Xét nghiệm ADN Thai nhi' && (
                        <div className="form-group">
                            <label htmlFor="collectionMethod">Phương pháp thu mẫu:</label>
                            <select
                                id="collectionMethod"
                                value={collectionMethod}
                                onChange={(e) => setCollectionMethod(e.target.value)}
                                required
                            >
                                <option value="">Chọn phương pháp thu mẫu</option>
                                <option value="Tự thu mẫu">Tự thu mẫu</option>
                                <option value="Thu mẫu tại nhà/văn phòng">Thu mẫu tại nhà/văn phòng</option>
                                <option value="Thu mẫu tại trung tâm">Thu mẫu tại trung tâm</option>
                            </select>
                        </div>
                    )}

                    {(testType === 'Hành chính' || serviceType === 'Xét nghiệm ADN Thai nhi') && (
                        <div className="form-group">
                            <label>Phương pháp thu mẫu:</label>
                            <p className="static-option">Thu mẫu tại trung tâm</p>
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="appointmentDate">Ngày hẹn:</label>
                        <input
                            type="date"
                            id="appointmentDate"
                            value={appointmentDate}
                            onChange={(e) => setAppointmentDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="appointmentTime">Giờ hẹn:</label>
                        <input
                            type="time"
                            id="appointmentTime"
                            value={appointmentTime}
                            onChange={(e) => setAppointmentTime(e.target.value)} // Đã sửa: dùng setAppointmentTime
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="notes">Ghi chú:</label>
                        <textarea
                            id="notes"
                            placeholder="Ghi chú thêm (nếu có)"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows="3"
                        ></textarea>
                    </div>

                    {/* === Phần thông tin người tham gia === */}
                    <div className="participants-section">
                        <h3>Thông tin người tham gia:</h3>
                        {Array.from({ length: numSamples }).map((_, index) => (
                            <div key={index} className="participant-form">
                                <h4>Người tham gia {index + 1}</h4>
                                <div className="form-group">
                                    <label>Họ và tên:</label>
                                    <input
                                        type="text"
                                        value={participants[index]?.fullName || ''}
                                        onChange={(e) => handleParticipantChange(index, 'fullName', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Tuổi:</label>
                                    <input
                                        type="number"
                                        value={participants[index]?.age || ''}
                                        onChange={(e) => handleParticipantChange(index, 'age', parseInt(e.target.value) || '')}
                                        min="0"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Năm sinh:</label>
                                    <input
                                        type="number"
                                        value={participants[index]?.dob || ''}
                                        onChange={(e) => handleParticipantChange(index, 'dob', parseInt(e.target.value) || '')}
                                        min="1900"
                                        max={new Date().getFullYear()}
                                        required
                                    />
                                </div>

                                {testType === 'Hành chính' && (
                                    <>
                                        <div className="form-group">
                                            <label>Giới tính:</label>
                                            <select
                                                value={participants[index]?.gender || ''}
                                                onChange={(e) => handleParticipantChange(index, 'gender', e.target.value)}
                                                required
                                            >
                                                <option value="">Chọn giới tính</option>
                                                <option value="Nam">Nam</option>
                                                <option value="Nữ">Nữ</option>
                                                <option value="Khác">Khác</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>CCCD:</label>
                                            <input
                                                type="text"
                                                value={participants[index]?.cccd || ''}
                                                onChange={(e) => handleParticipantChange(index, 'cccd', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Địa chỉ:</label>
                                            <input
                                                type="text"
                                                value={participants[index]?.address || ''}
                                                onChange={(e) => handleParticipantChange(index, 'address', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Quan hệ với người đăng ký:</label>
                                            <input
                                                type="text"
                                                value={participants[index]?.relationship || ''}
                                                onChange={(e) => handleParticipantChange(index, 'relationship', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    <button type="submit" className="submit-booking-btn">Hoàn thành</button>
                </form>
            </main>

            {/* Footer */}
            <footer className="adn-footer">
                <div className="adn-footer-content">
                    <div className="adn-footer-logo">
                        <img src="/logo.png" alt="ADN Logo" />
                    </div>
                    <div className="adn-footer-info">
                        <div className="adn-footer-section">
                            <span className="adn-footer-label">LOCATION</span>
                            <div>7 Đ. D1, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh</div>
                        </div>
                        <div className="adn-footer-section">
                            <span className="adn-footer-label">CONTACT US</span>
                            <div>02020202304</div>
                            <div>abc123@gmail.com</div>
                        </div>
                        <div className="adn-footer-section">
                            <span className="adn-footer-label">PAYMENT</span>
                            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                                <img src="https://cdn.tgdd.vn/2020/04/GameApp/image-180x180.png" alt="ZaloPay" style={{height: 32}} />
                                <img src="data:image/png;base64,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" alt="Momo" style={{height: 32}} />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}