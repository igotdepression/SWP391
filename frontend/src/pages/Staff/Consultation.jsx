// Staff/Consultation.jsx
import React, { useState } from 'react';
import { Card, Button, Input, Select } from '../../components/ui/ui';
import './Consultation.css';

export default function Consultation() {
    const [consultations, setConsultations] = useState([
        { id: 'CSL001', customerName: 'Đinh Công Lý', type: 'Tư vấn kết quả xét nghiệm', requestDate: '2025-06-20', status: 'new', notes: '' },
        { id: 'CSL002', customerName: 'Bùi Thị Hà', type: 'Tư vấn dịch vụ', requestDate: '2025-06-19', status: 'in-progress', notes: 'Đã liên hệ, đang chờ phản hồi từ khách hàng.' },
        { id: 'CSL003', customerName: 'Võ Thanh Tú', type: 'Hỏi đáp về quy trình', requestDate: '2025-06-18', status: 'completed', notes: 'Đã giải đáp thắc mắc.' },
        { id: 'CSL004', customerName: 'Mai Văn Tấn', type: 'Tư vấn kết quả xét nghiệm', requestDate: '2025-06-17', status: 'new', notes: '' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedConsultation, setSelectedConsultation] = useState(null);
    const [noteContent, setNoteContent] = useState('');

    const filteredConsultations = consultations.filter(consultation => {
        const matchesSearch = consultation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            consultation.type.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || consultation.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleViewDetails = (consultation) => {
        setSelectedConsultation(consultation);
        setNoteContent(consultation.notes);
    };

    const handleSaveNote = () => {
        if (selectedConsultation) {
            setConsultations(prevConsultations =>
                prevConsultations.map(c =>
                    c.id === selectedConsultation.id ? { ...c, notes: noteContent } : c
                )
            );
            setSelectedConsultation(prev => ({ ...prev, notes: noteContent }));
            alert('Ghi chú đã được lưu!');
        }
    };

    const handleUpdateStatus = (newStatus) => {
        if (selectedConsultation) {
            setConsultations(prevConsultations =>
                prevConsultations.map(c =>
                    c.id === selectedConsultation.id ? { ...c, status: newStatus } : c
                )
            );
            setSelectedConsultation(prev => ({ ...prev, status: newStatus }));
            alert(`Trạng thái đã cập nhật thành: ${newStatus}`);
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'new': return 'Mới';
            case 'in-progress': return 'Đang xử lý';
            case 'completed': return 'Hoàn thành';
            default: return status;
        }
    };

    return (
        <div className="consultation-container">
            <Card className="consultation-controls">
                <Input
                    type="text"
                    placeholder="Tìm kiếm theo khách hàng hoặc loại tư vấn..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="filter-select"
                >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="new">Mới</option>
                    <option value="in-progress">Đang xử lý</option>
                    <option value="completed">Hoàn thành</option>
                </Select>
            </Card>

            <div className="consultation-content">
                <Card className="consultation-list-card">
                    <h3>Yêu cầu tư vấn</h3>
                    {filteredConsultations.length > 0 ? (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Mã Yêu cầu</th>
                                    <th>Khách hàng</th>
                                    <th>Loại tư vấn</th>
                                    <th>Ngày yêu cầu</th>
                                    <th>Trạng thái</th>
                                    <th>Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredConsultations.map(c => (
                                    <tr key={c.id}>
                                        <td>{c.id}</td>
                                        <td>{c.customerName}</td>
                                        <td>{c.type}</td>
                                        <td>{c.requestDate}</td>
                                        <td>
                                            <span className={`status-badge status-${c.status}`}>
                                                {getStatusLabel(c.status)}
                                            </span>
                                        </td>
                                        <td>
                                            <Button size="sm" onClick={() => handleViewDetails(c)}>Xem</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Không tìm thấy yêu cầu tư vấn nào.</p>
                    )}
                </Card>

                {selectedConsultation && (
                    <Card className="consultation-detail-card">
                        <h3>Chi tiết tư vấn: {selectedConsultation.customerName}</h3>
                        <p><strong>Mã yêu cầu:</strong> {selectedConsultation.id}</p>
                        <p><strong>Loại tư vấn:</strong> {selectedConsultation.type}</p>
                        <p><strong>Ngày yêu cầu:</strong> {selectedConsultation.requestDate}</p>
                        <p><strong>Trạng thái:</strong> <span className={`status-badge status-${selectedConsultation.status}`}>{getStatusLabel(selectedConsultation.status)}</span></p>

                        <div className="notes-section">
                            <h4>Ghi chú nội bộ:</h4>
                            <textarea
                                value={noteContent}
                                onChange={(e) => setNoteContent(e.target.value)}
                                rows={5}
                                placeholder="Thêm ghi chú về quá trình tư vấn..."
                                className="textarea"
                            />
                            <Button className="mt-3" onClick={handleSaveNote}>Lưu ghi chú</Button>
                        </div>

                        <div className="status-update-section">
                            <h4>Cập nhật trạng thái:</h4>
                            <Button
                                size="sm"
                                className="status-button"
                                onClick={() => handleUpdateStatus('in-progress')}
                                disabled={selectedConsultation.status === 'in-progress'}
                            >
                                Đang xử lý
                            </Button>
                            <Button
                                size="sm"
                                className="status-button"
                                variant="primary"
                                onClick={() => handleUpdateStatus('completed')}
                                disabled={selectedConsultation.status === 'completed'}
                            >
                                Hoàn thành
                            </Button>
                            <Button
                                size="sm"
                                className="status-button"
                                variant="outline"
                                onClick={() => setSelectedConsultation(null)}
                            >
                                Đóng
                            </Button>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}