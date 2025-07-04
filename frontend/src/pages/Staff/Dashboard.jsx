// Dashboard.jsx
import React from 'react';
import { Card, Button } from '../../components/ui/ui'; // Điều chỉnh đường dẫn ui nếu cần
import './Dashboard.css'; // Import file CSS

// Import specific icons from react-icons
import {
    FaTasks,          // For 'Tổng số công việc được giao'
    FaHourglassHalf,  // For 'Công việc đang chờ'
    FaCheckDouble,    // For 'Công việc đã hoàn thành'
    FaUserCheck,      // For 'Khách hàng đã phục vụ'
    FaClipboardList,  // For 'Phiếu xét nghiệm chờ xử lý'
    FaFlask           // For 'Mẫu xét nghiệm đang chạy'
} from 'react-icons/fa'; // Assuming you prefer Font Awesome icons

export default function Dashboard() {
    // Dữ liệu mô phỏng cho các thẻ thống kê tổng quan dành cho Staff
    const totalStats = [
        { id: 1, label: 'Tổng số công việc được giao', value: 85, icon: <FaTasks /> },
        { id: 2, label: 'Công việc đang chờ xử lý', value: 12, icon: <FaHourglassHalf /> },
        { id: 3, label: 'Công việc đã hoàn thành', value: 73, icon: <FaCheckDouble /> },
        { id: 4, label: 'Khách hàng đã phục vụ', value: 45, icon: <FaUserCheck /> },
        { id: 5, label: 'Phiếu xét nghiệm chờ xử lý', value: 8, icon: <FaClipboardList /> },
        { id: 6, label: 'Mẫu xét nghiệm đang chạy', value: 5, icon: <FaFlask /> },
    ];

    // Dữ liệu hoạt động gần đây của Staff
    const recentActivities = [
        { name: 'Xử lý phiếu XN #P001', date: '22.06.2025 10:30', status: 'pending' },
        { name: 'Hoàn thành mẫu XN #M005', date: '21.06.2025 15:00', status: 'completed' },
        { name: 'Tiếp nhận KH Nguyễn Thị B', date: '20.06.2025 09:00', status: 'completed' },
        { name: 'Kiểm tra trang thiết bị lab', date: '19.06.2025 11:45', status: 'pending' },
        { name: 'Bàn giao KQ XN BN An', date: '18.06.2025 16:20', status: 'completed' },
        { name: 'Đào tạo sử dụng phần mềm mới', date: '17.06.2025 14:00', status: 'pending' },
    ];

    // Dữ liệu tổng hợp quản lý dành cho Staff
    const managementSummary = [
        { id: 1, category: 'Phiếu xét nghiệm', detail: 'Chờ phân tích: 5', status: 'Đang xử lý' },
        { id: 2, category: 'Kết quả xét nghiệm', detail: 'Chờ kiểm duyệt: 2', status: 'Đang chờ' },
        { id: 3, category: 'Công việc', detail: 'Gấp: 3', status: 'Cần ưu tiên' },
        { id: 4, category: 'Thiết bị', detail: 'Cần bảo trì: 1', status: 'Hoạt động tốt' },
        { id: 5, category: 'Lịch làm việc', detail: 'Ca trống: 2', status: 'Đã cập nhật' },
        { id: 6, category: 'Hồ sơ khách hàng', detail: 'Cần bổ sung: 1', status: 'Hoàn chỉnh' },
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
                {/* Biểu đồ (Placeholder) - Có thể hiển thị xu hướng công việc, hiệu suất cá nhân... */}
                <Card className="chart-card">
                    <h3>Xu hướng công việc gần đây</h3><br/><br/><br/>
                    <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0', color: '#888', borderRadius: '5px' }}>
                        <img src="https://www.zohowebstatic.com/sites/zweb/images/analytics/combination-chart.jpg" alt="Biểu đồ xu hướng" style={{ width: '600px' }} />Biểu đồ hiệu suất công việc
                    </div>
                </Card>

                {/* Danh sách hoạt động gần đây của Staff */}
                <Card className="list-card">
                    <h3>Hoạt động của bạn</h3>
                    {recentActivities.map((item, index) => (
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

                {/* Bảng tổng hợp quản lý dành cho Staff */}
                <Card className="table-card" style={{ gridColumn: '1 / -1' }}>
                    <h3>Tổng hợp công việc</h3>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Danh mục</th>
                                <th>Chi tiết</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {managementSummary.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.category}</td>
                                    <td>{row.detail}</td>
                                    <td><span className="status-label online">{row.status}</span></td>
                                    <td><Button size="sm">Xem chi tiết</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Button variant="outline" className="mt-3" style={{ width: '100%' }}>Xem tất cả</Button>
                </Card>
            </div>
        </div>
    );
}