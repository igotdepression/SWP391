// Staff/Booking.jsx
import React, { useState } from 'react';
import { Card, Button, Input, Select } from '../../components/ui/ui'; // Điều chỉnh đường dẫn ui nếu cần
import './Booking.css'; // Import CSS cho Booking

export default function Booking() {
    const [bookings, setBookings] = useState([
        { id: 'BK001', customerName: 'Nguyễn Văn An', service: 'Lấy mẫu tại nhà', date: '25/06/2025', time: '09:00', status: 'pending' },
        { id: 'BK002', customerName: 'Trần Thị Bình', service: 'Tư vấn kết quả', date: '25/06/2025', time: '14:30', status: 'confirmed' },
        { id: 'BK003', customerName: 'Lê Văn Cường', service: 'Lấy mẫu tại phòng khám', date: '26/06/2025', time: '10:15', status: 'pending' },
        { id: 'BK004', customerName: 'Phạm Thị Duyên', service: 'Tư vấn qua điện thoại', date: '26/06/2025', time: '16:00', status: 'cancelled' },
        { id: 'BK005', customerName: 'Hoàng Văn Em', service: 'Lấy mẫu tại nhà', date: '27/06/2025', time: '09:30', status: 'confirmed' },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              booking.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleUpdateStatus = (id, newStatus) => {
        setBookings(prevBookings =>
            prevBookings.map(booking =>
                booking.id === id ? { ...booking, status: newStatus } : booking
            )
        );
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'pending': return 'Đang chờ';
            case 'confirmed': return 'Đã xác nhận';
            case 'cancelled': return 'Đã hủy';
            default: return status;
        }
    };

    return (
        <div className="booking-container">
            <Card className="booking-controls">
                <Input
                    type="text"
                    placeholder="Tìm kiếm theo tên khách hàng hoặc mã booking..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="filter-select"
                >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="pending">Đang chờ</option>
                    <option value="confirmed">Đã xác nhận</option>
                    <option value="cancelled">Đã hủy</option>
                </Select>
            </Card>

            <Card className="booking-list-card">
                <h3>Danh sách Booking</h3>
                {filteredBookings.length > 0 ? (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Mã Booking</th>
                                <th>Tên Khách hàng</th>
                                <th>Dịch vụ</th>
                                <th>Thời gian</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map(booking => (
                                <tr key={booking.id}>
                                    <td>{booking.id}</td>
                                    <td>{booking.customerName}</td>
                                    <td>{booking.service}</td>
                                    <td>{booking.date} {booking.time}</td>
                                    <td>
                                        <span className={`status-badge status-${booking.status}`}>
                                            {getStatusLabel(booking.status)}
                                        </span>
                                    </td>
                                    <td className="booking-actions">
                                        {booking.status === 'pending' && (
                                            <Button size="sm" onClick={() => handleUpdateStatus(booking.id, 'confirmed')}>Xác nhận</Button>
                                        )}
                                        {booking.status === 'confirmed' && (
                                            <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(booking.id, 'completed')}>Hoàn thành</Button> // Added 'completed' status
                                        )}
                                        {booking.status !== 'cancelled' && (
                                            <Button size="sm" variant="danger" onClick={() => handleUpdateStatus(booking.id, 'cancelled')}>Hủy</Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Không tìm thấy booking nào.</p>
                )}
            </Card>
        </div>
    );
}