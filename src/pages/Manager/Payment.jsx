// pages/Manager/Payment.jsx
import React, { useEffect, useState } from 'react';
import { Card, Button, Input, Select } from '../../components/ui/ui';
import './Payment.css'; // Giả sử bạn có file CSS để định dạng bảng

const fakePayments = [
    {
        id: 'PAY001',
        customer: 'Nguyễn Văn A',
        amount: 5000000,
        date: '2023-06-15',
        status: 'Completed',
        method: 'VNPay',
        email: 'a@example.com',
        orderId: 'ORD001',
    },
    {
        id: 'PAY002',
        customer: 'Trần Thị B',
        amount: 7500000,
        date: '2023-06-14',
        status: 'Pending',
        method: 'Momo',
        email: 'b@example.com',
        orderId: 'ORD002',
    },
];

const statusOptions = [
    { value: '', label: 'Tất cả trạng thái' },
    { value: 'Completed', label: 'Hoàn thành' },
    { value: 'Pending', label: 'Đang xử lý' },
    { value: 'Refunded', label: 'Đã hoàn tiền' },
    { value: 'Cancelled', label: 'Đã hủy' },
];

function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export default function Payment() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        setTimeout(() => setPayments(fakePayments), 300);
    }, []);

    // Dashboard summary
    const totalRevenue = payments
        .filter(p => p.status === 'Completed')
        .reduce((sum, p) => sum + p.amount, 0);
    const totalTransactions = payments.length;
    const completed = payments.filter(p => p.status === 'Completed').length;
    const pending = payments.filter(p => p.status === 'Pending').length;
    const refunded = payments.filter(p => p.status === 'Refunded').length;
    const cancelled = payments.filter(p => p.status === 'Cancelled').length;

    // Filtered payments
    const filteredPayments = payments.filter(p => {
        const matchSearch =
            p.customer.toLowerCase().includes(search.toLowerCase()) ||
            p.id.toLowerCase().includes(search.toLowerCase()) ||
            p.email.toLowerCase().includes(search.toLowerCase());
        const matchStatus = !statusFilter || p.status === statusFilter;
        return matchSearch && matchStatus;
    });

    // Handle refund/cancel
    const handleRefund = (id) => {
        setPayments(payments =>
            payments.map(p =>
                p.id === id ? { ...p, status: 'Refunded' } : p
            )
        );
        setSelectedPayment(null);
    };

    const handleCancel = (id) => {
        setPayments(payments =>
            payments.map(p =>
                p.id === id ? { ...p, status: 'Cancelled' } : p
            )
        );
        setSelectedPayment(null);
    };

    return (
        <div className="payment-manager-page">
            <Card className="dashboard-summary mb-4">
                <h3>Bảng điều khiển tổng quan</h3>
                <div className="dashboard-grid">
                    <div className="dashboard-item">
                        <div className="dashboard-label">Tổng doanh thu</div>
                        <div className="dashboard-value">{formatCurrency(totalRevenue)}</div>
                    </div>
                    <div className="dashboard-item">
                        <div className="dashboard-label">Tổng giao dịch</div>
                        <div className="dashboard-value">{totalTransactions}</div>
                    </div>
                    <div className="dashboard-item">
                        <div className="dashboard-label">Hoàn thành</div>
                        <div className="dashboard-value">{completed}</div>
                    </div>
                    <div className="dashboard-item">
                        <div className="dashboard-label">Đang xử lý</div>
                        <div className="dashboard-value">{pending}</div>
                    </div>
                    <div className="dashboard-item">
                        <div className="dashboard-label">Đã hoàn tiền</div>
                        <div className="dashboard-value">{refunded}</div>
                    </div>
                    <div className="dashboard-item">
                        <div className="dashboard-label">Đã hủy</div>
                        <div className="dashboard-value">{cancelled}</div>
                    </div>
                </div>
            </Card>

            <Card className="payment-list-card">
                <div className="payment-list-header">
                    <h3>Danh sách giao dịch</h3>
                    <div className="payment-filters">
                        <Input
                            placeholder="Tìm kiếm theo tên, email hoặc mã giao dịch..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="search-input"
                        />
                        <Select
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                            className="filter-select"
                        >
                            {statusOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className="table-responsive mt-3">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Khách hàng</th>
                                <th>Email</th>
                                <th>Số tiền</th>
                                <th>Ngày</th>
                                <th>Phương thức</th>
                                <th>Trạng thái</th>
                                <th>Mã đơn hàng</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPayments.length === 0 && (
                                <tr>
                                    <td colSpan={9} style={{ textAlign: 'center' }}>Không có giao dịch phù hợp.</td>
                                </tr>
                            )}
                            {filteredPayments.map(payment => (
                                <tr key={payment.id}>
                                    <td>{payment.id}</td>
                                    <td>{payment.customer}</td>
                                    <td>{payment.email}</td>
                                    <td>{formatCurrency(payment.amount)}</td>
                                    <td>{payment.date}</td>
                                    <td>{payment.method}</td>
                                    <td>
                                        <span className={`status-badge status-${payment.status.toLowerCase()}`}>
                                            {payment.status === 'Completed' && 'Hoàn thành'}
                                            {payment.status === 'Pending' && 'Đang xử lý'}
                                            {payment.status === 'Refunded' && 'Đã hoàn tiền'}
                                            {payment.status === 'Cancelled' && 'Đã hủy'}
                                        </span>
                                    </td>
                                    <td>
                                        <Button size="sm" onClick={() => setSelectedPayment(payment)}>Chi tiết</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {selectedPayment && (
                <Card className="payment-detail-card mt-4">
                    <h3>Chi tiết giao dịch</h3>
                    <p><strong>Mã giao dịch:</strong> {selectedPayment.id}</p>
                    <p><strong>Khách hàng:</strong> {selectedPayment.customer}</p>
                    <p><strong>Email:</strong> {selectedPayment.email}</p>
                    <p><strong>Số tiền:</strong> {formatCurrency(selectedPayment.amount)}</p>
                    <p><strong>Ngày thanh toán:</strong> {selectedPayment.date}</p>
                    <p><strong>Phương thức:</strong> {selectedPayment.method}</p>
                    <p><strong>Trạng thái:</strong> <span className={`status-badge status-${selectedPayment.status.toLowerCase()}`}>
                        {selectedPayment.status === 'Completed' && 'Hoàn thành'}
                        {selectedPayment.status === 'Pending' && 'Đang xử lý'}
                        {selectedPayment.status === 'Refunded' && 'Đã hoàn tiền'}
                        {selectedPayment.status === 'Cancelled' && 'Đã hủy'}
                    </span></p>
                    <div className="payment-detail-actions mt-3">
                        {selectedPayment.status === 'Completed' && (
                            <Button variant="secondary" onClick={() => handleRefund(selectedPayment.id)}>
                                Hoàn tiền
                            </Button>
                        )}
                        {selectedPayment.status === 'Pending' && (
                            <Button variant="secondary" onClick={() => handleCancel(selectedPayment.id)}>
                                Hủy giao dịch
                            </Button>
                        )}
                        <Button className="ml-2" variant="outline" onClick={() => setSelectedPayment(null)}>
                            Đóng
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
}