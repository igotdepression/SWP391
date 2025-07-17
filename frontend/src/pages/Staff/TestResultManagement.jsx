// Staff/TestResultManagement.jsx
import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Select } from '../../components/ui/ui';
import { TestResultAPI } from '../../services/api';
import './TestResultManagement.css';

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
        <div className="test-result-management-container">
            {/* Loading State */}
            {loading && (
                <div className="loading-container">
                    <div>Đang tải dữ liệu...</div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="error-container">
                    <strong>Lỗi:</strong> {error}
                    <button 
                        onClick={() => {
                            setError(null);
                            loadTestResults();
                        }}
                        className="retry-button"
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
    );
}