import React, { useState } from 'react';
import { Card, Button, Input, Select } from '../../components/ui/ui'; // Đảm bảo đường dẫn này đúng
import { Eye, NotebookPen } from 'lucide-react'; // Cần cài đặt: npm install lucide-react
import './Consultation.css'; // Import file CSS mới tạo

export default function Consultation() {
    // Dữ liệu mẫu cho các yêu cầu tư vấn
    const [consultations, setConsultations] = useState([
        { id: 'CSL001', customerName: 'Đinh Công Lý', phoneNumber: '0901234567', type: ['Tư vấn kết quả xét nghiệm', 'Theo mục đích sử dụng: dân sự'], requestDate: '2024-06-20', status: 'new', notes: 'Khách hàng quan tâm đến xét nghiệm huyết thống cho mục đích hành chính.' },
        { id: 'CSL002', customerName: 'Bùi Thị Hà', phoneNumber: '0912345678', type: ['Tư vấn dịch vụ', 'Theo thời gian trả kết quả: lấy nhanh'], requestDate: '2024-06-19', status: 'in-progress', notes: 'Đã liên hệ, đang chờ phản hồi từ khách hàng. Khách hàng muốn tư vấn thêm về gói dịch vụ gia đình và yêu cầu nhận kết quả qua email.' },
        { id: 'CSL003', customerName: 'Võ Thanh Tú', phoneNumber: '0987654321', type: ['Hỏi đáp về quy trình', 'Theo phương thức lấy mẫu: tại nhà'], requestDate: '2024-06-18', status: 'completed', notes: 'Đã giải đáp thắc mắc về quy trình lấy mẫu tại nhà. Khách hàng đồng ý sử dụng dịch vụ.' },
        { id: 'CSL004', customerName: 'Mai Văn Tấn', phoneNumber: '0976543210', type: ['Tư vấn kết quả xét nghiệm', 'Theo đặc điểm mẫu sinh học: mẫu máu'], requestDate: '2024-06-17', status: 'new', notes: 'Khách hàng có bệnh lý nền, cần tư vấn chuyên sâu về các yếu tố ảnh hưởng kết quả.' },
        { id: 'CSL005', customerName: 'Trần Thị Mai', phoneNumber: '0909876543', type: ['Tư vấn dịch vụ', 'Theo giá cả dịch vụ'], requestDate: '2024-06-16', status: 'new', notes: 'Yêu cầu báo giá chi tiết cho gói xét nghiệm tổng quát.' },
        { id: 'CSL006', customerName: 'Lê Văn Cường', phoneNumber: '0918765432', type: ['Tư vấn kết quả xét nghiệm', 'Theo đối tượng xét nghiệm: cha con'], requestDate: '2024-06-15', status: 'in-progress', notes: 'Đã gửi tài liệu tham khảo cho khách hàng. Đang chờ xác nhận lịch hẹn.' },
        { id: 'CSL010', customerName: 'Hoàng Kim Chi', phoneNumber: '0921098765', type: ['Tư vấn dịch vụ', 'Theo đặc điểm mẫu sinh học: niêm mạc miệng'], requestDate: '2024-06-11', status: 'in-progress', notes: 'Đã sắp xếp cuộc hẹn tư vấn trực tiếp vào 14h ngày 28/06/2024.' },
        { id: 'CSL007', customerName: 'Phạm Thu Hoài', phoneNumber: '0965432109', type: ['Hỏi đáp về quy trình', 'Theo thời gian trả kết quả: tiêu chuẩn'], requestDate: '2024-06-14', status: 'completed', notes: 'Khách hàng hài lòng với thông tin cung cấp về thời gian trả kết quả tiêu chuẩn.' },
        { id: 'CSL008', customerName: 'Nguyễn Đình Khôi', phoneNumber: '0943210987', type: ['Tư vấn dịch vụ', 'Theo phương thức lấy mẫu: tại trung tâm'], requestDate: '2024-06-13', status: 'cancelled', notes: 'Khách hàng hủy yêu cầu do đã tìm được thông tin từ nguồn khác.' },
        { id: 'CSL009', customerName: 'Đặng Thanh Sơn', phoneNumber: '0932109876', type: ['Tư vấn kết quả xét nghiệm', 'Theo mục đích sử dụng: hành chính'], requestDate: '2024-06-12', status: 'new', notes: 'Khách hàng cần tư vấn các giấy tờ pháp lý liên quan đến kết quả.' },
    ]);

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

    // Lọc và tìm kiếm yêu cầu tư vấn
    const filteredConsultations = consultations.filter(consultation => {
        const matchesSearch =
            consultation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            consultation.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            consultation.type.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
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
            noteContent: consultation.notes,
            isEditingNote: true, // Bắt đầu trực tiếp ở chế độ chỉnh sửa ghi chú
            newStatusSelection: consultation.status // Giữ lại trạng thái nhưng không dùng trong note modal
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
        setModalConfig(prev => ({ ...prev, noteContent: e.target.value }));
    };

    // Xử lý lưu ghi chú
    const handleSaveNote = () => {
        const { consultation, noteContent } = modalConfig;
        if (consultation) {
            setConsultations(prevConsultations =>
                prevConsultations.map(c =>
                    c.id === consultation.id ? { ...c, notes: noteContent } : c
                )
            );
            // Cập nhật lại consultation trong modal config để hiển thị ngay lập tức
            setModalConfig(prev => ({ ...prev, consultation: { ...prev.consultation, notes: noteContent } }));
            alert('Ghi chú đã được lưu!');

            // Sau khi lưu, nếu đang ở note modal, đóng nó. Nếu ở detail modal, thoát chế độ chỉnh sửa.
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
                        item.id === c.id ? { ...item, status: newStatus } : item
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
                        c.id === consultation.id
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
                    <h3>
                        {type === 'detail'
                            ? `Chi tiết tư vấn: ${consultation.customerName}`
                            : `Ghi chú nội bộ: ${consultation.customerName} (${consultation.id})`}
                    </h3>

                    {/* Chỉ hiện thông tin chi tiết khi là detail modal */}
                    {type === 'detail' && (
                        <>
                            <p><strong>Mã yêu cầu:</strong> {consultation.id}</p>
                            <p><strong>Khách hàng:</strong> {consultation.customerName}</p>
                            <p><strong>Số điện thoại:</strong> {consultation.phoneNumber}</p>
                            <p><strong>Loại tư vấn:</strong> {consultation.type.join(', ')}</p>
                            <p><strong>Ngày yêu cầu:</strong> {consultation.requestDate}</p>
                            <p>
                                <strong>Trạng thái:</strong>
                                <span className={`status-badge status-${consultation.status}`}>
                                    {getStatusLabel(consultation.status)}
                                </span>
                            </p>
                        </>
                    )}

                    {/* Ghi chú: luôn hiện textarea khi là note modal, hoặc khi đang sửa trong detail modal */}
                    <div className="notes-section" style={type === 'note' ? { borderTop: 'none', paddingTop: '0' } : {}}>
                        <h4>Ghi chú nội bộ:</h4>
                        {(isEditingNote || type === 'note') ? (
                            <>
                                <textarea
                                    value={noteContent}
                                    onChange={onNoteContentChange}
                                    rows={type === 'note' ? 8 : 5}
                                    placeholder="Thêm ghi chú về quá trình tư vấn..."
                                    className="textarea"
                                />
                                <div className="flex-gap-10 mt-3">
                                    <Button onClick={onSaveNote}>Lưu ghi chú</Button>
                                    {type === 'detail' && (
                                        <Button variant="outline" onClick={toggleEditNote}>Hủy</Button>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="current-notes">{consultation.notes || "Chưa có ghi chú nào."}</p>
                                <Button size="sm" onClick={toggleEditNote}>Sửa ghi chú</Button>
                            </>
                        )}
                    </div>

                    {/* Chỉ hiện cập nhật trạng thái khi là detail modal */}
                    {type === 'detail' && (
                        <div className="status-update-section">
                            <h4>Cập nhật trạng thái:</h4>
                            <div className="flex-gap-10">
                                <Select
                                    value={newStatusSelection}
                                    onChange={onNewStatusSelectionChange}
                                    className="status-update-select"
                                >
                                    {availableStatuses.map(s => (
                                        <option
                                            key={s.value}
                                            value={s.value}
                                            className={`status-option status-option-${s.value}`}
                                        >
                                            {s.label}
                                        </option>
                                    ))}
                                </Select>
                                <Button size="sm" onClick={onStatusUpdate}>Xác nhận</Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => onNewStatusSelectionChange({ target: { value: consultation.status } })}
                                >
                                    Hủy
                                </Button>
                            </div>
                        </div>
                    )}

                    <Button
                        variant="destructive"
                        className="modal-close-button"
                        onClick={onClose}
                    >
                        Đóng
                    </Button>
                </Card>
            </div>
        );
    };

    return (
        <div className="consultation-container">
            <div className="consultation-content">
                <Card className="consultation-list-card">
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
                            <div className="stat-card total">
                                <span className="stat-icon"><i className="fas fa-list"></i></span>
                                <span className="stat-label">Tổng đơn</span>
                                <span className="stat-value">{consultations.length}</span>
                            </div>
                            <div className="stat-card new">
                                <span className="stat-icon"><i className="fas fa-star"></i></span>
                                <span className="stat-label">Đơn mới</span>
                                <span className="stat-value">{consultations.filter(c => c.status === 'new').length}</span>
                            </div>
                            <div className="stat-card in-progress">
                                <span className="stat-icon"><i className="fas fa-spinner"></i></span>
                                <span className="stat-label">Đang xử lý</span>
                                <span className="stat-value">{consultations.filter(c => c.status === 'in-progress').length}</span>
                            </div>
                            <div className="stat-card completed">
                                <span className="stat-icon"><i className="fas fa-check-circle"></i></span>
                                <span className="stat-label">Hoàn thành</span>
                                <span className="stat-value">{consultations.filter(c => c.status === 'completed').length}</span>
                            </div>
                            <div className="stat-card cancelled">
                                <span className="stat-icon"><i className="fas fa-times-circle"></i></span>
                                <span className="stat-label">Đã hủy</span>
                                <span className="stat-value">{consultations.filter(c => c.status === 'cancelled').length}</span>
                            </div>
                        </div>
                    </div>
                    {filteredConsultations.length > 0 ? (
                        <div className="table-responsive">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Mã Yêu cầu</th>
                                        <th>Khách hàng</th>
                                        <th>Số điện thoại</th>
                                        <th>Loại tư vấn</th>
                                        <th>Ngày yêu cầu</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredConsultations.map(c => (
                                        <tr key={c.id}>
                                            <td>{c.id}</td>
                                            <td>{c.customerName}</td>
                                            <td>{c.phoneNumber}</td>
                                            <td>{c.type.join(', ')}</td>
                                            <td>{c.requestDate}</td>
                                            <td style={{ position: "relative" }}>
                                                <Select
                                                    id={`status-select-${c.id}`}
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