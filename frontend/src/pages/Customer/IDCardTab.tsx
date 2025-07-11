// src/components/IDCardTab.tsx
import React from "react";
import "./IDCardTab.css";
import { CreditCard } from "lucide-react";

interface IDCardTabProps {
  user: { idNumber?: string; idType?: string };
}

export function IDCardTab({ user }: IDCardTabProps) {
  return (
    <section className="container">
      <header className="header">
        <div className="headerContent">
          <span className="icon" style={{ color: '#a855f7' }}><CreditCard size={20} /></span>
          <h2 className="title">Thông tin CMND/CCCD</h2>
        </div>
      </header>
      <div className="body">
        <div className="grid">
          <div>
            <label className="label">Số CMND/CCCD</label>
            <div className="field">{user.idNumber || "Chưa cập nhật"}</div>
          </div>
          <div>
            <label className="label">Loại giấy tờ</label>
            <div className="field">{user.idType || "Chưa cập nhật"}</div>
          </div>
        </div>
        <div>
          <label className="label">Hình ảnh CMND/CCCD</label>
          <div className="uploadGrid">
            <div className="uploadCard">
              <span className="iconLarge" style={{ color: '#a3a3a3' }}><CreditCard size={48} /></span>
              <p className="uploadText">Mặt trước CMND/CCCD</p>
              <button className="uploadBtn">Tải ảnh lên</button>
            </div>
            <div className="uploadCard">
              <span className="iconLarge" style={{ color: '#a3a3a3' }}><CreditCard size={48} /></span>
              <p className="uploadText">Mặt sau CMND/CCCD</p>
              <button className="uploadBtn">Tải ảnh lên</button>
            </div>
          </div>
        </div>
      </div>
    </section>
);
}
