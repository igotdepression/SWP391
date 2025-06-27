// pages/Manager/PersonalInfo.jsx
import React from 'react';
import { Card, Input, Button } from '../../components/ui/ui'; // Điều chỉnh đường dẫn ui nếu cần
import { useAuth } from '../../context/AuthContext'; // Để lấy thông tin user

export default function PersonalInfo() {
    const { user } = useAuth(); // Lấy thông tin người dùng từ context

    // State để quản lý thông tin cá nhân có thể chỉnh sửa
    const [name, setName] = React.useState(user?.name || "");
    const [email, setEmail] = React.useState(user?.email || "");
    const [role, setRole] = React.useState(user?.role || ""); // Vai trò thường không sửa được nhưng để demo

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

            <Button className="mt-4" onClick={handleSaveInfo}>Lưu Thay Đổi</Button>
            <p className="note mt-3">Đây là nội dung placeholder cho trang Thông tin cá nhân. Bạn có thể thêm các trường khác như số điện thoại, địa chỉ, mật khẩu, v.v.</p>
        </Card>
    );
}