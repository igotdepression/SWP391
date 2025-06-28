// pages/Manager/BlogPost.jsx
import React, { useEffect, useState } from 'react';
import { Card, Button } from '../../components/ui/ui';
import "./BlogPost.css";


const fakeBlogPosts = [
    {
        id: 1,
        title: "Giới thiệu dịch vụ mới",
        content: "Chúng tôi vừa ra mắt dịch vụ xét nghiệm mới...",
        author: "Nguyễn Văn A",
        status: "published",
        createdAt: "2024-06-01",
        updatedAt: "2024-06-10"
    },
    {
        id: 2,
        title: "Ưu đãi tháng 7",
        content: "Ưu đãi giảm giá 20% cho khách hàng mới...",
        author: "Trần Thị B",
        status: "draft",
        createdAt: "2024-06-15",
        updatedAt: "2024-06-15"
    }
];

export default function BlogPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Giả lập fetch từ DB
        setTimeout(() => setPosts(fakeBlogPosts), 300);
    }, []);

    return (
        <Card className="data-table-card">
            <h3>Quản lý Bài đăng</h3>
            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>ID Bài đăng</th>
                            <th>Tiêu đề</th>
                            <th>Nội dung</th>
                            <th>Tác giả</th>
                            <th>Trạng thái</th>
                            <th>Ngày tạo</th>
                            <th>Ngày cập nhật</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.content}</td>
                                <td>{post.author}</td>
                                <td><span className={`status-badge status-${post.status.toLowerCase()}`}>{post.status}</span></td>
                                <td>{post.createdAt}</td>
                                <td>{post.updatedAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="note mt-3">Đây là nội dung placeholder cho trang Quản lý bài đăng.</p>
        </Card>
    );
}