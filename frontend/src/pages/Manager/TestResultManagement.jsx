// pages/Manager/TestResultManagement.jsx
import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/ui';
import './TestResultManagement.css'; // Giả sử bạn có file CSS để định dạng bảng

const fakeTestResults = [
    {
        id: 'RES001',
        customer: 'Nguyễn Văn A',
        testType: 'ADN cha con',
        result: 'Dương tính',
        status: 'completed',
        createdAt: '2024-06-01',
        updatedAt: '2024-06-02',
    },
    {
        id: 'RES002',
        customer: 'Trần Thị B',
        testType: 'ADN mẹ con',
        result: 'Âm tính',
        status: 'pending',
        createdAt: '2024-06-03',
        updatedAt: '2024-06-04',
    },
];

export default function TestResultManagement() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        setTimeout(() => setResults(fakeTestResults), 300);
    }, []);

    return (
        <Card>
            <h3>Danh sách kết quả xét nghiệm</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Khách hàng</th>
                        <th>Loại xét nghiệm</th>
                        <th>Kết quả</th>
                        <th>Trạng thái</th>
                        <th>Ngày tạo</th>
                        <th>Ngày cập nhật</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map(r => (
                        <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.customer}</td>
                            <td>{r.testType}</td>
                            <td>{r.result}</td>
                            <td>{r.status}</td>
                            <td>{r.createdAt}</td>
                            <td>{r.updatedAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
}