import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import './BookingDetails.css';

export default function BookingDetails() {
    const { user, loading: authLoading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const bookingData = location.state?.bookingData;

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
            return;
        }
        if (!bookingData) {
            alert('Không tìm thấy thông tin đặt lịch để xác nhận. Vui lòng tạo lịch mới.');
            navigate('/booking-create'); // Chỉnh sửa lại về '/booking-create' cho rõ ràng
        }
    }, [bookingData, navigate, user, authLoading]);

    const calculateAge = (dobYear) => {
        if (!dobYear) return null;
        const currentYear = new Date().getFullYear();
        return currentYear - parseInt(dobYear);
    };

    // === ĐÂY LÀ DÒNG CẦN SỬA ĐỔI ===
    const handleProceedToPayment = () => {
        // Chuyển hướng sang trang thanh toán và truyền dữ liệu đặt lịch
        navigate('/booking-payment', { state: { bookingData } }); // Đã bỏ dấu chấm (.)
    };

    const handleEditBooking = () => {
        // Quay lại trang BookingCreate và truyền lại dữ liệu để người dùng chỉnh sửa
        navigate('/booking-create', { state: { initialBookingData: bookingData } }); // Chỉnh sửa lại về '/booking-create' cho rõ ràng
    };

    if (authLoading || !user || !bookingData) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontSize: '24px' }}>
                Đang tải hoặc chuyển hướng...
            </div>
        );
    }

    return (
        <div className="homepage-root">
            <Header />
            <main className="booking-details-content">
                <section className="booking-details-section">
                    <h2>Xác nhận thông tin đặt lịch</h2>
                    <p className="description">Vui lòng kiểm tra kỹ thông tin trước khi xác nhận.</p>

                    <div className="summary-card">
                        <h3>Thông tin chung</h3>
                        <div className="detail-row">
                            <strong>Loại dịch vụ:</strong> <span>{bookingData.serviceType}</span>
                        </div>
                        <div className="detail-row">
                            <strong>Số mẫu:</strong> <span>{bookingData.numSamples}</span>
                        </div>
                        <div className="detail-row">
                            <strong>Loại xét nghiệm:</strong> <span>{bookingData.testType}</span>
                        </div>
                        <div className="detail-row">
                            <strong>Ngày hẹn:</strong> <span>{bookingData.appointmentDate}</span>
                        </div>
                        <div className="detail-row">
                            <strong>Giờ hẹn:</strong> <span>{bookingData.appointmentTime}</span>
                        </div>
                        <div className="detail-row">
                            <strong>Ghi chú:</strong> <span>{bookingData.notes || 'Không có'}</span>
                        </div>
                    </div>

                    <div className="summary-card participants-summary">
                        <h3>Thông tin người tham gia</h3>
                        {bookingData.participants.length > 0 ? (
                            bookingData.participants.map((p, index) => (
                                <div key={index} className="participant-detail-block">
                                    <h4>Người tham gia {index + 1} ({p.relationship || 'Chưa xác định'})</h4>
                                    {p.relationship === 'Thai nhi (Mẫu từ mẹ)' && <p className="sub-label">**Thông tin của người mẹ**</p>}
                                    <div className="detail-row">
                                        <strong>Họ và tên:</strong> <span>{p.fullName || 'Chưa điền'}</span>
                                    </div>
                                    <div className="detail-row">
                                        <strong>Giới tính:</strong> <span>{p.gender || 'Chưa điền'}</span>
                                    </div>
                                    <div className="detail-row">
                                        <strong>Năm sinh:</strong> <span>{p.dob || 'Chưa điền'}</span>
                                    </div>
                                    {bookingData.testType === 'Hành chính' && calculateAge(p.dob) >= 14 && (
                                        <div className="detail-row">
                                            <strong>Mã định danh cá nhân:</strong> <span>{p.personalId || 'Chưa điền'}</span>
                                        </div>
                                    )}
                                    {bookingData.testType === 'Hành chính' && (
                                        <>
                                            <div className="detail-row">
                                                <strong>Địa chỉ:</strong> <span>{p.address || 'Chưa điền'}</span>
                                            </div>
                                            <div className="detail-row">
                                                <strong>Quan hệ với người đăng ký:</strong> <span>{p.relationToRegistrant || 'Chưa điền'}</span>
                                            </div>
                                        </>
                                    )}
                                    <div className="detail-row">
                                        <strong>Phương pháp thu mẫu:</strong> <span>{p.collectionMethod || 'Chưa điền'}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Không có thông tin người tham gia được yêu cầu.</p>
                        )}
                    </div>

                    <div className="booking-actions">
                        <button className="btn-edit" onClick={handleEditBooking}>Chỉnh sửa</button>
                        <button className="btn-confirm-final" onClick={handleProceedToPayment}>Tiến hành thanh toán</button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
