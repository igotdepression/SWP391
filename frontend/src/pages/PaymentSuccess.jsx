import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import './PaymentSuccess.css';

export default function PaymentSuccess() {
    const { user, loading: authLoading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [paymentStatus, setPaymentStatus] = useState('processing');
    const [paymentDetails, setPaymentDetails] = useState(null);

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
            return;
        }

        // Lấy thông tin từ URL params (VNPAY callback)
        const urlParams = new URLSearchParams(location.search);
        const vnpResponseCode = urlParams.get('vnp_ResponseCode');
        const vnpTxnRef = urlParams.get('vnp_TxnRef');
        const vnpAmount = urlParams.get('vnp_Amount');
        const vnpOrderInfo = urlParams.get('vnp_OrderInfo');

        if (vnpResponseCode === '00') {
            setPaymentStatus('success');
            setPaymentDetails({
                bookingId: vnpTxnRef,
                amount: vnpAmount ? parseInt(vnpAmount) / 100 : 0,
                orderInfo: vnpOrderInfo
            });
        } else {
            setPaymentStatus('failed');
        }
    }, [location, user, authLoading, navigate]);

    const handleGoToBookingHistory = () => {
        navigate('/booking-history');
    };

    const handleGoToHome = () => {
        navigate('/');
    };

    if (authLoading || !user) {
        return (
            <div className="loading-container">
                Đang tải...
            </div>
        );
    }

    return (
        <div className="homepage-root">
            <Header />
            <main className="payment-success-content">
                <div className="payment-success-container">
                    {paymentStatus === 'processing' && (
                        <div className="processing-message">
                            <div className="spinner"></div>
                            <h2>Đang xử lý thanh toán...</h2>
                            <p>Vui lòng chờ trong giây lát.</p>
                        </div>
                    )}

                    {paymentStatus === 'success' && (
                        <div className="success-message">
                            <div className="success-icon">✓</div>
                            <h2>Thanh toán thành công!</h2>
                            <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
                            
                            {paymentDetails && (
                                <div className="payment-details">
                                    <h3>Chi tiết giao dịch:</h3>
                                    <div className="detail-row">
                                        <strong>Mã đặt lịch:</strong> <span>{paymentDetails.bookingId}</span>
                                    </div>
                                    <div className="detail-row">
                                        <strong>Số tiền:</strong> <span>{paymentDetails.amount.toLocaleString('vi-VN')} VNĐ</span>
                                    </div>
                                    <div className="detail-row">
                                        <strong>Nội dung:</strong> <span>{paymentDetails.orderInfo}</span>
                                    </div>
                                </div>
                            )}

                            <div className="success-actions">
                                <button className="btn-primary" onClick={handleGoToBookingHistory}>
                                    Xem lịch sử đặt lịch
                                </button>
                                <button className="btn-secondary" onClick={handleGoToHome}>
                                    Về trang chủ
                                </button>
                            </div>
                        </div>
                    )}

                    {paymentStatus === 'failed' && (
                        <div className="failed-message">
                            <div className="failed-icon">✗</div>
                            <h2>Thanh toán thất bại</h2>
                            <p>Rất tiếc, thanh toán của bạn không thành công. Vui lòng thử lại.</p>
                            
                            <div className="failed-actions">
                                <button className="btn-primary" onClick={() => navigate('/booking-payment')}>
                                    Thử lại thanh toán
                                </button>
                                <button className="btn-secondary" onClick={handleGoToHome}>
                                    Về trang chủ
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
} 