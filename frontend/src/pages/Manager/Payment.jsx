// pages/Manager/Payment.jsx
import React, { useEffect, useState } from 'react';
import { Card, Button, Input } from '../../components/ui/ui';
import { Eye, CreditCard, DollarSign, TrendingUp, CheckCircle, Clock, XCircle } from 'lucide-react';
import './Payment.css';

const fakePayments = [
    {
        paymentID: 1,
        bookingID: 'BK001',
        paymentDate: '2024-06-15',
        amount: 5000000,
        paymentMethod: 'VNPay',
        status: 'Hoàn thành',
        customerName: 'Nguyễn Văn A',
        email: 'a@example.com'
    },
    {
        paymentID: 2,
        bookingID: 'BK002',
        paymentDate: '2024-06-14',
        amount: 7500000,
        paymentMethod: 'Momo',
        status: 'Chờ xác nhận',
        customerName: 'Trần Thị B',
        email: 'b@example.com'
    },
    {
        paymentID: 3,
        bookingID: 'BK003',
        paymentDate: '2024-06-13',
        amount: 3200000,
        paymentMethod: 'Banking',
        status: 'Thất bại',
        customerName: 'Lê Văn C',
        email: 'c@example.com'
    },
    {
        paymentID: 4,
        bookingID: 'BK004',
        paymentDate: '2024-06-12',
        amount: 8900000,
        paymentMethod: 'VNPay',
        status: 'Hoàn tiền',
        customerName: 'Phạm Thị D',
        email: 'd@example.com'
    },
    {
        paymentID: 5,
        bookingID: 'BK005',
        paymentDate: '2024-06-11',
        amount: 4200000,
        paymentMethod: 'Momo',
        status: 'Hoàn thành',
        customerName: 'Hoàng Văn E',
        email: 'e@example.com'
    },
    {
        paymentID: 6,
        bookingID: 'BK006',
        paymentDate: '2024-06-10',
        amount: 6800000,
        paymentMethod: 'VNPay',
        status: 'Hoàn thành',
        customerName: 'Vũ Thị F',
        email: 'f@example.com'
    },
    {
        paymentID: 7,
        bookingID: 'BK007',
        paymentDate: '2024-06-09',
        amount: 2500000,
        paymentMethod: 'Banking',
        status: 'Chờ xác nhận',
        customerName: 'Ngô Minh G',
        email: 'g@example.com'
    },
    {
        paymentID: 8,
        bookingID: 'BK008',
        paymentDate: '2024-06-08',
        amount: 9200000,
        paymentMethod: 'VNPay',
        status: 'Hoàn thành',
        customerName: 'Đặng Thị H',
        email: 'h@example.com'
    },
    {
        paymentID: 9,
        bookingID: 'BK009',
        paymentDate: '2024-06-07',
        amount: 1800000,
        paymentMethod: 'Momo',
        status: 'Thất bại',
        customerName: 'Bùi Văn I',
        email: 'i@example.com'
    },
    {
        paymentID: 10,
        bookingID: 'BK010',
        paymentDate: '2024-06-06',
        amount: 5500000,
        paymentMethod: 'Banking',
        status: 'Hoàn thành',
        customerName: 'Lý Thị K',
        email: 'k@example.com'
    }
];

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

