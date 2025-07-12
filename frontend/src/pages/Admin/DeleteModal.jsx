import React from 'react';

const DeleteModal = ({ show, onClose, user, onDelete }) => {
  if (!show || !user) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content delete-modal">
        <div className="modal-header">
          <h3>Xác nhận xóa</h3>
        </div>
        <div className="modal-body">
          <p>Bạn có chắc chắn muốn xóa người dùng <strong>{user.fullName}</strong>?</p>
          <p>Hành động này không thể hoàn tác.</p>
        </div>
        <div className="form-actions">
          <button className="btn-cancel" onClick={onClose}>
            Hủy
          </button>
          <button className="btn-delete" onClick={onDelete}>
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal; 