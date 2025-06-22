// pages/Manager/ServicePrice.jsx
import React from 'react';
import { Card, Button } from '../../components/ui/ui'; // Điều chỉnh đường dẫn ui nếu cần

export default function ServicePrice() {
    const services = [
        { id: 'S001', name: 'Xét nghiệm ADN huyết thống', price: '5,000,000 VND', description: 'Kiểm tra mối quan hệ huyết thống.' },
        { id: 'S002', name: 'Xét nghiệm ADN pháp lý', price: '7,500,000 VND', description: 'Dành cho các mục đích pháp lý.' },
        { id: 'S003', name: 'Xét nghiệm ADN di truyền', price: '10,000,000 VND', description: 'Phân tích gen di truyền.' },
    ];

    return (
        <Card className="info-card">
            <h3>Quản lý Giá Dịch vụ</h3>
            <p>Tại đây bạn có thể xem và cập nhật giá của các dịch vụ xét nghiệm.</p>
            <div className="table-responsive mt-4">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên Dịch vụ</th>
                            <th>Giá</th>
                            <th>Mô tả</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(service => (
                            <tr key={service.id}>
                                <td>{service.id}</td>
                                <td>{service.name}</td>
                                <td>{service.price}</td>
                                <td>{service.description}</td>
                                <td>
                                    <Button size="sm">Sửa</Button>
                                    <Button size="sm" variant="danger" className="ml-2">Xóa</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Button className="mt-3" onClick={() => alert("Mở form thêm dịch vụ mới")}>Thêm Dịch vụ Mới</Button>
            <p className="note mt-3">Đây là nội dung placeholder cho trang Quản lý giá dịch vụ.</p>
        </Card>
    );
}