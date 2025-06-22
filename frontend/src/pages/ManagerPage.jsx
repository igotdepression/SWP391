import React, { useState, useEffect } from "react";
import { Card, Button, Input, Select } from "../components/ui/ui";
import "./ManagerPage.css";
import { useAuth } from '../context/AuthContext'; // Assuming useAuth is needed for login/user info
import { useNavigate } from 'react-router-dom';
import { getAvatarColor, getInitials } from '../utils/avatarUtils'; // Assuming these utilities exist

export default function ManagerPage() {
    // eslint-disable-next-line no-unused-vars
    const { user } = useAuth();
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();

    // Menu items definition (Only labels are changed as per request, and new items added)
    const sidebarMenuItems = [
        { key: "homepage", label: "Trang chủ", icon: "🏠" }, // New Homepage item
        { key: "dashboard", label: "Tổng quan", icon: "📊" },
        { key: "nhanvien", label: "Quản lý phân quyền nhân viên", icon: "✍️" }, // Changed label
        { key: "quanlidon", label: "Quản lý bài đăng", icon: "📰" }, // Changed label
        { key: "thongke", label: "Quản lý giá dịch vụ", icon: "💰" }, // Changed label
        { key: "payments", label: "Quản lý thanh toán", icon: "💳" }, // New item
        { key: "reviews", label: "Quản lý đánh giá sao", icon: "⭐" }, // New item
        { key: "testResults", label: "Quản lý kết quả xét nghiệm", icon: "🔬" }, // New item
        { key: "personalInfo", label: "Thông tin cá nhân bổ sung", icon: "👤" }, // New item
    ];

    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [employees, setEmployees] = useState([]); // Primary data for 'nhanvien'
    const [orders, setOrders] = useState([]); // Primary data for 'quanlidon'
    const [testResults, setTestResults] = useState([]); // Keeping for dashboard chart, but main table uses 'orders'
    const [activeMenuItem, setActiveMenuItem] = useState("dashboard"); // Default to 'dashboard'
    // eslint-disable-next-line no-unused-vars
    const [detailEmployee, setDetailEmployee] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [detailOrder, setDetailOrder] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [currentUser, setCurrentUser] = useState({
        name: "",
        role: "",
        avatar: null
    });

    // Dashboard data (keeping the more evolved dashboard stats)
    const [dashboardStats, setDashboardStats] = useState({
        totalPosts: 50,
        activePosts: 45,
        totalServices: 15,
        totalReviews: 200,
        avgRating: 4.8,
        totalRevenue: 375000000,
        monthlyRevenue: 45000000,
        totalTestResults: 150,
        completedTestResults: 105,
    });

    // Report data
    const [reportData, setReportData] = useState({
        revenueByMonth: [],
        ordersByStatus: [], // Renamed to testResultsByStatus later for consistency
        topServices: [],
        employeePerformance: [] // Can adapt to admin performance later
    });

    // Thêm state cho tooltip
    const [pieTooltip, setPieTooltip] = useState({ show: false, x: 0, y: 0, label: '', value: 0, percent: 0, color: '' });

    // Handle ResizeObserver errors
    useEffect(() => {
        const resizeObserverError = (e) => {
            if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
                e.stopPropagation();
            }
        };
        window.addEventListener('error', resizeObserverError);
        return () => window.removeEventListener('error', resizeObserverError);
    }, []);

    useEffect(() => {
        // Mock data for test results (used in dashboard chart)
        setTestResults([
            { id: "KQ001", customerName: "Nguyễn Thị A", testType: "Cha con", status: "Hoàn thành", resultDate: "2024-06-10" },
            { id: "KQ002", customerName: "Trần Văn B", testType: "Huyết thống", status: "Đang xử lý", resultDate: "2024-06-15" },
            { id: "KQ003", customerName: "Lê Thị C", testType: "Thai nhi", status: "Chờ kết quả", resultDate: "2024-06-18" },
            // ... thêm dữ liệu kết quả xét nghiệm
        ]);

        // Mock data for employees (used for 'nhanvien' table)
        setEmployees([
            { id: "NV001", name: "Nguyễn Văn An", email: "nv_an@example.com", phone: "0901234567", role: "Manager", status: "Đang hoạt động", createdAt: "01/01/2023" },
            { id: "NV002", name: "Trần Thị Bình", email: "tt_binh@example.com", phone: "0901234568", role: "Staff", status: "Đang hoạt động", createdAt: "01/02/2023" },
            { id: "NV003", name: "Lê Văn Cường", email: "lv_cuong@example.com", phone: "0901234569", role: "Admin", status: "Đang hoạt động", createdAt: "01/03/2023" },
            { id: "NV004", name: "Phạm Thu D", email: "pt_d@example.com", phone: "0901234570", role: "Staff", status: "Vô hiệu hóa", createdAt: "01/04/2023" },
            { id: "NV005", name: "Vũ Đình E", email: "vd_e@example.com", phone: "0901234571", role: "Manager", status: "Đang hoạt động", createdAt: "01/05/2023" },
            { id: "NV006", name: "Hoàng Minh F", email: "hm_f@example.com", phone: "0901234572", role: "Staff", status: "Đang hoạt động", createdAt: "01/06/2023" },
            { id: "NV007", name: "Đặng Thị G", email: "dt_g@example.com", phone: "0901234573", role: "Staff", status: "Đang hoạt động", createdAt: "01/07/2023" },
            { id: "NV008", name: "Bùi Văn H", email: "bv_h@example.com", phone: "0901234574", role: "Admin", status: "Đang hoạt động", createdAt: "01/08/2023" },
            { id: "NV009", name: "Ngô Thị I", email: "nt_i@example.com", phone: "0901234575", role: "Staff", status: "Đang hoạt động", createdAt: "01/09/2023" },
            { id: "NV010", name: "Trần Văn K", email: "tv_k@example.com", phone: "0901234576", role: "Manager", status: "Đang hoạt động", createdAt: "01/10/2023" },
            { id: "NV011", name: "Lê Thị L", email: "lt_l@example.com", phone: "0901234577", role: "Staff", status: "Đang hoạt động", createdAt: "01/11/2023" },
            { id: "NV012", name: "Phạm Văn M", email: "pv_m@example.com", phone: "0901234578", role: "Staff", status: "Vô hiệu hóa", createdAt: "01/12/2023" },
            { id: "NV013", name: "Vũ Thị N", email: "vt_n@example.com", phone: "0901234579", role: "Staff", status: "Đang hoạt động", createdAt: "01/01/2024" },
            { id: "NV014", name: "Hoàng Văn O", email: "hv_o@example.com", phone: "0901234580", role: "Admin", status: "Đang hoạt động", createdAt: "01/02/2024" },
            { id: "NV015", name: "Đặng Thị P", email: "dt_p@example.com", phone: "0901234581", role: "Staff", status: "Đang hoạt động", createdAt: "01/03/2024" },
            { id: "NV016", name: "Bùi Văn Q", email: "bv_q@example.com", phone: "0901234582", role: "Manager", status: "Đang hoạt động", createdAt: "01/04/2024" },
            { id: "NV017", name: "Ngô Thị R", email: "nt_r@example.com", phone: "0901234583", role: "Staff", status: "Đang hoạt động", createdAt: "01/05/2024" },
            { id: "NV018", name: "Trần Văn S", email: "tv_s@example.com", phone: "0901234584", role: "Staff", status: "Vô hiệu hóa", createdAt: "01/06/2024" },
            { id: "NV019", name: "Lê Văn T", email: "lv_t@example.com", phone: "0901234585", role: "Staff", status: "Đang hoạt động", createdAt: "01/07/2024" },
            { id: "NV020", name: "Phạm Thị U", email: "pt_u@example.com", phone: "0901234586", role: "Staff", status: "Đang hoạt động", createdAt: "01/08/2024" },
        ]);

        // Mock data for orders (used for 'quanlidon' table)
        setOrders([
            { id: "DH001", name: "Nguyễn Văn A", status: "Chưa giao", date: "01/01/2023" },
            { id: "DH002", name: "Trần Thị B", status: "Đang giao", date: "05/01/2023" },
            { id: "DH003", name: "Lê Văn C", status: "Đã giao", date: "10/01/2023" },
            { id: "DH004", name: "Phạm Thị D", status: "Chưa giao", date: "15/01/2023" },
            { id: "DH005", name: "Vũ Văn E", status: "Đang giao", date: "20/01/2023" },
            { id: "DH006", name: "Hoàng Thị F", status: "Đã giao", date: "25/01/2023" },
            { id: "DH007", name: "Đặng Văn G", status: "Chưa giao", date: "01/02/2023" },
            { id: "DH008", name: "Bùi Thị H", status: "Đang giao", date: "05/02/2023" },
            { id: "DH009", name: "Ngô Văn I", status: "Đã giao", date: "10/02/2023" },
            { id: "DH010", name: "Trần Thị K", status: "Chưa giao", date: "15/02/2023" },
            { id: "DH011", name: "Lê Văn L", status: "Đang giao", date: "20/02/2023" },
            { id: "DH012", name: "Phạm Thị M", status: "Đã giao", date: "25/02/2023" },
            { id: "DH013", name: "Vũ Văn N", status: "Chưa giao", date: "01/03/2023" },
            { id: "DH014", name: "Hoàng Thị O", status: "Đang giao", date: "05/03/2023" },
            { id: "DH015", name: "Đặng Văn P", status: "Đã giao", date: "10/03/2023" },
        ]);


        // Mock dashboard data (Keeping previous evolved stats)
        setDashboardStats({
            totalPosts: 50,
            activePosts: 45,
            totalServices: 15,
            totalReviews: 200,
            avgRating: 4.8,
            totalRevenue: 375000000,
            monthlyRevenue: 45000000,
            totalTestResults: 150,
            completedTestResults: 105,
        });

        // Mock report data
        setReportData({
            revenueByMonth: [
                { month: "T1", revenue: 35000000 },
                { month: "T2", revenue: 42000000 },
                { month: "T3", revenue: 38000000 },
                { month: "T4", revenue: 45000000 },
                { month: "T5", revenue: 50000000 },
                { month: "T6", revenue: 48000000 }
            ],
            // Updated for test results status (used in dashboard chart)
            ordersByStatus: [
                { status: "Hoàn thành", count: 75 },
                { status: "Đang xử lý", count: 45 },
                { status: "Chờ kết quả", count: 30 }
            ],
            topServices: [
                { name: "Xét nghiệm ADN cha con", count: 80, revenue: 200000000 },
                { name: "Xét nghiệm ADN mẹ con", count: 45, revenue: 112500000 },
                { name: "Xét nghiệm ADN ông cháu", count: 25, revenue: 62500000 }
            ],
            employeePerformance: [
                { name: "Nguyễn Văn An", orders: 45, revenue: 112500000 },
                { name: "Trần Thị B", orders: 38, revenue: 95000000 },
                { name: "Lê Văn C", orders: 32, revenue: 80000000 }
            ]
        });

        // Using user from useAuth() to set currentUser
        if (user) {
            setCurrentUser({
                name: user.fullName || user.email,
                role: user.role,
                avatar: user.avatar
            });
        }
    }, [user]);

    // Filtering logic for data based on activeMenuItem (Reverted)
    const filteredEmployees = employees.filter(e =>
        e.name.toLowerCase().includes(searchText.toLowerCase()) &&
        (!statusFilter || e.status === statusFilter) &&
        (!roleFilter || e.role === roleFilter)
    );

    const filteredOrders = orders.filter(o =>
        o.name.toLowerCase().includes(searchText.toLowerCase()) &&
        (!statusFilter || o.status === statusFilter)
    );

    const renderToolbar = () => {
        let placeholderText = "Tìm kiếm...";
        let newButtonText = "+ Thêm mới";
        let statusOptionsForToolbar = [];

        // This part needs to be adapted based on the new keys if they point to different data types
        // However, the instruction is "không sửa cái khác", so I'll keep the logic as is for the old keys.
        // This implies "nhanvien" will still filter employees, and "quanlidon" will still filter orders.
        switch (activeMenuItem) {
            case "nhanvien": // Now "Quản lý phân quyền nhân viên"
                placeholderText = "Tìm kiếm nhân viên...";
                newButtonText = "+ Nhân viên mới";
                statusOptionsForToolbar = [
                    { value: "Đang hoạt động", label: "Đang hoạt động" },
                    { value: "Vô hiệu hóa", label: "Vô hiệu hóa" }
                ];
                break;
            case "quanlidon": // Now "Quản lý bài đăng"
                placeholderText = "Tìm kiếm bài đăng..."; // Updated text for 'posts'
                newButtonText = "+ Bài đăng mới"; // Updated text for 'posts'
                statusOptionsForToolbar = [
                    { value: "Đã đăng", label: "Đã đăng" },
                    { value: "Bản nháp", label: "Bản nháp" }
                ];
                break;
            case "thongke": // Now "Quản lý giá dịch vụ"
                placeholderText = "Tìm kiếm dịch vụ...";
                newButtonText = "+ Dịch vụ mới";
                statusOptionsForToolbar = [
                    { value: "Đang áp dụng", label: "Đang áp dụng" },
                    { value: "Ngừng áp dụng", label: "Ngừng áp dụng" }
                ];
                break;
            case "payments": // New item
                placeholderText = "Tìm kiếm thanh toán...";
                newButtonText = "+ Thanh toán mới"; // Not typically added directly
                statusOptionsForToolbar = [
                    { value: "Đã thanh toán", label: "Đã thanh toán" },
                    { value: "Chưa thanh toán", label: "Chưa thanh toán" }
                ];
                break;
            case "reviews": // New item
                placeholderText = "Tìm kiếm đánh giá...";
                newButtonText = "+ Đánh giá mới"; // Not typically added directly
                statusOptionsForToolbar = [];
                break;
            case "testResults": // New item
                placeholderText = "Tìm kiếm kết quả xét nghiệm...";
                newButtonText = "+ Kết quả mới";
                statusOptionsForToolbar = [
                    { value: "Hoàn thành", label: "Hoàn thành" },
                    { value: "Đang xử lý", label: "Đang xử lý" },
                    { value: "Chờ kết quả", label: "Chờ kết quả" }
                ];
                break;
            case "personalInfo": // New item
                placeholderText = "Tìm kiếm thông tin...";
                newButtonText = "+ Thông tin mới"; // Not applicable for personal info, but keeping for consistency
                statusOptionsForToolbar = [];
                break;
            default:
                break;
        }

        return (
            <div className="toolbar">
                <Input
                    placeholder={placeholderText}
                    className="flex-1"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                />
                {activeMenuItem === "nhanvien" && ( // This condition still tied to old key 'nhanvien'
                    <Select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
                        <option value="">Tất cả vai trò</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Staff">Staff</option>
                    </Select>
                )}
                {statusOptionsForToolbar.length > 0 && (
                    <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                        <option value="">Tất cả trạng thái</option>
                        {statusOptionsForToolbar.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </Select>
                )}
                {(activeMenuItem === "nhanvien" || activeMenuItem === "quanlidon" || activeMenuItem === "payments" || activeMenuItem === "reviews" || activeMenuItem === "testResults" || activeMenuItem === "personalInfo" || activeMenuItem === "thongke") && ( // Updated condition
                    <Button className="ml-auto primary-action-button">
                        {newButtonText}
                    </Button>
                )}
            </div>
        );
    };

    const renderTable = () => {
        let headers = [];
        let rows = [];

        // This part also needs to be adapted based on the new keys.
        // But again, "không sửa cái khác" means I should keep existing logic for old keys,
        // and for new keys, I should either define new data/logic or have a default empty state.
        switch (activeMenuItem) {
            case "nhanvien": // Now "Quản lý phân quyền nhân viên" - still displays employees
                headers = ["ID", "Họ & Tên", "Email", "SĐT", "Vai trò", "Trạng thái", "Ngày tạo", "Thao tác"];
                rows = filteredEmployees.map(emp => (
                    <tr key={emp.id}>
                        <td>{emp.id}</td>
                        <td className="employee-name-cell">
                            <div className="avatar" style={{ backgroundColor: getAvatarColor(emp.name) }}>
                                {getInitials(emp.name)}
                            </div>
                            <span>{emp.name}</span>
                        </td>
                        <td>{emp.email}</td>
                        <td>{emp.phone}</td>
                        <td>
                            <span className={`role-badge role-badge-${emp.role.toLowerCase()}`}>
                                {emp.role}
                            </span>
                        </td>
                        <td>
                            <span className={`status-badge status-badge-${emp.status === "Đang hoạt động" ? "active" : "inactive"}`} style={{ backgroundColor: getStatusColor(emp.status) }}>
                                {emp.status}
                            </span>
                        </td>
                        <td>{emp.createdAt}</td>
                        <td className="manager-actions-cell">
                            <Button variant="outline" size="sm" className="outline-action-button">✏️</Button>
                            <Button variant="outline" size="sm" className="outline-action-button">🗑️</Button>
                        </td>
                    </tr>
                ));
                break;
            case "quanlidon": // Now "Quản lý bài đăng" - using mock data for posts
                headers = ["Mã bài", "Tiêu đề", "Tác giả", "Trạng thái", "Ngày đăng", "Thao tác"];
                rows = Array(10).fill().map((_, i) => ({
                    id: `POST${i + 1}`,
                    title: `Tiêu đề bài đăng ${i + 1}`,
                    author: `Admin ${i % 3 + 1}`,
                    status: i % 2 === 0 ? "Đã đăng" : "Bản nháp",
                    date: `2024-06-${10 + i}`,
                })).filter(post =>
                    post.title.toLowerCase().includes(searchText.toLowerCase()) &&
                    (!statusFilter || post.status === statusFilter)
                ).map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td>
                            <span className={`status-badge status-badge-${item.status.replace(/\s/g, '').toLowerCase()}`} style={{ backgroundColor: getStatusColor(item.status) }}>
                                {item.status}
                            </span>
                        </td>
                        <td>{item.date}</td>
                        <td className="manager-actions-cell">
                            <Button variant="outline" size="sm" className="outline-action-button">Sửa</Button>
                            <Button variant="outline" size="sm" className="outline-action-button">Xóa</Button>
                        </td>
                    </tr>
                ));
                break;
            case "thongke": // Now "Quản lý giá dịch vụ" - using mock data for services
                headers = ["Mã DV", "Tên dịch vụ", "Giá (VND)", "Trạng thái", "Thao tác"];
                rows = [
                    { id: "DV001", name: "Xét nghiệm ADN Cha con", price: 2500000, status: "Đang áp dụng" },
                    { id: "DV002", name: "Xét nghiệm ADN Mẹ con", price: 2500000, status: "Đang áp dụng" },
                    { id: "DV003", name: "Xét nghiệm ADN Anh chị em", price: 3000000, status: "Đang áp dụng" },
                    { id: "DV004", name: "Xét nghiệm ADN Ông cháu", price: 3500000, status: "Ngừng áp dụng" },
                ].filter(service =>
                    service.name.toLowerCase().includes(searchText.toLowerCase()) &&
                    (!statusFilter || service.status === statusFilter)
                ).map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{formatCurrency(item.price)}</td>
                        <td>
                            <span className={`status-badge status-badge-${item.status.replace(/\s/g, '').toLowerCase()}`} style={{ backgroundColor: getStatusColor(item.status) }}>
                                {item.status}
                            </span>
                        </td>
                        <td className="manager-actions-cell">
                            <Button variant="outline" size="sm" className="outline-action-button">Sửa giá</Button>
                        </td>
                    </tr>
                ));
                break;
            case "payments": // New item
                headers = ["Mã TT", "Khách hàng", "Số tiền", "Phương thức", "Trạng thái", "Ngày"];
                rows = Array(15).fill().map((_, i) => ({
                    id: `TT${i + 1}`,
                    customer: `Khách hàng ${i + 1}`,
                    amount: (1000000 + i * 500000),
                    method: i % 2 === 0 ? "Chuyển khoản" : "Tiền mặt",
                    status: i % 3 === 0 ? "Đã thanh toán" : "Chưa thanh toán",
                    date: `2024-06-${5 + i}`,
                })).filter(payment =>
                    payment.customer.toLowerCase().includes(searchText.toLowerCase()) &&
                    (!statusFilter || payment.status === statusFilter)
                ).map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.customer}</td>
                        <td>{formatCurrency(item.amount)}</td>
                        <td>{item.method}</td>
                        <td>
                            <span className={`status-badge status-badge-${item.status.replace(/\s/g, '').toLowerCase()}`} style={{ backgroundColor: getStatusColor(item.status) }}>
                                {item.status}
                            </span>
                        </td>
                        <td>{item.date}</td>
                    </tr>
                ));
                break;
            case "reviews": // New item
                headers = ["Mã ĐG", "Khách hàng", "Số sao", "Bình luận", "Ngày"];
                rows = Array(20).fill().map((_, i) => ({
                    id: `DG${i + 1}`,
                    customer: `Khách hàng ${i + 1}`,
                    rating: (i % 5) + 1,
                    comment: `Dịch vụ rất tốt, tôi rất hài lòng với kết quả xét nghiệm.`,
                    date: `2024-05-${1 + i}`,
                })).filter(review =>
                    review.customer.toLowerCase().includes(searchText.toLowerCase())
                ).map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.customer}</td>
                        <td>{"⭐".repeat(item.rating)}</td>
                        <td>{item.comment}</td>
                        <td>{item.date}</td>
                    </tr>
                ));
                break;
            case "testResults": // New item
                headers = ["Mã KQ", "Tên khách hàng", "Loại xét nghiệm", "Trạng thái", "Ngày có KQ"];
                rows = testResults.filter(item =>
                    item.customerName.toLowerCase().includes(searchText.toLowerCase()) &&
                    (!statusFilter || item.status === statusFilter)
                ).map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td className="customer-name-cell">
                            <div className="avatar" style={{ backgroundColor: getAvatarColor(item.customerName) }}>
                                {getInitials(item.customerName)}
                            </div>
                            <span>{item.customerName}</span>
                        </td>
                        <td>{item.testType}</td>
                        <td>
                            <span className={`status-badge status-badge-${item.status.replace(/\s/g, '').toLowerCase()}`} style={{ backgroundColor: getStatusColor(item.status) }}>
                                {item.status}
                            </span>
                        </td>
                        <td>{item.resultDate}</td>
                    </tr>
                ));
                break;
            case "personalInfo": // New item
                headers = ["Thông tin"];
                rows = [
                    <tr key="personal-info">
                        <td>Chức năng hiển thị thông tin cá nhân bổ sung sẽ được phát triển tại đây.</td>
                    </tr>
                ];
                break;
            default:
                // This case should not be hit if activeMenuItem is always one of the defined keys
                break;
        }

        return (
            <div className="overflow-x-auto">
                <Card>
                    <table>
                        <thead>
                            <tr className="table-header-row">
                                {headers.map(h => <th key={h} className="table-header">{h}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </Card>
            </div>
        );
    };


    const renderDashboard = () => (
        <div className="dashboard-grid">
            {/* Stats Cards */}
            <div className="stats-grid">
                <Card className="stat-card">
                    <h3>Tổng bài đăng</h3>
                    <div className="stat-value">{dashboardStats.totalPosts}</div>
                    <div className="stat-details">
                        <span className="stat-detail active">Đang hoạt động: {dashboardStats.activePosts}</span>
                    </div>
                </Card>
                <Card className="stat-card">
                    <h3>Tổng dịch vụ</h3>
                    <div className="stat-value">{dashboardStats.totalServices}</div>
                    {/* <div className="stat-details">
                        <span className="stat-detail">Tháng này: {formatCurrency(dashboardStats.monthlyRevenue)}</span>
                    </div> */}
                </Card>
                <Card className="stat-card">
                    <h3>Đánh giá</h3>
                    <div className="stat-value">{dashboardStats.totalReviews}</div>
                    <div className="stat-details">
                        <span className="stat-detail completed">Trung bình: {dashboardStats.avgRating} ⭐</span>
                    </div>
                </Card>
                <Card className="stat-card">
                    <h3>Tổng doanh thu</h3>
                    <div className="stat-value">{formatCurrency(dashboardStats.totalRevenue)}</div>
                    <div className="stat-details">
                        <span className="stat-detail pending">Tháng này: {formatCurrency(dashboardStats.monthlyRevenue)}</span>
                    </div>
                </Card>
                <Card className="stat-card">
                    <h3>Kết quả xét nghiệm</h3>
                    <div className="stat-value">{dashboardStats.totalTestResults}</div>
                    <div className="stat-details">
                        <span className="stat-detail completed">Hoàn thành: {dashboardStats.completedTestResults}</span>
                    </div>
                </Card>
            </div>

            {/* Charts */}
            <div className="charts-grid">
                <Card className="chart-card">
                    <h3>Doanh thu theo tháng</h3>
                    <div className="chart-container revenue-chart">
                        <div className="chart-y-axis">
                            {[50, 40, 30, 20, 10, 0].map(value => (
                                <div key={value} className="y-axis-label">
                                    {formatCurrency(value * 1000000)}
                                </div>
                            ))}
                        </div>
                        <div className="chart-bars">
                            {reportData.revenueByMonth.map((item, index) => (
                                <div key={index} className="chart-bar">
                                    <div className="bar-value" style={{
                                        height: `${(item.revenue / 50000000) * 250}px`,
                                        background: `linear-gradient(180deg,
                                            ${getGradientColor(item.revenue / 50000000)} 0%,
                                            ${getGradientColor(item.revenue / 50000000, true)} 100%)`
                                    }}>
                                        <div className="bar-tooltip">
                                            <div className="tooltip-title">{item.month}</div>
                                            <div className="tooltip-value">{formatCurrency(item.revenue)}</div>
                                        </div>
                                    </div>
                                    <div className="bar-label">{item.month}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
                <Card className="chart-card">
                    <h3>Kết quả xét nghiệm theo trạng thái</h3>
                    <div className="chart-container pie-chart">
                        <div className="pie-chart-container">
                            <svg viewBox="0 0 130 130" className="pie-svg">
                                {calculatePieSegments(reportData.ordersByStatus).map((segment, index) => (
                                    <g key={index} className="pie-segment-group">
                                        <path
                                            d={segment.path}
                                            fill={segment.color}
                                            className="pie-segment-path"
                                            onMouseEnter={e => handlePieSegmentHover(e, segment, reportData.ordersByStatus[index])}
                                            onMouseLeave={handlePieSegmentLeave}
                                        />
                                        <text
                                            x={segment.labelX}
                                            y={segment.labelY}
                                            className="pie-segment-label"
                                            textAnchor="middle"
                                        >
                                            {segment.percentage}%
                                        </text>
                                    </g>
                                ))}
                                {/* Tổng số đơn ở giữa */}
                                <text x="65" y="70" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0a3d62">{reportData.ordersByStatus.reduce((sum, item) => sum + item.count, 0)}</text>
                                <text x="65" y="88" textAnchor="middle" fontSize="10" fill="#666">Tổng KQ</text>
                            </svg>
                            <div className="pie-legend">
                                {reportData.ordersByStatus.map((item, index) => (
                                    <div key={index} className="legend-item">
                                        <div className="legend-color" style={{ backgroundColor: getStatusColor(item.status) }}></div>
                                        <div className="legend-text">
                                            <span className="legend-label">{item.status}</span>
                                            <span className="legend-value">{item.count} kết quả</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Tooltip */}
                            {pieTooltip.show && (
                                <div className="pie-tooltip" style={{ left: pieTooltip.x, top: pieTooltip.y, background: pieTooltip.color }}>
                                    <div><b>{pieTooltip.label}</b></div>
                                    <div>{pieTooltip.value} kết quả</div>
                                    <div>{pieTooltip.percent}%</div>
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            </div>

            {/* Recent Activity (adapted to Test Results) */}
            <Card className="activity-card">
                <h3>Kết quả xét nghiệm gần đây</h3>
                <div className="activity-list">
                    {testResults.slice(0, 5).map((result, index) => ( // Use testResults data
                        <div key={index} className="activity-item">
                            <div className="activity-icon">📄</div> {/* Icon for test result */}
                            <div className="activity-content">
                                <div className="activity-title">Kết quả: {result.id}</div>
                                <div className="activity-details">
                                    <span>Khách hàng: {result.customerName}</span>
                                    <span className={`status-badge status-badge-${result.status.replace(/\s/g, '').toLowerCase()}`} style={{ backgroundColor: getStatusColor(result.status) }}>
                                        {result.status}
                                    </span>
                                </div>
                            </div>
                            <div className="activity-time">{result.resultDate}</div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );

    const renderReports = () => (
        <>
            <Card className="report-card">
                <h3>Dịch vụ phổ biến</h3>
                <div className="report-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Dịch vụ</th>
                                <th>Số lượng</th>
                                <th>Doanh thu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.topServices.map((service, index) => (
                                <tr key={index}>
                                    <td>{service.name}</td>
                                    <td>{service.count}</td>
                                    <td>{formatCurrency(service.revenue)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            <Card className="report-card">
                <h3>Hiệu suất nhân viên</h3>
                <div className="report-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Nhân viên</th>
                                <th>Số đơn</th>
                                <th>Doanh thu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.employeePerformance.map((employee, index) => (
                                <tr key={index}>
                                    <td>{employee.name}</td>
                                    <td>{employee.orders}</td>
                                    <td>{formatCurrency(employee.revenue)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            <Card className="report-card full-width">
                <h3>Biểu đồ doanh thu</h3>
                <div className="chart-container revenue-chart">
                    <svg width="100%" height="300" viewBox="0 0 600 300">
                        {reportData.revenueByMonth.map((item, index) => {
                            const x = index * 100 + 50;
                            const height = (item.revenue / 50000000) * 250;
                            const y = 300 - height;
                            return (
                                <g key={index} className="chart-bar-group">
                                    <rect
                                        x={x - 30}
                                        y={y}
                                        width="60"
                                        height={height}
                                        fill="#3b82f6"
                                        className="chart-bar"
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.fill = '#2563eb';
                                            const tooltip = document.createElement('div');
                                            tooltip.className = 'chart-tooltip';
                                            tooltip.innerHTML = `<div>${item.month}</div><div>${formatCurrency(item.revenue)}</div>`;
                                            tooltip.style.left = `${e.clientX}px`;
                                            tooltip.style.top = `${e.clientY - 40}px`;
                                            document.body.appendChild(tooltip);
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.fill = '#3b82f6';
                                            const tooltip = document.querySelector('.chart-tooltip');
                                            if (tooltip) tooltip.remove();
                                        }}
                                    />
                                    <text x={x} y="290" textAnchor="middle" fill="#666" fontSize="12">{item.month}</text>
                                </g>
                            );
                        })}
                    </svg>
                </div>
            </Card>
        </>
    );

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const calculatePieSegments = (data) => {
        const total = data.reduce((sum, item) => sum + item.count, 0);
        let startAngle = 0;
        const radius = 48;
        const centerX = 65;
        const centerY = 65;

        return data.map((item, index) => {
            const percentage = (item.count / total) * 100;
            const angle = (percentage / 100) * 360;
            const endAngle = startAngle + angle;
            // Calculate path
            const startRad = (startAngle - 90) * (Math.PI / 180);
            const endRad = (endAngle - 90) * (Math.PI / 180);
            const x1 = centerX + radius * Math.cos(startRad);
            const y1 = centerY + radius * Math.sin(startRad);
            const x2 = centerX + radius * Math.cos(endRad);
            const y2 = centerY + radius * Math.sin(endRad);
            const largeArcFlag = angle > 180 ? 1 : 0;
            const path = `M ${centerX},${centerY} L ${x1},${y1} A ${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;
            // Calculate label position
            const labelAngle = (startAngle + angle / 2) * (Math.PI / 180);
            const labelRadius = radius * 0.7;
            const labelX = centerX + labelRadius * Math.cos(labelAngle - Math.PI / 2);
            const labelY = centerY + labelRadius * Math.sin(labelAngle - Math.PI / 2);
            startAngle = endAngle;
            return {
                path,
                percentage: Math.round(percentage),
                labelX,
                labelY,
                color: getStatusColor(item.status)
            };
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Chưa giao":
                return "#ef4444"; // Đỏ
            case "Đang giao":
                return "#f59e0b"; // Cam
            case "Đã giao":
                return "#10b981"; // Xanh lá
            case "Đang hoạt động":
                return "#10b981";
            case "Vô hiệu hóa":
                return "#ef4444";
            case "Hoàn thành": // For test results in dashboard and testResults table
                return "#10b981";
            case "Đang xử lý": // For test results in dashboard and testResults table
                return "#f59e0b";
            case "Chờ kết quả": // For test results in dashboard and testResults table
                return "#ef4444";
            case "Đã thanh toán":
                return "#10b981";
            case "Chưa thanh toán":
                return "#f59e0b";
            case "Đã đăng":
                return "#10b981";
            case "Bản nháp":
                return "#94a3b8";
            case "Đang áp dụng":
                return "#10b981";
            case "Ngừng áp dụng":
                return "#ef4444";
            default:
                return "#94a3b8"; // Xám
        }
    };

    const handlePieSegmentHover = (e, segment, item) => {
        e.currentTarget.style.transform = 'scale(1.08)';
        e.currentTarget.style.filter = 'brightness(1.2)';
        const svgRect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
        setPieTooltip({
            show: true,
            x: svgRect.left + segment.labelX * (svgRect.width / 130), // Use viewBox width for scaling
            y: svgRect.top + segment.labelY * (svgRect.height / 130) - 30, // Use viewBox height for scaling
            label: item.status,
            value: item.count,
            percent: segment.percentage,
            color: segment.color
        });
    };

    const handlePieSegmentLeave = (e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.filter = 'brightness(1)';
        setPieTooltip({ show: false });
    };

    const getGradientColor = (ratio, isEnd = false) => {
        const r = Math.floor(37 + (ratio * 50));
        const g = Math.floor(99 + (ratio * 100));
        const b = Math.floor(235 - (ratio * 50));
        return `rgb(${r}, ${g}, ${b})`;
    };

    return (
        <div className="layout-container">
            <aside className="sidebar">
                <img src="/logo.png" alt="Logo" className="logo" />
                <nav>
                    <ul className="sidebar-menu">
                        {sidebarMenuItems.map(item => (
                            <li key={item.key}>
                                <a
                                    href={item.key === "homepage" ? "/home" : "#"} // Changed to /home
                                    className={`menu-item ${activeMenuItem === item.key ? "active" : ""}`}
                                    onClick={(e) => {
                                        if (item.key === "homepage") {
                                            e.preventDefault(); // Prevent default link behavior
                                            navigate('/home'); // Use navigate for internal routing to /home
                                        } else {
                                            setActiveMenuItem(item.key);
                                        }
                                    }}
                                >
                                    <span className="menu-icon">{item.icon}</span>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="footer">© 2025 Company</div>
            </aside>
            <main className="main-content">
                <div className="content-wrapper">
                    <div className="page-header">
                        <h1>
                            {/* Dynamically set page header title based on activeMenuItem */}
                            {sidebarMenuItems.find(item => item.key === activeMenuItem)?.label}
                        </h1>
                        <div className="header-user-profile-area">
                            <span className="header-user-info">{currentUser.name || currentUser.email}</span>
                            <div className="header-profile-icon-placeholder" style={{ backgroundColor: getAvatarColor(user?.fullName || currentUser.name) }}>
                                {currentUser.avatar ? (
                                    <img src={currentUser.avatar} alt={currentUser.name} />
                                ) : (
                                    currentUser.name ? getInitials(currentUser.name) : ''
                                )}
                            </div>
                        </div>
                    </div>
                    {activeMenuItem === "dashboard" && renderDashboard()}
                    {/* The "thongke" key is now "Quản lý giá dịch vụ" but its content still renders reports */}
                    {activeMenuItem === "thongke" && renderReports()}
                    {/* Render table/toolbar for all other new menu items that don't have dedicated render functions */}
                    {(activeMenuItem === "nhanvien" || activeMenuItem === "quanlidon" || activeMenuItem === "payments" || activeMenuItem === "reviews" || activeMenuItem === "testResults" || activeMenuItem === "personalInfo" || activeMenuItem === "thongke") && (
                        <>
                            {renderToolbar()}
                            {renderTable()}
                        </>
                    )}
                    {/* Handle cases for other new menu items if their content is not a table/toolbar */}
                    {activeMenuItem === "homepage" && (
                        <Card className="info-card">
                            <h3>Chuyển hướng về trang chủ</h3>
                            <p>Bạn đã click vào mục "Trang chủ" và sẽ được điều hướng về trang chính của ứng dụng.</p>
                        </Card>
                    )}
                    {activeMenuItem === "personalInfo" && (
                        <Card className="info-card">
                            <h3>Thông tin cá nhân bổ sung</h3>
                            <p>Đây là phần quản lý thông tin cá nhân bổ sung.</p>
                            {/* You can add forms/fields for personal info here */}
                        </Card>
                    )}
                </div>

                {/* Modals - simplified for brevity, you'll need to implement actual detail views */}
                {detailEmployee && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>Chi tiết nhân viên</h3>
                            {/* Render employee details here */}
                            <Button onClick={() => setDetailEmployee(null)}>Đóng</Button>
                        </div>
                    </div>
                )}
                {detailOrder && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>Chi tiết đơn hàng</h3>
                            {/* Render order details here */}
                            <Button onClick={() => setDetailOrder(null)}>Đóng</Button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
