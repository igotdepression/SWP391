// Staff/Sample.jsx
import React, { useState, useEffect } from 'react';
import './Sample.css';
import { SampleAPI } from '../../services/api';

export default function Sample() {
    // Statistics state
    const [stats, setStats] = useState({
        totalSamples: 0,
        standardSamples: 0,
        normalSamples: 0,
        specialSamples: 0
    });

    // Sample data state
    const [samples, setSamples] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load samples on component mount
    useEffect(() => {
        loadSamples();
    }, []);

    const loadSamples = async () => {
        try {
            setLoading(true);
            const response = await SampleAPI.getAllSamples();
            const samplesData = response.data;
            setSamples(samplesData);
            
            // Calculate statistics
            const totalSamples = samplesData.length;
            const standardSamples = samplesData.filter(s => s.sampleType === 'Mẫu chuẩn').length;
            const normalSamples = samplesData.filter(s => s.sampleType === 'Mẫu thông thường').length;
            const specialSamples = samplesData.filter(s => s.sampleType === 'Mẫu đặc biệt').length;
            
            setStats({
                totalSamples,
                standardSamples,
                normalSamples,
                specialSamples
            });
            
            setError(null);
        } catch (err) {
            console.error('Error loading samples:', err);
            setError('Không thể tải danh sách mẫu xét nghiệm');
            // Fallback to empty array
            setSamples([]);
        } finally {
            setLoading(false);
        }
    };

    const ViewSample = async (sampleID) => {
        try {
            const response = await SampleAPI.getSampleById(sampleID);
            const sample = response.data;
            if (sample) {
                setViewSample({
                    sampleID: sample.sampleID,
                    bookingID: sample.bookingID,
                    participantID: sample.participantID,
                    userID: sample.userID,
                    customerName: sample.customerName,
                    staffName: sample.staffName,
                    sampleType: sample.sampleType,
                    status: sample.status,
                    sampleCode: sample.sampleCode,
                    typeOfCollection: sample.typeOfCollection,
                    collectionDate: sample.collectionDate,
                    receivedDate: sample.receivedDate,
                    notes: sample.notes,
                    bookingStatus: sample.bookingStatus,
                });
            }
        } catch (error) {
            console.error('Error viewing sample:', error);
            alert('Không thể xem chi tiết mẫu xét nghiệm');
        }
    };

    // State variables
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showParticipantDetail, setShowParticipantDetail] = useState(false);
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const [editingSample, setEditingSample] = useState(null);
    const [viewSample, setViewSample] = useState(null);
    const [newSample, setNewSample] = useState({ 
        bookingID: '', 
        participantID: '', 
        typeOfCollection: '', 
        sampleType: '', 
        receivedDate: '' 
    });

    // Participant details data (this would come from another API in real implementation)
    const [participantDetails] = useState({
        // '301': {
        //     participantID: 301,
        //     questionableRelationship: 'Con ruột',
        //     fullName: 'Nguyễn Văn Nam',
        //     dateOfBirth: '1995-03-15',
        //     gender: 'Nam',
        //     collectionMethod: 'Tại cơ sở',
        //     relationshipToCustomer: 'Con trai',
        //     identityNumber: '123456789012',
        //     address: '123 Đường ABC, Quận 1, TP.HCM'
        // },
        // '302': {
        //     participantID: 302,
        //     questionableRelationship: 'Vợ/chồng',
        //     fullName: 'Trần Thị Linh',
        //     dateOfBirth: '1990-08-20',
        //     gender: 'Nữ',
        //     collectionMethod: 'Tại nhà',
        //     relationshipToCustomer: 'Vợ',
        //     identityNumber: '987654321098',
        //     address: '456 Đường XYZ, Quận 3, TP.HCM'
        // },
        // '303': {
        //     participantID: 303,
        //     questionableRelationship: 'Anh/chị em ruột',
        //     fullName: 'Lê Văn Hùng',
        //     dateOfBirth: '1988-12-10',
        //     gender: 'Nam',
        //     collectionMethod: 'Tự lấy mẫu',
        //     relationshipToCustomer: 'Anh trai',
        //     identityNumber: '456789123456',
        //     address: '789 Đường DEF, Quận 7, TP.HCM'
        // },
        // '304': {
        //     participantID: 304,
        //     questionableRelationship: 'Con ruột',
        //     fullName: 'Phạm Thị Mai',
        //     dateOfBirth: '2000-05-25',
        //     gender: 'Nữ',
        //     collectionMethod: 'Tại cơ sở',
        //     relationshipToCustomer: 'Con gái',
        //     identityNumber: '789123456789',
        //     address: '321 Đường GHI, Quận 5, TP.HCM'
        // },
        // '305': {
        //     participantID: 305,
        //     questionableRelationship: 'Cha/mẹ',
        //     fullName: 'Võ Văn Tuấn',
        //     dateOfBirth: '1960-11-08',
        //     gender: 'Nam',
        //     collectionMethod: 'Tại nhà',
        //     relationshipToCustomer: 'Cha',
        //     identityNumber: '654321987654',
        //     address: '654 Đường JKL, Quận 10, TP.HCM'
        // }
    });

    const filteredSamples = samples.filter(sample => {
        const matchesSearch = sample.participantID.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              sample.sampleID.toString().includes(searchTerm.toLowerCase()) ||
                              sample.bookingID.toString().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSample(prev => ({ ...prev, [name]: value }));
    };

    const handleAddSample = async () => {
        // Note: Based on SampleController, there's no POST endpoint to create new samples
        // This functionality might need to be implemented in the backend
        alert('Chức năng thêm mẫu mới chưa được triển khai trong API. Vui lòng liên hệ quản trị viên.');
        
        // For now, keep the old functionality for demonstration
        if (newSample.bookingID && newSample.participantID && newSample.typeOfCollection && newSample.sampleType) {
            const newSampleData = {
                ...newSample,
                sampleID: samples.length + 1,
                userID: 201, // Current staff ID
                status: 'pending',
                receivedDate: newSample.receivedDate || new Date().toISOString().split('T')[0]
            };
            setSamples(prev => [...prev, newSampleData]);
            setNewSample({ bookingID: '', participantID: '', typeOfCollection: '', sampleType: '', receivedDate: '' });
            setShowAddForm(false);
            
            // Update stats
            setStats(prev => ({
                ...prev,
                totalSamples: prev.totalSamples + 1,
                standardSamples: newSample.sampleType === 'Mẫu chuẩn' ? prev.standardSamples + 1 : prev.standardSamples,
                normalSamples: newSample.sampleType === 'Mẫu thông thường' ? prev.normalSamples + 1 : prev.normalSamples,
                specialSamples: newSample.sampleType === 'Mẫu đặc biệt' ? prev.specialSamples + 1 : prev.specialSamples,
            }));
            
            alert('Mẫu xét nghiệm mới đã được thêm! (Chỉ ở local, chưa lưu vào database)');
        } else {
            alert('Vui lòng điền đầy đủ thông tin mẫu xét nghiệm.');
        }
    };

    const handleUpdateStatus = (sampleID, newStatus) => {
        setSamples(prevSamples =>
            prevSamples.map(sample =>
                sample.sampleID === sampleID ? { ...sample, status: newStatus } : sample
            )
        );
    };

    const handleEditSample = (sample) => {
        setEditingSample(sample);
        setNewSample({
            bookingID: sample.bookingID, // Chỉ để hiển thị, không cho phép sửa
            participantID: sample.participantID, // Chỉ để hiển thị, không cho phép sửa
            typeOfCollection: sample.typeOfCollection, // Cho phép sửa
            sampleType: sample.sampleType, // Cho phép sửa
            receivedDate: sample.receivedDate // Cho phép sửa
        });
        setShowEditForm(true);
        setShowAddForm(false);
    };

    const handleUpdateSample = async () => {
        if (newSample.typeOfCollection && newSample.sampleType) {
            try {
                const updateData = {
                    typeOfCollection: newSample.typeOfCollection,
                    sampleType: newSample.sampleType,
                    receivedDate: newSample.receivedDate || editingSample.receivedDate
                };
                
                await SampleAPI.updateSample(editingSample.sampleID, updateData);
                
                // Update local state
                setSamples(prevSamples =>
                    prevSamples.map(sample =>
                        sample.sampleID === editingSample.sampleID 
                            ? { 
                                ...sample, 
                                typeOfCollection: newSample.typeOfCollection,
                                sampleType: newSample.sampleType,
                                receivedDate: newSample.receivedDate || sample.receivedDate
                              }
                            : sample
                    )
                );
                
                // Reset form
                setNewSample({ bookingID: '', participantID: '', typeOfCollection: '', sampleType: '', receivedDate: '' });
                setShowEditForm(false);
                setEditingSample(null);
                
                alert('Mẫu xét nghiệm đã được cập nhật!');
                
                // Reload data to ensure consistency
                await loadSamples();
            } catch (error) {
                console.error('Error updating sample:', error);
                alert('Có lỗi xảy ra khi cập nhật mẫu xét nghiệm. Vui lòng thử lại.');
            }
        } else {
            alert('Vui lòng điền đầy đủ thông tin có thể sửa đổi.');
        }
    };

    const handleDeleteSample = async (sampleID) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa mẫu xét nghiệm này?')) {
            try {
                await SampleAPI.deleteSample(sampleID);
                
                // Update local state
                const sampleToDelete = samples.find(sample => sample.sampleID === sampleID);
                setSamples(prevSamples => prevSamples.filter(sample => sample.sampleID !== sampleID));
                
                // Update stats
                if (sampleToDelete) {
                    setStats(prev => ({
                        ...prev,
                        totalSamples: prev.totalSamples - 1,
                        standardSamples: sampleToDelete.sampleType === 'Mẫu chuẩn' ? prev.standardSamples - 1 : prev.standardSamples,
                        normalSamples: sampleToDelete.sampleType === 'Mẫu thông thường' ? prev.normalSamples - 1 : prev.normalSamples,
                        specialSamples: sampleToDelete.sampleType === 'Mẫu đặc biệt' ? prev.specialSamples - 1 : prev.specialSamples,
                    }));
                }
                
                alert('Mẫu xét nghiệm đã được xóa!');
                
                // Reload data to ensure consistency
                await loadSamples();
            } catch (error) {
                console.error('Error deleting sample:', error);
                alert('Có lỗi xảy ra khi xóa mẫu xét nghiệm. Vui lòng thử lại.');
            }
        }
    };

    const handleCancelEdit = () => {
        setNewSample({ bookingID: '', participantID: '', typeOfCollection: '', sampleType: '', receivedDate: '' });
        setShowEditForm(false);
        setEditingSample(null);
    };

    const handleViewParticipantDetail = (participantID) => {
        const participant = participantDetails[participantID];
        if (participant) {
            setSelectedParticipant(participant);
            setShowParticipantDetail(true);
            setShowAddForm(false);
            setShowEditForm(false);
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'pending': return 'Đang chờ xử lý';
            case 'received': return 'Đã tiếp nhận';
            case 'testing': return 'Đang xét nghiệm';
            case 'completed': return 'Hoàn thành';
            default: return status;
        }
    };

    const getSampleTypeClass = (sampleType) => {
        switch (sampleType.toLowerCase()) {
            case 'mẫu chuẩn': return 'status-mẫu-chuẩn';
            case 'mẫu thông thường': return 'status-mẫu-thông-thường';
            case 'mẫu đặc biệt': return 'status-mẫu-đặc-biệt';
            default: return 'status-badge';
        }
    };

    return (
        <div className="sample-management-container">
            <div className="sample-content">
                {/* Statistics Header */}
                <div className="sample-stats-header">
                    <h2>Quản lý Mẫu Xét nghiệm</h2>
                    <div className="sample-stats-cards">
                        <div className="sample-stat-card sample-stat-total">
                            <div className="sample-stat-number">{stats.totalSamples}</div>
                            <div className="sample-stat-label">TỔNG MẪU</div>
                        </div>
                        <div className="sample-stat-card sample-stat-standard">
                            <div className="sample-stat-number">{stats.standardSamples}</div>
                            <div className="sample-stat-label">MẪU CHUẨN</div>
                        </div>
                        <div className="sample-stat-card sample-stat-normal">
                            <div className="sample-stat-number">{stats.normalSamples}</div>
                            <div className="sample-stat-label">MẪU THÔNG THƯỜNG</div>
                        </div>
                        <div className="sample-stat-card sample-stat-special">
                            <div className="sample-stat-number">{stats.specialSamples}</div>
                            <div className="sample-stat-label">MẪU ĐẶC BIỆT</div>
                        </div>
                    </div>
                </div>

                {/* Add Sample Form - Modal Overlay */}
                {showAddForm && (
                    <div className="modal-overlay" onClick={() => {
                        setShowAddForm(false);
                        setNewSample({ bookingID: '', participantID: '', typeOfCollection: '', sampleType: '', receivedDate: '' });
                    }}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close" onClick={() => {
                                setShowAddForm(false);
                                setNewSample({ bookingID: '', participantID: '', typeOfCollection: '', sampleType: '', receivedDate: '' });
                            }}>
                                ×
                            </button>
                            <h3>Thêm mẫu xét nghiệm mới</h3>
                            <p style={{textAlign: 'center', color: '#6b7280', fontSize: '14px', marginBottom: '20px'}}>
                                Mã mẫu sẽ được hệ thống tự động sinh ra
                            </p>
                            <div className="add-sample-form">
                                <div className="form-group">
                                    <label>Mã Booking</label>
                                    <input
                                        name="bookingID"
                                        type="number"
                                        placeholder="Nhập mã booking"
                                        value={newSample.bookingID}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Mã bệnh nhân</label>
                                    <input
                                        name="participantID"
                                        placeholder="Nhập mã bệnh nhân"
                                        value={newSample.participantID}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phương thức lấy mẫu</label>
                                    <select
                                        name="typeOfCollection"
                                        value={newSample.typeOfCollection}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Chọn phương thức lấy mẫu</option>
                                        <option value="Tại cơ sở">Tại cơ sở</option>
                                        <option value="Tại nhà">Tại nhà</option>
                                        <option value="Tự lấy mẫu">Tự lấy mẫu</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Loại mẫu</label>
                                    <select
                                        name="sampleType"
                                        value={newSample.sampleType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Chọn loại mẫu</option>
                                        <option value="Mẫu chuẩn">Mẫu chuẩn</option>
                                        <option value="Mẫu thông thường">Mẫu thông thường</option>
                                        <option value="Mẫu đặc biệt">Mẫu đặc biệt</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Ngày nhận mẫu</label>
                                    <input
                                        name="receivedDate"
                                        type="date"
                                        value={newSample.receivedDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="button-container">
                                    <button className="confirm-btn" onClick={handleAddSample}>
                                        Thêm mẫu
                                    </button>
                                    <button className="reject-btn" onClick={() => {
                                        setShowAddForm(false);
                                        setNewSample({ bookingID: '', participantID: '', typeOfCollection: '', sampleType: '', receivedDate: '' });
                                    }}>
                                        Hủy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Sample Form - Modal Overlay */}
                {showEditForm && (
                    <div className="modal-overlay" onClick={handleCancelEdit}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close" onClick={handleCancelEdit}>
                                ×
                            </button>
                            <h3>Chỉnh sửa mẫu xét nghiệm #{editingSample?.sampleID}</h3>
                            <p style={{textAlign: 'center', color: '#6b7280', fontSize: '14px', marginBottom: '20px'}}>
                                Chỉ có thể sửa: Phương thức lấy mẫu, Loại mẫu và Ngày nhận mẫu
                            </p>
                            <div className="add-sample-form">
                                <div className="form-group">
                                    <label>Mã mẫu (không thể sửa)</label>
                                    <input
                                        type="text"
                                        value={editingSample?.sampleID}
                                        readOnly
                                        className="readonly-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Mã Booking (không thể sửa)</label>
                                    <input
                                        type="number"
                                        value={newSample.bookingID}
                                        readOnly
                                        className="readonly-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Mã bệnh nhân (không thể sửa)</label>
                                    <input
                                        type="text"
                                        value={newSample.participantID}
                                        readOnly
                                        className="readonly-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phương thức lấy mẫu</label>
                                    <select
                                        name="typeOfCollection"
                                        value={newSample.typeOfCollection}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Chọn phương thức lấy mẫu</option>
                                        <option value="Tại cơ sở">Tại cơ sở</option>
                                        <option value="Tại nhà">Tại nhà</option>
                                        <option value="Tự lấy mẫu">Tự lấy mẫu</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Loại mẫu</label>
                                    <select
                                        name="sampleType"
                                        value={newSample.sampleType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Chọn loại mẫu</option>
                                        <option value="Mẫu chuẩn">Mẫu chuẩn</option>
                                        <option value="Mẫu thông thường">Mẫu thông thường</option>
                                        <option value="Mẫu đặc biệt">Mẫu đặc biệt</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Ngày nhận mẫu</label>
                                    <input
                                        name="receivedDate"
                                        type="date"
                                        value={newSample.receivedDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="button-container">
                                    <button className="confirm-btn" onClick={handleUpdateSample}>
                                        Cập nhật
                                    </button>
                                    <button className="reject-btn" onClick={handleCancelEdit}>
                                        Hủy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Participant Detail Modal */}
                {showParticipantDetail && selectedParticipant && (
                    <div className="modal-overlay" onClick={() => setShowParticipantDetail(false)}>
                        <div className="modal-content participant-detail-modal" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close" onClick={() => setShowParticipantDetail(false)}>
                                ×
                            </button>
                            <h3>Thông tin chi tiết bệnh nhân #{selectedParticipant.participantID}</h3>
                            <div className="participant-detail-content">
                                <div className="participant-detail-section">
                                    <h4>Thông tin cá nhân</h4>
                                    <div className="participant-detail-grid">
                                        <div className="detail-item">
                                            <label>Họ và tên:</label>
                                            <span>{selectedParticipant.fullName}</span>
                                        </div>
                                        <div className="detail-item">
                                            <label>Ngày sinh:</label>
                                            <span>{selectedParticipant.dateOfBirth}</span>
                                        </div>
                                        <div className="detail-item">
                                            <label>Giới tính:</label>
                                            <span>{selectedParticipant.gender}</span>
                                        </div>
                                        <div className="detail-item">
                                            <label>CMND/CCCD:</label>
                                            <span>{selectedParticipant.identityNumber}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="participant-detail-section">
                                    <h4>Thông tin quan hệ</h4>
                                    <div className="participant-detail-grid">
                                        <div className="detail-item">
                                            <label>Mối quan hệ nghi vấn:</label>
                                            <span>{selectedParticipant.questionableRelationship}</span>
                                        </div>
                                        <div className="detail-item">
                                            <label>Quan hệ với khách hàng:</label>
                                            <span>{selectedParticipant.relationshipToCustomer}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="participant-detail-section">
                                    <h4>Thông tin khác</h4>
                                    <div className="participant-detail-grid">
                                        <div className="detail-item full-width">
                                            <label>Địa chỉ:</label>
                                            <span>{selectedParticipant.address}</span>
                                        </div>
                                        <div className="detail-item">
                                            <label>Phương thức lấy mẫu:</label>
                                            <span>{selectedParticipant.collectionMethod}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Sample List Card */}
                <div className="sample-list-card">
                    <h3>Danh sách mẫu xét nghiệm</h3>

                    {/* Search and Filter Controls */}
                    <div className="sample-controls">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo mã mẫu, booking ID, hoặc participant ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <button 
                            className="add-button"
                            onClick={() => {
                                setShowAddForm(!showAddForm);
                                setShowEditForm(false);
                                setEditingSample(null);
                                setNewSample({ bookingID: '', participantID: '', typeOfCollection: '', sampleType: '', receivedDate: '' });
                            }}
                        >
                            + Thêm mẫu mới
                        </button>
                    </div>

                    {/* Table */}
                    {loading ? (
                        <div style={{textAlign: 'center', padding: '40px', color: '#6b7280'}}>
                            Đang tải danh sách mẫu xét nghiệm...
                        </div>
                    ) : error ? (
                        <div style={{textAlign: 'center', padding: '40px', color: '#ef4444'}}>
                            {error}
                            <br />
                            <button 
                                onClick={loadSamples}
                                style={{marginTop: '10px', padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                            >
                                Thử lại
                            </button>
                        </div>
                    ) : filteredSamples.length > 0 ? (
                        <div className="table-responsive">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>MÃ MẪU</th>
                                        <th>MÃ BOOKING</th>
                                        <th>MÃ NHÂN VIÊN</th>
                                        <th>MÃ BỆNH NHÂN</th>
                                        <th>PHƯƠNG THỨC LẤY MẪU</th>
                                        <th>LOẠI MẪU</th>
                                        <th>NGÀY NHẬN MẪU</th>
                                        <th>HÀNH ĐỘNG</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSamples.map(sample => (
                                        <tr key={sample.sampleID}>
                                            <td>{sample.sampleID}</td>
                                            <td>{sample.bookingID}</td>
                                            <td>{sample.userID}</td>
                                            <td>
                                                <button 
                                                    className="participant-link"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleViewParticipantDetail(sample.participantID);
                                                    }}
                                                >
                                                    {sample.participantID}
                                                </button>
                                            </td>
                                            <td>{sample.typeOfCollection}</td>
                                            <td>
                                                <span className={`status-badge ${getSampleTypeClass(sample.sampleType)}`}>
                                                    {sample.sampleType}
                                                </span>
                                            </td>
                                            <td>{sample.receivedDate}</td>
                                            <td className="sample-actions">
                                        <button 
                                            className="action-btn edit"
                                            onClick={() => handleEditSample(sample)}
                                            title="Sửa thông tin"
                                        >
                                            Sửa
                                        </button>
                                        <button 
                                            className="action-btn delete"
                                            onClick={() => handleDeleteSample(sample.sampleID)}
                                            title="Xóa mẫu"
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>Không tìm thấy mẫu xét nghiệm nào phù hợp với tiêu chí tìm kiếm.</p>
                    )}
                </div>
            </div>
        </div>
    );
}