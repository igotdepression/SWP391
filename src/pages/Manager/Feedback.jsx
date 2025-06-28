// pages/Manager/Feedback.jsx
import React, { useEffect, useState } from 'react';
import { Card, Button } from '../../components/ui/ui'; // Điều chỉnh đường dẫn ui nếu cần
import './Feedback.css'; // Giả sử bạn có file CSS để định dạng bảng

const fakeFeedbacks = [
    { id: 1, customer: 'Nguyễn Văn A', rating: 5, comment: 'Dịch vụ rất tốt!', createdAt: '2024-06-01', status: 'published' },
    { id: 2, customer: 'Trần Thị B', rating: 4, comment: 'Nhanh chóng, chuyên nghiệp.', createdAt: '2024-06-02', status: 'pending' }
];

// Đổi tên component từ ReviewsManagement thành Feedback
export default function Feedback() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        setTimeout(() => setFeedbacks(fakeFeedbacks), 300);
    }, []);

    return (
        <Card className="info-card">
            <h3>Quản lý Phản hồi & Đánh giá</h3> {/* Cập nhật tiêu đề */}
            <p>Xem xét và quản lý các phản hồi và đánh giá từ khách hàng.</p>
            <div className="table-responsive mt-4">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Khách hàng</th>
                            <th>Đánh giá</th>
                            <th>Bình luận</th>
                            <th>Ngày gửi</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map(feedback => (
                            <tr key={feedback.id}>
                                <td>{feedback.id}</td>
                                <td>{feedback.customer}</td>
                                <td>{feedback.rating ? '⭐'.repeat(feedback.rating) + ` (${feedback.rating} sao)` : 'N/A'}</td> {/* Hiển thị sao nếu có */}
                                <td>{feedback.comment}</td>
                                <td>{feedback.createdAt}</td>
                                <td>{feedback.status}</td>
                                <td>
                                    <Button size="sm">Chi tiết</Button>
                                    <Button size="sm" variant="danger" className="ml-2">Xóa</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="note mt-3">Đây là nội dung placeholder cho trang Quản lý Phản hồi & Đánh giá.</p>
        </Card>
    );
}