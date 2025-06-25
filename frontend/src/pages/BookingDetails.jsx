import React, { useEffect, useMemo } from 'react'; // Added useMemo for optimization
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import './BookingDetails.css';
import api from '../services/api'; // Đảm bảo đã import ở đầu file

export default function BookingDetails() {
    const { user, loading: authLoading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const bookingData = location.state?.bookingData;

    useEffect(() => {
        // Redirect if not authenticated
        if (!authLoading && !user) {
            navigate('/login');
            return;
        }
        // Redirect if no booking data is passed
        if (!bookingData) {
            alert('Không tìm thấy thông tin đặt lịch để xác nhận. Vui lòng tạo lịch mới.');
            navigate('/booking-create'); // Redirect to booking creation if no data
        }
    }, [bookingData, navigate, user, authLoading]);

    const calculateAge = (dobYear) => {
        if (!dobYear) return null;
        const currentYear = new Date().getFullYear();
        return currentYear - parseInt(dobYear);
    };

    const handleProceedToPayment = async () => {
        try {
            // Gọi API tạo booking thực tế
            const response = await api.post('/bookings/create', {
                serviceName: bookingData.serviceType,
                typeOfService: bookingData.testType,
                typeSample: bookingData.typeSample,
                appointmentDate: bookingData.appointmentDate,
                resultTime: bookingData.resultTime,
                notes: bookingData.notes,
                participants: bookingData.participants,
            });
            // Lấy bookingID từ response
            const createdBooking = response.data;
            // Chuyển sang payment, truyền bookingID
            navigate('/booking-payment', {
                state: {
                    bookingData: {
                        ...bookingData,
                        bookingID: createdBooking.bookingID || createdBooking.id,
                    }
                }
            });
        } catch (error) {
            alert('Đặt lịch thất bại: ' + (error.message || 'Lỗi không xác định'));
            console.error(error);
        }
    };

    const handleEditBooking = () => {
        // Chuẩn bị dữ liệu để chuyển về BookingCreate
        const initialBookingData = {
            serviceName: bookingData.serviceType,
            typeOfService: bookingData.testType,
            typeSample: bookingData.typeSample,
            appointmentDate: bookingData.appointmentDate,
            resultTime: bookingData.resultTime,
            notes: bookingData.notes,
            numSamples: bookingData.numSamples,
            participants: bookingData.participants
        };
        
        navigate('/booking-create', { state: { initialBookingData } });
    };

    // Memoize the data transformation for main booking details for performance
    const mainBookingDetails = useMemo(() => {
        if (!bookingData) return [];
        return [
            { label: "Loại dịch vụ", value: bookingData.serviceType || 'Chưa điền' },
            { label: "Số lượng mẫu", value: bookingData.numSamples || 'Chưa điền' },
            { label: "Loại xét nghiệm", value: bookingData.testType || 'Chưa điền' },
            { label: "Loại mẫu", value: bookingData.typeSample || 'Chưa điền' },
            { label: "Ngày hẹn", value: bookingData.appointmentDate || 'Chưa điền' },
            { label: "Thời gian trả kết quả", value: bookingData.resultTime || 'Chưa điền' }, // Use resultTime
            { label: "Ghi chú", value: bookingData.notes || 'Không có' },
        ];
    }, [bookingData]);

    if (!bookingData) { // Check bookingData here before rendering anything
        return (
            <div className="homepage-container">
                <Header />
                <main className="booking-details-content">
                    <p>Đang tải thông tin đặt lịch hoặc không có dữ liệu...</p>
                </main>
                <Footer />
            </div>
        );
    }

    // Determine if participant's full personal info (CCCD/CMND, DOB, Gender, Address, Relation) is relevant
    // These fields are considered 'hành chính' (administrative/official) based on testType.
    const isAdministrativeTest = bookingData.testType === 'Hành chính'; //

    return (
        <div className="homepage-root">
            <Header />
            <main className="booking-details-content">
                <section className="booking-details-section">
                    <h2>Xác nhận thông tin đặt lịch</h2>
                    <p className="description">Vui lòng kiểm tra kỹ các thông tin dưới đây trước khi tiến hành thanh toán.</p>

                    <div className="summary-card">
                        <h3>Thông tin chung</h3>
                        {mainBookingDetails.map((item, index) => (
                            <div className="detail-row" key={index}>
                                <strong>{item.label}:</strong> <span>{item.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="summary-card participants-summary">
                        <h3>Thông tin người tham gia ({bookingData.numSamples} mẫu)</h3>
                        {bookingData.participants && bookingData.participants.length > 0 ? (
                            bookingData.participants.map((p, index) => (
                                <div key={index} className="participant-detail-block">
                                    <h4>Người tham gia {index + 1}: {p.relationship || 'Chưa xác định'}</h4>
                                    <div className="detail-row">
                                        <strong>Họ và tên:</strong> <span>{p.fullName || 'Chưa điền'}</span>
                                    </div>
                                    <div className="detail-row">
                                        <strong>Giới tính:</strong> <span>{p.gender || 'Chưa điền'}</span>
                                    </div>
                                    <div className="detail-row">
                                        <strong>Năm sinh:</strong> <span>{p.dateOfBirth || 'Chưa điền'}</span>
                                    </div>
                                    <div className="detail-row">
                                        <strong>Mã định danh cá nhân:</strong> <span>{p.personalId || 'Chưa điền'}</span>
                                    </div>
                                    <div className="detail-row">
                                        <strong>Địa chỉ:</strong> <span>{p.address || 'Chưa điền'}</span>
                                    </div>
                                    <div className="detail-row">
                                        <strong>Quan hệ với người đăng ký:</strong> <span>{p.relationToRegistrant || 'Chưa điền'}</span>
                                    </div>
                                    <div className="detail-row">
                                        <strong>Mẫu xét nghiệm:</strong> <span>{p.sampleType || 'Chưa điền'}</span>
                                    </div>
                                    <div className="detail-row">
                                        <strong>Phương pháp thu mẫu:</strong> <span>{p.typeOfCollection || 'Chưa điền'}</span>
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