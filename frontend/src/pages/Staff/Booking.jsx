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
            serviceType: "Dân sự",
            packageType: "Tiêu chuẩn",
            numberSample: 2,
            bookingDate: "2024-06-28",
            status: "Chờ xác nhận",
            totalPrice: 2500000,
            appointmentDate: "2024-06-30",
            note: "Tôi muốn lấy mẫu tại nhà."
        },
        {
            bookingID: 2,
            userID: 102,
            serviceID: 202,
            customerName: "Trần Thị B",
            phoneNumber: "0912345678",
            service: "Xét nghiệm thai nhi",
            serviceType: "Hành chính",
            packageType: "Lấy nhanh",
            numberSample: 2,
            bookingDate: "2024-06-27",
            status: "Hoàn thành",
            totalPrice: 1200000,
            appointmentDate: "2024-06-28",
            note: "Tôi cần kết quả gấp."
        },
        {
            bookingID: 3,
            userID: 103,
            serviceID: 203,
            customerName: "Lê Văn C",
            phoneNumber: "0987654321",
            service: "Xét nghiệm ông cháu",
            serviceType: "Dân sự",
            packageType: "Tiêu chuẩn",
            numberSample: 3,
            bookingDate: "2024-06-26",
            status: "Chờ xác nhận",
            totalPrice: 3200000,
            appointmentDate: "2024-06-29",
            note: "Tôi muốn được tư vấn thêm."
        },
        {
            bookingID: 4,
            userID: 104,
            serviceID: 204,
            customerName: "Phạm Thị D",
            phoneNumber: "0978123456",
            service: "Xét nghiệm mẹ con",
            serviceType: "Hành chính",
            packageType: "Lấy nhanh",
            numberSample: 2,
            bookingDate: "2024-06-25",
            status: "Đã hủy",
            totalPrice: 2700000,
            appointmentDate: "2024-06-27",
            note: "Tôi muốn đổi lịch lấy mẫu."
        },
        {
            bookingID: 5,
            userID: 105,
            serviceID: 205,
            customerName: "Ngô Minh E",
            phoneNumber: "0911222333",
            service: "Xét nghiệm bà cháu",
            serviceType: "Dân sự",
            packageType: "Tiêu chuẩn",
            numberSample: 2,
            bookingDate: "2024-06-24",
            status: "Chờ xác nhận",
            totalPrice: 2500000,
            appointmentDate: "2024-06-26",
            note: "Tôi muốn lấy mẫu tại nhà."
        },
        {
            bookingID: 6,
            userID: 106,
            serviceID: 206,
            customerName: "Đặng Thị F",
            phoneNumber: "0909988776",
            service: "Xét nghiệm ông cháu",
            serviceType: "Hành chính",
            packageType: "Lấy nhanh",
            numberSample: 3,
            bookingDate: "2024-06-23",
            status: "Hoàn thành",
            totalPrice: 3500000,
            appointmentDate: "2024-06-25",
            note: "Tôi rất hài lòng với dịch vụ."
        },
        {
            bookingID: 7,
            userID: 107,
            serviceID: 207,
            customerName: "Vũ Văn G",
            phoneNumber: "0933445566",
            service: "Xét nghiệm thai nhi",
            serviceType: "Dân sự",
            packageType: "Tiêu chuẩn",
            numberSample: 2,
            bookingDate: "2024-06-22",
            status: "Chờ xác nhận",
            totalPrice: 1800000,
            appointmentDate: "2024-06-24",
            note: "Tôi muốn lấy mẫu ngoài giờ."
        },
        {
            bookingID: 8,
            userID: 108,
            serviceID: 208,
            customerName: "Trịnh Thị H",
            phoneNumber: "0922334455",
            service: "Xét nghiệm cha con",
            serviceType: "Hành chính",
            packageType: "Lấy nhanh",
            numberSample: 2,
            bookingDate: "2024-06-21",
            status: "Đã hủy",
            totalPrice: 2700000,
            appointmentDate: "2024-06-23",
            note: "Tôi muốn đổi địa điểm lấy mẫu."
        },
        {
            bookingID: 9,
            userID: 109,
            serviceID: 209,
            customerName: "Bùi Văn I",
            phoneNumber: "0911555777",
            service: "Xét nghiệm anh em ruột",
            serviceType: "Dân sự",
            packageType: "Tiêu chuẩn",
            numberSample: 3,
            bookingDate: "2024-06-20",
            status: "Hoàn thành",
            totalPrice: 3300000,
            appointmentDate: "2024-06-22",
            note: "Tôi muốn nhận kết quả qua email."
        },
        {
            bookingID: 10,
            userID: 110,
            serviceID: 210,
            customerName: "Phan Thị K",
            phoneNumber: "0901122334",
            service: "Xét nghiệm mẹ con",
            serviceType: "Hành chính",
            packageType: "Lấy nhanh",
            numberSample: 2,
            bookingDate: "2024-06-19",
            status: "Chờ xác nhận",
            totalPrice: 1900000,
            appointmentDate: "2024-06-21",
            note: "Tôi muốn trả kết quả sớm."
        },
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterService, setFilterService] = useState("all");
    const [filterServiceType, setFilterServiceType] = useState("all");
    const [filterNumberSample, setFilterNumberSample] = useState("all");
    const [filterAppointmentDate, setFilterAppointmentDate] = useState("");
    const [filterPackageType, setFilterPackageType] = useState("all");

    const availableStatuses = [
        { value: "all", label: "Tất cả" },
        { value: "Chờ xác nhận", label: "Chờ xác nhận" },
        { value: "Hoàn thành", label: "Hoàn thành" },
        { value: "Đã hủy", label: "Đã hủy" },
    ];

    const serviceOptions = [
        "Xét nghiệm cha con",
        "Xét nghiệm mẹ con",
        "Xét nghiệm ông cháu",
        "Xét nghiệm bà cháu",
        "Xét nghiệm anh em ruột",
        "Xét nghiệm thai nhi"
    ];

    const serviceTypeOptions = ["Dân sự", "Hành chính"];

    // Lấy danh sách số mẫu duy nhất >= 2
    const numberSampleOptions = Array.from(
        new Set(bookings.map(b => b.numberSample).filter(n => n >= 2))
    );

    // Lấy danh sách gói dịch vụ duy nhất
    const packageTypeOptions = Array.from(
        new Set(bookings.map(b => b.packageType))
    );

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
        (filterService === "all" || b.service === filterService) &&
        (filterServiceType === "all" || b.serviceType === filterServiceType) &&
        (filterPackageType === "all" || b.packageType === filterPackageType) &&
        (filterAppointmentDate === "" || b.appointmentDate === filterAppointmentDate) &&
        (
            b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.phoneNumber.includes(searchTerm) ||
            b.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (b.serviceType && b.serviceType.toLowerCase().includes(searchTerm.toLowerCase()))
        )
    );

    return (
        <div className="booking-container">
            <div className="booking-content">
                <Card className="booking-list-card">
                    <div className="booking-header-row">
                        <h2 className="booking-title">Danh sách Đặt lịch</h2>
                        <div className="booking-controls" style={{ flexWrap: "wrap", gap: 8 }}>
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo khách hàng, SĐT, dịch vụ hoặc loại dịch vụ..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                            <select
                                value={filterStatus}
                                onChange={e => setFilterStatus(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">Tất cả trạng thái</option>
                                {availableStatuses.slice(1).map(s => (
                                    <option key={s.value} value={s.value}>{s.label}</option>
                                ))}
                            </select>
                            <select
                                value={filterService}
                                onChange={e => setFilterService(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">Tất cả dịch vụ</option>
                                {serviceOptions.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                            <select
                                value={filterServiceType}
                                onChange={e => setFilterServiceType(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">Tất cả loại dịch vụ</option>
                                {serviceTypeOptions.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                            <select
                                value={filterNumberSample}
                                onChange={e => setFilterNumberSample(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">Tất cả số mẫu</option>
                                {numberSampleOptions.map(n => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                            <select
                                value={filterPackageType}
                                onChange={e => setFilterPackageType(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">Tất cả gói dịch vụ</option>
                                {packageTypeOptions.map(pt => (
                                    <option key={pt} value={pt}>{pt}</option>
                                ))}
                            </select>
                            <input
                                type="date"
                                value={filterAppointmentDate}
                                onChange={e => setFilterAppointmentDate(e.target.value)}
                                className="filter-select"
                                style={{ minWidth: 150 }}
                                placeholder="Ngày hẹn"
                            />
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
                                        <th>Loại dịch vụ</th>
                                        <th>Gói dịch vụ</th>
                                        <th>Số mẫu</th>
                                        <th>Ngày đặt</th>
                                        <th>Ngày hẹn</th>
                                        <th>Tổng tiền</th>
                                        <th>Trạng thái</th>
                                        <th>Ghi chú khách hàng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBookings.map(b => (
                                        <tr key={b.bookingID}>
                                            <td>{b.bookingID}</td>
                                            <td>{b.customerName}</td>
                                            <td>{b.phoneNumber}</td>
                                            <td>{b.service}</td>
                                            <td>{b.serviceType}</td>
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
                                            <td>{b.note}</td>
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