// pages/Manager/TestResultManagement.jsx
import React from 'react';
import { Card, Button } from '../../components/ui/ui'; // Điều chỉnh đường dẫn ui nếu cần

export default function TestResultManagement() {
    const testResults = [
        { id: 'TR001', patient: 'Nguyễn Văn A', testType: 'ADN Huyết thống', date: '2023-06-18', status: 'Hoàn thành' },
        { id: 'TR002', patient: 'Trần Thị B', testType: 'ADN Pháp lý', date: '2023-06-17', status: 'Đang xử lý' },
        { id: 'TR003', patient: 'Lê Văn C', testType: 'ADN Di truyền', date: '2023-06-16', status: 'Hoàn thành' },
    ];

    return (
        <Card className="info-card">
            <h3>Quản lý Kết quả Xét nghiệm</h3>
            <p>Xem xét và cập nhật kết quả của các xét nghiệm đã thực hiện.</p>
            <div className="table-responsive mt-4">
                <table>
                    <thead>
                        <tr>
                            <th>ID Kết quả</th>
                            <th>Bệnh nhân</th>
                            <th>Loại xét nghiệm</th>
                            <th>Ngày xét nghiệm</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testResults.map(result => (
                            <tr key={result.id}>
                                <td>{result.id}</td>
                                <td>{result.patient}</td>
                                <td>{result.testType}</td>
                                <td>{result.date}</td>
                                <td><span className={`status-badge status-${result.status.toLowerCase().replace(' ', '-')}`}>{result.status}</span></td>
                                <td>
                                    <Button size="sm">Xem</Button>
                                    <Button size="sm" variant="secondary" className="ml-2">Cập nhật</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Button className="mt-3" onClick={() => alert("Mở form thêm kết quả xét nghiệm mới")}>Thêm Kết quả Mới</Button>
            <p className="note mt-3">Đây là nội dung placeholder cho trang Quản lý kết quả xét nghiệm.</p>
        </Card>
    );
}