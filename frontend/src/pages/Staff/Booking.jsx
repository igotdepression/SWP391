import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Thêm import này
import Card from "../../components/Card";
import "./Booking.css";
import { MdCheckCircle, MdCancel, MdArrowForward, MdVisibility, MdEdit, MdPerson, MdSort, MdSortByAlpha, MdAdd } from "react-icons/md";
import { ThermometerIcon } from "lucide-react";
import api from "../../services/api";
import { userAPI } from '../../services/api';

const getNextStatus = (current, serviceType) => {
    if (
        current === "Chờ xác nhận" ||
        current === "Không xác nhận"
    ) return "Chờ lấy mẫu";
    if (current === "Chờ lấy mẫu") return "Chờ kết quả";
    if (current === "Chờ kết quả") {
        return serviceType === "Hành chính" ? "Chờ giám định pháp lý" : "Hoàn thành";
    }
    if (current === "Chờ giám định pháp lý") return "Hoàn thành";
    if (current === "Hoàn thành") return "Hoàn thành";
    return current;
};

// Xóa mảng users cứng, thay bằng state và lấy từ API
export default function Booking() {
    const navigate = useNavigate(); // Thêm này

    const [users, setUsers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterService, setFilterService] = useState("all");
    const [filterServiceType, setFilterServiceType] = useState("all");
    const [filterNumberSample, setFilterNumberSample] = useState("all");
    const [filterAppointmentDate, setFilterAppointmentDate] = useState("");
    const [filterPackageType, setFilterPackageType] = useState("all");

    // Trạng thái sắp xếp mới
    const [sortField, setSortField] = useState("");
    const [sortDirection, setSortDirection] = useState("asc"); // "asc" or "desc"

    const [showSampleModal, setShowSampleModal] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);
    const [sampleInfos, setSampleInfos] = useState([]);
    const [viewBooking, setViewBooking] = useState(null);
    const [viewUser, setViewUser] = useState(null);
    const [editBooking, setEditBooking] = useState(null);
    const [sampleList, setSampleList] = useState([]);

    const STATUS_MAP = {
        "Chờ xác nhận": { label: "Chờ xác nhận", className: "cho-xac-nhan" },
        "Chờ lấy mẫu": { label: "Chờ lấy mẫu", className: "cho-lay-mau" },
        "Chờ kết quả": { label: "Chờ kết quả", className: "cho-ket-qua" },
        "Chờ giám định pháp lý": { label: "Chờ giám định pháp lý", className: "cho-giam-dinh-phap-ly" },
        "Hoàn thành": { label: "Hoàn thành", className: "hoan-thanh" },
        "Đã hủy": { label: "Đã hủy", className: "da-huy" },
        "Không xác nhận": { label: "Không xác nhận", className: "khong-xac-nhan" },
    };

    const availableStatuses = [
        { value: "all", label: "Tất cả" },
        ...Object.entries(STATUS_MAP).map(([value, { label }]) => ({ value, label }))
    ];

    const getStatusLabel = (status) => STATUS_MAP[status]?.label || status;
    const getStatusClass = (status) => STATUS_MAP[status]?.className || "";

    const getStatusColor = (status) => {
        switch (status) {
            case "Chờ xác nhận":
                return "#f07903";
            case "Chờ lấy mẫu":
                return "#c701a3ff";
            case "Chờ kết quả":
                return "#030ff0ff";
            case "Chờ giám định pháp lý":
                return "#9103f0ff";
            case "Hoàn thành":
                return "#00833bff";
            case "Không xác nhận":
                return "#dc2626";
            case "Đã hủy":
                return "#6b7280";
            default:
                return "#222";
        }
    };

    const serviceOptions = [
        "Xét nghiệm cha con",
        "Xét nghiệm mẹ con",
        "Xét nghiệm ông cháu",
        "Xét nghiệm bà cháu",
        "Xét nghiệm anh em ruột",
        "Xét nghiệm thai nhi"
    ];

    const serviceTypeOptions = ["Dân sự", "Hành chính"];

    // Lấy danh sách số mẫu duy nhất >= 2
    const numberSampleOptions = Array.from(
        new Set(bookings.map(b => b.numberSample).filter(n => n && n >= 2))
    );

    // Lấy danh sách gói dịch vụ duy nhất
    const packageTypeOptions = [
        "Tiêu chuẩn (2-5 ngày)",
        "Lấy nhanh (6-24 tiếng)",
        "Tiêu chuẩn (10-14 ngày)",
        "Lấy nhanh (7-10 ngày)"
    ];

    // Logic lọc nâng cao
    const filteredBookings = bookings.filter(b => {
        const searchLower = (searchTerm || '').toLowerCase();
        const matchesSearch = (searchTerm || '') === "" ||
            (b.customerName && b.customerName.toLowerCase().includes(searchLower)) ||
            (b.phoneNumber && b.phoneNumber.includes(searchTerm || '')) ||
            (b.serviceName && b.serviceName.toLowerCase().includes(searchLower)) ||
            (b.bookingID && b.bookingID.toString().includes(searchTerm || '')) ||
            (b.userID && b.userID.toString().includes(searchTerm || '')) ||
            (b.serviceType && b.serviceType.toLowerCase().includes(searchLower));

        const matchesStatus = filterStatus === "all" || b.status === filterStatus;
        const matchesService = filterService === "all" || (b.serviceName || b.service) === filterService;
        const matchesServiceType = filterServiceType === "all" || (b.service?.serviceType || b.serviceType) === filterServiceType;
        const matchesPackageType = filterPackageType === "all" || (b.service?.packageType || b.packageType) === filterPackageType;
        const matchesNumberSample = filterNumberSample === "all" || (b.numberSample && b.numberSample.toString() === filterNumberSample);
        const matchesAppointmentDate = filterAppointmentDate === "" || b.appointmentDate === filterAppointmentDate;

        return matchesSearch && matchesStatus && matchesService &&
            matchesServiceType && matchesPackageType &&
            matchesNumberSample && matchesAppointmentDate;
    });

    // Logic sắp xếp - chỉ cho bookingDate và appointmentDate
    const sortedBookings = [...bookings].sort((a, b) => {
        if (!sortField) return 0;

        let aValue, bValue;

        switch (sortField) {
            case "bookingDate":
                aValue = new Date(a.bookingDate);
                bValue = new Date(b.bookingDate);
                break;
            case "appointmentDate":
                aValue = new Date(a.appointmentDate || "1900-01-01");
                bValue = new Date(b.appointmentDate || "1900-01-01");
                break;
            default:
                return 0;
        }

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });

    // Xử lý sắp xếp - chỉ cho bookingDate và appointmentDate
    const handleSort = (field) => {
        if (field !== "bookingDate" && field !== "appointmentDate") return;

        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    // Lấy icon sắp xếp - chỉ cho bookingDate và appointmentDate
    const getSortIcon = (field) => {
        if (field !== "bookingDate" && field !== "appointmentDate") return null;
        if (sortField !== field) return <MdSort size={16} color="#999" />;
        return sortDirection === "asc" ?
            <MdSort size={16} color="#2563eb" style={{ transform: "rotate(180deg)" }} /> :
            <MdSort size={16} color="#2563eb" />;
    };

    // Đặt lại bộ lọc và sắp xếp
    const resetFilters = () => {
        setSearchTerm("");
        setFilterStatus("all");
        setFilterService("all");
        setFilterServiceType("all");
        setFilterPackageType("all");
        setFilterNumberSample("all");
        setFilterAppointmentDate("");
        setSortField("");
        setSortDirection("asc");
    };

    const filteredAndSortedBookings = sortedBookings.filter(b =>
        (filterStatus === "all" || b.status === filterStatus) &&
        (filterService === "all" || (b.serviceName || b.service) === filterService) &&
        (filterServiceType === "all" || (b.service?.serviceType || b.serviceType) === filterServiceType) &&
        (filterPackageType === "all" || (b.service?.packageType || b.packageType) === filterPackageType) &&
        (filterAppointmentDate === "" || b.appointmentDate === filterAppointmentDate) &&
        (
            (b.customerName && b.customerName.toLowerCase().includes((searchTerm || '').toLowerCase())) ||
            (b.phoneNumber && b.phoneNumber.includes(searchTerm || '')) ||
            (b.serviceName && b.serviceName.toLowerCase().includes((searchTerm || '').toLowerCase())) ||
            (b.serviceType && b.serviceType.toLowerCase().includes((searchTerm || '').toLowerCase()))
        )
    );

    const updateBookingStatus = async (bookingID, newStatus) => {
        await api.put(`/bookings/${bookingID}/status`, { status: newStatus });
    };

    const reloadBookings = async () => {
        const res = await api.get("/bookings/staff/all");
        setBookings(res.data);
    };

    const handleConfirm = async (bookingID) => {
        if (!window.confirm("Bạn có chắc chắn muốn xác nhận đơn này?")) return;
        await updateBookingStatus(bookingID, "Chờ lấy mẫu");
        await reloadBookings();
    };

    const handleReject = async (bookingID) => {
        if (!window.confirm("Bạn có chắc chắn muốn chuyển trạng thái đơn này sang 'Không xác nhận'?")) return;
        await updateBookingStatus(bookingID, "Không xác nhận");
        await reloadBookings();
    };

    const handleNextStep = async (bookingID) => {
        const booking = bookings.find(b => b.bookingID === bookingID);

        if (booking.status === "Chờ lấy mẫu") {
            setCurrentBooking(booking);
            setSampleInfos(Array(booking.numberSample).fill(""));
            setShowSampleModal(true);
        } else if (booking.status === "Chờ kết quả") {
            if (window.confirm("Chuyển đến trang quản lý kết quả xét nghiệm để thêm kết quả cho đơn này?")) {
                // Dispatch event để StaffPage chuyển tab
                window.dispatchEvent(new CustomEvent('switchToTestResults', {
                    detail: {
                        bookingID: bookingID,
                        bookingInfo: {
                            ...booking,
                            customerName: booking.user?.fullName || booking.customerName,
                            serviceName: booking.service?.serviceName || booking.serviceName
                        },
                        openAddModal: true
                    }
                }));
            }
        } else {
            if (!window.confirm("Bạn có chắc chắn muốn chuyển trạng thái đơn này?")) return;
            const nextStatus = getNextStatus(booking.status, booking.serviceType);
            await updateBookingStatus(bookingID, nextStatus);
            await reloadBookings();
        }
    };

    const handleSampleInfoChange = (idx, value) => {
        setSampleInfos(prev => {
            const arr = [...prev];
            arr[idx] = value;
            return arr;
        });
    };

    const handleConfirmSamples = async () => {
        if (sampleInfos.some(id => !id)) {
            alert("Vui lòng chọn đầy đủ ID mẫu cho tất cả các mẫu!");
            return;
        }
        if (!window.confirm("Bạn có chắc chắn muốn xác nhận và chuyển trạng thái đơn này?")) return;

        try {
            // 1. Cập nhật trạng thái booking thành "Chờ kết quả" trong database
            await updateBookingStatus(currentBooking.bookingID, "Chờ kết quả");

            // 2. Lưu thông tin sample IDs vào database (nếu backend hỗ trợ)
            if (sampleInfos.length > 0) {
                try {
                    await api.put(`/bookings/${currentBooking.bookingID}/samples`, {
                        sampleInfos: sampleInfos,
                        sampleIds: sampleInfos.filter(id => id) // Lọc ra các ID không rỗng
                    });
                    console.log('Đã lưu thông tin mẫu thành công');
                } catch (sampleErr) {
                    console.warn('Không thể lưu thông tin mẫu:', sampleErr);
                    // Có thể tiếp tục vì việc chính là cập nhật trạng thái
                }
            }

            // 3. Reload lại danh sách bookings từ database để đồng bộ
            await reloadBookings();

            // 4. Đóng modal và reset state
            setShowSampleModal(false);
            setCurrentBooking(null);
            setSampleInfos([]);

            alert("Đã xác nhận mẫu và chuyển trạng thái thành công!");

        } catch (err) {
            console.error('Error updating booking status:', err);
            alert("Lỗi khi cập nhật trạng thái: " + (err.message || 'Không xác định'));
        }
    };

    const handleViewDetail = (booking) => {
        setViewBooking(booking);
    };

    const handleEditAndResubmit = (booking) => {
        setEditBooking({
            ...booking,
            isResubmit: true // Cờ để biết đây là gửi lại
        });
    };

    // Cập nhật handleEditBooking để hỗ trợ gửi lại
    const handleEditBooking = (booking) => {
        setEditBooking({
            ...booking,
            isResubmit: false
        });
    };

    const handleViewUser = (userID) => {
        const booking = bookings.find(b => b.userID === userID);
        if (booking) {
            setViewUser({
                userID: booking.userID,
                customerName: booking.customerName,
                phone: booking.phone,
                email: booking.email,
                address: booking.address,
                gender: booking.gender,
                dateOfBirth: booking.dateOfBirth,
            });
        }
    };

    useEffect(() => {
        api.get("/bookings/staff/all")
            .then(res => setBookings(res.data))
            .catch(err => {
                setBookings([]);
                alert("Không thể tải danh sách booking!");
            });
    }, []);

    useEffect(() => {
        if (showSampleModal && currentBooking) {
            api.get(`/bookings/${currentBooking.bookingID}/samples`)
                .then(res => setSampleList(res.data))
                .catch(() => setSampleList([]));
        }
    }, [showSampleModal, currentBooking]);

    return (
        <div className="booking-container">
            <div className="booking-content">
                <Card className="booking-list-card">
                    <div className="booking-header-row">
                        <h2 className="booking-title">Danh sách Đặt lịch</h2>
                        {/* Phần thống kê tổng quan */}
                        <div className="booking-stats-row">
                            <div className="booking-stat-card total">
                                <div className="stat-icon">
                                    <MdVisibility size={24} />
                                </div>
                                <span className="stat-label">Tổng đơn</span>
                                <span className="stat-value">{bookings.length}</span>
                            </div>

                            <div className="booking-stat-card pending">
                                <div className="stat-icon">
                                    <MdCheckCircle size={24} />
                                </div>
                                <span className="stat-label">Chờ xác nhận</span>
                                <span className="stat-value">
                                    {bookings.filter(b => b.status === "Chờ xác nhận").length}
                                </span>
                            </div>

                            <div className="booking-stat-card processing">
                                <div className="stat-icon">
                                    <MdArrowForward size={24} />
                                </div>
                                <span className="stat-label">Đang xử lý</span>
                                <span className="stat-value">
                                    {bookings.filter(b =>
                                        ["Chờ lấy mẫu", "Chờ kết quả", "Chờ giám định pháp lý"].includes(b.status)
                                    ).length}
                                </span>
                            </div>

                            <div className="booking-stat-card completed">
                                <div className="stat-icon">
                                    <MdCheckCircle size={24} />
                                </div>
                                <span className="stat-label">Hoàn thành</span>
                                <span className="stat-value">
                                    {bookings.filter(b => b.status === "Hoàn thành").length}
                                </span>
                            </div>

                            <div className="booking-stat-card cancelled">
                                <div className="stat-icon">
                                    <MdCancel size={24} />
                                </div>
                                <span className="stat-label">Đã hủy/Từ chối</span>
                                <span className="stat-value">
                                    {bookings.filter(b =>
                                        ["Đã hủy", "Không xác nhận"].includes(b.status)
                                    ).length}
                                </span>
                            </div>
                        </div>

                        {/* Phần tìm kiếm và bộ lọc */}
                        <div className="booking-controls">
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo mã đơn, mã KH, tên khách hàng, SĐT, dịch vụ..."
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
                                value={filterPackageType}
                                onChange={e => setFilterPackageType(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">Tất cả gói dịch vụ</option>
                                {packageTypeOptions.map(pt => (
                                    <option key={pt} value={pt}>{pt}</option>
                                ))}
                            </select>

                            <button
                                onClick={resetFilters}
                                className="reset-filters-btn"
                            >
                                Đặt lại bộ lọc
                            </button>
                        </div>
                    </div>

                    {filteredAndSortedBookings.length > 0 ? (
                        <div className="table-responsive">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Mã Đơn</th>
                                        <th>Mã KH</th>
                                        <th>Dịch vụ</th>
                                        <th>Loại dịch vụ</th>
                                        <th>Gói dịch vụ</th>
                                        <th>Số mẫu</th>
                                        <th
                                            onClick={() => handleSort("bookingDate")}
                                            style={{ cursor: "pointer", userSelect: "none" }}
                                        >
                                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                                Ngày đặt
                                                {getSortIcon("bookingDate")}
                                            </div>
                                        </th>
                                        <th
                                            onClick={() => handleSort("appointmentDate")}
                                            style={{ cursor: "pointer", userSelect: "none" }}
                                        >
                                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                                Ngày hẹn
                                                {getSortIcon("appointmentDate")}
                                            </div>
                                        </th>
                                        <th>Tổng tiền</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAndSortedBookings.map(b => (
                                        <tr key={b.bookingID}>
                                            <td>{b.bookingID}</td>
                                            <td>{b.user?.userID || b.userID}</td>
                                            <td>{b.serviceName || ''}</td>
                                            <td>{b.service?.serviceType || b.serviceType || ''}</td>
                                            <td>{b.service?.packageType || b.packageType || ''}</td>
                                            <td>{b.numberSample}</td>
                                            <td>{b.bookingDate}</td>
                                            <td>{b.appointmentDate}</td>
                                            <td>{b.totalPrice?.toLocaleString() || b.totalPrice || ''}</td>
                                            <td>
                                                <div className="status-action-row status-action-row--pending">
                                                    <span
                                                        className={`status-badge status-badge--${getStatusClass(b.status)}`}
                                                        style={{ color: getStatusColor(b.status), borderColor: getStatusColor(b.status), fontSize: '12px' }}
                                                    >
                                                        {getStatusLabel(b.status)}
                                                    </span>
                                                    {b.status === "Chờ xác nhận" ? (
                                                        <>
                                                            <button
                                                                className="status-btn status-btn--confirm"
                                                                title="Xác nhận"
                                                                onClick={() => handleConfirm(b.bookingID)}
                                                            >
                                                                <MdCheckCircle size={20} />
                                                            </button>
                                                            <button
                                                                className="status-btn status-btn--reject"
                                                                title="Không xác nhận"
                                                                onClick={() => handleReject(b.bookingID)}
                                                            >
                                                                <MdCancel size={20} />
                                                            </button>
                                                        </>
                                                    ) : b.status === "Không xác nhận" ? (
                                                        <MdEdit
                                                            size={22}
                                                            color="#3b82f6"
                                                            style={{ cursor: "pointer" }}
                                                            title="Chỉnh sửa và gửi lại xác nhận"
                                                            onClick={() => handleEditAndResubmit(b)}
                                                        />
                                                    ) : b.status === "Chờ kết quả" ? (
                                                        // Button đặc biệt cho trạng thái "Chờ kết quả"
                                                        <button
                                                            className="status-btn status-btn--add-result"
                                                            title="Thêm kết quả xét nghiệm để hoàn thành đơn"
                                                            onClick={() => handleNextStep(b.bookingID)}
                                                        >
                                                            <MdArrowForward
                                                                size={22}
                                                                color="#2563eb"
                                                                className="arrow-forward-icon"
                                                                title="Chuyển bước tiếp"
                                                                onClick={() => handleNextStep(b.bookingID)}
                                                            />
                                                        </button>
                                                    ) : (
                                                        !["Hoàn thành", "Đã hủy", "Không xác nhận"].includes(b.status) && (
                                                            <MdArrowForward
                                                                size={22}
                                                                color="#2563eb"
                                                                className="arrow-forward-icon"
                                                                title="Chuyển bước tiếp"
                                                                onClick={() => handleNextStep(b.bookingID)}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ display: "flex", gap: 18, justifyContent: "center" }}>
                                                    <MdVisibility
                                                        size={28}
                                                        color="#ffa500"
                                                        style={{ cursor: "pointer" }}
                                                        title="Xem chi tiết"
                                                        onClick={() => handleViewDetail(b)}
                                                    />
                                                    {["Chờ xác nhận", "Không xác nhận"].includes(b.status) ? (
                                                        <MdEdit
                                                            size={28}
                                                            color="#22c55e"
                                                            style={{ cursor: "pointer" }}
                                                            title={b.status === "Không xác nhận" ? "Chỉnh sửa đơn bị từ chối" : "Chỉnh sửa"}
                                                            onClick={() => handleEditBooking(b)}
                                                        />
                                                    ) : (
                                                        <MdEdit
                                                            size={28}
                                                            color="#bdbdbd"
                                                            style={{ cursor: "not-allowed" }}
                                                            title="Không thể chỉnh sửa đơn ở trạng thái này"
                                                            onClick={() => {
                                                                alert("Không thể chỉnh sửa đơn ở trạng thái này!");
                                                            }}
                                                        />
                                                    )}
                                                    <MdPerson
                                                        size={28}
                                                        color="#2563eb"
                                                        style={{ cursor: "pointer" }}
                                                        title="Xem người đăng ký"
                                                        onClick={() => handleViewUser(b.userID)}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
                            <p>😕 Không tìm thấy lịch hẹn phù hợp. Bạn có thể thay đổi bộ lọc để xem thêm kết quả.</p>
                            {(searchTerm || filterStatus !== "all" || filterService !== "all" ||
                                filterServiceType !== "all" || filterPackageType !== "all" ||
                                filterNumberSample !== "all" || filterAppointmentDate) && (
                                    <button
                                        onClick={resetFilters}
                                        style={{
                                            marginTop: "16px",
                                            padding: "8px 16px",
                                            backgroundColor: "#3b82f6",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "6px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Xóa bộ lọc
                                    </button>
                                )}
                        </div>
                    )}
                </Card>

                {/* Modal nhập thông tin mẫu */}
                {showSampleModal && (
                    <div className="modal-overlay">
                        <div className="modal-content" style={{ maxWidth: 900 }}>
                            <h3>Nhập thông tin mẫu ({currentBooking?.numberSample} mẫu)</h3>
                            {sampleInfos.map((info, idx) => (
                                <div key={idx} className="sample-input-row">
                                    <label>Mẫu {idx + 1}:</label>
                                    <select
                                        value={info}
                                        onChange={e => handleSampleInfoChange(idx, e.target.value)}
                                        required
                                    >
                                        <option value="">-- Chọn ID mẫu --</option>
                                        {sampleList.map(sample => (
                                            <option key={sample.sampleID} value={sample.sampleID}>
                                                {sample.sampleID} - {sample.sampleType}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                            <div className="modal-actions">
                                <button onClick={handleConfirmSamples} className="confirm-btn" style={{ marginRight: 8 }}>Xác nhận</button>
                                <button onClick={() => setShowSampleModal(false)} className="reject-btn">Hủy</button>
                            </div>
                        </div>
                    </div>
                )}
                {/* Modal xem chi tiết đơn */}
                {viewBooking && (
                    <div className="modal-overlay">
                        <div className="modal-content" style={{ maxWidth: 900 }}>
                            <h3>Chi tiết đơn #{viewBooking.bookingID}</h3>
                            <p><b>Mã Đơn:</b> {viewBooking.bookingID}</p>
                            <p><b>Số mẫu:</b> {viewBooking.numberSample}</p>
                            <p><b>Ngày đặt:</b> {viewBooking.bookingDate}</p>
                            <p><b>Ngày hẹn:</b> {viewBooking.appointmentDate}</p>
                            <p><b>Tổng tiền:</b> {viewBooking.totalPrice?.toLocaleString() || ''}</p>
                            <p><b>Trạng thái:</b> {getStatusLabel(viewBooking.status)}</p>
                            <p><b>Ghi chú:</b> {viewBooking.note}</p>
                            <h4>Thông tin người tham gia:</h4>
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Họ tên</th>
                                        <th>Giới tính</th>
                                        <th>Năm sinh</th>
                                        <th>Quan hệ</th>
                                        <th>Loại mẫu</th>
                                        <th>Phương pháp thu mẫu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewBooking.participants?.map((p, idx) => (
                                        <tr key={idx}>
                                            <td>{p.participantID}</td>
                                            <td>{p.fullName}</td>
                                            <td>{p.gender}</td>
                                            <td>{p.dateOfBirth}</td>
                                            <td>{p.relationshipToCustomer}</td>
                                            <td>{p.sampleType}</td>
                                            <td>{p.collectionMethod}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className="confirm-btn" onClick={() => setViewBooking(null)}>Đóng</button>
                        </div>
                    </div>
                )}
                {/* Modal xem thông tin người dùng */}
                {viewUser && (
                    <div className="modal-overlay">
                        <div className="modal-content" style={{ maxWidth: 900 }}>
                            <h3>Thông tin người đăng ký</h3>
                            <p><b>Mã KH:</b> {viewUser.userID}</p>
                            <p><b>Họ tên:</b> {viewUser.customerName}</p>
                            <p><b>Số điện thoại:</b> {viewUser.phone}</p>
                            <p><b>Email:</b> {viewUser.email}</p>
                            <p><b>Địa chỉ:</b> {viewUser.address}</p>
                            <p><b>Giới tính:</b> {viewUser.gender}</p>
                            <p><b>Năm sinh:</b> {viewUser.dateOfBirth}</p>
                            <button className="confirm-btn" onClick={() => setViewUser(null)}>Đóng</button>
                        </div>
                    </div>
                )}
                {/* Modal chỉnh sửa thông tin đơn */}
                {editBooking && (
                    <div className="modal-overlay">
                        <div className="modal-content" style={{ maxWidth: 900 }}>
                            <h3>
                                {editBooking.status === "Không xác nhận"
                                    ? `Chỉnh sửa đơn bị từ chối #${editBooking.bookingID}`
                                    : `Cập nhật thông tin đơn #${editBooking.bookingID}`
                                }
                            </h3>

                            {editBooking.status === "Không xác nhận" && (
                                <div>
                                    <strong>Thông báo:</strong> Đơn này đã bị từ chối. Bạn có thể chỉnh sửa thông tin và gửi lại để xác nhận.
                                </div>
                            )}

                            <div className="form-group">
                                <label>Họ tên khách hàng:</label>
                                <input
                                    type="text"
                                    value={editBooking.customerName}
                                    onChange={e => setEditBooking({ ...editBooking, customerName: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Số điện thoại:</label>
                                <input
                                    type="text"
                                    value={editBooking.phoneNumber}
                                    onChange={e => setEditBooking({ ...editBooking, phoneNumber: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Dịch vụ:</label>
                                <select
                                    value={editBooking.service?.serviceName || editBooking.service || ''}
                                    onChange={e => setEditBooking({
                                        ...editBooking,
                                        service: {
                                            ...editBooking.service,
                                            serviceName: e.target.value
                                        }
                                    })}
                                >
                                    {serviceOptions.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Loại dịch vụ:</label>
                                <select
                                    value={editBooking.service?.serviceType || editBooking.serviceType || ''}
                                    onChange={e => setEditBooking({
                                        ...editBooking,
                                        service: {
                                            ...editBooking.service,
                                            serviceType: e.target.value
                                        },
                                        serviceType: e.target.value
                                    })}
                                >
                                    {serviceTypeOptions.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Gói dịch vụ:</label>
                                <select
                                    value={editBooking.service?.packageType || editBooking.packageType || ''}
                                    onChange={e => setEditBooking({
                                        ...editBooking,
                                        service: {
                                            ...editBooking.service,
                                            packageType: e.target.value
                                        },
                                        packageType: e.target.value
                                    })}
                                >
                                    {packageTypeOptions.map(pt => (
                                        <option key={pt} value={pt}>{pt}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Số mẫu:</label>
                                <input
                                    type="number"
                                    min={2}
                                    value={editBooking.numberSample}
                                    onChange={e => setEditBooking({ ...editBooking, numberSample: Number(e.target.value) })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Ngày đặt:</label>
                                <input
                                    type="date"
                                    value={editBooking.bookingDate}
                                />
                            </div>
                            <div className="form-group">
                                <label>Ngày hẹn:</label>
                                <input
                                    type="date"
                                    value={editBooking.appointmentDate}
                                    onChange={e => setEditBooking({ ...editBooking, appointmentDate: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Tổng tiền:</label>
                                <input
                                    type="number"
                                    min={0}
                                    value={editBooking.totalPrice || 0}
                                    onChange={e => setEditBooking({ ...editBooking, totalPrice: Number(e.target.value) })}
                                />
                            </div>

                            <div className="button-container">
                                {editBooking.status === "Không xác nhận" ? (
                                    <button
                                        className="confirm-btn"
                                        onClick={async () => {
                                            if (window.confirm("Xác nhận chỉnh sửa và gửi lại đơn để xác nhận?")) {
                                                try {
                                                    // Cập nhật thông tin booking và chuyển trạng thái về "Chờ xác nhận"
                                                    const updatedBooking = {
                                                        ...editBooking,
                                                        status: "Chờ xác nhận"
                                                    };

                                                    // Gọi API cập nhật booking
                                                    await api.put(`/bookings/${editBooking.bookingID}`, updatedBooking);

                                                    // Reload lại danh sách từ database
                                                    await reloadBookings();

                                                    setEditBooking(null);
                                                    alert("Đơn đã được chỉnh sửa và gửi lại để xác nhận!");

                                                } catch (err) {
                                                    console.error('Error updating booking:', err);
                                                    alert("Lỗi khi cập nhật đơn: " + (err.message || 'Không xác định'));
                                                }
                                            }
                                        }}
                                    >
                                        Lưu & Gửi lại xác nhận
                                    </button>
                                ) : (
                                    <button
                                        className="confirm-btn"
                                        onClick={async () => {
                                            if (window.confirm("Xác nhận lưu thay đổi?")) {
                                                try {
                                                    // Gọi API cập nhật thông tin booking
                                                    await api.put(`/bookings/${editBooking.bookingID}`, editBooking);

                                                    // Reload lại danh sách từ database
                                                    await reloadBookings();

                                                    setEditBooking(null);
                                                    alert("Thông tin đơn đã được cập nhật!");

                                                } catch (err) {
                                                    console.error('Error updating booking:', err);
                                                    alert("Lỗi khi cập nhật đơn: " + (err.message || 'Không xác định'));
                                                }
                                            }
                                        }}
                                    >
                                        Lưu thay đổi
                                    </button>
                                )}
                                <button className="reject-btn" onClick={() => setEditBooking(null)}>
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}