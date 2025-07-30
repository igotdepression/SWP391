// pages/Manager/TestResultManagement.jsx
import React, { useEffect, useState } from 'react';
import './TestResultManagement.css';
import { testResultAPI, detailResultAPI } from '../../services/api';

export default function TestResultManagement() {
    const [testResults, setTestResults] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);
    const [selectedDetails, setSelectedDetails] = useState([]);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSendModal, setShowSendModal] = useState(false);
    const [actionType, setActionType] = useState('');
    const [loading, setLoading] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [editingResult, setEditingResult] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        setLoading(true);
        testResultAPI.getAllTestResults()
            .then(res => setTestResults(res.data))
            .catch(() => setTestResults([]))
            .finally(() => setLoading(false));
    }, []);

    const getStatusBadge = (status) => {
        const badges = {
            pending: { text: 'Chờ xác nhận', class: 'status-pending' },
            confirmed: { text: 'Đã xác nhận', class: 'status-confirmed' },
            sent: { text: 'Đã gửi', class: 'status-sent' },
            'Hoàn thành': { text: 'Hoàn thành', class: 'status-complete' },
            'Chờ xác nhận': { text: 'Chờ xác nhận', class: 'status-pending' },
            'Đã xác nhận': { text: 'Đã xác nhận', class: 'status-confirmed' },
            'Đã gửi': { text: 'Đã gửi', class: 'status-sent' },
            // Thêm các trạng thái khác nếu có
        };
        return badges[status] || { text: status || 'N/A', class: 'status-default' };
    };

    const filteredResults = testResults.filter(result => 
        filterStatus === 'all' || result.status === filterStatus
    );

    const handleViewDetail = async (result) => {
        setSelectedResult(result);
        setShowDetailModal(true);
        // Lấy chi tiết marker từ API, đảm bảo testResultID là số
        try {
            const res = await detailResultAPI.getDetailResultsByTestResultId(Number(result.testResultID));
            setSelectedDetails(res.data);
        } catch {
            setSelectedDetails([]);
        }
    };

    const handleConfirmResult = (result) => {
        setSelectedResult(result);
        setActionType('confirm');
        setShowConfirmModal(true);
    };

    const handleSendResult = (result) => {
        setSelectedResult(result);
        setActionType('send');
        setShowSendModal(true);
    };

    const executeAction = async () => {
        if (!selectedResult || !selectedResult.testResultID) {
            alert('Không có dữ liệu để thực hiện thao tác!');
            return;
        }
        setLoading(true);
        try {
            if (actionType === 'confirm') {
                const updated = { ...selectedResult, status: 'confirmed' };
                await testResultAPI.updateTestResult(selectedResult.testResultID, updated);
            } else if (actionType === 'send') {
                // Gọi API gửi kết quả thực sự
                await testResultAPI.sendTestResult(selectedResult.testResultID);
            }
            // Reload danh sách
            const res = await testResultAPI.getAllTestResults();
            setTestResults(res.data);
            setShowConfirmModal(false);
            setShowSendModal(false);
            setSelectedResult(null);
        } catch (error) {
            console.error('Error executing action:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString('vi-VN');
    };

    // Thêm hàm handleEditResult (tạm thời chỉ alert)
    const handleEditResult = (result) => {
        setEditingResult(result);
        setShowEditModal(true);
    };

    const handleSaveEditResult = async (updatedResult) => {
        setLoading(true);
        try {
            const currentUserFullName = localStorage.getItem('fullName') || 'Unknown';
            const now = new Date().toISOString();
            const { detailResults, ...rest } = updatedResult;
            await testResultAPI.updateTestResult(updatedResult.testResultID, {
                ...rest,
                updatedBy: currentUserFullName,
                updatedDate: now
            });
            const res = await testResultAPI.getAllTestResults();
            setTestResults(res.data);
            setShowEditModal(false);
            setEditingResult(null);
        } catch (error) {
            alert('Cập nhật thất bại!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="test-result-management">
            <div className="page-header">
                <h1>Quản lý kết quả xét nghiệm</h1>
                <p>Xem, xác nhận và gửi kết quả xét nghiệm đến khách hàng</p>
            </div>

            {/* Filter Bar */}
            <div className="filter-bar">
                <div className="filter-group">
                    <label>Trạng thái:</label>
                    <select 
                        value={filterStatus} 
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">Tất cả</option>
                        <option value="pending">Chờ xác nhận</option>
                        <option value="confirmed">Đã xác nhận</option>
                        <option value="sent">Đã gửi</option>
                    </select>
                </div>
                <div className="results-count">
                    Tổng cộng: {filteredResults.length} kết quả
                </div>
            </div>

            {/* Results Table */}
            <div className="results-table-container">
                <table className="results-table">
                    <thead>
                        <tr>
                            <th>ID kết quả</th>
                            <th>Mã đặt lịch</th>
                            <th>Khách hàng</th>
                            <th>Loại xét nghiệm</th>
                            <th>Ngày có kết quả</th>
                            <th>Kết luận</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResults.map(result => (
                            <tr key={result.testResultID}>
                                <td className="result-id">{result.testResultID}</td>
                                <td>{result.bookingID}</td>
                                <td className="customer-name">{result.customerName}</td>
                                <td>{result.testType}</td>
                                <td>{formatDate(result.resultDate)}</td>
                                <td className="conclusion">{result.resultConclution || result.resultConclusion || 'N/A'}</td>
                                <td>
                                    <span className={`status-badge ${getStatusBadge(result.status || result.bookingStatus).class}`}>
                                        <span className="status-dot"></span>
                                        {getStatusBadge(result.status || result.bookingStatus).text}
                                    </span>
                                </td>
                                <td className="actions">
                                    <button 
                                        onClick={() => handleViewDetail(result)}
                                        className="btn btn-info"
                                        title="Xem chi tiết"
                                    >
                                        <i className="fas fa-eye"></i>
                                    </button>
                                    <button
                                        onClick={() => handleEditResult(result)}
                                        className="btn btn-warning"
                                        title="Sửa kết quả"
                                        style={{ marginLeft: 8 }}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    {result.status === 'pending' && (
                                        <button 
                                            onClick={() => handleConfirmResult(result)}
                                            className="btn btn-success"
                                            title="Xác nhận kết quả"
                                            style={{ marginLeft: 8 }}
                                        >
                                            <i className="fas fa-check"></i>
                                        </button>
                                    )}
                                    {result.status === 'confirmed' && (
                                        <button 
                                            onClick={() => handleSendResult(result)}
                                            className="btn btn-primary"
                                            title="Gửi kết quả cho khách hàng"
                                            style={{ marginLeft: 8 }}
                                        >
                                            <i className="fas fa-paper-plane"></i>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Detail Modal */}
            {showDetailModal && selectedResult && (
                <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Chi tiết kết quả xét nghiệm</h2>
                            <button 
                                className="close-btn"
                                onClick={() => setShowDetailModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="result-info">
                                <div className="info-row">
                                    <span className="label">ID kết quả:</span>
                                    <span className="value">{selectedResult.testResultID}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Mã đặt lịch:</span>
                                    <span className="value">{selectedResult.bookingID}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Khách hàng:</span>
                                    <span className="value">{selectedResult.customerName}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Loại xét nghiệm:</span>
                                    <span className="value">{selectedResult.serviceName || selectedResult.serviceType || 'N/A'}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Ngày có kết quả:</span>
                                    <span className="value">{formatDate(selectedResult.resultDate)}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Trạng thái:</span>
                                    <span className="value">{selectedResult.status || selectedResult.bookingStatus || 'N/A'}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Người tạo:</span>
                                    <span className="value">{selectedResult.createdBy}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Ngày tạo:</span>
                                    <span className="value">{formatDate(selectedResult.createdDate)}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Kết luận:</span>
                                    <span className="value conclusion">{selectedResult.resultConclution || selectedResult.resultConclusion || 'N/A'}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">File kết quả:</span>
                                    <span className="value file-link">{selectedResult.resultFile}</span>
                                </div>
                                {selectedResult.updatedBy && (
                                    <>
                                        <div className="info-row">
                                            <span className="label">Người cập nhật:</span>
                                            <span className="value">{selectedResult.updatedBy}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="label">Ngày cập nhật:</span>
                                            <span className="value">{formatDate(selectedResult.updatedDate)}</span>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="detail-results">
                                <h3>Chi tiết các marker</h3>
                                <table className="detail-table">
                                    <thead>
                                        <tr>
                                            <th>Marker</th>
                                            <th>Allele 1</th>
                                            <th>Allele 2</th>
                                            <th>Kết quả</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedDetails.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} style={{ textAlign: 'center', color: '#888' }}>
                                                    Không có dữ liệu chi tiết
                                                </td>
                                            </tr>
                                        ) : (
                                            selectedDetails.map((detail, idx) => (
                                                <tr key={detail.detailResultID || detail.locusName || idx}>
                                                    <td>{detail.locusName}</td>
                                                    <td>{detail.p1Allele1}</td>
                                                    <td>{detail.p1Allele2}</td>
                                                    <td>
                                                        <span className="marker-result">{detail.paternityIndex !== undefined ? detail.paternityIndex : 'N/A'}</span>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Modal */}
            {showConfirmModal && selectedResult && (
                <div className="modal-overlay">
                    <div className="modal-content confirm-modal">
                        <div className="modal-header">
                            <h2>Xác nhận kết quả</h2>
                        </div>
                        <div className="modal-body">
                            <p>Bạn có chắc chắn muốn xác nhận kết quả xét nghiệm này không?</p>
                            <div className="confirm-info">
                                <strong>ID kết quả:</strong> {selectedResult.testResultID}<br />
                                <strong>Khách hàng:</strong> {selectedResult.customerName}<br />
                                <strong>Kết luận:</strong> {selectedResult.resultConclusion}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button 
                                className="btn btn-secondary"
                                onClick={() => setShowConfirmModal(false)}
                                disabled={loading}
                            >
                                Hủy
                            </button>
                            <button 
                                className="btn btn-success"
                                onClick={executeAction}
                                disabled={loading}
                            >
                                {loading ? 'Đang xử lý...' : 'Xác nhận'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Send Modal */}
            {showSendModal && selectedResult && (
                <div className="modal-overlay">
                    <div className="modal-content send-modal">
                        <div className="modal-header">
                            <h2>Gửi kết quả cho khách hàng</h2>
                        </div>
                        <div className="modal-body">
                            <p>Bạn có chắc chắn muốn gửi kết quả này cho khách hàng không?</p>
                            <div className="send-info">
                                <strong>ID kết quả:</strong> {selectedResult.testResultID}<br />
                                <strong>Khách hàng:</strong> {selectedResult.customerName}<br />
                                <strong>Loại xét nghiệm:</strong> {selectedResult.testType}<br />
                                <strong>File kết quả:</strong> {selectedResult.resultFile}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button 
                                className="btn btn-secondary"
                                onClick={() => setShowSendModal(false)}
                                disabled={loading}
                            >
                                Hủy
                            </button>
                            <button 
                                className="btn btn-primary"
                                onClick={executeAction}
                                disabled={loading}
                            >
                                {loading ? 'Đang gửi...' : 'Gửi kết quả'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Result Modal */}
            {showEditModal && editingResult && (
                <EditResultModal
                    result={editingResult}
                    onSave={handleSaveEditResult}
                    onCancel={() => { setShowEditModal(false); setEditingResult(null); }}
                />
            )}
        </div>
    );
}

// Modal sửa kết quả
const EditResultModal = ({ result, onSave, onCancel }) => {
    const [formData, setFormData] = useState({ ...result });
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Sửa kết quả xét nghiệm</h3>
                <form onSubmit={e => { e.preventDefault(); onSave(formData); }}>
                    <div className="form-group">
                        <label>Kết luận:</label>
                        <textarea
                            value={formData.resultConclution || ''}
                            onChange={e => setFormData({ ...formData, resultConclution: e.target.value })}
                            rows={3}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái:</label>
                        <select
                            value={formData.status || ''}
                            onChange={e => setFormData({ ...formData, status: e.target.value })}
                            required
                        >
                            <option value="pending">Chờ xác nhận</option>
                            <option value="confirmed">Đã xác nhận</option>
                            <option value="sent">Đã gửi</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>File kết quả:</label>
                        <input
                            type="text"
                            value={formData.resultFile || ''}
                            onChange={e => setFormData({ ...formData, resultFile: e.target.value })}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">Lưu</button>
                        <button type="button" className="btn btn-secondary" onClick={onCancel}>Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    );
};