// Staff/TestResultManagement.jsx
import React, { useState } from 'react';
import { Card, Button, Input, Select } from '../../components/ui/ui';
import './TestResultManagement.css';

export default function TestResultManagement() {
    const [testResults, setTestResults] = useState([
        { id: 'TR001', patientName: 'Nguyễn Văn An', sampleId: 'SAMP001', testDate: '2025-06-21', status: 'pending_review', resultFile: null, notes: '' },
        { id: 'TR002', patientName: 'Trần Thị Bình', sampleId: 'SAMP002', testDate: '2025-06-21', status: 'reviewed', resultFile: 'result_Binh.pdf', notes: 'Kết quả bình thường.' },
        { id: 'TR003', patientName: 'Lê Văn Cường', sampleId: 'SAMP003', testDate: '2025-06-20', status: 'uploaded', resultFile: 'result_Cuong.pdf', notes: '' },
        { id: 'TR004', patientName: 'Phạm Thị Duyên', sampleId: 'SAMP004', testDate: '2025-06-19', status: 'pending_upload', resultFile: null, notes: 'Chờ kết quả từ máy.' },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedResult, setSelectedResult] = useState(null);
    const [fileUpload, setFileUpload] = useState(null);
    const [resultNotes, setResultNotes] = useState('');

    const filteredResults = testResults.filter(result => {
        const matchesSearch = result.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              result.sampleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              result.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || result.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleViewDetails = (result) => {
        setSelectedResult(result);
        setResultNotes(result.notes);
        setFileUpload(null); // Reset file upload input
    };

    const handleFileUpload = (e) => {
        setFileUpload(e.target.files[0]);
    };

    const handleUploadResult = () => {
        if (selectedResult && fileUpload) {
            // In a real application, you would upload the file to a server
            // For now, we simulate the upload by updating the resultFile and status
            const updatedResultFile = fileUpload.name;
            setTestResults(prevResults =>
                prevResults.map(r =>
                    r.id === selectedResult.id ? { ...r, resultFile: updatedResultFile, status: 'uploaded' } : r
                )
            );
            setSelectedResult(prev => ({ ...prev, resultFile: updatedResultFile, status: 'uploaded' }));
            alert(`File "${fileUpload.name}" đã được tải lên cho ${selectedResult.patientName}.`);
            setFileUpload(null);
        } else {
            alert('Vui lòng chọn một file để tải lên.');
        }
    };

    const handleSaveNotes = () => {
        if (selectedResult) {
            setTestResults(prevResults =>
                prevResults.map(r =>
                    r.id === selectedResult.id ? { ...r, notes: resultNotes } : r
                )
            );
            setSelectedResult(prev => ({ ...prev, notes: resultNotes }));
            alert('Ghi chú đã được lưu!');
        }
    };

    const handleUpdateStatus = (newStatus) => {
        if (selectedResult) {
            setTestResults(prevResults =>
                prevResults.map(r =>
                    r.id === selectedResult.id ? { ...r, status: newStatus } : r
                )
            );
            setSelectedResult(prev => ({ ...prev, status: newStatus }));
            alert(`Trạng thái đã cập nhật thành: ${newStatus}`);
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'pending_upload': return 'Chờ tải lên';
            case 'uploaded': return 'Đã tải lên';
            case 'pending_review': return 'Chờ duyệt';
            case 'reviewed': return 'Đã duyệt';
            case 'delivered': return 'Đã bàn giao';
            default: return status;
        }
    };

    return (
        <div className="test-result-management-container">
            <Card className="test-result-controls">
                <Input
                    type="text"
                    placeholder="Tìm kiếm theo tên bệnh nhân, mã mẫu..."
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
                    <option value="pending_upload">Chờ tải lên</option>
                    <option value="uploaded">Đã tải lên</option>
                    <option value="pending_review">Chờ duyệt</option>
                    <option value="reviewed">Đã duyệt</option>
                    <option value="delivered">Đã bàn giao</option>
                </Select>
            </Card>

            <div className="test-result-content">
                <Card className="test-result-list-card">
                    <h3>Danh sách kết quả xét nghiệm</h3>
                    {filteredResults.length > 0 ? (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Mã KQ</th>
                                    <th>Tên bệnh nhân</th>
                                    <th>Mã mẫu</th>
                                    <th>Ngày xét nghiệm</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResults.map(result => (
                                    <tr key={result.id}>
                                        <td>{result.id}</td>
                                        <td>{result.patientName}</td>
                                        <td>{result.sampleId}</td>
                                        <td>{result.testDate}</td>
                                        <td>
                                            <span className={`status-badge status-${result.status}`}>
                                                {getStatusLabel(result.status)}
                                            </span>
                                        </td>
                                        <td className="result-actions">
                                            <Button size="sm" onClick={() => handleViewDetails(result)}>Chi tiết</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Không tìm thấy kết quả xét nghiệm nào.</p>
                    )}
                </Card>

                {selectedResult && (
                    <Card className="test-result-detail-card">
                        <h3>Chi tiết kết quả: {selectedResult.patientName}</h3>
                        <p><strong>Mã kết quả:</strong> {selectedResult.id}</p>
                        <p><strong>Mã mẫu:</strong> {selectedResult.sampleId}</p>
                        <p><strong>Ngày xét nghiệm:</strong> {selectedResult.testDate}</p>
                        <p><strong>Trạng thái:</strong> <span className={`status-badge status-${selectedResult.status}`}>{getStatusLabel(selectedResult.status)}</span></p>

                        <div className="file-upload-section">
                            <h4>Tải lên kết quả:</h4>
                            {selectedResult.resultFile ? (
                                <p>File đã tải lên: <a href={`/path/to/results/${selectedResult.resultFile}`} target="_blank" rel="noopener noreferrer">{selectedResult.resultFile}</a></p>
                            ) : (
                                <p>Chưa có file kết quả được tải lên.</p>
                            )}
                            <Input
                                type="file"
                                onChange={handleFileUpload}
                                className="file-input"
                            />
                            <Button className="mt-2" onClick={handleUploadResult} disabled={!fileUpload || selectedResult.status !== 'pending_upload'}>Tải lên file</Button>
                        </div>

                        <div className="notes-section">
                            <h4>Ghi chú nội bộ:</h4>
                            <textarea
                                value={resultNotes}
                                onChange={(e) => setResultNotes(e.target.value)}
                                rows="5"
                                placeholder="Thêm ghi chú về kết quả xét nghiệm..."
                                className="notes-textarea"
                            />
                            <Button className="mt-2" onClick={handleSaveNotes}>Lưu ghi chú</Button>
                        </div>

                        <div className="status-update-section">
                            <h4>Cập nhật trạng thái:</h4>
                            <Button
                                size="sm"
                                className="status-button"
                                onClick={() => handleUpdateStatus('pending_review')}
                                disabled={selectedResult.status === 'pending_review' || selectedResult.status === 'pending_upload'}
                            >
                                Chuyển trạng thái sang chờ duyệt
                            </Button>
                            <Button
                                size="sm"
                                className="status-button"
                                variant="primary"
                                onClick={() => handleUpdateStatus('delivered')}
                                disabled={selectedResult.status === 'delivered' || selectedResult.status !== 'reviewed'}
                            >
                                Bàn giao kết quả
                            </Button>
                            <Button
                                size="sm"
                                className="status-button"
                                variant="outline"
                                onClick={() => setSelectedResult(null)}
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