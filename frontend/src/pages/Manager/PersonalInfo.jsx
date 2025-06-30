// pages/Manager/PersonalInfo.jsx
import React, { useEffect, useState } from "react";
import { Card, Input, Button } from "../../components/ui/ui"; // Điều chỉnh đường dẫn ui nếu cần
import { useAuth } from "../../context/AuthContext"; // Để lấy thông tin user
import "./PersonalInfo.css"; // Giả sử bạn có file CSS để định dạng

const fakePersonalInfos = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        email: "a@example.com",
        phone: "0901234567",
        address: "Hà Nội",
        role: "Manager",
        createdAt: "2024-06-01",
    },
    {
        id: 2,
        name: "Trần Thị B",
        email: "b@example.com",
        phone: "0909876543",
        address: "TP.HCM",
        role: "Staff",
        createdAt: "2024-06-02",
    },
];

export default function PersonalInfo() {
    const { user } = useAuth(); // Lấy thông tin người dùng từ context

    // State để quản lý thông tin cá nhân có thể chỉnh sửa
    const [name, setName] = React.useState(user?.name || "");
    const [email, setEmail] = React.useState(user?.email || "");
    const [role, setRole] = React.useState(user?.role || ""); // Vai trò thường không sửa được nhưng để demo
    const [infos, setInfos] = useState([]);

    useEffect(() => {
        setTimeout(() => setInfos(fakePersonalInfos), 300);
    }, []);

    const handleSaveInfo = () => {
        // Logic lưu thông tin cá nhân vào backend
        alert(`Lưu thông tin cá nhân: Tên - ${name}, Email - ${email}`);
        console.log({ name, email, role });
    };

    return (
        <Card className="info-card personal-info-card">
            <h3>Thông tin Cá nhân</h3>
            <p>Cập nhật thông tin hồ sơ của bạn.</p>

            <div className="form-group mt-4">
                <label htmlFor="fullName">Họ và Tên:</label>
                <Input
                    id="fullName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập họ và tên"
                />
            </div>
            <div className="form-group mt-3">
                <label htmlFor="email">Email:</label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email"
                    disabled // Email thường không cho sửa trực tiếp qua form này
                />
            </div>
            <div className="form-group mt-3">
                <label htmlFor="role">Vai trò:</label>
                <Input
                    id="role"
                    type="text"
                    value={role}
                    disabled // Vai trò thường chỉ hiển thị
                />
            </div>

            <Button className="mt-4" onClick={handleSaveInfo}>
                Lưu Thay Đổi
            </Button>
            <p className="note mt-3">
                Đây là nội dung placeholder cho trang Thông tin cá nhân. Bạn có thể thêm
                các trường khác như số điện thoại, địa chỉ, mật khẩu, v.v.
            </p>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Vai trò</th>
                        <th>Ngày tạo</th>
                    </tr>
                </thead>
                <tbody>
                    {infos.map((i) => (
                        <tr key={i.id}>
                            <td>{i.id}</td>
                            <td>{i.name}</td>
                            <td>{i.email}</td>
                            <td>{i.phone}</td>
                            <td>{i.address}</td>
                            <td>{i.role}</td>
                            <td>{i.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
}