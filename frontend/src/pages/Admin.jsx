import React, { useState } from 'react';
import { Search, Edit, Eye, Key, Trash2, Plus, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import AddUserModal from './Admin/AddUserModal';
import EditUserModal from './Admin/EditUserModal';
import ViewUserModal from './Admin/ViewUserModal';
import DeleteModal from './Admin/DeleteModal';

const initialUsers = [
  {
    id: 1,
    username: 'admin01',
    fullName: 'Nguyễn Văn An',
    email: 'admin@company.com',
    role: 'Admin',
    status: 'HOẠT ĐỘNG',
    dateCreated: '15/01/2024'
  },
  {
    id: 2,
    username: 'manager01',
    fullName: 'Trần Thị Bình',
    email: 'manager@company.com',
    role: 'Manager',
    status: 'HOẠT ĐỘNG',
    dateCreated: '16/01/2024'
  },
  {
    id: 3,
    username: 'staff01',
    fullName: 'Lê Văn Cường',
    email: 'staff@company.com',
    role: 'Staff',
    status: 'BỊ KHÓA',
    dateCreated: '17/01/2024'
  },
  {
    id: 4,
    username: 'customer01',
    fullName: 'Phạm Thị Dung',
    email: 'customer@company.com',
    role: 'Customer',
    status: 'CHỜ KÍCH HOẠT',
    dateCreated: '18/01/2024'
  },
  {
    id: 5,
    username: 'staff02',
    fullName: 'Hoàng Văn Em',
    email: 'staff2@company.com',
    role: 'Staff',
    status: 'HOẠT ĐỘNG',
    dateCreated: '19/01/2024'
  }
];

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('Admin');
  const [statusFilter, setStatusFilter] = useState('Tất cả trạng thái');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState(initialUsers);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewUser, setViewUser] = useState(null);

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'HOẠT ĐỘNG').length,
    blocked: users.filter(u => u.status === 'BỊ KHÓA').length,
    pending: users.filter(u => u.status === 'CHỜ KÍCH HOẠT').length
  };

  // Lọc users
  const filteredUsers = users.filter(user => {
    const matchSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = roleFilter === 'Tất cả vai trò' || user.role === roleFilter;
    const matchStatus = statusFilter === 'Tất cả trạng thái' || user.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  // Hành động
  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter(u => u.id !== selectedUser.id));
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setShowEditModal(true);
  };

  const handleView = (user) => {
    setViewUser(user);
    setShowViewModal(true);
  };

  const handleResetPassword = (user) => {
    alert(`Đã reset mật khẩu cho ${user.fullName}`);
  };

  // Modal Sửa
  const EditUserModal = () => {
    const [formData, setFormData] = useState(editUser || {});
    if (!showEditModal || !editUser) return null;
    const handleSubmit = () => {
      setUsers(users.map(u => u.id === editUser.id ? { ...u, ...formData } : u));
      setShowEditModal(false);
      setEditUser(null);
    };
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Sửa Người Dùng</h3>
            <button className="close-btn" onClick={() => setShowEditModal(false)}>×</button>
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
              <button type="button" className="btn-cancel" onClick={() => setShowEditModal(false)}>
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

  // Modal Xem
  const ViewUserModal = () => {
    if (!showViewModal || !viewUser) return null;
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Thông Tin Người Dùng</h3>
            <button className="close-btn" onClick={() => setShowViewModal(false)}>×</button>
          </div>
          <div className="user-form">
            <div className="form-section">
              <h4>Thông Tin Tài Khoản</h4>
              <div className="form-group">
                <label>Tên đăng nhập</label>
                <input type="text" value={viewUser.username} readOnly />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Vai trò</label>
                  <input type="text" value={viewUser.role} readOnly />
                </div>
                <div className="form-group">
                  <label>Trạng thái</label>
                  <input type="text" value={viewUser.status} readOnly />
                </div>
              </div>
            </div>
            <div className="form-section">
              <h4>Thông Tin Cá Nhân</h4>
              <div className="form-group">
                <label>Họ và Tên</label>
                <input type="text" value={viewUser.fullName} readOnly />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={viewUser.email} readOnly />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Modal Thêm giữ nguyên, chỉ sửa setUsers khi tạo mới
  const AddUserModal = () => {
    const [formData, setFormData] = useState({
      username: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      email: '',
      phone: '',
      role: 'Staff',
      status: 'HOẠT ĐỘNG'
    });

    const handleSubmit = () => {
      setUsers([
        ...users,
        {
          id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
          username: formData.username,
          fullName: formData.fullName,
          email: formData.email,
          role: formData.role,
          status: formData.status,
          dateCreated: new Date().toLocaleDateString('vi-VN')
        }
      ]);
      setShowAddModal(false);
    };

    if (!showAddModal) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Thêm Người Dùng Mới</h3>
            <button className="close-btn" onClick={() => setShowAddModal(false)}>×</button>
          </div>
          <div className="user-form">
            <div className="form-section">
              <h4>Thông Tin Tài Khoản</h4>
              <div className="form-group">
                <label>Tên đăng nhập *</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Mật khẩu *</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Xác nhận mật khẩu *</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Vai trò *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Staff">Staff</option>
                    <option value="Customer">Customer</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Trạng thái *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
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
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>
                Hủy
              </button>
              <button type="button" className="btn-save" onClick={handleSubmit}>
                Tạo Mới
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DeleteModal = () => {
    if (!showDeleteModal || !selectedUser) return null;
    return (
      <div className="modal-overlay">
        <div className="modal-content delete-modal">
          <div className="modal-header">
            <h3>Xác nhận xóa</h3>
          </div>
          <div className="modal-body">
            <p>Bạn có chắc chắn muốn xóa người dùng <strong>{selectedUser.fullName}</strong>?</p>
            <p>Hành động này không thể hoàn tác.</p>
          </div>
          <div className="form-actions">
            <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>
              Hủy
            </button>
            <button className="btn-delete" onClick={confirmDelete}>
              Xóa
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-container">
      <style jsx>{`
        .admin-container {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 0;
        }

        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem 0;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header h1 {
          margin: 0;
          font-size: 2.5rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .header-icon {
          width: 3rem;
          height: 3rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .header p {
          margin: 0.5rem 0 0 0;
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .main-content {
          padding: 2rem;
          width: 100%;
          margin: 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
        }

        .stat-card:nth-child(1)::before {
          background: #3b82f6;
        }

        .stat-card:nth-child(2)::before {
          background: #10b981;
        }

        .stat-card:nth-child(3)::before {
          background: #f59e0b;
        }

        .stat-card:nth-child(4)::before {
          background: #ef4444;
        }

        .stat-card:hover {
          transform: translateY(-2px);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .stat-number.total { color: #3b82f6; }
        .stat-number.active { color: #10b981; }
        .stat-number.blocked { color: #ef4444; }
        .stat-number.pending { color: #f59e0b; }

        .stat-label {
          font-size: 1rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .controls {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }

        .controls-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: center;
        }

        .add-btn {
          background: #10b981;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: background 0.2s;
        }

        .add-btn:hover {
          background: #059669;
        }

        .search-box {
          position: relative;
          flex: 1;
          min-width: 300px;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
        }

        .filter-select {
          padding: 0.75rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          background: white;
          min-width: 150px;
        }

        .users-table {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 100%;
          overflow-x: auto;
        }

        .table-header {
          background: #374151;
          color: white;
          display: grid;
          grid-template-columns: 80px 1fr 1fr 1fr 120px 140px 120px 180px;
          padding: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          gap: 1rem;
        }

        .table-row {
          display: grid;
          grid-template-columns: 80px 1fr 1fr 1fr 120px 140px 120px 180px;
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
          align-items: center;
          transition: background 0.2s;
          gap: 1rem;
        }

        .table-row:hover {
          background: #f9fafb;
        }

        .role-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
          text-align: center;
        }

        .role-badge.admin {
          background: #dbeafe;
          color: #1e40af;
        }

        .role-badge.manager {
          background: #fef3c7;
          color: #d97706;
        }

        .role-badge.staff {
          background: #d1fae5;
          color: #065f46;
        }

        .role-badge.customer {
          background: #fde2e8;
          color: #be185d;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
          text-align: center;
        }

        .status-badge.active {
          background: #d1fae5;
          color: #065f46;
        }

        .status-badge.blocked {
          background: #fee2e2;
          color: #dc2626;
        }

        .status-badge.pending {
          background: #fef3c7;
          color: #d97706;
        }

        .actions {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
        }

        .action-btn {
          padding: 0.5rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-btn.edit {
          background: #dbeafe;
          color: #1e40af;
        }

        .action-btn.edit:hover {
          background: #bfdbfe;
        }

        .action-btn.view {
          background: #f3f4f6;
          color: #374151;
        }

        .action-btn.view:hover {
          background: #e5e7eb;
        }

        .action-btn.reset {
          background: #fef3c7;
          color: #d97706;
        }

        .action-btn.reset:hover {
          background: #fde68a;
        }

        .action-btn.delete {
          background: #fee2e2;
          color: #dc2626;
        }

        .action-btn.delete:hover {
          background: #fecaca;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          margin-top: 2rem;
        }

        .pagination-btn {
          padding: 0.5rem 1rem;
          border: 1px solid #e5e7eb;
          background: white;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .pagination-btn:hover {
          background: #f9fafb;
        }

        .pagination-btn.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          max-width: 600px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h3 {
          margin: 0;
          color: #374151;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6b7280;
        }

        .user-form {
          padding: 1.5rem;
        }

        .form-section {
          margin-bottom: 2rem;
        }

        .form-section h4 {
          margin: 0 0 1rem 0;
          color: #374151;
          font-size: 1.1rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #374151;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #667eea;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }

        .btn-cancel {
          padding: 0.75rem 1.5rem;
          border: 2px solid #e5e7eb;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .btn-cancel:hover {
          background: #f9fafb;
        }

        .btn-save {
          padding: 0.75rem 1.5rem;
          border: none;
          background: #10b981;
          color: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.2s;
        }

        .btn-save:hover {
          background: #059669;
        }

        .btn-delete {
          padding: 0.75rem 1.5rem;
          border: none;
          background: #ef4444;
          color: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.2s;
        }

        .btn-delete:hover {
          background: #dc2626;
        }

        .delete-modal {
          max-width: 400px;
        }

        .modal-body {
          padding: 1.5rem;
        }

        .modal-body p {
          margin-bottom: 1rem;
          color: #374151;
        }

        @media (max-width: 1200px) {
          .table-header,
          .table-row {
            grid-template-columns: 60px 120px 150px 200px 100px 120px 100px 150px;
          }
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .table-header,
          .table-row {
            grid-template-columns: 1fr;
            text-align: left;
          }
          
          .controls-row {
            flex-direction: column;
            align-items: stretch;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="header">
        <h1>
          <div className="header-icon">🛡️</div>
          Quản Lý Người Dùng
        </h1>
        <p>Hệ thống quản lý tài khoản và phân quyền người dùng</p>
      </div>

      <div className="main-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number total">{stats.total}</div>
            <div className="stat-label">Tổng Người Dùng</div>
          </div>
          <div className="stat-card">
            <div className="stat-number active">{stats.active}</div>
            <div className="stat-label">Đang Hoạt Động</div>
          </div>
          <div className="stat-card">
            <div className="stat-number blocked">{stats.blocked}</div>
            <div className="stat-label">Bị Khóa</div>
          </div>
          <div className="stat-card">
            <div className="stat-number pending">{stats.pending}</div>
            <div className="stat-label">Chờ Kích Hoạt</div>
          </div>
        </div>

        <div className="controls">
          <div className="controls-row">
            <button className="add-btn" onClick={() => setShowAddModal(true)}>
              <Plus size={20} />
              Thêm Người Dùng Mới
            </button>
            
            <div className="search-box">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Tìm kiếm người dùng..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="filter-select"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="Tất cả vai trò">Tất cả vai trò</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Staff">Staff</option>
              <option value="Customer">Customer</option>
            </select>
            
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="Tất cả trạng thái">Tất cả trạng thái</option>
              <option value="HOẠT ĐỘNG">Hoạt động</option>
              <option value="BỊ KHÓA">Bị khóa</option>
              <option value="CHỜ KÍCH HOẠT">Chờ kích hoạt</option>
            </select>
          </div>
        </div>

        <div className="users-table">
          <div className="table-header">
            <div>STT</div>
            <div>TÊN ĐĂNG NHẬP</div>
            <div>HỌ VÀ TÊN</div>
            <div>EMAIL</div>
            <div>VAI TRÒ</div>
            <div>TRẠNG THÁI</div>
            <div>NGÀY TẠO</div>
            <div>HÀNH ĐỘNG</div>
          </div>
          
          {filteredUsers.map((user, index) => (
            <div key={user.id} className="table-row">
              <div>{index + 1}</div>
              <div>{user.username}</div>
              <div>{user.fullName}</div>
              <div>{user.email}</div>
              <div>
                <span className={`role-badge ${user.role.toLowerCase()}`}>
                  {user.role}
                </span>
              </div>
              <div>
                <span className={`status-badge ${
                  user.status === 'HOẠT ĐỘNG' ? 'active' : 
                  user.status === 'BỊ KHÓA' ? 'blocked' : 'pending'
                }`}>
                  {user.status}
                </span>
              </div>
              <div>{user.dateCreated}</div>
              <div className="actions">
                <button className="action-btn edit" title="Sửa" onClick={() => handleEdit(user)}>
                  <Edit size={16} />
                </button>
                <button className="action-btn view" title="Xem chi tiết" onClick={() => handleView(user)}>
                  <Eye size={16} />
                </button>
                <button className="action-btn reset" title="Reset mật khẩu" onClick={() => handleResetPassword(user)}>
                  <Key size={16} />
                </button>
                <button className="action-btn delete" title="Xóa" onClick={() => handleDelete(user)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button className="pagination-btn" disabled>
            <ChevronsLeft size={16} />
          </button>
          <button className="pagination-btn" disabled>
            <ChevronLeft size={16} />
          </button>
          <button className="pagination-btn active">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <span>...</span>
          <button className="pagination-btn">10</button>
          <button className="pagination-btn">
            <ChevronRight size={16} />
          </button>
          <button className="pagination-btn">
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>

      <AddUserModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddUser={(newUser) => {
          setUsers([
            ...users,
            {
              id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
              ...newUser,
              dateCreated: new Date().toLocaleDateString('vi-VN')
            }
          ]);
        }}
      />
      <EditUserModal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditUser(null);
        }}
        user={editUser}
        onEditUser={(updatedUser) => {
          setUsers(users.map(u => u.id === updatedUser.id ? { ...u, ...updatedUser } : u));
        }}
      />
      <ViewUserModal
        show={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setViewUser(null);
        }}
        user={viewUser}
      />
      <DeleteModal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onDelete={() => {
          setUsers(users.map(u =>
            u.id === selectedUser.id ? { ...u, status: 'BỊ KHÓA' } : u
          ));
          setShowDeleteModal(false);
          setSelectedUser(null);
        }}
      />
    </div>
  );
};

export default UserManagement;