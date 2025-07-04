// src/pages/PersonalInfoPage.tsx
import React, { useState, useEffect } from "react";
import "./PersonalInfoPage.css";
import { Sidebar } from "./Customer/Sidebar.tsx";
import { BasicInfoTab } from "./Customer/BasicInfoTab.tsx";
import { ContactInfoTab } from "./Customer/ContactInfoTab.tsx";
import { IDCardTab } from "./Customer/IDCardTab.tsx";
import { TestHistoryTab } from "./Customer/TestHistoryTab.tsx";
import { TestDetailsModal } from "./Customer/TestDetailsModal.tsx";

const mockUser = {
  fullName: "Nguyễn Văn An",
  phoneNumber: "0123456789",
  email: "nguyenvanan@email.com",
  address: "123 Đường ABC, Phường 1, Quận 1, TP.HCM",
  dateOfBirth: "1990-01-15",
  gender: "Nam",
  idNumber: "123456789012",
  idType: "CCCD",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
};

const mockHistory = [
  {
    id: "12345",
    date: "12/06/2025",
    type: "Cha - Con",
    status: "Đã hoàn thành",
    hasResult: true,
    statusColor: "text-green-600 bg-green-50",
    details: {
      sampleDate: "10/06/2025",
      sampleLocation: "Vinmec",
      sampleCode: "SMP12345",
      resultFile: "https://example.com/result12345.pdf",
      expertMessage: "Mối quan hệ cha con xác nhận 99.99%."
    }
  },
  {
    id: "12412",
    date: "01/05/2025",
    type: "Mẹ - Con",
    status: "Đang xử lý",
    hasResult: false,
    statusColor: "text-yellow-600 bg-yellow-50",
    details: { sampleDate: "30/04/2025", sampleLocation: "Vinmec", sampleCode: "SMP12412" }
  }
];

export default function PersonalInfoPage() {
  const [user, setUser] = useState(mockUser);
  const [history] = useState(mockHistory);
  const [tab, setTab] = useState("basic");
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [editData, setEditData] = useState(user);
  const [isEditingBasic, setEditBasic] = useState(false);
  const [isEditingContact, setEditContact] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(t);
    }
  }, [success]);

  const updateProfile = (field) => {
    setLoading(true);
    setTimeout(() => {
      setUser(editData);
      setLoading(false);
      setSuccess("Cập nhật thành công!");
      if (field === "basic") setEditBasic(false);
      else setEditContact(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      {success && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-in slide-in-from-right">
          {success}
        </div>
      )}
      <Sidebar user={user} activeTab={tab} onChangeTab={setTab} onLogout={() => console.log("Đăng xuất")} />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="container personal-info-container">
          {tab === "basic" && (
            <BasicInfoTab
              user={user}
              formData={editData}
              isEditing={isEditingBasic}
              onEditToggle={() => setEditBasic(true)}
              onChange={(k, v) => setEditData(prev => ({ ...prev, [k]: v }))}
              onSave={() => updateProfile("basic")}
              onCancel={() => { setEditBasic(false); setEditData(user); }}
              isLoading={isLoading}
            />
          )}
          {tab === "contact" && (
            <ContactInfoTab
              user={user}
              formData={editData}
              isEditing={isEditingContact}
              onEditToggle={() => setEditContact(true)}
              onChange={(k, v) => setEditData(prev => ({ ...prev, [k]: v }))}
              onSave={() => updateProfile("contact")}
              onCancel={() => { setEditContact(false); setEditData(user); }}
              isLoading={isLoading}
            />
          )}
          {tab === "id" && <IDCardTab user={user} />}
          {tab === "test-history" && (
            <>
              <TestHistoryTab history={history.map(t => ({ ...t, onViewDetails: setSelectedTest }))} />
              {selectedTest && <TestDetailsModal test={selectedTest} onClose={() => setSelectedTest(null)} />}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
