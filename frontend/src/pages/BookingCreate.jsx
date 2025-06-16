import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './BookingCreate.css';

export default function BookingCreate() {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    // === State cho Form đặt lịch ===
    const [serviceType, setServiceType] = useState(''); // Loại dịch vụ (vd: Cha con)
    const [numSamples, setNumSamples] = useState(2); // Số mẫu cần xét nghiệm, mặc định 2
    const [testType, setTestType] = useState(''); // Loại xét nghiệm (Dân sự / Hành chính)
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [notes, setNotes] = useState('');

    // State cho thông tin người tham gia
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

    // Danh sách phương thức thu mẫu (có thể lấy từ API nếu cần)
    const collectionMethodOptions = [
        'Tự thu mẫu',
        'Thu mẫu tại nhà/văn phòng',
        'Thu mẫu tại trung tâm',
    ];

    // === Redirect nếu chưa đăng nhập ===
    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
        }
    }, [user, authLoading, navigate]);

    // === useEffect để tự động tạo/cập nhật số lượng participants và collectionMethod mặc định ===
    useEffect(() => {
        setParticipants(prevParticipants => {
            const newParticipants = Array.from({ length: numSamples }, (_, i) => {
                const existingParticipant = prevParticipants[i];

                // Xác định phương thức thu mẫu mặc định dựa trên loại xét nghiệm và dịch vụ
                let defaultCollectionMethod = '';
                if (testType === 'Hành chính' || serviceType === 'Xét nghiệm ADN Thai nhi') {
                    defaultCollectionMethod = 'Thu mẫu tại trung tâm';
                }

                // Nếu đã có người tham gia tồn tại, giữ lại thông tin cũ và cập nhật collectionMethod nếu cần
                if (existingParticipant) {
                    return {
                        ...existingParticipant,
                        // Cập nhật collectionMethod nếu loại xét nghiệm/dịch vụ yêu cầu mặc định
                        collectionMethod: (testType === 'Hành chính' || serviceType === 'Xét nghiệm ADN Thai nhi')
                            ? defaultCollectionMethod
                            : (existingParticipant.collectionMethod || '') // Giữ lại giá trị cũ nếu có, hoặc rỗng
                    };
                } else {
                    // Nếu là người tham gia mới, tạo đối tượng mới với collectionMethod mặc định
                    if (testType === 'Hành chính') {
                        return { fullName: '', age: '', dob: '', gender: '', cccd: '', address: '', relationship: '', collectionMethod: defaultCollectionMethod };
                    } else { // Dân sự hoặc Thai nhi
                        return { fullName: '', age: '', dob: '', collectionMethod: defaultCollectionMethod };
                    }
                }
            });
            return newParticipants;
        });
    }, [numSamples, testType, serviceType]); // Các dependencies để kích hoạt useEffect

    // === Hàm tạo màu avatar ngẫu nhiên ===
    const getRandomAvatarColors = useCallback(() => {
        const rBg = Math.floor(Math.random() * 56) + 200;
        const gBg = Math.floor(Math.random() * 56) + 200;
        const bBg = Math.floor(Math.random() * 56) + 200;
        const bgColor = `rgb(${rBg}, ${gBg}, ${bBg})`;

        const rText = Math.max(0, rBg - 100);
        const gText = Math.max(0, gBg - 100);
        const bText = Math.max(0, bBg - 100);
        const textColor = `rgb(${rText}, ${gText}, ${bText})`;
        return { backgroundColor: bgColor, color: textColor };
    }, []);

    // === Hàm xử lý thay đổi thông tin người tham gia ===
    const handleParticipantChange = (index, field, value) => {
        const updatedParticipants = [...participants];
        updatedParticipants[index] = { ...updatedParticipants[index], [field]: value };
        setParticipants(updatedParticipants);
    };

    // === Hàm xử lý submit form ===
    const handleSubmitBooking = (e) => {
        e.preventDefault();

        // Kiểm tra các trường bắt buộc chung
        if (!serviceType || !testType || !appointmentDate || !appointmentTime) {
            alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
            return;
        }

        // Kiểm tra số mẫu dựa trên loại dịch vụ
        if (serviceType === 'Xét nghiệm ADN Thai nhi' && numSamples !== 2) {
            alert('Dịch vụ "Xét nghiệm ADN Thai nhi" yêu cầu chính xác 2 mẫu.');
            return;
        }
        if (serviceType !== 'Xét nghiệm ADN Thai nhi' && numSamples < 2) {
            alert('Số mẫu xét nghiệm phải tối thiểu là 2 cho dịch vụ này.');
            return;
        }

        // Kiểm tra xem tất cả thông tin người tham gia đã được điền đầy đủ chưa
        const allParticipantsFilled = participants.every(p => {
            if (testType === 'Hành chính') {
                return p.fullName && p.age && p.dob && p.gender && p.cccd && p.address && p.relationship && p.collectionMethod;
            } else { // Dân sự hoặc Thai nhi
                return p.fullName && p.age && p.dob && p.collectionMethod;
            }
        });

        if (!allParticipantsFilled) {
            alert('Vui lòng điền đầy đủ thông tin cho tất cả người tham gia, bao gồm phương pháp thu mẫu.');
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
            <div className="homepage-root">
                <header className="homepage-header">
                    <div className="header-left">
                        <nav className="header-nav">
                            <ul>
                                <li><button className="nav-link" onClick={() => navigate('/about')}>GIỚI THIỆU</button></li>
                                <li><button className="nav-link" onClick={() => navigate('/services')}>DỊCH VỤ</button></li>
                                <li><button className="nav-link" onClick={() => navigate('/info')}>THÔNG TIN</button></li>
                                <li><button className="nav-link nav-link-highlight" onClick={() => navigate('/booking-create')}>ĐẶT LỊCH HẸN</button></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="header-right">
                        <div className="header-search-box">
                            <input type="text" placeholder="Tìm kiếm..." className="header-search-input" />
                            <button className="header-search-btn">🔍</button>
                        </div>
                        {user && (
                            <div className="header-user-profile" onClick={() => navigate('/personal-info')}>
                                <span className="header-user-info">{user.fullName || user.email}</span>
                                <div className="header-profile-icon" style={getRandomAvatarColors()}>
                                    {user.avatar ? (
                                        <img src={user.avatar} alt={user.fullName} />
                                    ) : (
                                        user.fullName ? user.fullName.split(" ").map(n => n[0]).join("").toUpperCase() : user.email?.charAt(0).toUpperCase() || ''
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                <main className="booking-create-content">
                    <section className="confirmation-section">
                        <h2>Xác nhận thông tin đặt lịch</h2>
                        <div className="confirmation-details">
                            <p><strong>Loại dịch vụ:</strong> {serviceType}</p>
                            <p><strong>Số mẫu:</strong> {numSamples}</p>
                            <p><strong>Loại xét nghiệm:</strong> {testType}</p>
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
                                        <p>Phương pháp thu mẫu: {p.collectionMethod || 'Chưa điền'}</p>
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

                <footer className="homepage-footer">
                    <div className="footer-section">
                        <h3>LOCATION</h3>
                        <p>70, D1, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh</p>
                    </div>
                    <div className="footer-section">
                        <h3>CONTACT US</h3>
                        <p>02020202304</p>
                    </div>
                    <div className="footer-section">
                        <h3>PAYMENT</h3>
                        <div className="payment-icons">
                            <div className="payment-icon-placeholder">Pay1</div>
                            <div className="payment-icon-placeholder">Pay2</div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }

    // === Render Booking Form (Default) ===
    return (
        <div className="homepage-root">
            <header className="homepage-header">
                <div className="header-left">
                    <nav className="header-nav">
                        <ul>
                            <li><button className="nav-link" onClick={() => navigate('/about')}>GIỚI THIỆU</button></li>
                            <li><button className="nav-link" onClick={() => navigate('/services')}>DỊCH VỤ</button></li>
                            <li><button className="nav-link" onClick={() => navigate('/info')}>THÔNG TIN</button></li>
                            <li><button className="nav-link nav-link-highlight" onClick={() => navigate('/booking-create')}>ĐẶT LỊCH HẸN</button></li>
                        </ul>
                    </nav>
                </div>
                <div className="header-right">
                    <div className="header-search-box">
                        <input type="text" placeholder="Tìm kiếm..." className="header-search-input" />
                        <button className="header-search-btn">🔍</button>
                    </div>
                    {user ? (
                        <div className="header-user-profile" onClick={() => navigate('/personal-info')}>
                            <span className="header-user-info">{user.fullName || user.email}</span>
                            <div className="header-profile-icon" style={getRandomAvatarColors()}>
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.fullName} />
                                ) : (
                                    user.fullName ? user.fullName.split(" ").map(n => n[0]).join("").toUpperCase() : user.email?.charAt(0).toUpperCase() || ''
                                )}
                            </div>
                        </div>
                    ) : (
                        <button className="header-login-button" onClick={() => navigate('/login')}>Đăng nhập</button>
                    )}
                </div>
            </header>

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
                                    setNumSamples(2); // Thai nhi luôn là 2 mẫu
                                } else {
                                    setNumSamples(2); // Các loại khác mặc định 2 mẫu
                                }
                                setTestType(''); // Reset loại xét nghiệm khi đổi loại dịch vụ
                                // participants sẽ được cập nhật bởi useEffect khi serviceType/numSamples thay đổi
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
                            <p className="static-option">2</p>
                        </div>
                    ) : (
                        <div className="form-group">
                            <label htmlFor="numSamples">Số mẫu cần xét nghiệm:</label>
                            <input
                                type="number"
                                id="numSamples"
                                value={numSamples}
                                onChange={(e) => setNumSamples(Math.max(2, parseInt(e.target.value) || 2))}
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
                            onChange={(e) => setTestType(e.target.value)}
                            required
                        >
                            <option value="">Chọn loại xét nghiệm</option>
                            <option value="Dân sự">Dân sự</option>
                            <option value="Hành chính">Hành chính</option>
                        </select>
                    </div>

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
                            onChange={(e) => setAppointmentTime(e.target.value)}
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

                                {/* Phương thức thu mẫu riêng cho từng người tham gia */}
                                {(testType === 'Hành chính' || serviceType === 'Xét nghiệm ADN Thai nhi') ? (
                                    <div className="form-group">
                                        <label>Phương pháp thu mẫu:</label>
                                        <p className="static-option">Thu mẫu tại trung tâm</p>
                                    </div>
                                ) : (
                                    <div className="form-group">
                                        <label>Phương pháp thu mẫu:</label>
                                        <select
                                            value={participants[index]?.collectionMethod || ''}
                                            onChange={(e) => handleParticipantChange(index, 'collectionMethod', e.target.value)}
                                            required
                                        >
                                            <option value="">Chọn phương pháp thu mẫu</option>
                                            {collectionMethodOptions.map((method, methodIndex) => (
                                                <option key={methodIndex} value={method}>{method}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

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

            <footer className="homepage-footer">
                <div className="footer-section">
                    <h3>LOCATION</h3>
                    <p>70, D1, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh</p>
                </div>
                <div className="footer-section">
                    <h3>CONTACT US</h3>
                    <p>02020202304</p>
                </div>
                <div className="footer-section">
                    <h3>PAYMENT</h3>
                    <div className="payment-icons">
                        <div className="payment-icon-placeholder">Pay1</div>
                        <div className="payment-icon-placeholder">Pay2</div>
                    </div>
                </div>
            </footer>
        </div>
    );
}