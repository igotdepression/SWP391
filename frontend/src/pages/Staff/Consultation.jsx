import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Select } from '../../components/ui/ui'; // Đảm bảo đường dẫn này đúng
import { Eye, NotebookPen } from 'lucide-react'; // Cần cài đặt: npm install lucide-react
import './Consultation.css'; // Import file CSS mới tạo
import api from '../../services/api';

export default function Consultation() {
    // Dữ liệu mẫu cho các yêu cầu tư vấn
    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get('/consultations')
            .then(res => {
                setConsultations(Array.isArray(res.data) ? res.data : []);
                setLoading(false);
            })
            .catch(err => {
                setError('Không thể tải danh sách yêu cầu tư vấn!');
                setConsultations([]);
                setLoading(false);
            });
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Mới: Sử dụng một state duy nhất để điều khiển modal và loại modal
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: null, // 'detail' hoặc 'note'
        consultation: null,
        noteContent: '',
        isEditingNote: false,
        newStatusSelection: ''
    });

    // Hàm chuyển đổi type sang tên dịch vụ tiếng Việt
    const getServiceTypeName = (type) => {
        // Nếu type đã là tên tiếng Việt đầy đủ, trả về nguyên giá trị
        if (type && type.includes('Xét nghiệm ADN')) {
            return type;
        }
        
        // Nếu type là mã code tiếng Anh, chuyển đổi sang tiếng Việt
        const serviceTypeMap = {
            'paternity': 'Xét nghiệm ADN cha con',
            'maternity': 'Xét nghiệm ADN mẹ con',
            'grandpa': 'Xét nghiệm ADN ông cháu',
            'grandma': 'Xét nghiệm ADN bà cháu',
            'sibling': 'Xét nghiệm ADN anh em',
            'other': 'Khác'
        };
        return serviceTypeMap[type] || type;
    };

    // Lọc và tìm kiếm yêu cầu tư vấn
    const filteredConsultations = consultations.filter(consultation => {
        const matchesSearch =
            (consultation.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (consultation.phone || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (consultation.type || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || consultation.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Hàm mở Modal chi tiết đầy đủ (icon con mắt)
    const openDetailModal = (consultation) => {
        setModalConfig({
            isOpen: true,
            type: 'detail',
            consultation: consultation,
            noteContent: consultation.notes,
            isEditingNote: false, // Bắt đầu ở chế độ hiển thị ghi chú
            newStatusSelection: consultation.status
        });
    };

    // Hàm mở Modal chỉ hiển thị ghi chú (icon ghi chú)
    const openNoteModal = (consultation) => {
        setModalConfig({
            isOpen: true,
            type: 'note',
            consultation: consultation,
            noteContent: consultation.notes || '', // luôn là string
            isEditingNote: true,
            newStatusSelection: consultation.status
        });
    };

    // Hàm đóng Modal chung
    const closeAllModals = () => {
        setModalConfig({
            isOpen: false,
            type: null,
            consultation: null,
            noteContent: '',
            isEditingNote: false,
            newStatusSelection: ''
        });
    };

    // Cập nhật nội dung ghi chú trong state của modal
    const handleNoteContentChange = (e) => {
        console.log('onChange:', e.target.value);
        setModalConfig(prev => ({ ...prev, noteContent: e.target.value }));
    };

    // Xử lý lưu ghi chú
    const handleSaveNote = () => {
        const { consultation, noteContent } = modalConfig;
        if (consultation) {
            setConsultations(prevConsultations =>
                prevConsultations.map(c =>
                    c.consultantID === consultation.consultantID ? { ...c, notes: noteContent } : c
                )
            );
            // Cập nhật lại consultation trong modal config để hiển thị ngay lập tức
            setModalConfig(prev => ({
                ...prev,
                consultation: { ...prev.consultation, notes: noteContent }
            }));
            alert('Ghi chú đã được lưu!');
            if (modalConfig.type === 'note') {
                closeAllModals();
            } else {
                setModalConfig(prev => ({ ...prev, isEditingNote: false }));
            }
        }
    };

    // Cập nhật trạng thái mới trong state của modal
    const handleNewStatusSelectionChange = (e) => {
        setModalConfig(prev => ({ ...prev, newStatusSelection: e.target.value }));
    };

    // Xử lý khi chọn trạng thái từ dropdown trong bảng (không thay đổi)
    const handleStatusChangeInTable = (c, newStatus) => {
        if (newStatus !== c.status) {
            const confirmUpdate = window.confirm(
                `Bạn có chắc chắn muốn chuyển trạng thái sang "${getStatusLabel(newStatus)}"?`
            );
            if (confirmUpdate) {
                setConsultations(prev =>
                    prev.map(item =>
                        item.consultantID === c.consultantID ? { ...item, status: newStatus } : item
                    )
                );
            }
        }
    };

    // Xử lý cập nhật trạng thái trong modal chi tiết
    const handleStatusUpdateInModal = () => {
        const { consultation, newStatusSelection } = modalConfig;
        if (newStatusSelection && newStatusSelection !== consultation.status) {
            const confirmUpdate = window.confirm(
                `Bạn có chắc chắn muốn chuyển trạng thái sang "${getStatusLabel(newStatusSelection)}"?`
            );
            if (confirmUpdate) {
                setConsultations(prevConsultations =>
                    prevConsultations.map(c =>
                        c.consultantID === consultation.consultantID
                            ? { ...c, status: newStatusSelection }
                            : c
                    )
                );
                // Cập nhật lại consultation trong modal config
                setModalConfig(prev => ({ ...prev, consultation: { ...prev.consultation, status: newStatusSelection } }));
                alert(`Trạng thái đã cập nhật thành: ${getStatusLabel(newStatusSelection)}`);
            }
        }
    };

    // Hàm trả về nhãn trạng thái thân thiện
    const getStatusLabel = (status) => {
        switch (status) {
            case 'new': return 'Mới';
            case 'in-progress': return 'Đang xử lý';
            case 'completed': return 'Hoàn thành';
            case 'cancelled': return 'Đã hủy';
            default: return status;
        }
    };

    // Định nghĩa các trạng thái có thể cập nhật
    const availableStatuses = [
        { value: 'new', label: 'Mới', color: '#2563eb' },
        { value: 'in-progress', label: 'Đang xử lý', color: '#ff9800' },
        { value: 'completed', label: 'Hoàn thành', color: '#22c55e' },
        { value: 'cancelled', label: 'Đã hủy', color: '#ef4444' },
    ];

    // Component Modal chung (được định nghĩa nội bộ)
    const ConsultationModal = ({
        config,
        onClose,
        onSaveNote,
        onStatusUpdate,
        onNoteContentChange,
        onNewStatusSelectionChange,
        getStatusLabel,
        availableStatuses
    }) => {
        if (!config.isOpen || !config.consultation) return null;

        const { consultation, noteContent, isEditingNote, newStatusSelection, type } = config;

        // Toggle edit note trong detail modal
        const toggleEditNote = () => {
            setModalConfig(prev => ({ ...prev, isEditingNote: !prev.isEditingNote }));
        };

        return (
            <div className="modal-overlay">
                <Card className={`modal-content ${type === 'detail' ? 'consultation-detail-modal' : 'consultation-note-modal'}`}>
                    {/* Nút đóng dấu X */}
                    <h3>Chi tiết đơn tư vấn: {consultation.consultantID}</h3>
                    <button
                        className="modal-close-x"
                        onClick={onClose}
                        aria-label="Đóng"
                    >
                        &times;
                    </button>

                    {type === 'detail' && (
                        <div className="consultation-detail-info">
                                                    <div><strong>Mã yêu cầu:</strong> {consultation.consultantID}</div>
                        <div><strong>Khách hàng:</strong> {consultation.name}</div>
                        <div><strong>Số điện thoại:</strong> {consultation.phone}</div>
                            <div><strong>Dịch vụ quan tâm:</strong> {getServiceTypeName(consultation.type)}</div>
                            <div><strong>Ngày yêu cầu:</strong> {consultation.createdDate}</div>
                            <div>
                                <strong>Trạng thái:</strong>
                                <span className={`status-badge status-${consultation.status}`} style={{ marginLeft: 8 }}>
                                    {getStatusLabel(consultation.status)}
                                </span>
                            </div>
                            <div style={{ marginTop: 12 }}>
                                <strong>Nội dung chi tiết khách hàng cần tư vấn:</strong>
                                <div className="consultation-content-text">
                                    {consultation.content || "Chưa có nội dung chi tiết."}
                                </div>
                            </div>
                        </div>
                    )}
                    {type === 'note' && (
                        <div className="consultation-note-modal-content">
                            <div style={{ marginBottom: 12 }}>
                                <strong>Ghi chú:</strong>
                                <textarea
                                    className="textarea"
                                    value={noteContent} // hoặc value={noteContent}
                                    onChange={onNoteContentChange}
                                    rows={5}
                                    placeholder="Nhập ghi chú cho yêu cầu tư vấn này..."
                                />
                            </div>
                            <div className="note-modal-actions">
                                <Button
                                    variant="destructive"
                                    onClick={onSaveNote}
                                    className="note-save-btn"
                                    style={{ width: "50%" }}
                                >
                                    Lưu ghi chú
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={onClose}
                                    className="note-close-btn"
                                    style={{ width: "50%" }}
                                >
                                    Đóng
                                </Button>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        );
    };

    return (
        <div className="consultation--container">
            <div className="consultation-content">
                <Card className="consultation-header-card">
                    <div className="consultation-header-row">
                        <h2 className="consultation-title">Danh sách Yêu cầu</h2>
                        <div className="consultation-controls">
                            <Input
                                type="text"
                                placeholder="Tìm kiếm theo khách hàng, SĐT hoặc loại tư vấn..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                            <Select
                                value={filterStatus}
                                onChange={e => setFilterStatus(e.target.value)}
                                className={`filter-select filter-select-${filterStatus}`}
                            >
                                <option value="all" className="filter-option-all">Tất cả trạng thái</option>
                                <option value="new" className="filter-option-new">Mới</option>
                                <option value="in-progress" className="filter-option-in-progress">Đang xử lý</option>
                                <option value="completed" className="filter-option-completed">Hoàn thành</option>
                                <option value="cancelled" className="filter-option-cancelled">Đã hủy</option>
                            </Select>
                        </div>
                        {/* Thêm phần thống kê tổng quan ở đây */}
                        <div className="consultation-stats-row">
                            <div className="consultation-stat-card total">
                                <span className="stat-icon"><i className="fas fa-list"></i></span>
                                <span className="stat-label">Tổng đơn</span>
                                <span className="stat-value">{consultations.length}</span>
                            </div>
                            <div className="consultation-stat-card new">
                                <span className="stat-icon"><i className="fas fa-star"></i></span>
                                <span className="stat-label">Đơn mới</span>
                                <span className="stat-value">{consultations.filter(c => c.status === 'new').length}</span>
                            </div>
                            <div className="consultation-stat-card in-progress">
                                <span className="stat-icon"><i className="fas fa-spinner"></i></span>
                                <span className="stat-label">Đang xử lý</span>
                                <span className="stat-value">{consultations.filter(c => c.status === 'in-progress').length}</span>
                            </div>
                            <div className="consultation-stat-card completed">
                                <span className="stat-icon"><i className="fas fa-check-circle"></i></span>
                                <span className="stat-label">Hoàn thành</span>
                                <span className="stat-value">{consultations.filter(c => c.status === 'completed').length}</span>
                            </div>
                            <div className="consultation-stat-card cancelled">
                                <span className="stat-icon"><i className="fas fa-times-circle"></i></span>
                                <span className="stat-label">Đã hủy</span>
                                <span className="stat-value">{consultations.filter(c => c.status === 'cancelled').length}</span>
                            </div>
                        </div>
                    </div>
                    {loading ? (
                        <p>Đang tải dữ liệu...</p>
                    ) : error ? (
                        <p style={{ color: 'red' }}>{error}</p>
                    ) : (
                        filteredConsultations.length > 0 ? (
                            <div className="table-responsive">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Mã Yêu cầu</th>
                                            <th>Khách hàng</th>
                                            <th>Số điện thoại</th>
                                            <th>Dịch vụ quan tâm</th>
                                            <th>Ngày yêu cầu</th>
                                            <th>Trạng thái</th>
                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredConsultations.map(c => (
                                                                        <tr key={c.consultantID}>
                                <td>{c.consultantID}</td>
                                <td>{c.name}</td>
                                <td>{c.phone}</td>
                                <td>{getServiceTypeName(c.type)}</td>
                                <td>{c.createdDate}</td>
                                                <td style={{ position: "relative" }}>
                                                    <Select
                                                        id={`status-select-${c.consultantID}`}
                                                        value={c.status}
                                                        onChange={e => handleStatusChangeInTable(c, e.target.value)}
                                                        className={`status-dropdown status-${c.status} no-arrow`}
                                                    >
                                                        {availableStatuses.map(s => (
                                                            <option
                                                                key={s.value}
                                                                value={s.value}
                                                                className={`status-option status-option-${s.value}`}
                                                            >
                                                                {getStatusLabel(s.value)}
                                                            </option>
                                                        ))}
                                                    </Select>
                                                </td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <button
                                                            type="button"
                                                            title="Xem chi tiết"
                                                            onClick={() => openDetailModal(c)}
                                                        >
                                                            <Eye size={24} color="#ff9800" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            title="Thêm/Sửa ghi chú"
                                                            onClick={() => openNoteModal(c)}
                                                        >
                                                            <NotebookPen size={24} color="#22c55e" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>Không tìm thấy yêu cầu tư vấn nào.</p>
                        )
                    )}
                </Card>
            </div>

            {/* Chỉ render MỘT instance của ConsultationModal */}
            <ConsultationModal
                config={modalConfig}
                onClose={closeAllModals}
                onSaveNote={handleSaveNote}
                onStatusUpdate={handleStatusUpdateInModal}
                onNoteContentChange={handleNoteContentChange}
                onNewStatusSelectionChange={handleNewStatusSelectionChange}
                getStatusLabel={getStatusLabel}
                availableStatuses={availableStatuses}
            />


        </div>
    );
}