import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import './BookingDetails.css';
import api from '../services/api';

export default function BookingDetails() {
    // ==== State & Context ====
    // Hook xử lý authentication context và navigation
    const { user, loading: authLoading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    // Lấy dữ liệu booking từ navigation state (được gửi từ trang BookingCreate)
    const bookingData = location.state?.bookingData;

    // State lưu danh sách services từ backend để so sánh và tìm giá
    const [serviceList, setServiceList] = useState([]);

    // ==== Effect: Auth & Data Guard ====
    // useEffect: Kiểm tra authentication và data guard - bảo vệ route
    useEffect(() => {
        // Redirect nếu chưa đăng nhập
        if (!authLoading && !user) {
            navigate('/login');
            return;
        }
        // Redirect nếu không có bookingData (người dùng truy cập trực tiếp URL)
        if (!bookingData) {
            alert('Không tìm thấy thông tin đặt lịch để xác nhận. Vui lòng tạo lịch mới.');
            navigate('/booking-create');
        }
    }, [bookingData, navigate, user, authLoading]); // Dependencies để trigger khi auth hoặc data thay đổi

    // useEffect: Fetch service list từ backend để tính giá và validate
    useEffect(() => {
        api.get('/service/listService')
            .then(res => {
                let services = res.data;
                // Parse nếu response là string JSON
                if (typeof services === 'string') {
                    try {
                        services = JSON.parse(services);
                    } catch (e) {
                        services = []; // Fallback nếu parse lỗi
                    }
                }
                // Set service list nếu là array, nếu không thì set empty array
                setServiceList(Array.isArray(services) ? services : []);
            })
            .catch(() => setServiceList([])); // Handle error bằng cách set empty array
    }, []); // Empty dependency - chỉ chạy 1 lần khi mount

    // ==== Logic: Helper Functions ====
    // Hàm tính tuổi từ năm sinh (đơn giản hơn calculateAge trong BookingCreate)
    const calculateAge = (dobYear) => {
        if (!dobYear) return null;
        const currentYear = new Date().getFullYear();
        return currentYear - parseInt(dobYear);
    };

    // Hàm format datetime string để tương thích với backend API
    const toLocalDateTimeString = (dateStr) => {
        // Nếu đã có timezone thì return nguyên
        if (dateStr && dateStr.includes('T')) return dateStr;
        // Nếu chỉ có date (YYYY-MM-DD) thì thêm time mặc định
        if (dateStr && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr + 'T00:00:00';
        return dateStr;
    };

    // ==== Logic: Main Booking Details (Memoized) ====
    // useMemo: Tạo array thông tin booking chính để hiển thị - memoized để optimize performance
    const mainBookingDetails = useMemo(() => {
        if (!bookingData) return [];
        return [
            { label: 'Loại dịch vụ', value: bookingData.serviceName || 'Chưa điền' },
            { label: 'Số lượng mẫu', value: bookingData.numSamples || 'Chưa điền' },
            { label: 'Loại xét nghiệm', value: bookingData.serviceType || 'Chưa điền' },
            { label: 'Ngày hẹn', value: bookingData.appointmentDate || 'Chưa điền' },
            { label: 'Thời gian trả kết quả', value: bookingData.resultTime || 'Chưa điền' },
            { label: 'Ghi chú', value: bookingData.notes || 'Không có' },
        ];
    }, [bookingData]); // Chỉ re-calculate khi bookingData thay đổi

    // ==== Logic: Action Handlers ====
    // Hàm xử lý khi user click "Tiến hành thanh toán"
    const handleProceedToPayment = async () => {
        try {
            // Tìm service matching trong serviceList để lấy giá và serviceId
            // So sánh serviceName và serviceType không phân biệt hoa/thường, có kiểm tra null
            const selectedService = (serviceList || []).find(
                s =>
                    s.serviceName && bookingData.serviceName &&
                    s.serviceName.trim().toLowerCase() === bookingData.serviceName.trim().toLowerCase() &&
                    (
                        // ServiceType có thể không có (optional)
                        !bookingData.serviceType ||
                        (s.serviceType && s.serviceType.trim().toLowerCase() === bookingData.serviceType.trim().toLowerCase())
                    )
            );

            // Debug logs để trace matching logic
            console.log('serviceList:', serviceList);
            console.log('bookingData:', bookingData);
            console.log('selectedService:', selectedService);

            // Validation: phải tìm được service matching
            if (!selectedService) {
                alert('Không tìm thấy dịch vụ phù hợp! Vui lòng kiểm tra lại lựa chọn.');
                return;
            }

            // Tính toán giá tiền theo công thức mới: service.price * (numberSample - 2) * service.extraSampleFee
            const basePrice = selectedService.price || 0;
            const extraSampleFee = selectedService.extraSampleFee || 1;
            const numberSample = bookingData.numSamples;
            
            // Calculate: price * (numberSample - 2) * extraSampleFee
            const totalPrice = basePrice * Math.max(0, numberSample - 2) * extraSampleFee;
            const serviceId = selectedService.serviceID;
            const userId = user?.userID || user?.userId || localStorage.getItem('userID');
            
            // Kiểm tra xem có user ID hợp lệ không
            if (!userId) {
                alert('Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.');
                navigate('/login');
                return;
            }

            // Chuẩn bị payload để call API tạo booking
            const payload = {
                userId: userId,
                serviceId: serviceId,
                appointmentDate: toLocalDateTimeString(bookingData.appointmentDate),
                participants: bookingData.participants,
                numberSample: bookingData.numSamples,
            };

            // Call API tạo booking trên backend
            const response = await api.post('/bookings/create', payload);
            const createdBooking = response.data;

            // Navigate đến trang payment với bookingData đã được enrich với giá tiền
            navigate('/booking-payment', {
                state: {
                    bookingData: {
                        ...bookingData,
                        bookingID: createdBooking.bookingID || createdBooking.id, // Flexible field name
                        totalPrice
                    }
                }
            });
        } catch (error) {
            // Handle lỗi API call
            alert('Đặt lịch thất bại: ' + (error.message || 'Lỗi không xác định'));
            console.error(error);
        }
    };

    // Hàm xử lý khi user click "Chỉnh sửa" - quay lại trang create với data hiện tại
    const handleEditBooking = () => {
        // Chuẩn bị initialBookingData để pre-populate form BookingCreate
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
        // Navigate về trang create với state để edit
        navigate('/booking-create', { state: { initialBookingData } });
    };

    // ==== Guard: No Data ====
    // Early return nếu không có bookingData (loading state)
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
    // Kiểm tra xem có phải là xét nghiệm hành chính không (để hiển thị thông tin khác nhau)
    const isAdministrativeTest = bookingData.testType === 'Hành chính';

    // ==== Render ====
    return (
        <div className="homepage-root">
            <Header />
            <main className="booking-details-content">
                <section className="booking-details-section">
                    <h2>Xác nhận thông tin đặt lịch</h2>
                    <p className="description">Vui lòng kiểm tra kỹ các thông tin dưới đây trước khi tiến hành thanh toán.</p>

                    {/* Card hiển thị thông tin chung của booking */}
                    <div className="summary-card">
                        <h3>Thông tin chung</h3>
                        {mainBookingDetails.map((item, index) => (
                            <div className="detail-row" key={index}>
                                <strong>{item.label}:</strong> <span>{item.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Card hiển thị thông tin chi tiết từng participant */}
                    <div className="summary-card participants-summary">
                        <h3>Thông tin người tham gia ({bookingData.numSamples} mẫu)</h3>
                        {bookingData.participants && bookingData.participants.length > 0 ? (
                            bookingData.participants.map((p, index) => (
                                <div key={index} className="participant-detail-block">
                                    <h4>Người tham gia {index + 1}: {p.relationship}</h4>
                                    <div className="detail-row">
                                        <strong>Họ và tên:</strong> <span>{p.fullName || 'Chưa điền'}</span>
                                    </div>
                                    <div className="detail-row">
                                        <strong>Giới tính:</strong> <span>{p.gender || 'Chưa điền'}</span>
                                    </div>
                                    <div className="detail-row">
                                        <strong>Năm sinh:</strong> <span>{p.dateOfBirth || 'Chưa điền'}</span>
                                    </div>
                                    {/* Chỉ hiển thị mã định danh nếu là xét nghiệm hành chính hoặc có data */}
                                    <div className="detail-row">
                                        <strong>Mã định danh cá nhân:</strong> <span>{p.personalId || 'Chưa điền'}</span>
                                    </div>
                                    {/* Chỉ hiển thị địa chỉ nếu là xét nghiệm hành chính hoặc có data */}
                                    <div className="detail-row">
                                        <strong>Địa chỉ:</strong> <span>{p.address || 'Chưa điền'}</span>
                                    </div>
                                    {/* Chỉ hiển thị quan hệ với người đăng ký nếu là xét nghiệm hành chính hoặc có data */}
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

                    {/* Action buttons cho user: Edit hoặc Proceed */}
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