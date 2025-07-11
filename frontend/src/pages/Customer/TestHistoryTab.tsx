// src/components/TestHistoryTab.tsx
import React from "react";
import "./TestHistoryTab.css";
import { Users, FileText } from "lucide-react";

interface TestHistoryTabProps {
  history: Array<{
    id: string;
    date: string;
    type: string;
    status: string;
    statusColor: string;
    hasResult: boolean;
    onViewDetails: (id: string) => void;
  }>;
}

export function TestHistoryTab({ history }: TestHistoryTabProps) {
  return (
    <section className="container">
      <header className="header">
        <div className="headerContent">
          <span className="icon" style={{ color: '#f59e42' }}><FileText size={20} /></span>
          <h2 className="title">Lịch sử xét nghiệm</h2>
        </div>
      </header>
      <div className="body">
        <table className="table">
          <thead>
            <tr>
              <th>Mã XN</th>
              <th>Ngày ĐK</th>
              <th>Loại XN</th>
              <th>Trạng thái</th>
              <th>Kết quả</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {history.map(test => (
              <tr key={test.id}>
                <td className="code">#{test.id}</td>
                <td>{test.date}</td>
                <td className="type">
                  <span className="iconSmall" style={{ color: '#f59e42' }}><Users size={16} /></span> {test.type}
                </td>
                <td>
                  <span className={`statusBadge ${test.statusColor}`}>
                    {test.status}
                  </span>
                </td>
                <td>
                  {test.hasResult ? (
                    <span className="text-green-600 font-medium">Có kết quả</span>
                  ) : (
                    <span className="text-gray-400">Chưa có</span>
                  )}
                </td>
                <td>
                  {test.hasResult ? (
                    <button
                      onClick={() => test.onViewDetails(test.id)}
                      className="viewBtn"
                    >
                      Xem chi tiết
                    </button>
                  ) : (
                    <span className="text-gray-400">--</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
);
}
