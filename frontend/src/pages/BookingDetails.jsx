import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import './BookingDetails.css';
import api from '../services/api';

export default function BookingDetails() {
    // ==== State & Context ====
    const { user, loading: authLoading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const bookingData = location.state?.bookingData;
    const [serviceList, setServiceList] = useState([]);

    // ==== Effect: Auth & Data Guard ====
    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
            return;
        }
        if (!bookingData) {
            alert('Không tìm thấy thông tin đặt lịch để xác nhận. Vui lòng tạo lịch mới.');
            navigate('/booking-create');
        }
    }, [bookingData, navigate, user, authLoading]);

    useEffect(() => {
        api.get('/service/listService')
            .then(res => {
                let services = res.data;
                if (typeof services === 'string') {
                    try { services = JSON.parse(services); } catch (e) { services = []; }
                }
                setServiceList(Array.isArray(services) ? services : []);
            })
            .catch(() => setServiceList([]));
    }, []);

    // ==== Logic: Helper Functions ====
    const calculateAge = (dobYear) => {
        if (!dobYear) return null;
        const currentYear = new Date().getFullYear();
        return currentYear - parseInt(dobYear);
    };

    const toLocalDateTimeString = (dateStr) => {
        if (dateStr && dateStr.includes('T')) return dateStr;
        if (dateStr && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr + 'T00:00:00';
        return dateStr;
    };

    // ==== Logic: Main Booking Details (Memoized) ====
    const mainBookingDetails = useMemo(() => {
        if (!bookingData) return [];
        return [
            { label: 'Loại dịch vụ', value: bookingData.serviceName || 'Chưa điền' },
            { label: 'Số lượng mẫu', value: bookingData.numSamples || 'Chưa điền' },
            { label: 'Loại xét nghiệm', value: bookingData.serviceType || 'Chưa điền' },
            { label: 'Loại mẫu', value: bookingData.typeSample || 'Chưa điền' },
            { label: 'Ngày hẹn', value: bookingData.appointmentDate || 'Chưa điền' },
            { label: 'Thời gian trả kết quả', value: bookingData.resultTime || 'Chưa điền' },
            { label: 'Ghi chú', value: bookingData.notes || 'Không có' },
        ];
    }, [bookingData]);

    // ==== Logic: Action Handlers ====
    const handleProceedToPayment = async () => {
        try {
            // So sánh serviceName và serviceType không phân biệt hoa/thường, có kiểm tra null
            const selectedService = (serviceList || []).find(
                s =>
                    s.serviceName && bookingData.serviceName &&
                    s.serviceName.trim().toLowerCase() === bookingData.serviceName.trim().toLowerCase() &&
                    (
                        !bookingData.serviceType ||
                        (s.serviceType && s.serviceType.trim().toLowerCase() === bookingData.serviceType.trim().toLowerCase())
                    )
            );
            console.log('serviceList:', serviceList);
            console.log('bookingData:', bookingData);
            console.log('selectedService:', selectedService);
            if (!selectedService) {
                alert('Không tìm thấy dịch vụ phù hợp! Vui lòng kiểm tra lại lựa chọn.');
                return;
            }
            const pricePerSample = selectedService.price || 0;
            const totalPrice = bookingData.numSamples * pricePerSample;
            const serviceId = selectedService.serviceID;
            const userId = user?.userId || 1;
            const payload = {
                userId: userId,
                serviceId: serviceId,
                appointmentDate: toLocalDateTimeString(bookingData.appointmentDate),
                participants: bookingData.participants,
                numberSample: bookingData.numSamples,
            };
            const response = await api.post('/bookings/create', payload);
            const createdBooking = response.data;
            navigate('/booking-payment', {
                state: {
                    bookingData: {
                        ...bookingData,
                        bookingID: createdBooking.bookingID || createdBooking.id,
                        pricePerSample,
                        totalPrice
                    }
                }
            });
        } catch (error) {
            alert('Đặt lịch thất bại: ' + (error.message || 'Lỗi không xác định'));
            console.error(error);
        }
    };

    const handleEditBooking = () => {
        const initialBookingData = {
            serviceName: bookingData.serviceName,
            serviceType: bookingData.serviceType,
            typeSample: bookingData.typeSample,
            testType: bookingData.testType,
            appointmentDate: bookingData.appointmentDate,
            resultTime: bookingData.resultTime,
            notes: bookingData.notes,
            numSamples: bookingData.numSamples,
            participants: bookingData.participants
        };
        navigate('/booking-create', { state: { initialBookingData } });
    };

    // ==== Guard: No Data ====
    if (!bookingData) {
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

    // ==== Logic: Check if administrative test ====
    const isAdministrativeTest = bookingData.testType === 'Hành chính';

    // ==== Render ====
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