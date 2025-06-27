// pages/Manager/Feedback.jsx
import React from 'react';
import { Card, Button } from '../../components/ui/ui'; // Điều chỉnh đường dẫn ui nếu cần

// Đổi tên component từ ReviewsManagement thành Feedback
export default function Feedback() {
    const feedbacks = [ // Đổi tên biến từ reviews thành feedbacks cho phù hợp
        { id: 'FB001', customer: 'Khách hàng 1', rating: 5, comment: 'Dịch vụ rất tốt, nhanh chóng và chuyên nghiệp.', date: '2023-06-10', type: 'Đánh giá' },
        { id: 'FB002', customer: 'Khách hàng 2', rating: 4, comment: 'Hơi chậm một chút nhưng kết quả đáng tin cậy.', date: '2023-06-08', type: 'Đánh giá' },
        { id: 'FB003', customer: 'Khách hàng 3', rating: 5, comment: 'Nhân viên nhiệt tình, hỗ trợ chu đáo.', date: '2023-06-05', type: 'Đánh giá' },
        { id: 'FB004', customer: 'Khách hàng 4', rating: null, comment: 'Tôi có một câu hỏi về kết quả xét nghiệm.', date: '2023-06-01', type: 'Phản hồi' },
    ];

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
                            <th>Bình luận/Phản hồi</th>
                            <th>Loại</th> {/* Thêm cột loại */}
                            <th>Ngày</th>
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
                                <td>{feedback.type}</td> {/* Hiển thị loại */}
                                <td>{feedback.date}</td>
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