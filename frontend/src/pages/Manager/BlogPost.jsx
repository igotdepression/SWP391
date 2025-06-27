// pages/Manager/BlogPost.jsx
import React from 'react';
import { Card, Button } from '../../components/ui/ui'; // Điều chỉnh đường dẫn ui nếu cần

export default function BlogPost({ orders, setDetailOrder }) {
    // orders và setDetailOrder được truyền từ ManagerPage, nhưng tên prop ban đầu là 'orders'
    // nếu bạn muốn nó là bài đăng, bạn có thể đổi tên prop hoặc xử lý dữ liệu ở đây.
    // Giả định 'orders' trong context này là 'bài đăng'

    const posts = orders || [ // Sử dụng orders như dữ liệu bài đăng giả định
        { id: "POST001", title: "Bài đăng 1: Tầm quan trọng của xét nghiệm ADN", author: "Quản trị viên", date: "2023-05-20", status: "Published" },
        { id: "POST002", title: "Bài đăng 2: Các gói dịch vụ mới", author: "Marketing Team", date: "2023-06-01", status: "Draft" },
        { id: "POST003", title: "Bài đăng 3: Câu chuyện thành công", author: "Quản trị viên", date: "2023-04-10", status: "Published" },
    ];

    return (
        <Card className="data-table-card">
            <h3>Quản lý Bài đăng</h3>
            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>ID Bài đăng</th>
                            <th>Tiêu đề</th>
                            <th>Tác giả</th>
                            <th>Ngày đăng</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.author}</td>
                                <td>{post.date}</td>
                                <td><span className={`status-badge status-${post.status.toLowerCase()}`}>{post.status}</span></td>
                                <td>
                                    <Button size="sm" onClick={() => alert(`Xem chi tiết bài đăng: ${post.title}`)}>Xem</Button>
                                    <Button size="sm" variant="secondary" className="ml-2">Sửa</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="note mt-3">Đây là nội dung placeholder cho trang Quản lý bài đăng.</p>
        </Card>
    );
}