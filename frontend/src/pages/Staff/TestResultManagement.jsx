// Staff/TestResultManagement.jsx
import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Select } from '../../components/ui/ui';
import { TestResultAPI } from '../../services/api';
import './TestResultManagement.css';

const beautifulStyles = `
/* Test Result Management Beautiful CSS */
.test-result-management-container {
    padding: 20px;
    background: #ffffff;
    min-height: 100vh;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Statistics Section */
.statistics-section {
    margin-bottom: 40px;
}

.page-title {
    font-size: 32px;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 32px;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stats-container {
    display: flex;
    justify-content: center;
    gap: 32px;
    margin-bottom: 40px;
    flex-wrap: wrap;
}

.stat-card {
    background: white;
    border-radius: 16px;
    padding: 32px 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    text-align: center;
    position: relative;
    min-width: 160px;
    transition: all 0.3s ease;
    cursor: pointer;
    border-left: 6px solid;
}

.stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.stat-card.stat-total {
    border-left-color: #3b82f6;
}

.stat-card.stat-ready {
    border-left-color: #10b981;
}

.stat-card.stat-normal {
    border-left-color: #f59e0b;
}

.stat-card.stat-special {
    border-left-color: #ef4444;
}

.stat-number {
    font-size: 64px;
    font-weight: 900;
    margin-bottom: 8px;
    line-height: 1;
    font-family: 'Arial', sans-serif;
}

.stat-total .stat-number {
    color: #3b82f6;
}

.stat-ready .stat-number {
    color: #10b981;
}

.stat-normal .stat-number {
    color: #f59e0b;
}

.stat-special .stat-number {
    color: #ef4444;
}

.stat-label {
    font-size: 12px;
    color: #6b7280;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-top: 8px;
}

/* Controls Section */
.controls-section {
    margin-bottom: 32px;
}

.section-title {
    font-size: 24px;
    font-weight: 600;
    color: #374151;
    margin-bottom: 20px;
    text-align: center;
}

.controls-row {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
}

.status-filter {
    min-width: 180px;
    padding: 12px 16px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    background: white;
    font-size: 14px;
    font-weight: 500;
    color: #6b7280;
}

.search-input-main {
    width: 400px;
    padding: 12px 20px;
    border: 2px solid #3b82f6;
    border-radius: 25px;
    font-size: 14px;
    background: white;
    outline: none;
}

.search-input-main::placeholder {
    color: #9ca3af;
}

.add-sample-btn {
    background: #3b82f6;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    border: none;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    white-space: nowrap;
}

.add-sample-btn:hover {
    background: #2563eb;
}

/* Table Container */
.table-container {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    max-width: 1200px;
}

.samples-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
}

.samples-table thead {
    background: #f8fafc;
}

.samples-table th {
    padding: 16px 12px;
    text-align: left;
    font-size: 12px;
    font-weight: 600;
    color: #374151;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    border-bottom: 1px solid #e5e7eb;
}

.samples-table td {
    padding: 16px 12px;
    border-bottom: 1px solid #f1f5f9;
    font-size: 14px;
    color: #374151;
    vertical-align: middle;
}

.samples-table tbody tr:hover {
    background: #f9fafb;
}

.samples-table tbody tr:nth-child(even) {
    background: #fcfcfd;
}

.samples-table tbody tr:nth-child(even):hover {
    background: #f3f4f6;
}

.patient-id {
    color: #3b82f6;
    font-weight: 600;
}

.sample-type-badge, .status-badge {
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 500;
    display: inline-block;
    text-align: center;
    min-width: 80px;
}

.sample-type-badge.sample-ready {
    background: #dcfce7;
    color: #166534;
    border: 1px solid #bbf7d0;
}

.sample-type-badge.sample-normal {
    background: #fef3c7;
    color: #92400e;
    border: 1px solid #fde68a;
}

.sample-type-badge.sample-special {
    background: #fee2e2;
    color: #991b1b;
    border: 1px solid #fecaca;
}

.status-badge.status-ready {
    background: #dcfce7;
    color: #166534;
    border: 1px solid #bbf7d0;
}

.status-badge.status-processing {
    background: #fef3c7;
    color: #92400e;
    border: 1px solid #fde68a;
}

.status-badge.status-normal {
    background: #dbeafe;
    color: #1d4ed8;
    border: 1px solid #bfdbfe;
}

.status-badge.status-special {
    background: #fee2e2;
    color: #991b1b;
    border: 1px solid #fecaca;
}

.action-buttons {
    display: flex;
    gap: 8px;
}

.btn-edit, .btn-delete {
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    border: 1px solid;
    text-transform: none;
}

.btn-edit {
    background: #dbeafe;
    color: #1d4ed8;
    border-color: #bfdbfe;
}

.btn-edit:hover {
    background: #3b82f6;
    color: white;
}

.btn-delete {
    background: #fee2e2;
    color: #991b1b;
    border-color: #fecaca;
}

.btn-delete:hover {
    background: #ef4444;
    color: white;
}

/* Modal Styles */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.modal-content {
    background: white;
    border-radius: 24px;
    width: 90%;
    max-width: 900px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 
        0 25px 50px rgba(0, 0, 0, 0.25),
        0 10px 25px rgba(0, 0, 0, 0.1);
    animation: slideUp 0.3s ease;
}

@keyframes slideUp {
    from { 
        opacity: 0;
        transform: translateY(50px) scale(0.95);
    }
    to { 
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.modal-header {
    padding: 32px;
    border-bottom: 2px solid #f1f5f9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, #f8fafc, #edf2f7);
    border-radius: 24px 24px 0 0;
}

.modal-header h2 {
    font-size: 24px;
    font-weight: 700;
    color: #2d3748;
    margin: 0;
}

.close-button {
    background: #f7fafc;
    border: 2px solid #e2e8f0;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 20px;
    color: #718096;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-button:hover {
    background: #e53e3e;
    color: white;
    border-color: #e53e3e;
    transform: rotate(90deg);
}

.modal-body {
    padding: 32px;
}

.result-info-section,
.result-conclusion-section,
.result-file-section,
.detail-results-section {
    margin-bottom: 40px;
    padding: 24px;
    background: #f8fafc;
    border-radius: 16px;
    border-left: 4px solid #4299e1;
}

.result-info-section h3,
.result-conclusion-section h3,
.result-file-section h3,
.detail-results-section h3 {
    font-size: 18px;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 20px;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
}

.info-item {
    background: white;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border-left: 3px solid #e2e8f0;
}

.info-item label {
    font-size: 12px;
    font-weight: 700;
    color: #718096;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
    display: block;
}

.info-item span, .info-item input {
    font-size: 14px;
    color: #2d3748;
    font-weight: 500;
}

.conclusion-textarea {
    width: 100%;
    padding: 16px;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 14px;
    resize: vertical;
    background: white;
    transition: all 0.3s ease;
}

.detail-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.detail-table th,
.detail-table td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid #f1f5f9;
}

.detail-table th {
    background: linear-gradient(135deg, #edf2f7, #e2e8f0);
    font-weight: 700;
    color: #2d3748;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.modal-footer {
    padding: 32px;
    border-top: 2px solid #f1f5f9;
    display: flex;
    gap: 16px;
    justify-content: flex-end;
    background: #f8fafc;
    border-radius: 0 0 24px 24px;
}

.modal-footer button {
    padding: 12px 24px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

/* Responsive Design */
@media (max-width: 768px) {
    .test-result-management-container {
        padding: 16px;
    }
    
    .stats-container {
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }
    
    .controls-row {
        flex-direction: column;
        gap: 16px;
    }
    
    .modal-content {
        width: 95%;
    }
    
    .info-grid {
        grid-template-columns: 1fr;
    }
}
`;

