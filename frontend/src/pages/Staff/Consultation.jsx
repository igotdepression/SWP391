import React, { useState } from 'react';
import { Card, Button, Input, Select } from '../../components/ui/ui'; // Đảm bảo đường dẫn này đúng
import { Eye, NotebookPen } from 'lucide-react'; // Cần cài đặt: npm install lucide-react
import './Consultation.css'; // Import file CSS mới tạo

export default function Consultation() {
    // Dữ liệu mẫu cho các yêu cầu tư vấn
    const [consultations, setConsultations] = useState([
        {
            id: 'CSL001',
            customerName: 'Đinh Công Lý',
            phoneNumber: '0901234567',
            type: ['Tư vấn kết quả xét nghiệm', 'Theo mục đích sử dụng: dân sự'],
            requestDate: '2024-06-20',
            status: 'new',
            notes: 'Khách hàng quan tâm đến xét nghiệm huyết thống cho mục đích hành chính.',
            contents: 'Tôi muốn biết quy trình xét nghiệm huyết thống để làm thủ tục dân sự, cần chuẩn bị giấy tờ gì, thời gian trả kết quả và chi phí ra sao?'
        },
        {
            id: 'CSL002',
            customerName: 'Bùi Thị Hà',
            phoneNumber: '0912345678',
            type: ['Tư vấn dịch vụ', 'Theo thời gian trả kết quả: lấy nhanh'],
            requestDate: '2024-06-19',
            status: 'in-progress',
            notes: 'Đã liên hệ, đang chờ phản hồi từ khách hàng. Khách hàng muốn tư vấn thêm về gói dịch vụ gia đình và yêu cầu nhận kết quả qua email.',
            contents: 'Tôi muốn được tư vấn về các gói dịch vụ xét nghiệm lấy nhanh, thời gian trả kết quả và có thể nhận kết quả qua email không?'
        },
        {
            id: 'CSL003',
            customerName: 'Võ Thanh Tú',
            phoneNumber: '0987654321',
            type: ['Hỏi đáp về quy trình', 'Theo phương thức lấy mẫu: tại nhà'],
            requestDate: '2024-06-18',
            status: 'completed',
            notes: 'Đã giải đáp thắc mắc về quy trình lấy mẫu tại nhà. Khách hàng đồng ý sử dụng dịch vụ.',
            contents: 'Tôi muốn hỏi về quy trình lấy mẫu xét nghiệm tại nhà, có phát sinh thêm chi phí không và cần chuẩn bị gì trước khi lấy mẫu?'
        },
        {
            id: 'CSL004',
            customerName: 'Mai Văn Tấn',
            phoneNumber: '0976543210',
            type: ['Tư vấn kết quả xét nghiệm', 'Theo đặc điểm mẫu sinh học: mẫu máu'],
            requestDate: '2024-06-17',
            status: 'new',
            notes: 'Khách hàng có bệnh lý nền, cần tư vấn chuyên sâu về các yếu tố ảnh hưởng kết quả.',
            contents: 'Tôi có bệnh lý nền, xin hỏi bệnh này có ảnh hưởng đến kết quả xét nghiệm không? Có cần lưu ý gì khi lấy mẫu máu?'
        },
        {
            id: 'CSL005',
            customerName: 'Trần Thị Mai',
            phoneNumber: '0909876543',
            type: ['Tư vấn dịch vụ', 'Theo giá cả dịch vụ'],
            requestDate: '2024-06-16',
            status: 'new',
            notes: 'Yêu cầu báo giá chi tiết cho gói xét nghiệm tổng quát.',
            contents: 'Tôi muốn nhận báo giá chi tiết cho gói xét nghiệm tổng quát và các dịch vụ đi kèm.'
        },
        {
            id: 'CSL006',
            customerName: 'Lê Văn Cường',
            phoneNumber: '0918765432',
            type: ['Tư vấn kết quả xét nghiệm', 'Theo đối tượng xét nghiệm: cha con'],
            requestDate: '2024-06-15',
            status: 'in-progress',
            notes: 'Đã gửi tài liệu tham khảo cho khách hàng. Đang chờ xác nhận lịch hẹn.',
            contents: 'Tôi muốn xét nghiệm huyết thống cha con, xin tư vấn về thủ tục, chi phí và thời gian trả kết quả.'
        },
        {
            id: 'CSL010',
            customerName: 'Hoàng Kim Chi',
            phoneNumber: '0921098765',
            type: ['Tư vấn dịch vụ', 'Theo đặc điểm mẫu sinh học: niêm mạc miệng'],
            requestDate: '2024-06-11',
            status: 'in-progress',
            notes: 'Đã sắp xếp cuộc hẹn tư vấn trực tiếp vào 14h ngày 28/06/2024.',
            contents: 'Tôi muốn biết về quy trình lấy mẫu niêm mạc miệng, có đau không và có cần nhịn ăn trước khi lấy mẫu không?'
        },
        {
            id: 'CSL007',
            customerName: 'Phạm Thu Hoài',
            phoneNumber: '0965432109',
            type: ['Hỏi đáp về quy trình', 'Theo thời gian trả kết quả: tiêu chuẩn'],
            requestDate: '2024-06-14',
            status: 'completed',
            notes: 'Khách hàng hài lòng với thông tin cung cấp về thời gian trả kết quả tiêu chuẩn.',
            contents: 'Tôi muốn hỏi thời gian trả kết quả tiêu chuẩn là bao lâu và có thể lấy kết quả trực tiếp tại trung tâm không?'
        },
        {
            id: 'CSL008',
            customerName: 'Nguyễn Đình Khôi',
            phoneNumber: '0943210987',
            type: ['Tư vấn dịch vụ', 'Theo phương thức lấy mẫu: tại trung tâm'],
            requestDate: '2024-06-13',
            status: 'cancelled',
            notes: 'Khách hàng hủy yêu cầu do đã tìm được thông tin từ nguồn khác.',
            contents: 'Tôi muốn biết về quy trình lấy mẫu tại trung tâm, thời gian tiếp nhận và có cần đặt lịch trước không?'
        },
        {
            id: 'CSL009',
            customerName: 'Đặng Thanh Sơn',
            phoneNumber: '0932109876',
            type: ['Tư vấn kết quả xét nghiệm', 'Theo mục đích sử dụng: hành chính'],
            requestDate: '2024-06-12',
            status: 'new',
            notes: 'Khách hàng cần tư vấn các giấy tờ pháp lý liên quan đến kết quả.',
            contents: 'Tôi cần tư vấn về các giấy tờ pháp lý liên quan đến kết quả xét nghiệm để sử dụng cho mục đích hành chính.'
        },
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
                    c.id === consultation.id ? { ...c, notes: noteContent } : c
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
                    {/* Nút đóng dấu X */}
                    <h3>Chi tiết đơn tư vấn: {consultation.id}</h3>
                    <button
                        className="modal-close-x"
                        onClick={onClose}
                        aria-label="Đóng"
                    >
                        &times;
                    </button>

                    {type === 'detail' && (
                        <div className="consultation-detail-info">
                            <div><strong>Mã yêu cầu:</strong> {consultation.id}</div>
                            <div><strong>Khách hàng:</strong> {consultation.customerName}</div>
                            <div><strong>Số điện thoại:</strong> {consultation.phoneNumber}</div>
                            <div><strong>Loại tư vấn:</strong> {consultation.type.join(', ')}</div>
                            <div><strong>Ngày yêu cầu:</strong> {consultation.requestDate}</div>
                            <div>
                                <strong>Trạng thái:</strong>
                                <span className={`status-badge status-${consultation.status}`} style={{ marginLeft: 8 }}>
                                    {getStatusLabel(consultation.status)}
                                </span>
                            </div>
                            <div style={{ marginTop: 12 }}>
                                <strong>Nội dung chi tiết khách hàng cần tư vấn:</strong>
                                <div className="consultation-content-text">
                                    {consultation.contents || "Chưa có nội dung chi tiết."}
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