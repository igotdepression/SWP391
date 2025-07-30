import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import './BookingPayment.css';
import api from '../services/api';

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
    const [isProcessingVNPay, setIsProcessingVNPay] = useState(false); // State để xử lý VNPAY

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

    // Lấy tổng tiền từ bookingData (đã được tính theo công thức mới ở backend)
    const totalPrice = bookingData?.totalPrice || 0;

    const handleProcessPayment = async () => {
        if (!paymentMethod) {
            alert('Vui lòng chọn một phương thức thanh toán.');
            return;
        }
        if (!bookingData || !bookingData.bookingID) {
            alert('Không tìm thấy mã booking. Vui lòng đặt lịch lại!');
            return;
        }

        if (paymentMethod === 'VNPAY') {
            await handleVNPayPayment();
            return;
        }

        setIsConfirmed(true);
        try {
            // Gửi thông tin payment lên backend
            const response = await api.post('/payments/create', {
                bookingID: bookingData.bookingID,
                paymentMethod,
                amount: totalPrice
            }, {
                headers: {
                    'Authorization': `Bearer ${user.token}` // Nếu cần xác thực
                }
            });
            if (response.status !== 200) {
                let errorMsg = 'Lỗi khi ghi nhận thanh toán.';
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.message || errorMsg;
                } catch (e) {
                    const errorText = await response.text();
                    errorMsg = errorText || errorMsg;
                }
                throw new Error(errorMsg);
            }
            alert('Thanh toán đã được ghi nhận!');
            navigate('/home');
        } catch (error) {
            alert('Xử lý thanh toán thất bại. Vui lòng thử lại. Lỗi: ' + error.message);
            setIsConfirmed(false);
        }
    };

    const handleVNPayPayment = async () => {
        console.log('bookingData:', bookingData);
        if (!bookingData || !bookingData.bookingID) {
            alert('Không tìm thấy mã booking. Vui lòng đặt lịch lại!');
            return;
        }
        setIsProcessingVNPay(true);
        try {
            const payload = {
                bookingID: bookingData.bookingID,
                paymentMethod: 'VNPAY',
                amount: totalPrice
            };
            console.log('Gửi request VNPAY với payload:', payload);
            const response = await api.post('/payments/vnpay/create', payload);
            console.log('Response từ /payments/vnpay/create:', response);
            if (response.data && response.data.paymentUrl) {
                window.location.href = response.data.paymentUrl;
            } else {
                console.error('Không nhận được paymentUrl từ VNPAY:', response.data);
                throw new Error('Không nhận được URL thanh toán từ VNPAY');
            }
        } catch (error) {
            console.error('Lỗi tạo thanh toán VNPAY:', error, error.response?.data);
            alert('Lỗi tạo thanh toán VNPAY: ' + (error.response?.data?.message || error.message));
            setIsProcessingVNPay(false);
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
                                    value="VNPAY"
                                    checked={paymentMethod === 'VNPAY'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    disabled={isConfirmed || isProcessingVNPay}
                                />
                                Thanh toán qua VNPAY (Thẻ ATM, Visa, Mastercard)
                            </label>
                            {paymentMethod === 'VNPAY' && (
                                <div className="vnpay-info">
                                    <p>Thanh toán nhanh chóng và an toàn qua VNPAY với các loại thẻ:</p>
                                    <ul>
                                        <li>Thẻ ATM nội địa</li>
                                        <li>Thẻ Visa/Mastercard</li>
                                        <li>Ví điện tử</li>
                                    </ul>
                                    <p className="note">Bạn sẽ được chuyển hướng đến trang thanh toán VNPAY để hoàn tất giao dịch.</p>
                                </div>
                            )}
                        </div>

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
                                    <p><strong>Ngân hàng:</strong> TP Bank</p>
                                    <p><strong>Số tài khoản:</strong> 0848333703</p>
                                    <p><strong></strong> CÔNG TY TNHH XÉT NGHIỆM ADN DNACHAIN</p>
                                    <p><strong>Chủ tài khoản:</strong> TRƯƠNG MINH KHÁNH</p>
                                    <p><strong>Chi nhánh:</strong> TP Hồ Chí Minh</p>

                                    {/* === KHUNG MỚI CHO QR VÀ HƯỚNG DẪN === */}
                                    <div className="qr-instructions-container">
                                        <div className="qr-code-column">
                                            <p>Quét mã QR để chuyển khoản nhanh:</p>
                                            <img src="/qr-code-img.jpg" alt="QR Code TechcombankTechcombank" className="qr-code-img" />
                                            <p className="qr-note">Số tiền: <span className="highlight-price-small">{totalPrice.toLocaleString('vi-VN')} VNĐ</span></p>
                                        </div>

                                        <div className="payment-instructions-column">
                                            <h4>Hướng dẫn thanh toán:</h4>
                                            <ol>
                                                <li>Chuyển khoản chính xác số tiền: <span className="highlight-price">{totalPrice.toLocaleString('vi-VN')} VNĐ</span></li>
                                                <li>Nội dung chuyển khoản (rất quan trọng):<br />
                                                    <strong className="transfer-content">{user.username} - {user.phoneNumber || 'SĐT của bạn'} - {bookingData.serviceType.substring(0, 10) + '...'}</strong><br />
                                                    (Ví dụ: **NguyenVanA - 0987654321 - XNA Cha con...** - MaBooking)
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
                        <button className="btn-confirm-payment" onClick={handleProcessPayment} disabled={isConfirmed || !paymentMethod || isProcessingVNPay}>
                            {isConfirmed ? 'Đang xử lý...' : isProcessingVNPay ? 'Đang chuyển hướng VNPAY...' : 'Hoàn tất thanh toán'}
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