import React, { useState } from "react";
import Card from "../../components/Card";
import "./Booking.css";
import { MdCheckCircle, MdCancel, MdArrowForward, MdVisibility, MdEdit, MdPerson, MdSort, MdSortByAlpha } from "react-icons/md";
import { ThermometerIcon } from "lucide-react";

const getNextStatus = (current, serviceType) => {
    if (current === "Chờ xác nhận" || current === "Không xác nhận") return "Chờ lấy mẫu";
    if (current === "Chờ lấy mẫu") return "Chờ kết quả";
    if (current === "Chờ kết quả") {
        return serviceType === "Hành chính" ? "Chờ giám định pháp lý" : "Hoàn thành";
    }
    if (current === "Chờ giám định pháp lý") return "Hoàn thành";
    return current;
};

const users = [
    {
        userID: 101,
        fullName: "Nguyễn Văn A",
        phoneNumber: "0901234567",
        email: "nguyenvana@gmail.com",
        address: "123 Đường A, Quận 1, TP.HCM",
        gender: "Nam",
        dob: 1980
    },
    {
        userID: 102,
        fullName: "Trần Thị B",
        phoneNumber: "0912345678",
        email: "tranthib@gmail.com",
        address: "456 Đường B, Quận 2, TP.HCM",
        gender: "Nữ",
        dob: 1985
    },
    {
        userID: 103,
        fullName: "Lê Văn C",
        phoneNumber: "0987654321",
        email: "levanc@gmail.com",
        address: "789 Đường C, Quận 3, TP.HCM",
        gender: "Nam",
        dob: 1990
    },
    {
        userID: 104,
        fullName: "Phạm Thị D",
        phoneNumber: "0978123456",
        email: "phamthid@gmail.com",
        address: "321 Đường D, Quận 4, TP.HCM",
        gender: "Nữ",
        dob: 1988
    },
    {
        userID: 105,
        fullName: "Ngô Minh E",
        phoneNumber: "0911222333",
        email: "gominhe@gmail.com",
        address: "654 Đường E, Quận 5, TP.HCM",
        gender: "Nam",
        dob: 1985
    },
    {
        userID: 106,
        fullName: "Đặng Thị F",
        phoneNumber: "0909988776",
        email: "dangthif@gmail.com",
        address: "987 Đường F, Quận 6, TP.HCM",
        gender: "Nữ",
        dob: 1992
    },
    {
        userID: 107,
        fullName: "Vũ Văn G",
        phoneNumber: "0933445566",
        email: "vuvang@gmail.com",
        address: "159 Đường G, Quận 7, TP.HCM",
        gender: "Nam",
        dob: 1983
    },
    {
        userID: 108,
        fullName: "Trịnh Thị H",
        phoneNumber: "0922334455",
        email: "tranthih@gmail.com",
        address: "753 Đường H, Quận 8, TP.HCM",
        gender: "Nữ",
        dob: 1995
    },
    {
        userID: 109,
        fullName: "Bùi Văn I",
        phoneNumber: "0911555777",
        email: "buivani@gmail.com",
        address: "852 Đường I, Quận 9, TP.HCM",
        gender: "Nam",
        dob: 1980
    },
    {
        userID: 110,
        fullName: "Phan Thị K",
        phoneNumber: "0901122334",
        email: "phanthik@gmail.com",
        address: "369 Đường K, Quận 10, TP.HCM",
        gender: "Nữ",
        dob: 1990
    },
    {
        userID: 111,
        fullName: "Lê Thị E",
        phoneNumber: "0912345670",
        email: "lethie@gmail.com",
        address: "159 Đường E, Quận 11, TP.HCM",
        gender: "Nữ",
        dob: 1998
    },
    {
        userID: 112,
        fullName: "Phạm Văn G",
        phoneNumber: "0903344556",
        email: "phamvanng@gmail.com",
        address: "753 Đường G, Quận 12, TP.HCM",
        gender: "Nam",
        dob: 2000
    }
];

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
            note: "Tôi muốn lấy mẫu tại nhà.",
            participants: [
                {
                    participantID: 1,
                    fullName: "Nguyễn Văn A",
                    gender: "Nam",
                    dob: 1980,
                    relationship: "Cha nghi vấn",
                    sampleType: "Máu",
                    collectionMethod: "Tại trung tâm"
                },
                {
                    participantID: 2,
                    fullName: "Nguyễn Văn B",
                    gender: "Nam",
                    dob: 2010,
                    relationship: "Con",
                    sampleType: "Niêm mạc miệng",
                    collectionMethod: "Tại nhà"
                }
            ]
        },
        {
            bookingID: 2,
            userID: 102,
            serviceID: 202,
            customerName: "Trần Thị B",
            phoneNumber: "0912345678",
            service: "Xét nghiệm thai nhi",
            serviceType: "Dân sự", // Đã sửa lại
            packageType: "Lấy nhanh",
            numberSample: 2,
            bookingDate: "2024-06-27",
            status: "Chờ lấy mẫu", // Đổi từ "Đã xác nhận" sang "Chờ lấy mẫu"
            totalPrice: 1200000,
            appointmentDate: "2024-06-28",
            note: "Tôi cần kết quả gấp.",
            participants: [
                {
                    participantID: 1,
                    fullName: "Trần Thị B",
                    gender: "Nữ",
                    dob: 1985,
                    relationship: "Mẹ nghi vấn",
                    sampleType: "Máu",
                    collectionMethod: "Tại trung tâm"
                },
                {
                    participantID: 2,
                    fullName: "Trần Văn D",
                    gender: "Nam",
                    dob: 2012,
                    relationship: "Con",
                    sampleType: "Tóc",
                    collectionMethod: "Tại nhà"
                }
            ]
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
            status: "Chờ lấy mẫu",
            totalPrice: 3200000,
            appointmentDate: "2024-06-29",
            note: "Tôi muốn được tư vấn thêm.",
            participants: [
                { participantID: 1, name: "Nguyễn Văn A", relationship: "Cha" },
                { participantID: 2, name: "Nguyễn Văn B", relationship: "Con" }
            ]
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
            status: "Chờ kết quả", // Đổi từ "Đã lấy mẫu" sang "Chờ kết quả"
            totalPrice: 2700000,
            appointmentDate: "2024-06-27",
            note: "Tôi muốn đổi lịch lấy mẫu.",
            participants: [
                { participantID: 1, name: "Nguyễn Văn A", relationship: "Cha" },
                { participantID: 2, name: "Nguyễn Văn B", relationship: "Con" }
            ]
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
            status: "Chờ kết quả",
            totalPrice: 2500000,
            appointmentDate: "2024-06-26",
            note: "Tôi muốn lấy mẫu tại nhà.",
            participants: [
                { participantID: 1, name: "Nguyễn Văn A", relationship: "Cha" },
                { participantID: 2, name: "Nguyễn Văn B", relationship: "Con" }
            ]
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
            status: "Chờ giám định pháp lý", // Đổi từ "Đã có kết quả" sang "Chờ giám định pháp lý" (nếu là Hành chính) hoặc "Hoàn thành" (nếu Dân sự)
            totalPrice: 3500000,
            appointmentDate: "2024-06-25",
            note: "Tôi rất hài lòng với dịch vụ.",
            participants: [
                { participantID: 1, name: "Nguyễn Văn A", relationship: "Cha" },
                { participantID: 2, name: "Nguyễn Văn B", relationship: "Con" }
            ]
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
            status: "Chờ giám định pháp lý",
            totalPrice: 1800000,
            appointmentDate: "2024-06-24",
            note: "Tôi muốn lấy mẫu ngoài giờ.",
            participants: [
                { participantID: 1, name: "Nguyễn Văn A", relationship: "Cha" },
                { participantID: 2, name: "Nguyễn Văn B", relationship: "Con" }
            ]
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
            status: "Hoàn thành",
            totalPrice: 2700000,
            appointmentDate: "2024-06-23",
            note: "Tôi muốn đổi địa điểm lấy mẫu.",
            participants: [
                { participantID: 1, name: "Nguyễn Văn A", relationship: "Cha" },
                { participantID: 2, name: "Nguyễn Văn B", relationship: "Con" }
            ]
        },
        {
            bookingID: 9,
            userID: 109,
            serviceID: 209,
            customerName: "Bùi Văn I",
            phoneNumber: "0911555777",
            email: "buivani@gmail.com",
            address: "852 Đường I, Quận 9, TP.HCM",
            gender: "Nam",
            dob: 1980,
            service: "Xét nghiệm anh em ruột",
            serviceType: "Dân sự",
            packageType: "Tiêu chuẩn",
            numberSample: 3,
            bookingDate: "2024-06-20",
            status: "Đã hủy",
            totalPrice: 3300000,
            appointmentDate: "2024-06-22",
            note: "Tôi muốn nhận kết quả qua email.",
            participants: [
                { participantID: 1, name: "Nguyễn Văn A", relationship: "Cha" },
                { participantID: 2, name: "Nguyễn Văn B", relationship: "Con" }
            ]
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
            status: "Không xác nhận",
            totalPrice: 1900000,
            appointmentDate: "2024-06-21",
            note: "Tôi muốn trả kết quả sớm.",
            participants: [
                { participantID: 1, name: "Nguyễn Văn A", relationship: "Cha" },
                { participantID: 2, name: "Nguyễn Văn B", relationship: "Con" }
            ]
        },
        {
            bookingID: 11,
            userID: 111,
            serviceID: 211,
            customerName: "Lê Thị E",
            phoneNumber: "0912345670",
            service: "Xét nghiệm thai nhi",
            serviceType: "Hành chính",
            packageType: "Tiêu chuẩn",
            numberSample: 2,
            bookingDate: "2024-06-29",
            status: "Chờ xác nhận",
            totalPrice: 2500000,
            appointmentDate: "2024-07-01",
            note: "Lần đầu tiên làm xét nghiệm.",
            participants: [
                {
                    participantID: 1,
                    fullName: "Lê Thị E",
                    gender: "Nữ",
                    dob: 1990,
                    relationship: "Thai nhi (Mẫu từ mẹ)",
                    sampleType: "Máu mẹ",
                    collectionMethod: "Tại trung tâm",
                    personalId: "1122334455",
                    address: "789 Đường C, Quận 3, TP.HCM",
                    relationToRegistrant: "Bản thân"
                },
                {
                    participantID: 2,
                    fullName: "Nguyễn Văn F",
                    gender: "Nam",
                    dob: 1988,
                    relationship: "Cha nghi vấn",
                    sampleType: "Máu",
                    collectionMethod: "Tại nhà",
                    personalId: "5566778899",
                    address: "789 Đường C, Quận 3, TP.HCM",
                    relationToRegistrant: "Chồng"
                }
            ]
        },
        {
            bookingID: 12,
            userID: 112,
            serviceID: 212,
            customerName: "Phạm Văn G",
            phoneNumber: "0903344556",
            service: "Xét nghiệm cha con",
            serviceType: "Dân sự",
            packageType: "Tiêu chuẩn",
            numberSample: 3,
            bookingDate: "2024-07-01",
            status: "Chờ xác nhận",
            totalPrice: 3000000,
            appointmentDate: "2024-07-03",
            note: "Yêu cầu lấy mẫu tại nhà.",
            participants: [
                {
                    participantID: 1,
                    fullName: "Phạm Văn G",
                    gender: "Nam",
                    dob: 2000,
                    relationship: "Anh",
                    sampleType: "Niêm mạc miệng",
                    collectionMethod: "Tại trung tâm",
                    personalId: "2233445566",
                    address: "101 Đường D, Quận 4, TP.HCM",
                    relationToRegistrant: "Bản thân"
                },
                {
                    participantID: 2,
                    fullName: "Phạm Văn H",
                    gender: "Nam",
                    dob: 2002,
                    relationship: "Em",
                    sampleType: "Tóc",
                    collectionMethod: "Tại nhà",
                    personalId: "6677889900",
                    address: "101 Đường D, Quận 4, TP.HCM",
                    relationToRegistrant: "Em"
                },
                {
                    participantID: 3,
                    fullName: "Ngô Thị I",
                    gender: "Nữ",
                    dob: 1975,
                    relationship: "Mẹ",
                    sampleType: "Máu",
                    collectionMethod: "Tại trung tâm",
                    personalId: "3344556677",
                    address: "101 Đường D, Quận 4, TP.HCM",
                    relationToRegistrant: "Mẹ"
                }
            ]
        }
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterService, setFilterService] = useState("all");
    const [filterServiceType, setFilterServiceType] = useState("all");
    const [filterNumberSample, setFilterNumberSample] = useState("all");
    const [filterAppointmentDate, setFilterAppointmentDate] = useState("");
    const [filterPackageType, setFilterPackageType] = useState("all");

    // New sorting states
    const [sortField, setSortField] = useState("");
    const [sortDirection, setSortDirection] = useState("asc"); // "asc" or "desc"

    const [showSampleModal, setShowSampleModal] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);
    const [sampleInfos, setSampleInfos] = useState([]);
    const [viewBooking, setViewBooking] = useState(null);
    const [viewUser, setViewUser] = useState(null);
    const [editBooking, setEditBooking] = useState(null);

    const STATUS_MAP = {
        "Chờ xác nhận": { label: "Chờ xác nhận", className: "cho-xac-nhan" },
        "Chờ lấy mẫu": { label: "Chờ lấy mẫu", className: "cho-lay-mau" },
        "Chờ kết quả": { label: "Chờ kết quả", className: "cho-ket-qua" },
        "Chờ giám định pháp lý": { label: "Chờ giám định pháp lý", className: "cho-giam-dinh-phap-ly" },
        "Hoàn thành": { label: "Hoàn thành", className: "hoan-thanh" },
        "Đã hủy": { label: "Đã hủy", className: "da-huy" },
        "Không xác nhận": { label: "Không xác nhận", className: "khong-xac-nhan" }
    };

    const availableStatuses = [
        { value: "all", label: "Tất cả" },
        ...Object.entries(STATUS_MAP).map(([value, { label }]) => ({ value, label }))
    ];

    const getStatusLabel = (status) => STATUS_MAP[status]?.label || status;
    const getStatusClass = (status) => {
        switch (status) {
            case "Chờ xác nhận": return "cho-xac-nhan";
            case "Chờ lấy mẫu": return "cho-lay-mau";
            case "Chờ kết quả": return "cho-ket-qua";
            case "Chờ giám định pháp lý": return "cho-giam-dinh-phap-ly";
            case "Hoàn thành": return "hoan-thanh";
            case "Đã hủy": return "da-huy";
            case "Không xác nhận": return "khong-xac-nhan";
            default: return "";
        }
    };

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

    // Enhanced filtering logic
    const filteredBookings = bookings.filter(b => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = searchTerm === "" ||
            b.customerName.toLowerCase().includes(searchLower) ||
            b.phoneNumber.includes(searchTerm) ||
            b.service.toLowerCase().includes(searchLower) ||
            b.bookingID.toString().includes(searchTerm) ||
            b.userID.toString().includes(searchTerm) ||
            (b.serviceType && b.serviceType.toLowerCase().includes(searchLower));

        const matchesStatus = filterStatus === "all" || b.status === filterStatus;
        const matchesService = filterService === "all" || b.service === filterService;
        const matchesServiceType = filterServiceType === "all" || b.serviceType === filterServiceType;
        const matchesPackageType = filterPackageType === "all" || b.packageType === filterPackageType;
        const matchesNumberSample = filterNumberSample === "all" || b.numberSample.toString() === filterNumberSample;
        const matchesAppointmentDate = filterAppointmentDate === "" || b.appointmentDate === filterAppointmentDate;

        return matchesSearch && matchesStatus && matchesService &&
            matchesServiceType && matchesPackageType &&
            matchesNumberSample && matchesAppointmentDate;
    });

    // Sorting logic - chỉ cho bookingDate và appointmentDate
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

    // Handle sorting - chỉ cho bookingDate và appointmentDate
    const handleSort = (field) => {
        if (field !== "bookingDate" && field !== "appointmentDate") return;

        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    // Get sort icon - chỉ cho bookingDate và appointmentDate
    const getSortIcon = (field) => {
        if (field !== "bookingDate" && field !== "appointmentDate") return null;
        if (sortField !== field) return <MdSort size={16} color="#999" />;
        return sortDirection === "asc" ?
            <MdSort size={16} color="#2563eb" style={{ transform: "rotate(180deg)" }} /> :
            <MdSort size={16} color="#2563eb" />;
    };

    // Reset filters and sorting
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

    const handleConfirm = (bookingID) => {
        if (!window.confirm("Bạn có chắc chắn muốn chuyển trạng thái đơn này?")) return;
        setBookings(prev =>
            prev.map(b =>
                b.bookingID === bookingID
                    ? { ...b, status: getNextStatus(b.status, b.serviceType) }
                    : b
            )
        );
    };

    const handleReject = (bookingID) => {
        if (!window.confirm("Bạn có chắc chắn muốn chuyển trạng thái đơn này sang 'Không xác nhận'?")) return;
        setBookings(prev =>
            prev.map(b =>
                b.bookingID === bookingID
                    ? { ...b, status: "Không xác nhận" }
                    : b
            )
        );
    };

    const handleNextStep = (bookingID) => {
        const booking = bookings.find(b => b.bookingID === bookingID);
        if (booking.status === "Chờ lấy mẫu") {
            setCurrentBooking(booking);
            setSampleInfos(Array(booking.numberSample).fill(""));
            setShowSampleModal(true);
        } else {
            if (!window.confirm("Bạn có chắc chắn muốn chuyển trạng thái đơn này?")) return;
            setBookings(prev =>
                prev.map(b =>
                    b.bookingID === bookingID
                        ? { ...b, status: getNextStatus(b.status, b.serviceType) }
                        : b
                )
            );
        }
    };

    const handleSampleInfoChange = (idx, value) => {
        setSampleInfos(prev => {
            const arr = [...prev];
            arr[idx] = value;
            return arr;
        });
    };

    const handleConfirmSamples = () => {
        if (sampleInfos.some(id => !id)) {
            alert("Vui lòng chọn đầy đủ ID mẫu cho tất cả các mẫu!");
            return;
        }
        if (!window.confirm("Bạn có chắc chắn muốn xác nhận và chuyển trạng thái đơn này?")) return;
        setBookings(prev =>
            prev.map(b =>
                b.bookingID === currentBooking.bookingID
                    ? { ...b, status: "Chờ kết quả", sampleInfos }
                    : b
            )
        );
        setShowSampleModal(false);
        setCurrentBooking(null);
        setSampleInfos([]);
    };

    const handleViewDetail = (booking) => {
        setViewBooking(booking);
    };

    const handleEditAndResubmit = (booking) => {
        setEditBooking({
            ...booking,
            isResubmit: true // Flag để biết đây là resubmit
        });
    };

    // Cập nhật handleEditBooking để hỗ trợ resubmit
    const handleEditBooking = (booking) => {
        setEditBooking({
            ...booking,
            isResubmit: false
        });
    };

    const handleViewUser = (userID) => {
        const user = users.find(u => u.userID === userID);
        setViewUser(user);
    };

    const samples = [
        { id: "S001", name: "Mẫu máu 1" },
        { id: "S002", name: "Mẫu máu 2" },
        { id: "S003", name: "Mẫu tóc 1" },
        // ... các mẫu khác
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "Chờ xác nhận": return "#f07903";
            case "Chờ lấy mẫu": return "#2563eb";
            case "Chờ kết quả": return "#059669";
            case "Chờ giám định pháp lý": return "#a21caf";
            case "Hoàn thành": return "#16a34a";
            case "Không xác nhận": return "#dc2626";
            case "Đã hủy": return "#6b7280";
            default: return "#222";
        }
    };
    return (
        <div className="booking-container">
            <div className="booking-content">
                <Card className="booking-list-card">
                    <div className="booking-header-row">
                        <h2 className="booking-title">Danh sách Đặt lịch</h2>
                        {/* Phần thống kê tổng quan */}
                        <div className="stats-container">
                            <div className="stats-grid">
                                <div className="stat-card stat-card--total">
                                    <div className="stat-icon">
                                        <MdVisibility size={24} />
                                    </div>
                                    <div className="stat-content">
                                        <span className="stat-label">Tổng đơn</span>
                                        <span className="stat-value">{bookings.length}</span>
                                    </div>
                                </div>

                                <div className="stat-card stat-card--pending">
                                    <div className="stat-icon">
                                        <MdCheckCircle size={24} />
                                    </div>
                                    <div className="stat-content">
                                        <span className="stat-label">Chờ xác nhận</span>
                                        <span className="stat-value">
                                            {bookings.filter(b => b.status === "Chờ xác nhận").length}
                                        </span>
                                    </div>
                                </div>

                                <div className="stat-card stat-card--processing">
                                    <div className="stat-icon">
                                        <MdArrowForward size={24} />
                                    </div>
                                    <div className="stat-content">
                                        <span className="stat-label">Đang xử lý</span>
                                        <span className="stat-value">
                                            {bookings.filter(b =>
                                                ["Chờ lấy mẫu", "Chờ kết quả", "Chờ giám định pháp lý"].includes(b.status)
                                            ).length}
                                        </span>
                                    </div>
                                </div>

                                <div className="stat-card stat-card--completed">
                                    <div className="stat-icon">
                                        <MdCheckCircle size={24} />
                                    </div>
                                    <div className="stat-content">
                                        <span className="stat-label">Hoàn thành</span>
                                        <span className="stat-value">
                                            {bookings.filter(b => b.status === "Hoàn thành").length}
                                        </span>
                                    </div>
                                </div>

                                <div className="stat-card stat-card--cancelled">
                                    <div className="stat-icon">
                                        <MdCancel size={24} />
                                    </div>
                                    <div className="stat-content">
                                        <span className="stat-label">Đã hủy/Từ chối</span>
                                        <span className="stat-value">
                                            {bookings.filter(b =>
                                                ["Đã hủy", "Không xác nhận"].includes(b.status)
                                            ).length}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Phần tìm kiếm và bộ lọc */}
                        <div className="booking-controls" style={{ flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo mã đơn, mã KH, tên khách hàng, SĐT, dịch vụ..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="search-input"
                                style={{ minWidth: 300 }}
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
                                style={{
                                    padding: "8px 16px",
                                    backgroundColor: "#f3f4f6",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "14px"
                                }}
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
                                            <td>{b.userID}</td>
                                            <td>{b.service}</td>
                                            <td>{b.serviceType}</td>
                                            <td>{b.packageType}</td>
                                            <td>{b.numberSample}</td>
                                            <td>{b.bookingDate}</td>
                                            <td>{b.appointmentDate || "-"}</td>
                                            <td>{b.totalPrice?.toLocaleString() || "-"}</td>
                                            <td>
                                                <div className="status-action-row">
                                                    <span
                                                        className={`status-badge status-badge--${getStatusClass(b.status)}`}
                                                        style={{ color: getStatusColor(b.status), borderColor: getStatusColor(b.status) }}
                                                    >
                                                        {getStatusLabel(b.status)}
                                                    </span>
                                                    {b.status === "Chờ xác nhận" ? (
                                                        <>
                                                            <MdCheckCircle
                                                                size={22}
                                                                color="#22c55e"
                                                                style={{ cursor: "pointer" }}
                                                                title="Xác nhận"
                                                                onClick={() => handleConfirm(b.bookingID)}
                                                            />
                                                            <MdCancel
                                                                size={22}
                                                                color="#f87171"
                                                                style={{ cursor: "pointer" }}
                                                                title="Không xác nhận"
                                                                onClick={() => handleReject(b.bookingID)}
                                                            />
                                                        </>
                                                    ) : b.status === "Không xác nhận" ? (
                                                        <MdEdit
                                                            size={22}
                                                            color="#3b82f6"
                                                            style={{ cursor: "pointer" }}
                                                            title="Chỉnh sửa và gửi lại xác nhận"
                                                            onClick={() => handleEditAndResubmit(b)}
                                                        />
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
                            <p>Không tìm thấy đặt lịch nào phù hợp với tiêu chí tìm kiếm.</p>
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
                        <div className="modal-content">
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
                                        {samples.map(sample => (
                                            <option key={sample.id} value={sample.id}>
                                                {sample.id} - {sample.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                            <button onClick={handleConfirmSamples} className="confirm-btn" style={{ marginRight: 8 }}>Xác nhận</button>
                            <button onClick={() => setShowSampleModal(false)} className="reject-btn">Hủy</button>
                        </div>
                    </div>
                )}
                {/* Modal xem chi tiết đơn */}
                {viewBooking && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>Chi tiết đơn #{viewBooking.bookingID}</h3>
                            <p><b>Mã Đơn:</b> {viewBooking.bookingID}</p>
                            <p><b>Mã KH:</b> {viewBooking.userID}</p>
                            <p><b>Dịch vụ:</b> {viewBooking.service}</p>
                            <p><b>Loại dịch vụ:</b> {viewBooking.serviceType}</p>
                            <p><b>Gói dịch vụ:</b> {viewBooking.packageType}</p>
                            <p><b>Số mẫu:</b> {viewBooking.numberSample}</p>
                            <p><b>Ngày đặt:</b> {viewBooking.bookingDate}</p>
                            <p><b>Ngày hẹn:</b> {viewBooking.appointmentDate}</p>
                            <p><b>Tổng tiền:</b> {viewBooking.totalPrice?.toLocaleString() || "-"}</p>
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
                                        {viewBooking.serviceType === "Hành chính" && (
                                            <>
                                                <th>Mã định danh</th>
                                                <th>Địa chỉ</th>
                                                <th>Quan hệ với người đăng ký</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewBooking.participants?.map((p, idx) => (
                                        <tr key={idx}>
                                            <td>{p.participantID}</td>
                                            <td>{p.fullName}</td>
                                            <td>{p.gender}</td>
                                            <td>{p.dob}</td>
                                            <td>{p.relationship}</td>
                                            <td>{p.sampleType}</td>
                                            <td>{p.collectionMethod}</td>
                                            {viewBooking.serviceType === "Hành chính" && (
                                                <>
                                                    <td>{p.personalId}</td>
                                                    <td>{p.address}</td>
                                                    <td>{p.relationToRegistrant}</td>
                                                </>
                                            )}
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
                        <div className="modal-content">
                            <h3>Thông tin người đăng ký</h3>
                            <p><b>Mã KH:</b> {viewUser.userID}</p>
                            <p><b>Họ tên:</b> {viewUser.fullName}</p>
                            <p><b>Số điện thoại:</b> {viewUser.phoneNumber}</p>
                            <p><b>Email:</b> {viewUser.email}</p>
                            <p><b>Địa chỉ:</b> {viewUser.address}</p>
                            <p><b>Giới tính:</b> {viewUser.gender}</p>
                            <p><b>Năm sinh:</b> {viewUser.dob}</p>
                            <button className="confirm-btn" onClick={() => setViewUser(null)}>Đóng</button>
                        </div>
                    </div>
                )}
                {/* Modal chỉnh sửa thông tin đơn */}
                {editBooking && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>
                                {editBooking.status === "Không xác nhận"
                                    ? `Chỉnh sửa đơn bị từ chối #${editBooking.bookingID}`
                                    : `Cập nhật thông tin đơn #${editBooking.bookingID}`
                                }
                            </h3>

                            {editBooking.status === "Không xác nhận" && (
                                <div style={{
                                    background: "#fef2f2",
                                    border: "1px solid #fecaca",
                                    borderRadius: "8px",
                                    padding: "12px",
                                    marginBottom: "16px",
                                    color: "#dc2626"
                                }}>
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
                                    value={editBooking.service}
                                    onChange={e => setEditBooking({ ...editBooking, service: e.target.value })}
                                >
                                    {serviceOptions.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Loại dịch vụ:</label>
                                <select
                                    value={editBooking.serviceType}
                                    onChange={e => setEditBooking({ ...editBooking, serviceType: e.target.value })}
                                >
                                    {serviceTypeOptions.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Gói dịch vụ:</label>
                                <select
                                    value={editBooking.packageType}
                                    onChange={e => setEditBooking({ ...editBooking, packageType: e.target.value })}
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
                                        onClick={() => {
                                            if (window.confirm("Xác nhận chỉnh sửa và gửi lại đơn để xác nhận?")) {
                                                setBookings(prev =>
                                                    prev.map(b =>
                                                        b.bookingID === editBooking.bookingID
                                                            ? { ...editBooking, status: "Chờ xác nhận" }
                                                            : b
                                                    )
                                                );
                                                setEditBooking(null);
                                                alert("Đơn đã được chỉnh sửa và gửi lại để xác nhận!");
                                            }
                                        }}
                                    >
                                        Lưu & Gửi lại xác nhận
                                    </button>
                                ) : (
                                    <button
                                        className="confirm-btn"
                                        onClick={() => {
                                            if (window.confirm("Xác nhận lưu thay đổi?")) {
                                                setBookings(prev =>
                                                    prev.map(b =>
                                                        b.bookingID === editBooking.bookingID
                                                            ? { ...editBooking }
                                                            : b
                                                    )
                                                );
                                                setEditBooking(null);
                                                alert("Thông tin đơn đã được cập nhật!");
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