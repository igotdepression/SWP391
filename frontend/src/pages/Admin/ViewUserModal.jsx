import React from 'react';

const ViewUserModal = ({ show, onClose, user }) => {
  if (!show || !user) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Thông Tin Người Dùng</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="user-form">
          <div className="form-section">
            <h4>Thông Tin Tài Khoản</h4>
            <div className="form-group">
              <label>Tên đăng nhập</label>
              <input type="text" value={user.username} readOnly />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Vai trò</label>
                <input type="text" value={user.role} readOnly />
              </div>
              <div className="form-group">
                <label>Trạng thái</label>
                <input type="text" value={user.status} readOnly />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h4>Thông Tin Cá Nhân</h4>
            <div className="form-group">
              <label>Họ và Tên</label>
              <input type="text" value={user.fullName} readOnly />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={user.email} readOnly />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal; 