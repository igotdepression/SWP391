// src/components/ContactInfoTab.tsx
import React from "react";
import "./ContactInfoTab.css";
import { Phone as PhoneIcon, Mail as MailIcon, MapPin, Edit3, Save, X } from "lucide-react";
// @ts-ignore
import vietnamLocations from "../../data/vietnamLocations.json";

interface ContactInfoTabProps {
  user: { phoneNumber?: string; email: string; address?: string };
  formData: { phoneNumber?: string; email: string; address?: string; province?: string; district?: string; ward?: string };
  isEditing: boolean;
  onEditToggle: () => void;
  onChange: (field: string, value: any) => void;
  onSave: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function ContactInfoTab({
  user,
  formData,
  isEditing,
  onEditToggle,
  onChange,
  onSave,
  onCancel,
  isLoading,
}: ContactInfoTabProps) {
  return (
    <section className="container">
      <header className="header">
        <div className="headerContent">
          <div className="iconWrapper">
            <span className="icon" style={{ color: '#22c55e' }}><PhoneIcon size={20} /></span>
          </div>
          <h2 className="title">Thông tin liên hệ</h2>
        </div>
        {!isEditing ? (
          <button onClick={onEditToggle} className="editBtn">
            <span className="iconSmall" style={{ color: '#22c55e' }}><Edit3 size={16} /></span> Chỉnh sửa
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
            <label className="label">Số điện thoại</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.phoneNumber || ""}
                onChange={e => onChange("phoneNumber", e.target.value)}
                className="input"
              />
            ) : (
              <div className="field">
                <span className="iconSmall" style={{ color: '#22c55e' }}><PhoneIcon size={16} /></span> {user.phoneNumber || "Chưa cập nhật"}
              </div>
            )}
          </div>
          <div>
            <label className="label">Email</label>
            <div className="emailField">
              <span className="iconSmall" style={{ color: '#2563eb' }}><MailIcon size={16} /></span> {user.email}
              <span className="verifiedBadge">Đã xác thực</span>
            </div>
          </div>
        </div>
        <div>
          <label className="label">Địa chỉ</label>
          {isEditing ? (
            <div className="addressEdit">
              <input
                type="text"
                placeholder="Số nhà, tên đường..."
                value={formData.address || ""}
                onChange={e => onChange("address", e.target.value)}
                className="input"
              />
              <div className="selectGroup">
                <select
                  value={formData.province || ""}
                  onChange={e => onChange("province", e.target.value)}
                  className="select"
                >
                  <option value="">Chọn Tỉnh/TP</option>
                  {vietnamLocations.provinces.map((p: any) => (
                    <option key={p.code} value={p.code}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <select
                  value={formData.district || ""}
                  onChange={e => onChange("district", e.target.value)}
                  className="select"
                >
                  <option value="">Chọn Quận/Huyện</option>
                </select>
                <select
                  value={formData.ward || ""}
                  onChange={e => onChange("ward", e.target.value)}
                  className="select"
                >
                  <option value="">Chọn Phường/Xã</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="field">
              <span className="iconSmall" style={{ color: '#2563eb' }}><MapPin size={16} /></span> {user.address}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

