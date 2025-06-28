import React, { useState } from "react";
import Card from "../../components/Card";
import "./Booking.css"; // Import CSS styles for Booking component

export default function Booking() {
    const [bookings, setBookings] = useState([
        {
            bookingID: 1,
            userID: 101,
            serviceID: 201,
            customerName: "Nguyễn Văn A",
            phoneNumber: "0901234567",
            service: "Xét nghiệm cha con",
            packageType: "Tiêu chuẩn",
            numberSample: 2,
            bookingDate: "2024-06-28",
            status: "Chờ xác nhận",
            totalPrice: 2500000,
            appointmentDate: "2024-06-30",
            note: "Khách hàng muốn lấy mẫu tại nhà."
        },
        {
            bookingID: 2,
            userID: 102,
            serviceID: 202,
            customerName: "Trần Thị B",
            phoneNumber: "0912345678",
            service: "Xét nghiệm thai nhi",
            packageType: "Lấy nhanh",
            numberSample: 1,
            bookingDate: "2024-06-27",
            status: "Hoàn thành",
            totalPrice: 1200000,
            appointmentDate: "2024-06-28",
            note: "Đã hoàn thành, khách hàng hài lòng."
        },
        {
            bookingID: 3,
            userID: 103,
            serviceID: 203,
            customerName: "Lê Văn C",
            phoneNumber: "0987654321",
            service: "Xét nghiệm ông cháu",
            packageType: "Tiêu chuẩn",
            numberSample: 3,
            bookingDate: "2024-06-26",
            status: "Chờ xác nhận",
            totalPrice: 3200000,
            appointmentDate: "2024-06-29",
            note: ""
        },
        {
            bookingID: 4,
            userID: 104,
            serviceID: 204,
            customerName: "Phạm Thị D",
            phoneNumber: "0978123456",
            service: "Xét nghiệm mẹ con",
            packageType: "Lấy nhanh",
            numberSample: 2,
            bookingDate: "2024-06-25",
            status: "Đã hủy",
            totalPrice: 2700000,
            appointmentDate: "2024-06-27",
            note: "Khách hàng hủy lịch."
        },
        {
            bookingID: 5,
            userID: 105,
            serviceID: 205,
            customerName: "Ngô Minh E",
            phoneNumber: "0911222333",
            service: "Xét nghiệm bà cháu",
            packageType: "Tiêu chuẩn",
            numberSample: 2,
            bookingDate: "2024-06-24",
            status: "Chờ xác nhận",
            totalPrice: 2500000,
            appointmentDate: "2024-06-26",
            note: ""
        },
        {
            bookingID: 6,
            userID: 106,
            serviceID: 206,
            customerName: "Đặng Thị F",
            phoneNumber: "0909988776",
            service: "Xét nghiệm ông cháu",
            packageType: "Lấy nhanh",
            numberSample: 3,
            bookingDate: "2024-06-23",
            status: "Hoàn thành",
            totalPrice: 3500000,
            appointmentDate: "2024-06-25",
            note: "Kết quả đã trả cho khách."
        },
        {
            bookingID: 7,
            userID: 107,
            serviceID: 207,
            customerName: "Vũ Văn G",
            phoneNumber: "0933445566",
            service: "Xét nghiệm thai nhi",
            packageType: "Tiêu chuẩn",
            numberSample: 1,
            bookingDate: "2024-06-22",
            status: "Chờ xác nhận",
            totalPrice: 1800000,
            appointmentDate: "2024-06-24",
            note: ""
        },
        {
            bookingID: 8,
            userID: 108,
            serviceID: 208,
            customerName: "Trịnh Thị H",
            phoneNumber: "0922334455",
            service: "Xét nghiệm cha con",
            packageType: "Lấy nhanh",
            numberSample: 2,
            bookingDate: "2024-06-21",
            status: "Đã hủy",
            totalPrice: 2700000,
            appointmentDate: "2024-06-23",
            note: "Khách hàng đổi lịch."
        },
        {
            bookingID: 9,
            userID: 109,
            serviceID: 209,
            customerName: "Bùi Văn I",
            phoneNumber: "0911555777",
            service: "Xét nghiệm anh em ruột",
            packageType: "Tiêu chuẩn",
            numberSample: 3,
            bookingDate: "2024-06-20",
            status: "Hoàn thành",
            totalPrice: 3300000,
            appointmentDate: "2024-06-22",
            note: ""
        },
        {
            bookingID: 10,
            userID: 110,
            serviceID: 210,
            customerName: "Phan Thị K",
            phoneNumber: "0901122334",
            service: "Xét nghiệm mẹ con",
            packageType: "Lấy nhanh",
            numberSample: 1,
            bookingDate: "2024-06-19",
            status: "Chờ xác nhận",
            totalPrice: 1900000,
            appointmentDate: "2024-06-21",
            note: "Khách hàng yêu cầu trả kết quả sớm."
        },
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const availableStatuses = [
        { value: "all", label: "Tất cả" },
        { value: "Chờ xác nhận", label: "Chờ xác nhận" },
        { value: "Hoàn thành", label: "Hoàn thành" },
        { value: "Đã hủy", label: "Đã hủy" },
    ];

    const getStatusLabel = (status) => {
        switch (status) {
            case "Chờ xác nhận": return "Chờ xác nhận";
            case "Hoàn thành": return "Hoàn thành";
            case "Đã hủy": return "Đã hủy";
            default: return status;
        }
    };

    const filteredBookings = bookings.filter(b =>
        (filterStatus === "all" || b.status === filterStatus) &&
        (
            b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.phoneNumber.includes(searchTerm) ||
            b.service.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Danh sách dịch vụ đúng yêu cầu
    const serviceOptions = [
        "Xét nghiệm cha con",
        "Xét nghiệm mẹ con",
        "Xét nghiệm ông cháu",
        "Xét nghiệm bà cháu",
        "Xét nghiệm anh em ruột",
        "Xét nghiệm thai nhi"
    ];

    return (
        <div className="booking-container">
            <div className="booking-content">
                <Card className="booking-list-card">
                    <div className="booking-header-row">
                        <h2 className="booking-title">Danh sách Đặt lịch</h2>
                        <div className="booking-controls">
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo khách hàng, SĐT hoặc dịch vụ..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                            <select
                                value={filterStatus}
                                onChange={e => setFilterStatus(e.target.value)}
                                className={`filter-select filter-select-${filterStatus}`}
                            >
                                {availableStatuses.map(s => (
                                    <option key={s.value} value={s.value}>{s.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {filteredBookings.length > 0 ? (
                        <div className="table-responsive">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Mã Đơn</th>
                                        <th>Tên khách hàng</th>
                                        <th>Số điện thoại</th>
                                        <th>Dịch vụ</th>
                                        <th>Gói dịch vụ</th>
                                        <th>Số mẫu</th>
                                        <th>Ngày đặt</th>
                                        <th>Ngày hẹn</th>
                                        <th>Tổng tiền</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBookings.map(b => (
                                        <tr key={b.bookingID}>
                                            <td>{b.bookingID}</td>
                                            <td>{b.customerName}</td>
                                            <td>{b.phoneNumber}</td>
                                            <td>{b.service}</td>
                                            <td>{b.packageType}</td>
                                            <td>{b.numberSample}</td>
                                            <td>{b.bookingDate}</td>
                                            <td>{b.appointmentDate || "-"}</td>
                                            <td>{b.totalPrice?.toLocaleString() || "-"}</td>
                                            <td>
                                                <span className={`status-badge status-${b.status}`}>
                                                    {getStatusLabel(b.status)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>Không tìm thấy đặt lịch nào.</p>
                    )}
                </Card>
            </div>
        </div>
    );
}