export default function Payment() {
    const [payments, setPayments] = useState([]);
    const [searchBookingID, setSearchBookingID] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterMethod, setFilterMethod] = useState('all');
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setPayments(fakePayments);
        }, 500);
    }, []);

    // Filtered payments
    const filteredPayments = payments.filter(payment => {
        const matchBookingID = !searchBookingID ||
            payment.bookingID.toLowerCase().includes(searchBookingID.toLowerCase()) ||
            payment.customerName.toLowerCase().includes(searchBookingID.toLowerCase());

        const matchStatus = filterStatus === 'all' || payment.status === filterStatus;
        const matchMethod = filterMethod === 'all' || payment.paymentMethod === filterMethod;

        return matchBookingID && matchStatus && matchMethod;
    });

    // Statistics
    const totalRevenue = payments
        .filter(p => p.status === 'Hoàn thành')
        .reduce((sum, p) => sum + p.amount, 0);

    const completedPayments = payments.filter(p => p.status === 'Hoàn thành');
    const avgOrderValue = completedPayments.length > 0 ? totalRevenue / completedPayments.length : 0;

    // Tỷ lệ thành công
    const successRate = payments.length > 0 ?
        ((payments.filter(p => p.status === 'Hoàn thành').length / payments.length) * 100).toFixed(1) : 0;

    // Chart data for revenue by day - Fixed sorting
    const revenueByDay = payments
        .filter(p => p.status === 'Hoàn thành')
        .reduce((acc, payment) => {
            const date = payment.paymentDate; // Keep original date format
            acc[date] = (acc[date] || 0) + payment.amount;
            return acc;
        }, {});

    const chartData = Object.entries(revenueByDay)
        .sort(([a], [b]) => new Date(a) - new Date(b)) // Sort by actual date
        .slice(-7) // Last 7 days
        .map(([date, revenue]) => [
            new Date(date).toLocaleDateString('vi-VN'), // Format for display
            revenue
        ]);

    const maxRevenue = Math.max(...Object.values(revenueByDay), 1);

    const handleViewDetail = (payment) => {
        setSelectedPayment(payment);
        setShowDetailModal(true);
    };

    const handleStatusChange = (paymentID, newStatus, actionType) => {
        setPendingAction({ paymentID, newStatus, actionType });
        setShowConfirmModal(true);
    };

    const confirmStatusChange = () => {
        if (pendingAction) {
            setPayments(payments =>
                payments.map(p =>
                    p.paymentID === pendingAction.paymentID ? { ...p, status: pendingAction.newStatus } : p
                )
            );
        }
        setShowConfirmModal(false);
        setShowDetailModal(false);
        setSelectedPayment(null);
        setPendingAction(null);
    };

    const getActionText = (actionType) => {
        switch (actionType) {
            case 'approve':
                return 'xác nhận thanh toán';
            case 'reject':
                return 'từ chối thanh toán';
            case 'refund':
                return 'hoàn tiền';
            default:
                return 'thay đổi trạng thái';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Hoàn thành':
                return 'status-completed';
            case 'Chờ xác nhận':
                return 'status-pending';
            case 'Thất bại':
                return 'status-failed';
            case 'Hoàn tiền':
                return 'status-refunded';
            default:
                return 'status-pending';
        }
    };

    const getMethodColor = (method) => {
        switch (method) {
            case 'VNPay':
                return 'method-vnpay';
            case 'Momo':
                return 'method-momo';
            case 'Banking':
                return 'method-banking';
            default:
                return 'method-default';
        }
    };

    const canRefund = (payment) => {
        return payment.status === 'Hoàn thành';
    };

    return (
        <div className="payment-management-container">
            <Card className="payment-card">
                {/* Revenue Chart */}
                <div className="revenue-chart-container">
                    <h4>📊 Biểu đồ Doanh thu (7 ngày gần nhất)</h4>
                    <div className="revenue-chart">
                        <div className="chart-y-axis">
                            <span>{formatCurrency(maxRevenue)}</span>
                            <span>{formatCurrency(maxRevenue * 0.75)}</span>
                            <span>{formatCurrency(maxRevenue * 0.5)}</span>
                            <span>{formatCurrency(maxRevenue * 0.25)}</span>
                            <span>0</span>
                        </div>
                        <div className="chart-bars">
                            {chartData.map(([date, revenue]) => (
                                <div key={date} className="chart-bar-container">
                                    <div
                                        className="chart-bar"
                                        style={{
                                            height: `${(revenue / maxRevenue) * 100}%`,
                                            minHeight: revenue > 0 ? '0' : '8px'
                                        }}
                                        title={`${date}: ${formatCurrency(revenue)}`}
                                    ></div>
                                    <span className="chart-date">{date}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="chart-total">
                        <strong>💰 Tổng doanh thu: {formatCurrency(totalRevenue)}</strong>
                    </div>
                </div>

                {/* Statistics - horizontal layout */}
                <div className="payment-stats">
                    <div className="stat-item">
                        <div className="stat-content">
                            <TrendingUp className="stat-icon" size={28} />
                            <div className="stat-text">
                                <span className="stat-label">Tổng giao dịch</span>
                                <span className="stat-number">{payments.length}</span>
                            </div>
                        </div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-content">
                            <CheckCircle className="stat-icon" size={28} />
                            <div className="stat-text">
                                <span className="stat-label">Thành công</span>
                                <span className="stat-number">{payments.filter(p => p.status === 'Hoàn thành').length}</span>
                            </div>
                        </div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-content">
                            <Clock className="stat-icon" size={28} />
                            <div className="stat-text">
                                <span className="stat-label">Tỷ lệ thành công</span>
                                <span className="stat-number">{successRate}%</span>
                            </div>
                        </div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-content">
                            <DollarSign className="stat-icon" size={28} />
                            <div className="stat-text">
                                <span className="stat-label">Tổng doanh thu</span>
                                <span className="stat-number">{formatCurrency(totalRevenue)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="payment-filters">
                    <div className="filter-group">
                        <label>Tìm theo Booking ID:</label>
                        <Input
                            type="text"
                            placeholder="Nhập Booking ID hoặc tên khách hàng..."
                            value={searchBookingID}
                            onChange={(e) => setSearchBookingID(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <div className="filter-group">
                        <label>Trạng thái:</label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">Tất cả</option>
                            <option value="Hoàn thành">Hoàn thành</option>
                            <option value="Chờ xác nhận">Chờ xác nhận</option>
                            <option value="Thất bại">Thất bại</option>
                            <option value="Hoàn tiền">Hoàn tiền</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Phương thức:</label>
                        <select
                            value={filterMethod}
                            onChange={(e) => setFilterMethod(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">Tất cả</option>
                            <option value="VNPay">VNPay</option>
                            <option value="Momo">Momo</option>
                            <option value="Banking">Banking</option>
                        </select>
                    </div>
                </div>





                {/* Table */}
                <div className="table-responsive">
                    <table className="payment-table">
                        <thead>
                            <tr>
                                <th style={{ width: '9%' }}>Payment ID</th>
                                <th style={{ width: '11%' }}>Booking ID</th>
                                <th style={{ width: '15%' }}>Khách hàng</th>
                                <th style={{ width: '12%' }}>Số tiền</th>
                                <th style={{ width: '12%' }}>Ngày thanh toán</th>
                                <th style={{ width: '10%' }}>Phương thức</th>
                                <th style={{ width: '20%' }}>Trạng thái</th>
                                <th style={{ width: '10%' }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPayments.map(payment => (
                                <tr key={payment.paymentID}>
                                    <td className="payment-id">#{payment.paymentID}</td>
                                    <td className="booking-id">{payment.bookingID}</td>
                                    <td>{payment.customerName}</td>
                                    <td className="amount-cell">{formatCurrency(payment.amount)}</td>
                                    <td>{new Date(payment.paymentDate).toLocaleDateString('vi-VN')}</td>
                                    <td>
                                        <span className="method-badge-plain">
                                            {payment.paymentMethod}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="status-with-actions">
                                            <span className={`status-badge ${getStatusColor(payment.status)}`}>
                                                {payment.status}
                                            </span>
                                            {payment.status === 'Chờ xác nhận' && (
                                                <div className="status-actions">
                                                    <button
                                                        className="status-action-btn approve-btn"
                                                        onClick={() => handleStatusChange(payment.paymentID, 'Hoàn thành', 'approve')}
                                                        title="Xác nhận thanh toán"
                                                    >
                                                        <CheckCircle size={14} />
                                                    </button>
                                                    <button
                                                        className="status-action-btn reject-btn"
                                                        onClick={() => handleStatusChange(payment.paymentID, 'Thất bại', 'reject')}
                                                        title="Từ chối thanh toán"
                                                    >
                                                        <XCircle size={14} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="action-cell">
                                        <button
                                            className="action-btn view-btn"
                                            onClick={() => handleViewDetail(payment)}
                                            title="Xem chi tiết"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            className={`action-btn ${canRefund(payment) ? 'refund-btn' : 'refund-btn-disabled'}`}
                                            onClick={() => canRefund(payment) && handleStatusChange(payment.paymentID, 'Hoàn tiền', 'refund')}
                                            title={canRefund(payment) ? 'Hoàn tiền' : 'Không thể hoàn tiền'}
                                            disabled={!canRefund(payment)}
                                        >
                                            <DollarSign size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredPayments.length === 0 && (
                    <div className="no-data">
                        <p>📭 Không có giao dịch nào phù hợp với bộ lọc hiện tại.</p>
                    </div>
                )}
            </Card>

            {/* Detail Modal */}
            {showDetailModal && selectedPayment && (
                <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
                    <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>💳 Chi tiết Thanh toán</h3>
                        <div className="payment-detail">
                            <div className="detail-row">
                                <label>Payment ID:</label>
                                <span>#{selectedPayment.paymentID}</span>
                            </div>
                            <div className="detail-row">
                                <label>Booking ID:</label>
                                <span>{selectedPayment.bookingID}</span>
                            </div>
                            <div className="detail-row">
                                <label>Khách hàng:</label>
                                <span>{selectedPayment.customerName}</span>
                            </div>
                            <div className="detail-row">
                                <label>Email:</label>
                                <span>{selectedPayment.email}</span>
                            </div>
                            <div className="detail-row">
                                <label>Số tiền:</label>
                                <span className="amount-value">{formatCurrency(selectedPayment.amount)}</span>
                            </div>
                            <div className="detail-row">
                                <label>Ngày thanh toán:</label>
                                <span>{new Date(selectedPayment.paymentDate).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <div className="detail-row">
                                <label>Phương thức:</label>
                                <span className={`method-badge ${getMethodColor(selectedPayment.paymentMethod)}`}>
                                    {selectedPayment.paymentMethod}
                                </span>
                            </div>
                            <div className="detail-row">
                                <label>Trạng thái:</label>
                                <span className={`status-badge ${getStatusColor(selectedPayment.status)}`}>
                                    {selectedPayment.status}
                                </span>
                            </div>
                        </div>
                        <div className="modal-actions">
                            {selectedPayment.status === 'Chờ xác nhận' && (
                                <>
                                    <Button onClick={() => handleStatusChange(selectedPayment.paymentID, 'Hoàn thành', 'approve')}>
                                        ✅ Xác nhận
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => handleStatusChange(selectedPayment.paymentID, 'Thất bại', 'reject')}
                                    >
                                        ❌ Từ chối
                                    </Button>
                                </>
                            )}
                            {canRefund(selectedPayment) && (
                                <Button
                                    variant="outline"
                                    onClick={() => handleStatusChange(selectedPayment.paymentID, 'Hoàn tiền', 'refund')}
                                >
                                    💰 Hoàn tiền
                                </Button>
                            )}
                            <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                                🔙 Đóng
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {showConfirmModal && pendingAction && (
                <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
                    <div className="payment-modal confirm-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>⚠️ Xác nhận thao tác</h3>
                        <div className="confirm-content">
                            <p>Bạn có chắc chắn muốn <strong>{getActionText(pendingAction.actionType)}</strong> cho giao dịch <strong>#{pendingAction.paymentID}</strong>?</p>
                            <p className="confirm-warning">⚠️ Thao tác này không thể hoàn tác!</p>
                        </div>
                        <div className="modal-actions">
                            <Button onClick={confirmStatusChange}>
                                ✅ Xác nhận
                            </Button>
                            <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
                                ❌ Hủy
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}