// Staff/TestResultManagement.jsx
import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Select } from '../../components/ui/ui';
import './TestResultManagement.css';
import { bookingAPI } from '../../services/api';
import { testResultAPI } from '../../services/api';
import { detailResultAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';


export default function TestResultManagement() {
    // Sample data based on SQL structure - Extended with sample status
    const [testResults, setTestResults] = useState([
        {
            testResultID: 1,
            bookingID: 1001,
            resultDate: '2025-07-01',
            createdBy: 'Dr. Nguyen',
            createdDate: '2025-07-01T10:30:00',
            resultConclution: 'Kết quả xét nghiệm ADN đã hoàn tất',
            resultFile: 'result_1001.pdf',
            updatedBy: 'Staff01',
            updatedDate: '2025-07-02T14:20:00',
            customerName: 'Nguyễn Văn An',
            serviceName: 'Xét nghiệm ADN xác định bố con',
            sampleStaffID: 201,
            patientID: 301,
            sampleMethod: 'Tại cơ sở',
            sampleReceiveDate: '2025-06-15',
            sampleStatus: 'ready', // ready, processing, normal, special
            sampleType: 'Mẫu Chuẩn'
        },
        {
            testResultID: 2,
            bookingID: 1002,
            resultDate: '2025-07-02',
            createdBy: 'Dr. Tran',
            createdDate: '2025-07-02T09:15:00',
            resultConclution: 'Kết quả xét nghiệm cho thấy mối quan hệ huyết thống',
            resultFile: 'result_1002.pdf',
            updatedBy: null,
            updatedDate: null,
            customerName: 'Trần Thị Bình',
            serviceName: 'Xét nghiệm ADN xác định anh em ruột',
            sampleStaffID: 202,
            patientID: 302,
            sampleMethod: 'Tại nhà',
            sampleReceiveDate: '2025-06-20',
            sampleStatus: 'processing',
            sampleType: 'Mẫu Thông Thường'
        },
        {
            testResultID: 3,
            bookingID: 1003,
            resultDate: null,
            createdBy: null,
            createdDate: null,
            resultConclution: null,
            resultFile: null,
            updatedBy: null,
            updatedDate: null,
            customerName: 'Lê Văn Cường',
            serviceName: 'Xét nghiệm ADN xác định bố con',
            sampleStaffID: 203,
            patientID: 303,
            sampleMethod: 'Tại cơ sở',
            sampleReceiveDate: '2025-06-22',
            sampleStatus: 'ready',
            sampleType: 'Mẫu Chuẩn'
        },
        {
            testResultID: 4,
            bookingID: 1004,
            resultDate: '2025-07-03',
            createdBy: 'Dr. Le',
            createdDate: '2025-07-03T11:00:00',
            resultConclution: 'Hoàn thành xét nghiệm',
            resultFile: 'result_1004.pdf',
            updatedBy: 'Staff02',
            updatedDate: '2025-07-03T15:30:00',
            customerName: 'Phạm Thị Dung',
            serviceName: 'Xét nghiệm ADN xác định bố con',
            sampleStaffID: 204,
            patientID: 304,
            sampleMethod: 'Tại nhà',
            sampleReceiveDate: '2025-06-25',
            sampleStatus: 'normal',
            sampleType: 'Mẫu Đặc Biệt'
        },
        {
            testResultID: 5,
            bookingID: 1005,
            resultDate: null,
            createdBy: null,
            createdDate: null,
            resultConclution: null,
            resultFile: null,
            updatedBy: null,
            updatedDate: null,
            customerName: 'Vũ Văn Em',
            serviceName: 'Xét nghiệm ADN xác định anh em ruột',
            sampleStaffID: 205,
            patientID: 305,
            sampleMethod: 'Tại cơ sở',
            sampleReceiveDate: '2025-06-28',
            sampleStatus: 'ready',
            sampleType: 'Mẫu Chuẩn'
        }
    ]);

    // Sample detail results
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

    const [detailResultsFromApi, setDetailResultsFromApi] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedResult, setSelectedResult] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingResult, setEditingResult] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
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
        sampleMethod: '',
        sampleReceiveDate: '',
        sampleStatus: 'ready',
        sampleType: 'Mẫu Chuẩn',
    });
    const [newDetailResults, setNewDetailResults] = useState([
        { locusName: '', p1Allele1: '', p1Allele2: '', p2Allele1: '', p2Allele2: '', paternityIndex: '' }
    ]);
    const [bookingList, setBookingList] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [pendingAddResult, setPendingAddResult] = useState(false);

    const { user } = useAuth();

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
        setSelectedResult(result);
        setShowDetailModal(true);
        setEditMode(false);
        // Lấy chi tiết kết quả từ API
        try {
            const res = await detailResultAPI.getDetailResultsByTestResultId(result.testResultID);
            setDetailResultsFromApi(res.data || []);
        } catch (err) {
            setDetailResultsFromApi([]);
        }
    };

    const handleEditResult = (result) => {
        setSelectedResult(result);
        setEditingResult({ ...result });
        setShowDetailModal(true);
        setEditMode(true);
    };

    const handleCloseModal = () => {
        setShowDetailModal(false);
        setSelectedResult(null);
        setEditingResult(null);
        setEditMode(false);
    };

    const handleSaveResult = () => {
        if (editingResult) {
            setTestResults(prevResults =>
                prevResults.map(r =>
                    r.testResultID === editingResult.testResultID ? editingResult : r
                )
            );
            handleCloseModal();
            alert('Kết quả đã được cập nhật!');
        }
    };

    const getDetailResultsForTest = (testResultID) => {
        // Nếu đang xem chi tiết, ưu tiên lấy từ API
        if (showDetailModal && selectedResult && selectedResult.testResultID === testResultID && detailResultsFromApi.length > 0) {
            return detailResultsFromApi;
        }
        // Fallback: lấy từ local state (khi thêm mới)
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

    const handleOpenAddModal = async () => {
        setShowAddModal(true);
        setNewResult({
            bookingID: '',
            resultDate: '',
            createdBy: user?.fullName || '',
            resultConclution: '',
            resultFile: '',
            customerName: '',
            serviceName: '',
            sampleStaffID: '',
            patientID: '',
            sampleMethod: '',
            sampleReceiveDate: '',
            sampleStatus: 'ready',
            sampleType: 'Mẫu Chuẩn',
        });
        setNewDetailResults([
            { locusName: '', p1Allele1: '', p1Allele2: '', p2Allele1: '', p2Allele2: '', paternityIndex: '' }
        ]);
        // Gọi API lấy danh sách booking
        try {
            const res = await bookingAPI.getAllBookingsForStaff();
            setBookingList(res.data || []);
        } catch (err) {
            setBookingList([]);
        }
    };
    const handleCloseAddModal = () => setShowAddModal(false);

    // Chỉ lấy các booking không có trạng thái đã hoàn thành
    const unfinishedBookings = bookingList.filter(r => r.sampleStatus !== 'normal');
    const bookingOptions = Array.from(new Set(unfinishedBookings.map(r => r.bookingID)));
    const bookingMap = {};
    unfinishedBookings.forEach(r => { bookingMap[r.bookingID] = r; });

    const handleAddDetailRow = () => {
        setNewDetailResults(prev => ([...prev, { locusName: '', p1Allele1: '', p1Allele2: '', p2Allele1: '', p2Allele2: '', paternityIndex: '' }]));
    };
    const handleRemoveDetailRow = (idx) => {
        setNewDetailResults(prev => prev.filter((_, i) => i !== idx));
    };
    const handleDetailChange = (idx, field, value) => {
        setNewDetailResults(prev => prev.map((row, i) => i === idx ? { ...row, [field]: value } : row));
    };
    const handleNewResultChange = (field, value) => {
        setNewResult(prev => ({ ...prev, [field]: value }));
    };
    const handleNewFileChange = (e) => {
        if (e.target.files[0]) {
            setNewResult(prev => ({ 
                ...prev, 
                resultFile: e.target.files[0].name,
                resultFileUrl: null // Sẽ được set sau khi upload lên S3
            }));
        }
    };
    const handleBookingSelect = (bookingID) => {
        const info = bookingMap[bookingID] || {};
        setNewResult(prev => ({
            ...prev,
            bookingID,
            customerName: info.customerName || '',
            serviceName: info.serviceName || '',
            sampleStaffID: info.sampleStaffID || '',
            patientID: info.patientID || '',
            sampleMethod: info.sampleMethod || '',
            sampleReceiveDate: info.sampleReceiveDate || '',
            sampleStatus: info.sampleStatus || 'ready',
            sampleType: info.sampleType || 'Mẫu Chuẩn',
        }));
    };
    const handleAddResult = (e) => {
        e.preventDefault();
        setShowConfirmModal(true);
        setPendingAddResult(true);
    };
    const handleConfirmAddResult = async () => {
        try {
            // Nếu có file được chọn, upload lên S3 trước
            let resultFileUrl = null;
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput && fileInput.files[0]) {
                const formData = new FormData();
                formData.append('file', fileInput.files[0]);
                
                // Upload file lên S3 thông qua backend
                const uploadResponse = await fetch('http://localhost:8080/api/files/upload', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: formData
                });
                
                if (uploadResponse.ok) {
                    const uploadResult = await uploadResponse.json();
                    resultFileUrl = uploadResult.url;
                } else {
                    throw new Error('Upload file thất bại');
                }
            }

            // Chuẩn bị dữ liệu gửi về backend
            const payload = {
                bookingID: newResult.bookingID,
                resultDate: newResult.resultDate,
                resultConclution: newResult.resultConclution,
                resultFile: newResult.resultFile,
                resultFileUrl: resultFileUrl, // URL từ S3
                createdBy: newResult.createdBy,
                detailResults: newDetailResults.filter(row => row.locusName).map(row => ({
                    locusName: row.locusName,
                    p1Allele1: row.p1Allele1,
                    p1Allele2: row.p1Allele2,
                    p2Allele1: row.p2Allele1,
                    p2Allele2: row.p2Allele2,
                    paternityIndex: row.paternityIndex ? Number(row.paternityIndex) : null
                }))
            };
            
            await testResultAPI.createTestResult(payload);
            setShowAddModal(false);
            setShowConfirmModal(false);
            setPendingAddResult(false);
            alert('Thêm kết quả thành công!');
        } catch (err) {
            alert('Lỗi khi thêm kết quả: ' + (err.message || 'Không xác định'));
        }
    };
    const handleCancelAddResult = () => {
        setShowConfirmModal(false);
        setPendingAddResult(false);
    };

    // Tự động sinh kết luận khi nhập locus/allele
    useEffect(() => {
        // Chỉ áp dụng khi đang mở modal thêm mới
        if (!showAddModal) return;
        if (!newDetailResults || newDetailResults.length === 0) {
            setNewResult(prev => ({ ...prev, resultConclution: '' }));
            return;
        }
        const validIndexes = newDetailResults
            .map(row => parseFloat(row.paternityIndex))
            .filter(val => !isNaN(val));
        if (validIndexes.length === 0) {
            setNewResult(prev => ({ ...prev, resultConclution: 'Chưa đủ dữ liệu để kết luận.' }));
        } else if (validIndexes.every(val => val > 1)) {
            setNewResult(prev => ({ ...prev, resultConclution: 'Có quan hệ huyết thống (dương tính).' }));
        } else if (validIndexes.some(val => val <= 1)) {
            setNewResult(prev => ({ ...prev, resultConclution: 'Không đủ bằng chứng xác nhận quan hệ huyết thống (âm tính).' }));
        }
    }, [newDetailResults, showAddModal]);

    useEffect(() => {
        // Lấy danh sách test result từ backend khi vào trang
        const fetchTestResults = async () => {
            try {
                const res = await testResultAPI.getAllTestResults();
                setTestResults(res.data || []);
            } catch (err) {
                setTestResults([]);
            }
        };
        fetchTestResults();
    }, []);

    return (
        <div className="test-result-management-container">
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
                        <Button className="add-sample-btn" onClick={handleOpenAddModal}>+ Thêm kết quả</Button>
                    </div>
                </div>

                {/* Table Section */}
                <Card className="table-container">
                    {filteredResults.length > 0 ? (
                        <table className="samples-table">
                            <thead>
                                <tr>
                                    <th>ID Kết quả</th>
                                    <th>Mã Booking</th>
                                    <th>Ngày kết quả</th>
                                    <th>Người tạo</th>
                                    <th>Ngày tạo</th>
                                    <th>Kết luận</th>
                                    <th>File kết quả</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResults.map(result => (
                                    <tr key={result.testResultID}>
                                        <td>{result.testResultID}</td>
                                        <td>{result.bookingID}</td>
                                        <td>{result.resultDate ? formatDate(result.resultDate) : 'Chưa có'}</td>
                                        <td>{result.createdBy || 'Chưa có'}</td>
                                        <td>{result.createdDate ? formatDateTime(result.createdDate) : 'Chưa có'}</td>
                                        <td>{result.resultConclution || 'Chưa có'}</td>
                                        <td>
                                            {result.resultFileUrl ? (
                                                <a href={result.resultFileUrl} target="_blank" rel="noopener noreferrer">
                                                    {result.resultFile || 'Xem file kết quả'}
                                                </a>
                                            ) : result.resultFile ? (
                                                <a href={`http://localhost:8080/uploads/results/${result.resultFile}`} target="_blank" rel="noopener noreferrer">
                                                    {result.resultFile}
                                                </a>
                                            ) : (
                                                <span>Chưa có</span>
                                            )}
                                        </td>
                                        <td className="action-buttons">
                                            <button className="btn-view" title="Xem" onClick={() => handleViewDetails(result)}>
                                                <i className="fa fa-eye" aria-hidden="true"></i>
                                            </button>
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
                                            selectedResult.resultFileUrl ? (
                                                <a href={selectedResult.resultFileUrl} target="_blank" rel="noopener noreferrer">
                                                    {selectedResult.resultFile || 'Xem file kết quả'}
                                                </a>
                                            ) : selectedResult.resultFile ? (
                                                <a href={`http://localhost:8080/uploads/results/${selectedResult.resultFile}`} target="_blank" rel="noopener noreferrer">
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

            {/* Add Result Modal */}
            {showAddModal && (
                <div className="modal-overlay" onClick={handleCloseAddModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Thêm kết quả xét nghiệm mới</h2>
                            <button className="close-button" onClick={handleCloseAddModal}>×</button>
                        </div>
                        <form className="add-result-form" onSubmit={handleAddResult}>
                            <div className="form-group">
                                <label>Chọn Booking ID:</label>
                                <select
                                    value={newResult.bookingID}
                                    onChange={e => handleBookingSelect(e.target.value)}
                                    required
                                >
                                    <option value="">-- Chọn Booking --</option>
                                    {bookingOptions.map(id => (
                                        <option key={id} value={id}>{id}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Tên khách hàng:</label>
                                <Input value={newResult.customerName} disabled />
                            </div>
                            <div className="form-group">
                                <label>Dịch vụ:</label>
                                <Input value={newResult.serviceName} disabled />
                            </div>
                            <div className="form-group">
                                <label>Ngày kết quả:</label>
                                <Input type="date" value={newResult.resultDate} onChange={e => handleNewResultChange('resultDate', e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Người tạo:</label>
                                <Input value={newResult.createdBy} disabled />
                            </div>
                            <div className="form-group">
                                <label>Kết luận:</label>
                                <textarea
                                    value={newResult.resultConclution}
                                    readOnly
                                    rows="3"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>File kết quả (PDF, tùy chọn):</label>
                                <Input type="file" accept=".pdf" onChange={handleNewFileChange} />
                                {newResult.resultFile && <span className="file-name">{newResult.resultFile}</span>}
                            </div>
                            <div className="form-group">
                                <label>Chi tiết locus/allele:</label>
                                <table className="detail-table">
                                    <thead>
                                        <tr>
                                            <th>Locus</th>
                                            <th>P1 Allele 1</th>
                                            <th>P1 Allele 2</th>
                                            <th>P2 Allele 1</th>
                                            <th>P2 Allele 2</th>
                                            <th>Paternity Index</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {newDetailResults.map((row, idx) => (
                                            <tr key={idx}>
                                                <td><Input value={row.locusName} onChange={e => handleDetailChange(idx, 'locusName', e.target.value)} required /></td>
                                                <td><Input value={row.p1Allele1} onChange={e => handleDetailChange(idx, 'p1Allele1', e.target.value)} /></td>
                                                <td><Input value={row.p1Allele2} onChange={e => handleDetailChange(idx, 'p1Allele2', e.target.value)} /></td>
                                                <td><Input value={row.p2Allele1} onChange={e => handleDetailChange(idx, 'p2Allele1', e.target.value)} /></td>
                                                <td><Input value={row.p2Allele2} onChange={e => handleDetailChange(idx, 'p2Allele2', e.target.value)} /></td>
                                                <td><Input type="number" step="0.01" value={row.paternityIndex} onChange={e => handleDetailChange(idx, 'paternityIndex', e.target.value)} /></td>
                                                <td>
                                                    {newDetailResults.length > 1 && (
                                                        <button type="button" className="btn-remove-row" onClick={() => handleRemoveDetailRow(idx)}>-</button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Button type="button" onClick={handleAddDetailRow} className="btn-add-row">+ Thêm locus</Button>
                            </div>
                            <div className="modal-footer">
                                <Button type="submit" variant="primary">Thêm kết quả</Button>
                                <Button type="button" variant="outline" onClick={handleCloseAddModal}>Hủy</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Confirm Add Result Modal */}
            {showConfirmModal && (
                <div className="modal-overlay" onClick={handleCancelAddResult}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Xác nhận thêm kết quả</h2>
                        </div>
                        <div className="modal-body">
                            <h3>Thông tin chung</h3>
                            <div className="info-grid">
                                <div className="info-item"><label>Booking ID:</label> <span>{newResult.bookingID}</span></div>
                                <div className="info-item"><label>Tên khách hàng:</label> <span>{newResult.customerName}</span></div>
                                <div className="info-item"><label>Dịch vụ:</label> <span>{newResult.serviceName}</span></div>
                                <div className="info-item"><label>Ngày kết quả:</label> <span>{newResult.resultDate}</span></div>
                                <div className="info-item"><label>Người tạo:</label> <span>{newResult.createdBy}</span></div>
                                <div className="info-item"><label>File kết quả:</label> <span>{newResult.resultFile || 'Chưa có'}</span></div>
                            </div>
                            <h3>Kết luận</h3>
                            <p>{newResult.resultConclution}</p>
                            <h3>Chi tiết locus/allele</h3>
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
                                    {newDetailResults.filter(row => row.locusName).map((row, idx) => (
                                        <tr key={idx}>
                                            <td>{row.locusName}</td>
                                            <td>{row.p1Allele1}</td>
                                            <td>{row.p1Allele2}</td>
                                            <td>{row.p2Allele1}</td>
                                            <td>{row.p2Allele2}</td>
                                            <td>{row.paternityIndex}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <Button variant="primary" onClick={handleConfirmAddResult}>Xác nhận</Button>
                            <Button variant="outline" onClick={handleCancelAddResult}>Hủy</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}