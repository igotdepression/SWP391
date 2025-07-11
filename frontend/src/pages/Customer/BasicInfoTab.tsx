// src/components/BasicInfoTab.tsx
import React from "react";
import "./BasicInfoTab.css";
import { User as UserIcon, Edit3, Save, X, Calendar } from "lucide-react";

interface BasicInfoTabProps {
  user: { fullName: string; gender?: string; dateOfBirth: string };
  formData: { fullName: string; gender?: string; dateOfBirth: string };
  isEditing: boolean;
  onEditToggle: () => void;
  onChange: (field: string, value: any) => void;
  onSave: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function BasicInfoTab({
  user,
  formData,
  isEditing,
  onEditToggle,
  onChange,
  onSave,
  onCancel,
  isLoading,
}: BasicInfoTabProps) {
  return (
    <section className="container">
      <header className="header">
        <div className="headerContent">
          <div className="iconWrapper">
            <span className="icon" style={{ color: '#2563eb' }}><UserIcon size={20} /></span>
          </div>
          <h2 className="title">Thông tin cơ bản</h2>
        </div>
        {!isEditing ? (
          <button onClick={onEditToggle} className="editBtn">
            <span className="iconSmall" style={{ color: '#2563eb' }}><Edit3 size={16} /></span> Chỉnh sửa
          </button>
        ) : (
          <div className="actionGroup">
            <button onClick={onSave} disabled={isLoading} className="saveBtn">
              <span className="iconSmall" style={{ color: '#22c55e' }}><Save size={16} /></span> {isLoading ? "Đang lưu..." : "Lưu"}
            </button>
            <button onClick={onCancel} className="cancelBtn">
              <span className="iconSmall" style={{ color: '#888' }}><X size={16} /></span> Hủy
            </button>
          </div>
        )}
      </header>
      <div className="body">
        <div className="grid">
          <div>
            <label className="label">Họ và tên</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.fullName}
                onChange={e => onChange("fullName", e.target.value)}
                className="input"
              />
            ) : (
              <div className="field">{user.fullName}</div>
            )}
          </div>
          <div>
            <label className="label">Giới tính</label>
            {isEditing ? (
              <select
                value={formData.gender || ""}
                onChange={e => onChange("gender", e.target.value)}
                className="input"
              >
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            ) : (
              <div className="field">{user.gender || "Chưa cập nhật"}</div>
            )}
          </div>
          <div>
            <label className="label">Ngày sinh</label>
            {isEditing ? (
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={e => onChange("dateOfBirth", e.target.value)}
                className="input"
              />
            ) : (
              <div className="fieldDate">
                <span className="iconSmall" style={{ color: '#2563eb' }}><Calendar size={16} /></span> {new Date(user.dateOfBirth).toLocaleDateString("vi-VN")}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