export default function TestResultManagement() {
    // State for API data
    const [testResults, setTestResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Component state
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedResult, setSelectedResult] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingResult, setEditingResult] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newResult, setNewResult] = useState({
        bookingID: '',
        resultDate: '',
        createdBy: '',
        resultConclution: '',
        resultFile: '',
        customerName: '',
        serviceName: '',
        sampleStaffID: '',
        patientID: '',
        sampleMethod: 'Tại cơ sở',
        sampleReceiveDate: '',
        sampleStatus: 'ready',
        sampleType: 'Mẫu Chuẩn'
    });

    // Detail results - this would come from another API in real implementation
    const [detailResults, setDetailResults] = useState([
        {
            detailResultID: 1,
            testResultID: 1,
            locusName: 'D3S1358',
            p1Allele1: '15',
            p1Allele2: '16',
            p2Allele1: '16',
            p2Allele2: '17',
            paternityIndex: 1.85
        },
        {
            detailResultID: 2,
            testResultID: 1,
            locusName: 'TH01',
            p1Allele1: '6',
            p1Allele2: '9.3',
            p2Allele1: '6',
            p2Allele2: '7',
            paternityIndex: 0.95
        },
        {
            detailResultID: 3,
            testResultID: 1,
            locusName: 'D21S11',
            p1Allele1: '30',
            p1Allele2: '31.2',
            p2Allele1: '29',
            p2Allele2: '30',
            paternityIndex: 2.15
        }
    ]);

    // Load test results on component mount
    useEffect(() => {
        loadTestResults();
    }, []);

    const loadTestResults = async () => {
        try {
            setLoading(true);
            const response = await TestResultAPI.getAllTestResults();
            const testResultsData = response.data;
            setTestResults(testResultsData);
            setError(null);
        } catch (err) {
            console.error('Error loading test results:', err);
            setError('Không thể tải danh sách kết quả xét nghiệm');
            // Fallback to empty array
            setTestResults([]);
        } finally {
            setLoading(false);
        }
    };

    // Calculate statistics
    const totalSamples = testResults.length;
    const readySamples = testResults.filter(r => r.sampleStatus === 'ready').length;
    const normalSamples = testResults.filter(r => r.sampleStatus === 'normal').length;
    const specialSamples = testResults.filter(r => r.sampleStatus === 'special').length;

    const filteredResults = testResults.filter(result => {
        const matchesSearch = result.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              result.bookingID.toString().includes(searchTerm.toLowerCase()) ||
                              result.testResultID.toString().includes(searchTerm.toLowerCase()) ||
                              result.patientID.toString().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || result.sampleStatus === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleViewDetails = async (result) => {
        try {
            const response = await TestResultAPI.getTestResultById(result.testResultID);
            setSelectedResult(response.data);
            setShowDetailModal(true);
            setEditMode(false);
        } catch (err) {
            console.error('Error loading test result details:', err);
            setError('Không thể tải chi tiết kết quả xét nghiệm');
            // Fallback to display basic data
            setSelectedResult(result);
            setShowDetailModal(true);
            setEditMode(false);
        }
    };

    const handleEditResult = async (result) => {
        try {
            const response = await TestResultAPI.getTestResultById(result.testResultID);
            setSelectedResult(response.data);
            setEditingResult({ ...response.data });
            setShowDetailModal(true);
            setEditMode(true);
        } catch (err) {
            console.error('Error loading test result for editing:', err);
            setError('Không thể tải dữ liệu để chỉnh sửa');
            // Fallback to basic data
            setSelectedResult(result);
            setEditingResult({ ...result });
            setShowDetailModal(true);
            setEditMode(true);
        }
    };

    const handleCloseModal = () => {
        setShowDetailModal(false);
        setSelectedResult(null);
        setEditingResult(null);
        setEditMode(false);
    };

    const handleSaveResult = async () => {
        if (editingResult) {
            try {
                setLoading(true);
                await TestResultAPI.updateTestResult(editingResult.testResultID, editingResult);
                
                // Refresh the test results list
                await loadTestResults();
                
                handleCloseModal();
                alert('Kết quả đã được cập nhật!');
            } catch (err) {
                console.error('Error updating test result:', err);
                setError('Không thể cập nhật kết quả xét nghiệm');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDeleteResult = async (resultId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa kết quả này?')) {
            try {
                setLoading(true);
                await TestResultAPI.deleteTestResult(resultId);
                
                // Refresh the test results list
                await loadTestResults();
                
                alert('Kết quả đã được xóa!');
            } catch (err) {
                console.error('Error deleting test result:', err);
                setError('Không thể xóa kết quả xét nghiệm');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleCreateNew = () => {
        setNewResult({
            bookingID: '',
            resultDate: '',
            createdBy: '',
            resultConclution: '',
            resultFile: '',
            customerName: '',
            serviceName: '',
            sampleStaffID: '',
            patientID: '',
            sampleMethod: 'Tại cơ sở',
            sampleReceiveDate: '',
            sampleStatus: 'ready',
            sampleType: 'Mẫu Chuẩn'
        });
        setShowCreateModal(true);
    };

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
        setNewResult({
            bookingID: '',
            resultDate: '',
            createdBy: '',
            resultConclution: '',
            resultFile: '',
            customerName: '',
            serviceName: '',
            sampleStaffID: '',
            patientID: '',
            sampleMethod: 'Tại cơ sở',
            sampleReceiveDate: '',
            sampleStatus: 'ready',
            sampleType: 'Mẫu Chuẩn'
        });
    };

    const handleSaveNewResult = async () => {
        // Basic validation
        if (!newResult.bookingID || !newResult.customerName || !newResult.serviceName) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc (Booking ID, Tên khách hàng, Dịch vụ)');
            return;
        }

        try {
            setLoading(true);
            await TestResultAPI.createTestResult(newResult);
            
            // Refresh the test results list
            await loadTestResults();
            
            handleCloseCreateModal();
            alert('Kết quả mới đã được tạo thành công!');
        } catch (err) {
            console.error('Error creating test result:', err);
            setError('Không thể tạo kết quả xét nghiệm mới');
        } finally {
            setLoading(false);
        }
    };

    const getDetailResultsForTest = (testResultID) => {
        return detailResults.filter(detail => detail.testResultID === testResultID);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Chưa có';
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return 'Chưa có';
        return new Date(dateString).toLocaleString('vi-VN');
    };

    const getSampleTypeClass = (sampleType) => {
        switch (sampleType) {
            case 'Mẫu Chuẩn': return 'sample-ready';
            case 'Mẫu Thông Thường': return 'sample-normal';
            case 'Mẫu Đặc Biệt': return 'sample-special';
            default: return 'sample-ready';
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'ready': return 'status-ready';
            case 'processing': return 'status-processing';
            case 'normal': return 'status-normal';
            case 'special': return 'status-special';
            default: return 'status-ready';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'ready': return 'Đã tiếp nhận';
            case 'processing': return 'Đang xét nghiệm';
            case 'normal': return 'Hoàn thành';
            case 'special': return 'Đặc biệt';
            default: return 'Đã tiếp nhận';
        }
    };

    return (
        <>
            <style>{beautifulStyles}</style>
            <div className="test-result-management-container">
                {/* Loading State */}
                {loading && (
                    <div className="loading-container" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '200px',
                        fontSize: '16px',
                        color: '#666'
                    }}>
                        <div>Đang tải dữ liệu...</div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="error-container" style={{
                        backgroundColor: '#fee',
                        border: '1px solid #fcc',
                        borderRadius: '4px',
                        padding: '12px',
                        margin: '10px 0',
                        color: '#c33'
                    }}>
                        <strong>Lỗi:</strong> {error}
                        <button 
                            onClick={() => {
                                setError(null);
                                loadTestResults();
                            }}
                            style={{
                                marginLeft: '10px',
                                padding: '4px 8px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Thử lại
                        </button>
                    </div>
                )}

                {/* Content - only show when not loading */}
                {!loading && (
                    <>
                        {/* Statistics Section */}
                        <div className="statistics-section">
                            <h1 className="page-title">Quản lý kết quả xét nghiệm</h1>
                            <div className="stats-container">
                                <div className="stat-card stat-total">
                                    <div className="stat-number">{totalSamples}</div>
                            <div className="stat-label">TỔNG MẪU</div>
                        </div>
                        <div className="stat-card stat-ready">
                            <div className="stat-number">{readySamples}</div>
                            <div className="stat-label">MẪU CHUẨN</div>
                        </div>
                        <div className="stat-card stat-normal">
                            <div className="stat-number">{normalSamples}</div>
                            <div className="stat-label">MẪU THÔNG THƯỜNG</div>
                        </div>
                        <div className="stat-card stat-special">
                            <div className="stat-number">{specialSamples}</div>
                            <div className="stat-label">MẪU ĐẶC BIỆT</div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="controls-section">
                    <h2 className="section-title">Danh sách kết quả xét nghiệm</h2>
                    <div className="controls-row">
                        <Select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="status-filter"
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="ready">Đã tiếp nhận</option>
                            <option value="processing">Đang xét nghiệm</option>
                            <option value="normal">Hoàn thành</option>
                            <option value="special">Đặc biệt</option>
                        </Select>
                        <Input
                            type="text"
                            placeholder="Tìm kiếm theo mã mẫu, booking ID, hoặc participant ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input-main"
                        />
                        <button 
                            onClick={loadTestResults}
                            className="add-sample-btn"
                            style={{ 
                                marginRight: '10px',
                                backgroundColor: '#28a745',
                                border: 'none'
                            }}
                        >
                            🔄 Làm mới
                        </button>
                        <Button 
                            className="add-sample-btn"
                            onClick={handleCreateNew}
                        >
                            + Thêm mẫu mới
                        </Button>
                    </div>
                </div>

                {/* Table Section */}
                <Card className="table-container">
                    {filteredResults.length > 0 ? (
                        <table className="samples-table">
                            <thead>
                                <tr>
                                    <th>MÃ MẪU</th>
                                    <th>MÃ BOOKING</th>
                                    <th>MÃ NHÂN VIÊN</th>
                                    <th>MÃ BỆNH NHÂN</th>
                                    <th>PHƯƠNG THỨC LẤY MẪU</th>
                                    <th>LOẠI MẪU</th>
                                    <th>NGÀY NHẬN MẪU</th>
                                    <th>TRẠNG THÁI</th>
                                    <th>HÀNH ĐỘNG</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResults.map(result => (
                                    <tr key={result.testResultID}>
                                        <td>{result.testResultID}</td>
                                        <td>{result.bookingID}</td>
                                        <td>{result.sampleStaffID}</td>
                                        <td className="patient-id">{result.patientID}</td>
                                        <td>{result.sampleMethod}</td>
                                        <td>
                                            <span className={`sample-type-badge ${getSampleTypeClass(result.sampleType)}`}>
                                                {result.sampleType}
                                            </span>
                                        </td>
                                        <td>{result.sampleReceiveDate}</td>
                                        <td>
                                            <span className={`status-badge ${getStatusClass(result.sampleStatus)}`}>
                                                {getStatusText(result.sampleStatus)}
                                            </span>
                                        </td>
                                        <td className="action-buttons">
                                            <Button 
                                                size="sm" 
                                                className="btn-edit"
                                                onClick={() => handleViewDetails(result)}
                                            >
                                                SỬA
                                            </Button>
                                            <Button 
                                                size="sm" 
                                                className="btn-delete"
                                                variant="outline"
                                                onClick={() => handleDeleteResult(result.testResultID)}
                                            >
                                                XÓA
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="no-results">Không tìm thấy kết quả xét nghiệm nào.</p>
                    )}
                </Card>

            {/* Modal Overlay */}
            {showDetailModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editMode ? 'Chỉnh sửa kết quả xét nghiệm' : 'Chi tiết kết quả xét nghiệm'}</h2>
                            <button className="close-button" onClick={handleCloseModal}>×</button>
                        </div>
                        
                        <div className="modal-body">
                            {selectedResult && (
                                <>
                                    <div className="result-info-section">
                                        <h3>Thông tin chung</h3>
                                        <div className="info-grid">
                                            <div className="info-item">
                                                <label>ID Kết quả:</label>
                                                <span>{selectedResult.testResultID}</span>
                                            </div>
                                            <div className="info-item">
                                                <label>Mã Booking:</label>
                                                <span>{selectedResult.bookingID}</span>
                                            </div>
                                            <div className="info-item">
                                                <label>Tên khách hàng:</label>
                                                <span>{selectedResult.customerName}</span>
                                            </div>
                                            <div className="info-item">
                                                <label>Dịch vụ:</label>
                                                <span>{selectedResult.serviceName}</span>
                                            </div>
                                            <div className="info-item">
                                                <label>Ngày kết quả:</label>
                                                {editMode ? (
                                                    <Input
                                                        type="date"
                                                        value={editingResult?.resultDate || ''}
                                                        onChange={(e) => setEditingResult(prev => ({...prev, resultDate: e.target.value}))}
                                                    />
                                                ) : (
                                                    <span>{formatDate(selectedResult.resultDate)}</span>
                                                )}
                                            </div>
                                            <div className="info-item">
                                                <label>Người tạo:</label>
                                                {editMode ? (
                                                    <Input
                                                        value={editingResult?.createdBy || ''}
                                                        onChange={(e) => setEditingResult(prev => ({...prev, createdBy: e.target.value}))}
                                                    />
                                                ) : (
                                                    <span>{selectedResult.createdBy || 'Chưa có'}</span>
                                                )}
                                            </div>
                                            <div className="info-item">
                                                <label>Ngày tạo:</label>
                                                <span>{formatDateTime(selectedResult.createdDate)}</span>
                                            </div>
                                            <div className="info-item">
                                                <label>Người cập nhật:</label>
                                                <span>{selectedResult.updatedBy || 'Chưa có'}</span>
                                            </div>
                                            <div className="info-item">
                                                <label>Ngày cập nhật:</label>
                                                <span>{formatDateTime(selectedResult.updatedDate)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="result-conclusion-section">
                                        <h3>Kết luận</h3>
                                        {editMode ? (
                                            <textarea
                                                value={editingResult?.resultConclution || ''}
                                                onChange={(e) => setEditingResult(prev => ({...prev, resultConclution: e.target.value}))}
                                                rows="4"
                                                placeholder="Nhập kết luận xét nghiệm..."
                                                className="conclusion-textarea"
                                            />
                                        ) : (
                                            <p>{selectedResult.resultConclution || 'Chưa có kết luận'}</p>
                                        )}
                                    </div>

                                    <div className="result-file-section">
                                        <h3>File kết quả</h3>
                                        {editMode ? (
                                            <Input
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                onChange={(e) => {
                                                    if (e.target.files[0]) {
                                                        setEditingResult(prev => ({...prev, resultFile: e.target.files[0].name}));
                                                    }
                                                }}
                                            />
                                        ) : (
                                            selectedResult.resultFile ? (
                                                <a href={`/path/to/results/${selectedResult.resultFile}`} target="_blank" rel="noopener noreferrer">
                                                    {selectedResult.resultFile}
                                                </a>
                                            ) : (
                                                <span>Chưa có file kết quả</span>
                                            )
                                        )}
                                    </div>

                                    <div className="detail-results-section">
                                        <h3>Chi tiết kết quả xét nghiệm ADN</h3>
                                        {getDetailResultsForTest(selectedResult.testResultID).length > 0 ? (
                                            <table className="detail-table">
                                                <thead>
                                                    <tr>
                                                        <th>Locus</th>
                                                        <th>P1 Allele 1</th>
                                                        <th>P1 Allele 2</th>
                                                        <th>P2 Allele 1</th>
                                                        <th>P2 Allele 2</th>
                                                        <th>Paternity Index</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {getDetailResultsForTest(selectedResult.testResultID).map(detail => (
                                                        <tr key={detail.detailResultID}>
                                                            <td>{detail.locusName}</td>
                                                            <td>{detail.p1Allele1 || '-'}</td>
                                                            <td>{detail.p1Allele2 || '-'}</td>
                                                            <td>{detail.p2Allele1 || '-'}</td>
                                                            <td>{detail.p2Allele2 || '-'}</td>
                                                            <td>{detail.paternityIndex ? detail.paternityIndex.toFixed(2) : '-'}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p>Chưa có chi tiết kết quả</p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="modal-footer">
                            {editMode ? (
                                <>
                                    <Button variant="primary" onClick={handleSaveResult}>
                                        Lưu thay đổi
                                    </Button>
                                    <Button variant="outline" onClick={handleCloseModal}>
                                        Hủy
                                    </Button>
                                </>
                            ) : (
                                <Button variant="outline" onClick={handleCloseModal}>
                                    Đóng
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Create New Modal */}
            {showCreateModal && (
                <div className="modal-overlay" onClick={handleCloseCreateModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Tạo kết quả xét nghiệm mới</h2>
                            <button className="close-button" onClick={handleCloseCreateModal}>×</button>
                        </div>
                        
                        <div className="modal-body">
                            <div className="result-info-section">
                                <h3>Thông tin cơ bản <span style={{color: 'red'}}>*</span></h3>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <label>Mã Booking <span style={{color: 'red'}}>*</span>:</label>
                                        <Input
                                            type="number"
                                            value={newResult.bookingID}
                                            onChange={(e) => setNewResult(prev => ({...prev, bookingID: e.target.value}))}
                                            placeholder="Nhập mã booking"
                                            required
                                        />
                                    </div>
                                    <div className="info-item">
                                        <label>Tên khách hàng <span style={{color: 'red'}}>*</span>:</label>
                                        <Input
                                            value={newResult.customerName}
                                            onChange={(e) => setNewResult(prev => ({...prev, customerName: e.target.value}))}
                                            placeholder="Nhập tên khách hàng"
                                            required
                                        />
                                    </div>
                                    <div className="info-item">
                                        <label>Dịch vụ <span style={{color: 'red'}}>*</span>:</label>
                                        <Select
                                            value={newResult.serviceName}
                                            onChange={(e) => setNewResult(prev => ({...prev, serviceName: e.target.value}))}
                                        >
                                            <option value="">Chọn dịch vụ</option>
                                            <option value="Xét nghiệm ADN xác định bố con">Xét nghiệm ADN xác định bố con</option>
                                            <option value="Xét nghiệm ADN xác định anh em ruột">Xét nghiệm ADN xác định anh em ruột</option>
                                            <option value="Xét nghiệm ADN xác định ông bà cháu">Xét nghiệm ADN xác định ông bà cháu</option>
                                        </Select>
                                    </div>
                                    <div className="info-item">
                                        <label>Mã nhân viên lấy mẫu:</label>
                                        <Input
                                            type="number"
                                            value={newResult.sampleStaffID}
                                            onChange={(e) => setNewResult(prev => ({...prev, sampleStaffID: e.target.value}))}
                                            placeholder="Nhập mã nhân viên"
                                        />
                                    </div>
                                    <div className="info-item">
                                        <label>Mã bệnh nhân:</label>
                                        <Input
                                            type="number"
                                            value={newResult.patientID}
                                            onChange={(e) => setNewResult(prev => ({...prev, patientID: e.target.value}))}
                                            placeholder="Nhập mã bệnh nhân"
                                        />
                                    </div>
                                    <div className="info-item">
                                        <label>Phương thức lấy mẫu:</label>
                                        <Select
                                            value={newResult.sampleMethod}
                                            onChange={(e) => setNewResult(prev => ({...prev, sampleMethod: e.target.value}))}
                                        >
                                            <option value="Tại cơ sở">Tại cơ sở</option>
                                            <option value="Tại nhà">Tại nhà</option>
                                        </Select>
                                    </div>
                                    <div className="info-item">
                                        <label>Loại mẫu:</label>
                                        <Select
                                            value={newResult.sampleType}
                                            onChange={(e) => setNewResult(prev => ({...prev, sampleType: e.target.value}))}
                                        >
                                            <option value="Mẫu Chuẩn">Mẫu Chuẩn</option>
                                            <option value="Mẫu Thông Thường">Mẫu Thông Thường</option>
                                            <option value="Mẫu Đặc Biệt">Mẫu Đặc Biệt</option>
                                        </Select>
                                    </div>
                                    <div className="info-item">
                                        <label>Trạng thái mẫu:</label>
                                        <Select
                                            value={newResult.sampleStatus}
                                            onChange={(e) => setNewResult(prev => ({...prev, sampleStatus: e.target.value}))}
                                        >
                                            <option value="ready">Đã tiếp nhận</option>
                                            <option value="processing">Đang xét nghiệm</option>
                                            <option value="normal">Hoàn thành</option>
                                            <option value="special">Đặc biệt</option>
                                        </Select>
                                    </div>
                                    <div className="info-item">
                                        <label>Ngày nhận mẫu:</label>
                                        <Input
                                            type="date"
                                            value={newResult.sampleReceiveDate}
                                            onChange={(e) => setNewResult(prev => ({...prev, sampleReceiveDate: e.target.value}))}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="result-conclusion-section">
                                <h3>Thông tin kết quả (tùy chọn)</h3>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <label>Ngày kết quả:</label>
                                        <Input
                                            type="date"
                                            value={newResult.resultDate}
                                            onChange={(e) => setNewResult(prev => ({...prev, resultDate: e.target.value}))}
                                        />
                                    </div>
                                    <div className="info-item">
                                        <label>Người tạo:</label>
                                        <Input
                                            value={newResult.createdBy}
                                            onChange={(e) => setNewResult(prev => ({...prev, createdBy: e.target.value}))}
                                            placeholder="Nhập tên người tạo"
                                        />
                                    </div>
                                </div>
                                <div style={{marginTop: '16px'}}>
                                    <label style={{display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: '#718096', textTransform: 'uppercase'}}>
                                        Kết luận:
                                    </label>
                                    <textarea
                                        value={newResult.resultConclution}
                                        onChange={(e) => setNewResult(prev => ({...prev, resultConclution: e.target.value}))}
                                        rows="4"
                                        placeholder="Nhập kết luận xét nghiệm (nếu có)..."
                                        className="conclusion-textarea"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <Button variant="primary" onClick={handleSaveNewResult}>
                                Tạo mới
                            </Button>
                            <Button variant="outline" onClick={handleCloseCreateModal}>
                                Hủy
                            </Button>
                        </div>
                    </div>
                </div>
            )}
                    </>
                )}
            </div>
        </>
    );
}