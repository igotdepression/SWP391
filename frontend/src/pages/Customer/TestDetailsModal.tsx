// src/components/TestDetailsModal.tsx
import React from "react";
import "./TestDetailsModal.css";
import { X, Settings, Download, Users, Headphones, FileText } from "lucide-react";

interface TestDetailsModalProps {
  test: {
    id: string;
    details: {
      sampleDate: string;
      sampleLocation: string;
      sampleCode: string;
      resultFile?: string;
      expertMessage?: string;
      bookingDetails?: {
        serviceName: string;
        appointmentDate: string;
        numSamples: number;
        notes?: string;
        participants?: { fullName: string; relationship: string }[];
      };
    };
  };
  onClose: () => void;
}

export function TestDetailsModal({ test, onClose }: TestDetailsModalProps) {
  console.log('TestDetailsModal nhận test:', test);
  return (
    <div className="overlay">
      <div className="modal">
        <header className="header">
          <h3 className="title">Chi tiết xét nghiệm #{test.id}</h3>
          <button onClick={onClose} className="closeBtn">
            <span className="iconSmall" style={{ color: '#888' }}><X size={16} /></span>
          </button>
        </header>
        <div className="body">
          {/* Đưa section bookingDetails lên đầu để dễ thấy */}
          {test.details.bookingDetails && (
            <div className="section">
              <h4 className="sectionTitle">
                <span className="iconSmall" style={{ color: '#a855f7' }}><FileText size={16} /></span> Chi tiết đơn booking
              </h4>
              <table style={{ width: '100%', marginBottom: 12 }}>
                <tbody>
                  <tr>
                    <td className="bold" style={{ width: 120 }}>Dịch vụ:</td>
                    <td>{test.details.bookingDetails.serviceName}</td>
                  </tr>
                  <tr>
                    <td className="bold">Ngày hẹn:</td>
                    <td>{test.details.bookingDetails.appointmentDate}</td>
                  </tr>
                  <tr>
                    <td className="bold">Số mẫu:</td>
                    <td>{test.details.bookingDetails.numSamples}</td>
                  </tr>
                  <tr>
                    <td className="bold">Ghi chú:</td>
                    <td>{test.details.bookingDetails.notes || 'Không có'}</td>
                  </tr>
                </tbody>
              </table>
              <div style={{ marginTop: 8 }}>
                <span className="bold">Người tham gia:</span>
                <ul style={{ margin: 0, paddingLeft: 20, listStyle: 'disc' }}>
                  {test.details.bookingDetails.participants?.map((p: any, idx: number) => (
                    <li key={idx}><span className="bold">{p.fullName}</span> ({p.relationship})</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div className="section">
            <h4 className="sectionTitle">
              <span className="iconSmall" style={{ color: '#2563eb' }}><Settings size={16} /></span> Thông tin mẫu
            </h4>
            <p><span className="bold">Ngày lấy mẫu:</span> {test.details.sampleDate}</p>
            <p><span className="bold">Địa điểm:</span> {test.details.sampleLocation}</p>
            <p><span className="bold">Mã mẫu:</span> <code className="code">{test.details.sampleCode}</code></p>
          </div>
          {test.details.resultFile && (
            <div className="section">
              <h4 className="sectionTitle">
                <span className="iconSmall" style={{ color: '#22c55e' }}><Download size={16} /></span> File kết quả
              </h4>
              <a href={test.details.resultFile} target="_blank" rel="noopener noreferrer" className="downloadBtn">
                <span className="iconSmall" style={{ color: '#22c55e' }}><Download size={16} /></span> Tải xuống kết quả
              </a>
            </div>
          )}
          {test.details.expertMessage && (
            <div className="section">
              <h4 className="sectionTitle">
                <span className="iconSmall" style={{ color: '#2563eb' }}><Users size={16} /></span> Lời nhắn chuyên gia
              </h4>
              <p>{test.details.expertMessage}</p>
            </div>
          )}
          <div className="footer">
            <button onClick={() => window.location.href = "tel:19001234"} className="callBtn">
              <span className="iconSmall" style={{ color: '#f59e42' }}><Headphones size={16} /></span> Liên hệ hỗ trợ
            </button>
          </div>
        </div>
      </div>
    </div>
);
}
