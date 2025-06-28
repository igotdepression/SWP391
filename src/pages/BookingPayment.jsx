import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import './BookingPayment.css';

// Import hình ảnh QR code (bạn cần đặt file QR này vào thư mục public hoặc assets)
// Ví dụ: import qrCodeImage from '../assets/vietcombank_qr.png';
// Hoặc sử dụng link trực tiếp nếu bạn có sẵn QR code trên mạng
const qrCodeImage = 'https://via.placeholder.com/200?text=QR+Code+Vietcombank'; // Placeholder QR Code

export default function BookingPayment() {
    const { user, loading: authLoading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const bookingData = location.state?.bookingData;

    const [paymentMethod, setPaymentMethod] = useState(''); // State để lưu phương thức thanh toán đã chọn
    const [isConfirmed, setIsConfirmed] = useState(false); // Để quản lý trạng thái đã xác nhận thanh toán chưa

    // Redirect nếu không có dữ liệu hoặc chưa đăng nhập
    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
            return;
        }
        if (!bookingData) {
            alert('Không tìm thấy thông tin đặt lịch để thanh toán. Vui lòng tạo lịch mới.');
            navigate('/booking-create'); // Chuyển hướng về booking-create
        }
    }, [bookingData, navigate, user, authLoading]);

    // Hàm tính tổng số tiền (Logic giả định, bạn cần thay bằng logic tính giá thực tế)
    const calculateTotalPrice = () => {
        let basePricePerSample = 2000000; // Ví dụ: 2 triệu/mẫu cho dân sự
        if (bookingData.testType === 'Hành chính') {
            basePricePerSample = 3000000; // Ví dụ: 3 triệu/mẫu cho hành chính
        }
        // Có thể thêm logic phức tạp hơn dựa trên loại dịch vụ, thời gian, v.v.
        // Ví dụ: if (bookingData.serviceType === 'Xét nghiệm ADN Thai nhi') { basePricePerSample = 4000000; }
        return bookingData.numSamples * basePricePerSample;
    };

    const totalPrice = bookingData ? calculateTotalPrice() : 0; // Đảm bảo bookingData tồn tại trước khi tính

    const handleProcessPayment = async () => {
        if (!paymentMethod) {
            alert('Vui lòng chọn một phương thức thanh toán.');
            return;
        }

        setIsConfirmed(true); // Đặt trạng thái đã xác nhận để hiển thị thông báo chờ xử lý

        // Đây là nơi bạn sẽ gọi API backend để tạo/cập nhật đơn hàng
        // và gửi thông tin thanh toán.
        try {
            // Ví dụ: Gửi dữ liệu đặt lịch và phương thức thanh toán lên backend
            // const response = await fetch('/api/create-booking-and-payment', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${user.token}` // Nếu có token xác thực
            //     },
            //     body: JSON.stringify({ bookingData, paymentMethod, totalPrice })
            // });

            // if (!response.ok) {
            //     const errorData = await response.json();
            //     throw new Error(errorData.message || 'Lỗi khi ghi nhận đơn hàng.');
            // }

            // const result = await response.json();
            // console.log('Đơn hàng đã được ghi nhận:', result);

            // Giả lập API call thành công sau 2 giây
            await new Promise(resolve => setTimeout(resolve, 2000));

            alert(`Đơn hàng của bạn đã được ghi nhận và đang chờ thanh toán bằng phương thức "${paymentMethod}". Cảm ơn bạn!`);
            navigate('/booking-history'); // Chuyển hướng đến lịch sử đặt lịch hoặc trang xác nhận thành công
        } catch (error) {
            console.error('Lỗi khi xử lý thanh toán:', error);
            alert('Xử lý thanh toán thất bại. Vui lòng thử lại. Lỗi: ' + error.message);
            setIsConfirmed(false); // Đặt lại trạng thái nếu có lỗi
        }
    };

    if (authLoading || !user || !bookingData) {
        return (
            <div className="loading-container">
                Đang tải hoặc chuyển hướng...
            </div>
        );
    }

    return (
        <div className="homepage-root">
            <Header />
            <main className="payment-page-content">
                <section className="payment-section">
                    <h2>Thanh toán đơn hàng</h2>
                    <p className="description">Vui lòng kiểm tra thông tin đơn hàng và chọn phương thức thanh toán phù hợp.</p>

                    <div className="summary-card">
                        <h3>Tóm tắt đơn hàng</h3>
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
                            <strong>Ghi chú:</strong> <span>{bookingData.notes || 'Không có'}</span>
                        </div>
                        <div className="total-price-display">
                            <strong>Tổng số tiền cần thanh toán:</strong> <span className="price">{totalPrice.toLocaleString('vi-VN')} VNĐ</span>
                        </div>
                    </div>

                    <div className="payment-methods-card">
                        <h3>Chọn phương thức thanh toán</h3>
                        <div className="form-group payment-option">
                            <label>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="BankTransfer"
                                    checked={paymentMethod === 'BankTransfer'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    disabled={isConfirmed}
                                />
                                Chuyển khoản ngân hàng (Online/Tại quầy)
                            </label>
                            {paymentMethod === 'BankTransfer' && (
                                <div className="bank-transfer-info">
                                    <h4>Thông tin chuyển khoản:</h4>
                                    <p><strong>Ngân hàng:</strong> Vietcombank</p>
                                    <p><strong>Số tài khoản:</strong> 1234567890</p>
                                    <p><strong>Chủ tài khoản:</strong> CÔNG TY TNHH XÉT NGHIỆM ADN DNACHAIN</p>
                                    <p><strong>Chi nhánh:</strong> TP Hồ Chí Minh</p>

                                    {/* === KHUNG MỚI CHO QR VÀ HƯỚNG DẪN === */}
                                    <div className="qr-instructions-container">
                                        <div className="qr-code-column">
                                            <p>Quét mã QR để chuyển khoản nhanh:</p>
                                            <img src={qrCodeImage} alt="QR Code Vietcombank" className="qr-code-img" />
                                            <p className="qr-note">Số tiền: <span className="highlight-price-small">{totalPrice.toLocaleString('vi-VN')} VNĐ</span></p>
                                        </div>

                                        <div className="payment-instructions-column">
                                            <h4>Hướng dẫn thanh toán:</h4>
                                            <ol>
                                                <li>Chuyển khoản chính xác số tiền: <span className="highlight-price">{totalPrice.toLocaleString('vi-VN')} VNĐ</span></li>
                                                <li>Nội dung chuyển khoản (rất quan trọng):<br />
                                                    <strong className="transfer-content">{user.username} - {user.phoneNumber || 'SĐT của bạn'} - {bookingData.serviceType.substring(0, 10) + '...'}</strong><br />
                                                    (Ví dụ: **NguyenVanA - 0987654321 - XNA Cha con...**)
                                                </li>
                                                <li>Hệ thống sẽ tự động xác nhận thanh toán trong vòng 5-15 phút.</li>
                                                <li>Nếu có bất kỳ vấn đề gì, vui lòng liên hệ hotline: 1900 1234.</li>
                                            </ol>
                                        </div>
                                    </div>
                                    {/* === KẾT THÚC KHUNG MỚI === */}
                                </div>
                            )}
                        </div>

                        <div className="form-group payment-option">
                            <label>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="PayAtCenter"
                                    checked={paymentMethod === 'PayAtCenter'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    disabled={isConfirmed}
                                />
                                Thanh toán trực tiếp tại trung tâm
                            </label>
                            {paymentMethod === 'PayAtCenter' && (
                                <div className="center-info">
                                    <p>Bạn sẽ thanh toán trực tiếp tại trung tâm của chúng tôi vào ngày hẹn. Vui lòng đến sớm 15 phút để hoàn tất thủ tục thanh toán và lấy mẫu.</p>
                                    <p className="note">Số tiền cần thanh toán: <span className="highlight-price">{totalPrice.toLocaleString('vi-VN')} VNĐ</span></p>
                                    <p><strong>Địa chỉ trung tâm:</strong> 7 Đ. D1, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh 700000 </p>
                                    <p><strong>Giờ làm việc:</strong> 8:00-12:00 13:00-17:00</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="payment-actions">
                        <button className="btn-back" onClick={() => navigate('/booking-details', { state: { bookingData } })} disabled={isConfirmed}>
                            Quay lại
                        </button>
                        <button className="btn-confirm-payment" onClick={handleProcessPayment} disabled={isConfirmed || !paymentMethod}>
                            {isConfirmed ? 'Đang xử lý...' : 'Hoàn tất thanh toán'}
                        </button>
                    </div>

                    {isConfirmed && (
                        <div className="processing-message">
                            <p>Đang ghi nhận đơn hàng của bạn. Vui lòng chờ...</p>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}