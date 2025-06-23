// Staff/PersonalInfo.jsx
import React, { useState } from 'react';
import { Card, Button, Input } from '../../components/ui/ui';
import './PersonalInfo.css';

export default function PersonalInfo() {
    const [isEditing, setIsEditing] = useState(false);
    const [personalData, setPersonalData] = useState({
        fullName: 'Nguyễn Thị Thu Hà',
        employeeId: 'ST001',
        role: 'Nhân viên xét nghiệm',
        email: 'ha.nguyen@example.com',
        phone: '0901234567',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        department: 'Phòng Xét nghiệm',
        joinDate: '2022-03-15',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonalData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Here you would typically send this data to your backend API
        console.log('Saving personal data:', personalData);
        alert('Thông tin cá nhân đã được cập nhật!');
        setIsEditing(false);
    };

    return (
        <div className="personal-info-container">
            <Card className="personal-info-card">
                <h3>Thông tin cá nhân</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <label>Họ và tên:</label>
                        {isEditing ? (
                            <Input
                                type="text"
                                name="fullName"
                                value={personalData.fullName}
                                onChange={handleChange}
                            />
                        ) : (
                            <p>{personalData.fullName}</p>
                        )}
                    </div>
                    <div className="info-item">
                        <label>Mã nhân viên:</label>
                        <p>{personalData.employeeId}</p>
                    </div>
                    <div className="info-item">
                        <label>Vai trò:</label>
                        <p>{personalData.role}</p>
                    </div>
                    <div className="info-item">
                        <label>Email:</label>
                        {isEditing ? (
                            <Input
                                type="email"
                                name="email"
                                value={personalData.email}
                                onChange={handleChange}
                            />
                        ) : (
                            <p>{personalData.email}</p>
                        )}
                    </div>
                    <div className="info-item">
                        <label>Số điện thoại:</label>
                        {isEditing ? (
                            <Input
                                type="tel"
                                name="phone"
                                value={personalData.phone}
                                onChange={handleChange}
                            />
                        ) : (
                            <p>{personalData.phone}</p>
                        )}
                    </div>
                    <div className="info-item full-width">
                        <label>Địa chỉ:</label>
                        {isEditing ? (
                            <Input
                                type="text"
                                name="address"
                                value={personalData.address}
                                onChange={handleChange}
                            />
                        ) : (
                            <p>{personalData.address}</p>
                        )}
                    </div>
                    <div className="info-item">
                        <label>Phòng ban:</label>
                        <p>{personalData.department}</p>
                    </div>
                    <div className="info-item">
                        <label>Ngày vào làm:</label>
                        <p>{personalData.joinDate}</p>
                    </div>
                </div>

                <div className="personal-info-actions">
                    {isEditing ? (
                        <>
                            <Button onClick={handleSave}>Lưu thay đổi</Button>
                            <Button variant="outline" onClick={() => setIsEditing(false)}>Hủy</Button>
                        </>
                    ) : (
                        <Button onClick={() => setIsEditing(true)}>Chỉnh sửa thông tin</Button>
                    )}
                </div>
            </Card>
        </div>
    );
}