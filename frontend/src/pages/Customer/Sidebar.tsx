import React from "react";
import "./Sidebar.css";
import { Home, LogOut, User as UserIcon, Phone, CreditCard, FileText } from "lucide-react";

interface SidebarProps {
  user: { avatar: string; fullName: string; email: string };
  activeTab: string;
  onChangeTab: (tab: string) => void;
  onLogout: () => void;
}

export function Sidebar({ user, activeTab, onChangeTab, onLogout }: SidebarProps) {
  const items = [
    { id: "basic", label: "Thông tin cơ bản", icon: UserIcon },
    { id: "contact", label: "Thông tin liên hệ", icon: Phone },
    { id: "id", label: "CMND/CCCD", icon: CreditCard },
    { id: "test-history", label: "Lịch sử xét nghiệm", icon: FileText },
  ];

  return (
    <aside className="sidebar">
      <div className="profile">
        <div className="profileInfo">
          <div className="avatarWrapper">
            <img src={user.avatar} alt="Avatar" className="avatar" />
          </div>
          <div>
            <h3 className="fullName">{user.fullName}</h3>
            <p className="email">{user.email}</p>
          </div>
        </div>
        <button className="homeBtn">
          <span className="iconSmall" style={{ color: '#2563eb' }}><Home size={16} /></span>
          <span>Quay về trang chủ</span>
        </button>
      </div>
      <nav className="nav">
        {items.map(item => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeTab(item.id)}
              className={`navItem${active ? ' navItemActive' : ''}`}
            >
              <span className="icon" style={{ color: active ? '#fff' : '#2563eb' }}><Icon size={20} /></span>
              <span>{item.label}</span>
            </button>
          );
        })}
        <button onClick={onLogout} className="logoutBtn">
          <span className="icon" style={{ color: '#ef4444' }}><LogOut size={20} /></span>
          <span>Đăng xuất</span>
        </button>
      </nav>
    </aside>
);
}
