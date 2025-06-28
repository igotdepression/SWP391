// Dashboard.jsx
import React from 'react';
import { Card, Button } from '../../components/ui/ui'; // Điều chỉnh đường dẫn ui nếu cần
import './Dashboard.css'; // Import file CSS

// Import specific icons from react-icons
import {
    FaNewspaper,    // For 'Tổng số bài đăng'
    FaDollarSign,   // For 'Dịch vụ đang hoạt động' (related to money/pricing)
    FaCheckCircle,  // For 'Giao dịch thành công'
    FaUserTie,      // For 'Nhân viên đang làm việc' (professional user)
    FaStar,         // For 'Đánh giá chờ xử lý'
    FaVial          // For 'KQ XN chờ xác nhận' (test tube for lab results)
} from 'react-icons/fa'; // Assuming you prefer Font Awesome icons

export default function Dashboard() {
    // Dữ liệu mô phỏng cho các thẻ thống kê tổng quan
    const totalStats = [
        { id: 1, label: 'Tổng số bài đăng', value: 135, icon: <FaNewspaper /> },
        { id: 2, label: 'Dịch vụ đang hoạt động', value: 8, icon: <FaDollarSign /> },
        { id: 3, label: 'Giao dịch thành công', value: 95, icon: <FaCheckCircle /> },
        { id: 4, label: 'Nhân viên đang làm việc', value: 15, icon: <FaUserTie /> },
        { id: 5, label: 'Đánh giá chờ xử lý', value: 8, icon: <FaStar /> },
        { id: 6, label: 'KQ XN chờ xác nhận', value: 12, icon: <FaVial /> },
    ];

    const appointments = [
        // Dữ liệu này có thể được chuyển thành "Giao dịch gần đây" hoặc "Bài đăng mới nhất"
        { name: 'Giao dịch #12345', date: '22.06.2025 10:30', status: 'pending' },
        { name: 'Bài đăng "Dịch vụ A"', date: '21.06.2025 15:00', status: 'rejected' },
        { name: 'Giao dịch #12346', date: '20.06.2025 09:00', status: 'accepted' },
        { name: 'Đánh giá mới từ KH', date: '19.06.2025 11:45', status: 'pending' },
        { name: 'KQ XN BN An', date: '18.06.2025 16:20', status: 'accepted' },
        { name: 'Dịch vụ B đã ẩn', date: '17.06.2025 14:00', status: 'rejected' },
    ];

    const recentDoctors = [
        // Dữ liệu này có thể được chuyển thành "Bài đăng gần đây", "Giao dịch lỗi", "Nhân viên mới"
        { id: 1, type: 'Bài đăng', title: 'Thông báo lịch nghỉ lễ', status: 'Đang hiển thị' },
        { id: 2, type: 'Giao dịch', code: '#GD789', status: 'Thất bại' },
        { id: 3, type: 'Nhân viên', name: 'Nguyễn Văn A', role: 'Biên tập viên' },
        { id: 4, type: 'Đánh giá', content: 'Dịch vụ rất tốt!', stars: '5 sao' },
    ];


    return (
        <div className="dashboard-container">
            {/* Phần tổng quan phía trên */}
            <div className="dashboard-header">
                {totalStats.map(stat => (
                    <Card key={stat.id} className="stat-card">
                        <div className="icon-wrapper">
                            {stat.icon}
                        </div>
                        <div className="stat-details">
                            <h4>{stat.label}</h4>
                            <p>{stat.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Phần nội dung chính: Biểu đồ, Danh sách, Bảng */}
            <div className="dashboard-main-content">
                {/* Biểu đồ (Placeholder) - Có thể hiển thị xu hướng bài đăng, doanh thu, đánh giá... */}
                <Card className="chart-card">
                    <h3>Xu hướng hoạt động gần đây</h3><br/><br/><br/>
                    <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0', color: '#888', borderRadius: '5px' }}>

                        <img src="https://www.zohowebstatic.com/sites/zweb/images/analytics/combination-chart.jpg" alt="Biểu đồ xu hướng" style={{ width: '600px' }} />Biểu đồ doanh thu
                    </div>
                </Card>

                {/* Danh sách (ví dụ: Giao dịch gần đây, Đánh giá mới, Bài đăng chờ duyệt) */}
                <Card className="list-card">
                    <h3>Hoạt động gần đây</h3>
                    {appointments.map((item, index) => (
                        <div key={index} className="list-item">
                            <div>
                                <div className="name">{item.name}</div>
                                <div className="date">{item.date}</div>
                            </div>
                            <span className={`status-badge ${item.status}`}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span>
                        </div>
                    ))}
                    <Button variant="outline" className="mt-3" style={{ width: '100%' }}>Xem tất cả hoạt động</Button>
                </Card>

                {/* Bảng dữ liệu (ví dụ: Tổng hợp trạng thái bài đăng, danh sách nhân viên, KQ XN) */}
                <Card className="table-card" style={{ gridColumn: '1 / -1' }}>
                    <h3>Tổng hợp quản lý</h3>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Mục</th>
                                <th>Chi tiết</th>
                                <th>Trạng thái/Vai trò</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Quản lý bài đăng</td>
                                <td>Bài chờ duyệt: 5</td>
                                <td>Đang hoạt động</td>
                                <td><Button size="sm">Xem</Button></td>
                            </tr>
                            <tr>
                                <td>Quản lý giá DV</td>
                                <td>DV đã ẩn: 2</td>
                                <td>Đang hiển thị</td>
                                <td><Button size="sm">Sửa</Button></td>
                            </tr>
                            <tr>
                                <td>Quản lý thanh toán</td>
                                <td>GD thất bại: 3</td>
                                <td>Đang xử lý</td>
                                <td><Button size="sm">Chi tiết</Button></td>
                            </tr>
                            <tr>
                                <td>Phân quyền NV</td>
                                <td>Admin: 3</td>
                                <td>Đang làm việc</td>
                                <td><Button size="sm">Sửa quyền</Button></td>
                            </tr>
                            <tr>
                                <td>Đánh giá sao</td>
                                <td>Đánh giá 1 sao: 5</td>
                                <td>Chưa phản hồi</td>
                                <td><Button size="sm">Xem</Button></td>
                            </tr>
                            <tr>
                                <td>KQ Xét nghiệm</td>
                                <td>KQ đã upload: 5</td>
                                <td>Chờ xác nhận</td>
                                <td><Button size="sm">Xác nhận</Button></td>
                            </tr>
                        </tbody>
                    </table>
                    <Button variant="outline" className="mt-3" style={{ width: '100%' }}>Xem tất cả</Button>
                </Card>
            </div>
        </div>
    );
}