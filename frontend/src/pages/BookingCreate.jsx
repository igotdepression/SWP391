// src/pages/BookingCreate.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { useNavigation } from '../hooks/useNavigation'; // Import useNavigation hook
import Header from '../components/Header';
import Footer from '../components/Footer';
import './BookingCreate.css';


export default function BookingCreatePage() {
    const { user, loading: authLoading } = useAuth(); // Get user info and loading state
    const { goToLogin, goToProfile } = useNavigation(); // Use navigation hook
    
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
            goToLogin(); // Use goToLogin from useNavigation hook
        }
    }, [user, authLoading, goToLogin]);

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
                <Header />
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
                <Footer />
            </div>
        );
    }

    // === Render Booking Form (Default) ===
    return (
        <div className="homepage-container">
            <Header />
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
            <Footer />
        </div>
    );
}