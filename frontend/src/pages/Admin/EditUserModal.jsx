import React, { useState, useEffect } from 'react';

const EditUserModal = ({ show, onClose, user, onEditUser }) => {
  const [formData, setFormData] = useState(user || {});

  useEffect(() => {
    setFormData(user || {});
  }, [user]);

  if (!show || !user) return null;

  const handleSubmit = () => {
    onEditUser({ ...formData });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Sửa Người Dùng</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="user-form">
          <div className="form-section">
            <h4>Thông Tin Tài Khoản</h4>
            <div className="form-group">
              <label>Tên đăng nhập *</label>
              <input type="text" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Vai trò *</label>
                <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Staff">Staff</option>
                  <option value="Customer">Customer</option>
                </select>
              </div>
              <div className="form-group">
                <label>Trạng thái *</label>
                <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                  <option value="HOẠT ĐỘNG">Hoạt động</option>
                  <option value="BỊ KHÓA">Bị khóa</option>
                  <option value="CHỜ KÍCH HOẠT">Chờ kích hoạt</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-section">
            <h4>Thông Tin Cá Nhân</h4>
            <div className="form-group">
              <label>Họ và Tên *</label>
              <input type="text" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
              </div>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Hủy
            </button>
            <button type="button" className="btn-save" onClick={handleSubmit}>
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal; 