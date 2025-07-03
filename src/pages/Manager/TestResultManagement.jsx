// pages/Manager/TestResultManagement.jsx
import React, { useEffect, useState } from 'react';
import './TestResultManagement.css';

// Mock data theo cấu trúc SQL TestResult và DetailResult
const mockTestResults = [
    {
        testResultID: 'TR001',
        bookingID: 'BK001',
        resultDate: '2024-01-15',
        createdBy: 'Dr. Smith',
        createdDate: '2024-01-15T10:30:00',
        resultConclusion: 'Positive match (99.9%)',
        resultFile: 'paternity_test_TR001.pdf',
        updatedBy: null,
        updatedDate: null,
        status: 'pending', // pending, confirmed, sent
        customerName: 'Nguyễn Văn A',
        testType: 'Paternity Test',
        details: [
            {
                detailID: 'DT001',
                testResultID: 'TR001',
                markerName: 'D8S1179',
                allele1: '12',
                allele2: '15',
                interpretation: 'Compatible'
            },
            {
                detailID: 'DT002',
                testResultID: 'TR001',
                markerName: 'D21S11',
                allele1: '30',
                allele2: '32.2',
                interpretation: 'Compatible'
            }
        ]
    },
    {
        testResultID: 'TR002',
        bookingID: 'BK002',
        resultDate: '2024-01-16',
        createdBy: 'Dr. Johnson',
        createdDate: '2024-01-16T14:15:00',
        resultConclusion: 'Negative match (0.01%)',
        resultFile: 'maternity_test_TR002.pdf',
        updatedBy: 'Manager A',
        updatedDate: '2024-01-17T09:00:00',
        status: 'confirmed',
        customerName: 'Trần Thị B',
        testType: 'Maternity Test',
        details: [
            {
                detailID: 'DT003',
                testResultID: 'TR002',
                markerName: 'D8S1179',
                allele1: '10',
                allele2: '14',
                interpretation: 'Incompatible'
            }
        ]
    },
    {
        testResultID: 'TR003',
        bookingID: 'BK003',
        resultDate: '2024-01-17',
        createdBy: 'Dr. Brown',
        createdDate: '2024-01-17T11:45:00',
        resultConclusion: 'Positive match (99.8%)',
        resultFile: 'sibling_test_TR003.pdf',
        updatedBy: 'Manager B',
        updatedDate: '2024-01-18T16:30:00',
        status: 'sent',
        customerName: 'Lê Hoàng C',
        testType: 'Sibling Test',
        details: [
            {
                detailID: 'DT004',
                testResultID: 'TR003',
                markerName: 'D3S1358',
                allele1: '15',
                allele2: '17',
                interpretation: 'Compatible'
            },
            {
                detailID: 'DT005',
                testResultID: 'TR003',
                markerName: 'FGA',
                allele1: '22',
                allele2: '24',
                interpretation: 'Compatible'
            }
        ]
    }
];

export default function TestResultManagement() {
    const [testResults, setTestResults] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSendModal, setShowSendModal] = useState(false);
    const [actionType, setActionType] = useState('');
    const [loading, setLoading] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setTestResults(mockTestResults);
        }, 500);
    }, []);

    const getStatusBadge = (status) => {
        const badges = {
            pending: { text: 'Chờ xác nhận', class: 'status-pending' },
            confirmed: { text: 'Đã xác nhận', class: 'status-confirmed' },
            sent: { text: 'Đã gửi', class: 'status-sent' }
        };
        return badges[status] || { text: status, class: 'status-default' };
    };

    const filteredResults = testResults.filter(result => 
        filterStatus === 'all' || result.status === filterStatus
    );

    const handleViewDetail = (result) => {
        setSelectedResult(result);
        setShowDetailModal(true);
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
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const updatedResults = testResults.map(result => {
                if (result.testResultID === selectedResult.testResultID) {
                    const now = new Date().toISOString();
                    if (actionType === 'confirm') {
                        return {
                            ...result,
                            status: 'confirmed',
                            updatedBy: 'Current Manager',
                            updatedDate: now
                        };
                    } else if (actionType === 'send') {
                        return {
                            ...result,
                            status: 'sent',
                            updatedBy: 'Current Manager',
                            updatedDate: now
                        };
                    }
                }
                return result;
            });
            
            setTestResults(updatedResults);
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
                            <th>Thao tác</th>
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
                                <td className="conclusion">{result.resultConclusion}</td>
                                <td>
                                    <span className={`status-badge ${getStatusBadge(result.status).class}`}>
                                        {getStatusBadge(result.status).text}
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
                                    {result.status === 'pending' && (
                                        <button 
                                            onClick={() => handleConfirmResult(result)}
                                            className="btn btn-success"
                                            title="Xác nhận kết quả"
                                        >
                                            <i className="fas fa-check"></i>
                                        </button>
                                    )}
                                    {result.status === 'confirmed' && (
                                        <button 
                                            onClick={() => handleSendResult(result)}
                                            className="btn btn-primary"
                                            title="Gửi kết quả cho khách hàng"
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
                                    <span className="value">{selectedResult.testType}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Ngày có kết quả:</span>
                                    <span className="value">{formatDate(selectedResult.resultDate)}</span>
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
                                    <span className="value conclusion">{selectedResult.resultConclusion}</span>
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
                                        {selectedResult.details.map(detail => (
                                            <tr key={detail.detailID}>
                                                <td>{detail.markerName}</td>
                                                <td>{detail.allele1}</td>
                                                <td>{detail.allele2}</td>
                                                <td>
                                                    <span className={`marker-result ${detail.interpretation.toLowerCase()}`}>
                                                        {detail.interpretation}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
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
        </div>
    );
}