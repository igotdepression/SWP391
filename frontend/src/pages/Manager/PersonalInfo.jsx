// Staff/PersonalInfo.jsx
import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from '../../components/ui/ui';
import './PersonalInfo.css';
import { userAPI } from '../../services/api';

export default function PersonalInfo() {
    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [personalData, setPersonalData] = useState({
        userId: '',
        userID: '',
        roleName: '',
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '********',
        dateOfBirth: '',
        gender: '',
        address: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await userAPI.getUserProfile();
                setPersonalData({
                    userId: res.data.userId || '',
                    userID: res.data.userId ? `MN${String(res.data.userId).padStart(3, '0')}` : '',
                    roleName: res.data.role || '',
                    fullName: res.data.fullName || '',
                    phoneNumber: res.data.phoneNumber || '',
                    email: res.data.email || '',
                    password: '********',
                    dateOfBirth: res.data.dateOfBirth || '',
                    gender: res.data.gender || '',
                    address: res.data.address || '',
                });
            } catch (err) {
                alert('Không thể tải thông tin cá nhân!');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonalData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = () => {
        setShowConfirmModal(true);
    };

    const handleConfirmSave = async () => {
        try {
            await userAPI.updateUserProfile({
                fullName: personalData.fullName,
                phoneNumber: personalData.phoneNumber,
                email: personalData.email,
                dateOfBirth: personalData.dateOfBirth,
                gender: personalData.gender,
                address: personalData.address,
            });
            alert('Thông tin cá nhân đã được cập nhật!');
            setIsEditing(false);
            setShowConfirmModal(false);
        } catch (err) {
            alert('Cập nhật thông tin thất bại!');
            setShowConfirmModal(false);
        }
    };

    const handleCancelConfirm = () => {
        setShowConfirmModal(false);
    };

    const handlePasswordSave = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('Mật khẩu mới và xác nhận mật khẩu không khớp!');
            return;
        }
        if (passwordData.newPassword.length < 6) {
            alert('Mật khẩu mới phải có ít nhất 6 ký tự!');
            return;
        }
        // TODO: Call API to change password
        alert('Mật khẩu đã được thay đổi thành công!');
        setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        setShowPasswordModal(false);
    };

    const closePasswordModal = () => {
        setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        setShowPasswordModal(false);
    };

    if (loading) return <div>Đang tải thông tin cá nhân...</div>;

    return (
        <div className="personal-info-container">
            <Card className="personal-info-card">
                <h3>Thông tin cá nhân</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <label>Mã người dùng:</label>
                        <p>{personalData.userID}</p>
                    </div>
                    <div className="info-item">
                        <label>Vai trò:</label>
                        <p>{personalData.roleName}</p>
                    </div>
                    <div className="info-item full-width">
                        <label>Họ và tên:</label>
                        <p>{personalData.fullName}</p>
                    </div>
                    <div className="info-item">
                        <label>Số điện thoại:</label>
                        {isEditing ? (
                            <Input
                                type="tel"
                                name="phoneNumber"
                                value={personalData.phoneNumber}
                                onChange={handleChange}
                                maxLength="15"
                                className="uniform-input"
                            />
                        ) : (
                            <p>{personalData.phoneNumber}</p>
                        )}
                    </div>
                    <div className="info-item">
                        <label>Email:</label>
                        {isEditing ? (
                            <Input
                                type="email"
                                name="email"
                                value={personalData.email}
                                onChange={handleChange}
                                required
                                className="uniform-input"
                            />
                        ) : (
                            <p>{personalData.email}</p>
                        )}
                    </div>
                    <div className="info-item">
                        <label>Ngày sinh:</label>
                        {isEditing ? (
                            <Input
                                type="date"
                                name="dateOfBirth"
                                value={personalData.dateOfBirth}
                                onChange={handleChange}
                                className="uniform-input"
                            />
                        ) : (
                            <p>{personalData.dateOfBirth ? new Date(personalData.dateOfBirth).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}</p>
                        )}
                    </div>
                    <div className="info-item">
                        <label>Giới tính:</label>
                        {isEditing ? (
                            <select
                                name="gender"
                                value={personalData.gender}
                                onChange={handleChange}
                                className="uniform-input"
                            >
                                <option value="">Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>
                        ) : (
                            <p>{personalData.gender || 'Chưa cập nhật'}</p>
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
                                maxLength="255"
                                className="uniform-input"
                            />
                        ) : (
                            <p>{personalData.address || 'Chưa cập nhật'}</p>
                        )}
                    </div>
                    <div className="info-item password-item">
                        <label>Mật khẩu:</label>
                        <div className="password-field">
                            <p>********</p>
                            <Button 
                                variant="outline" 
                                size="small"
                                onClick={() => setShowPasswordModal(true)}
                                className="change-password-btn"
                            >
                                Đổi mật khẩu
                            </Button>
                        </div>
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

            {/* Modal xác nhận lưu thay đổi */}
            {showConfirmModal && (
                <div className="modal-overlay" onClick={handleCancelConfirm}>
                    <div className="modal-content" style={{ maxWidth: 400, margin: 'auto', padding: 32 }} onClick={e => e.stopPropagation()}>
                        <h3>Xác nhận lưu thay đổi</h3>
                        <p>Bạn có chắc chắn muốn lưu thay đổi thông tin cá nhân?</p>
                        <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end', marginTop: 24 }}>
                            <Button onClick={handleConfirmSave}>Xác nhận</Button>
                            <Button variant="outline" onClick={handleCancelConfirm}>Hủy</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Password Change Modal */}
            {showPasswordModal && (
                <div className="modal-overlay" onClick={closePasswordModal}>
                    <div className="password-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Đổi mật khẩu</h3>
                        <div className="password-form">
                            <div className="password-input-group">
                                <label>Mật khẩu cũ:</label>
                                <Input
                                    type="password"
                                    name="oldPassword"
                                    value={passwordData.oldPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Nhập mật khẩu cũ"
                                    required
                                />
                            </div>
                            <div className="password-input-group">
                                <label>Mật khẩu mới:</label>
                                <Input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
                                    required
                                />
                            </div>
                            <div className="password-input-group">
                                <label>Xác nhận mật khẩu mới:</label>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Nhập lại mật khẩu mới"
                                    required
                                />
                            </div>
                            <div className="password-modal-actions">
                                <Button onClick={handlePasswordSave}>Đổi mật khẩu</Button>
                                <Button variant="outline" onClick={closePasswordModal}>Hủy</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}