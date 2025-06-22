import React, { useEffect, useMemo } from 'react'; // Added useMemo for optimization
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

    const handleProceedToPayment = () => {
        navigate('/booking-payment', { state: { bookingData } });
    };

    const handleEditBooking = () => {
        navigate('/booking-create', { state: { initialBookingData: bookingData } });
    };

    // Memoize the data transformation for main booking details for performance
    const mainBookingDetails = useMemo(() => {
        if (!bookingData) return [];
        return [
            { label: "Loại dịch vụ", value: bookingData.serviceType || 'Chưa điền' },
            { label: "Số lượng mẫu", value: bookingData.numSamples || 'Chưa điền' },
            { label: "Loại xét nghiệm", value: bookingData.testType || 'Chưa điền' },
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
                                    {/* Display relationship in the heading */}
                                    <h4>Người tham gia {index + 1}: {p.relationship || 'Chưa xác định'}</h4>

                                    {p.relationship === 'Thai nhi (Mẫu từ mẹ)' && (
                                        <p className="sub-label">**(Thông tin của người mẹ)**</p>
                                    )}
                                    {/* This is a general label for other participants in admin service, if needed */}
                                    {isAdministrativeTest && p.isRegistrant === false && (
                                        <p className="sub-label">
                                            (Đây là thông tin của người tham gia khác, không phải người đăng ký)
                                        </p>
                                    )}

                                    <div className="detail-row">
                                        <strong>Họ và tên:</strong> <span>{p.fullName || 'Chưa điền'}</span>
                                    </div>
                                    {/* Giới tính và Năm sinh always show, as they are basic info unless specifically hidden*/}
                                    <div className="detail-row">
                                        <strong>Giới tính:</strong> <span>{p.gender || 'Chưa điền'}</span>
                                    </div>
                                    <div className="detail-row">
                                        <strong>Năm sinh:</strong> <span>{p.dob ? `${p.dob} (${calculateAge(p.dob)} tuổi)` : 'Chưa điền'}</span>
                                    </div>

                                    {/* Conditional display for administrative-related fields */}
                                    {isAdministrativeTest && (
                                        <>
                                            {/* Mã định danh cá nhân only appears for age >= 14 if administrative test */}
                                            {(calculateAge(p.dob) === null || calculateAge(p.dob) >= 14) ? ( // Match logic in BookingCreate.jsx
                                                <div className="detail-row">
                                                    <strong>Mã định danh cá nhân:</strong> <span>{p.personalId || 'Chưa điền'}</span>
                                                </div>
                                            ) : (
                                                <div className="detail-row">
                                                    <strong>Mã định danh cá nhân:</strong> <span>Không bắt buộc với trẻ dưới 14 tuổi</span>
                                                </div>
                                            )}

                                            <div className="detail-row">
                                                <strong>Địa chỉ:</strong> <span>{p.address || 'Chưa điền'}</span>
                                            </div>
                                            <div className="detail-row">
                                                <strong>Quan hệ với người đăng ký:</strong> <span>{p.relationToRegistrant || 'Chưa điền'}</span>
                                            </div>
                                        </>
                                    )}

                                    {/* Sample Type is displayed conditionally in BookingCreate based on 'Thai nhi (Mẫu từ mẹ)' */}
                                    {!(bookingData.serviceType === 'Xét nghiệm ADN Thai nhi' && p.relationship === 'Thai nhi (Mẫu từ mẹ)') ? (
                                        <div className="detail-row">
                                            <strong>Mẫu xét nghiệm:</strong> <span>{p.sampleType || 'Chưa điền'}</span>
                                        </div>
                                    ) : (
                                        // If it's 'Thai nhi (Mẫu từ mẹ)', sampleType is fixed, so we might not display this line at all
                                        // or display a placeholder if required. For now, matching BookingCreate, we don't need to show it as a selectable field.
                                        // If you want to show it as a static text, you can add:
                                        // <div className="detail-row">
                                        //     <strong>Mẫu xét nghiệm:</strong> <span>Mẫu từ mẹ</span>
                                        // </div>
                                        null
                                    )}

                                    {/* Collection Method is conditionally static in BookingCreate.jsx */}
                                    {(bookingData.testType === 'Hành chính' || bookingData.serviceType === 'Xét nghiệm ADN Thai nhi') ? (
                                        <div className="detail-row">
                                            <strong>Phương pháp thu mẫu:</strong> <span>Thu mẫu tại trung tâm</span>
                                        </div>
                                    ) : (
                                        <div className="detail-row">
                                            <strong>Phương pháp thu mẫu:</strong> <span>{p.collectionMethod || 'Chưa điền'}</span>
                                        </div>
                                    )}
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