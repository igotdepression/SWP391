// pages/Manager/Payment.jsx
import React from 'react';
import { Card, Button } from '../../components/ui/ui'; // Điều chỉnh đường dẫn ui nếu cần

export default function Payment() {
    const payments = [
        { id: 'PAY001', customer: 'Nguyễn Văn A', amount: '5,000,000 VND', date: '2023-06-15', status: 'Completed' },
        { id: 'PAY002', customer: 'Trần Thị B', amount: '7,500,000 VND', date: '2023-06-14', status: 'Pending' },
        { id: 'PAY003', customer: 'Lê Văn C', amount: '3,000,000 VND', date: '2023-06-12', status: 'Completed' },
    ];

    return (
        <Card className="info-card">
            <h3>Quản lý Thanh toán</h3>
            <p>Theo dõi và quản lý các giao dịch thanh toán của khách hàng.</p>
            <div className="table-responsive mt-4">
                <table>
                    <thead>
                        <tr>
                            <th>ID Thanh toán</th>
                            <th>Khách hàng</th>
                            <th>Số tiền</th>
                            <th>Ngày thanh toán</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment.id}>
                                <td>{payment.id}</td>
                                <td>{payment.customer}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.date}</td>
                                <td><span className={`status-badge status-${payment.status.toLowerCase()}`}>{payment.status}</span></td>
                                <td>
                                    <Button size="sm">Chi tiết</Button>
                                    <Button size="sm" variant="secondary" className="ml-2">Cập nhật</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="note mt-3">Đây là nội dung placeholder cho trang Quản lý thanh toán.</p>
        </Card>
    );
}