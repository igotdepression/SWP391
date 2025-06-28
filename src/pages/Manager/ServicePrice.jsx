// pages/Manager/ServicePrice.jsx
import React, { useEffect, useState } from 'react';
import { Card, Button } from '../../components/ui/ui'; // Điều chỉnh đường dẫn ui nếu cần
import './ServicePrice.css'; // Giả sử bạn có file CSS để định dạng bảng

const fakeServices = [
    {
        id: 1,
        name: 'Xét nghiệm ADN cha con',
        price: 2500000,
        status: 'active',
        createdAt: '2024-05-01',
        updatedAt: '2024-06-01'
    },
    {
        id: 2,
        name: 'Xét nghiệm ADN mẹ con',
        price: 2300000,
        status: 'inactive',
        createdAt: '2024-05-10',
        updatedAt: '2024-06-05'
    }
];

export default function ServicePrice() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        setTimeout(() => setServices(fakeServices), 300);
    }, []);

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
                            <th>Trạng thái</th>
                            <th>Ngày tạo</th>
                            <th>Ngày cập nhật</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(service => (
                            <tr key={service.id}>
                                <td>{service.id}</td>
                                <td>{service.name}</td>
                                <td>{service.price.toLocaleString()} VNĐ</td>
                                <td>{service.status}</td>
                                <td>{service.createdAt}</td>
                                <td>{service.updatedAt}</td>
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