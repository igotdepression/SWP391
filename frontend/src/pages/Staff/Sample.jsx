// Staff/Sample.jsx
import React, { useState } from 'react';
import './Sample.css';

export default function Sample() {
    const [samples, setSamples] = useState([
        { 
            sampleID: 1, 
            bookingID: 1001,
            userID: 201, // Staff ID
            participantID: 301,
            typeOfCollection: 'Tại cơ sở',
            sampleType: 'Máu',
            receivedDate: '2025-06-15'
        },
        { 
            sampleID: 2, 
            bookingID: 1002,
            userID: 202, // Staff ID
            participantID: 302,
            typeOfCollection: 'Tại nhà',
            sampleType: 'Tế bào niêm mạc miệng',
            receivedDate: '2025-06-20'
        },
        { 
            sampleID: 3, 
            bookingID: 1003,
            userID: 203, // Staff ID
            participantID: 303,
            typeOfCollection: 'Tại cơ sở',
            sampleType: 'Tóc',
            receivedDate: '2025-06-25'
        },
        { 
            sampleID: 4, 
            bookingID: 1004,
            userID: 204, // Staff ID
            participantID: 304,
            typeOfCollection: 'Tại nhà',
            sampleType: 'Móng tay',
            receivedDate: '2025-06-28'
        },
        { 
            sampleID: 5, 
            bookingID: 1005,
            userID: 202, // Staff ID
            participantID: 305,
            typeOfCollection: 'Tại nhà',
            sampleType: 'Cuống rốn',
            receivedDate: '2025-06-18'
        },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('participantID');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [currentSample, setCurrentSample] = useState(null);
    const [currentParticipant, setCurrentParticipant] = useState(null);
    const [newSample, setNewSample] = useState({ 
        bookingID: '',
        userID: '', // Staff ID
        participantID: '',
        typeOfCollection: '', 
        sampleType: '', 
        receivedDate: ''
    });

    // Mock data cho participant details - theo cấu trúc SQL
    const participantDetails = {
        301: {
            participantID: 301,
            QuestionalbleRelationship: 'Bác sĩ xác nhận',
            fullName: 'Nguyễn Văn A',
            dateOfBirth: '1990-05-15',
            gender: 'Nam',
            collectionMethod: 'Tại cơ sở',
            relationshipToCustomer: 'Chính chủ',
            identityNumber: '012345678901',
            address: '123 Nguyễn Văn Cừ, Quận 1, TP.HCM'
        },
        302: {
            participantID: 302,
            QuestionalbleRelationship: 'Xác nhận qua điện thoại',
            fullName: 'Trần Thị B',
            dateOfBirth: '1985-08-22',
            gender: 'Nữ',
            collectionMethod: 'Tại nhà',
            relationshipToCustomer: 'Vợ',
            identityNumber: '012345678902',
            address: '456 Lê Lợi, Quận 3, TP.HCM'
        },
        303: {
            participantID: 303,
            QuestionalbleRelationship: 'Xác nhận trực tiếp',
            fullName: 'Lê Văn C',
            dateOfBirth: '1975-12-10',
            gender: 'Nam',
            collectionMethod: 'Tại cơ sở',
            relationshipToCustomer: 'Cha',
            identityNumber: '012345678903',
            address: '789 Trần Hưng Đạo, Quận 5, TP.HCM'
        },
        304: {
            participantID: 304,
            QuestionalbleRelationship: 'Xác nhận qua email',
            fullName: 'Phạm Thị D',
            dateOfBirth: '1995-03-18',
            gender: 'Nữ',
            collectionMethod: 'Tại cơ sở',
            relationshipToCustomer: 'Con gái',
            identityNumber: '012345678904',
            address: '321 Võ Văn Tần, Quận 3, TP.HCM'
        },
        305: {
            participantID: 305,
            QuestionalbleRelationship: 'Xác nhận qua giấy tờ',
            fullName: 'Võ Văn E',
            dateOfBirth: '2000-11-25',
            gender: 'Nam',
            collectionMethod: 'Tại nhà',
            relationshipToCustomer: 'Con trai',
            identityNumber: '012345678905',
            address: '654 Nguyễn Thị Minh Khai, Quận 1, TP.HCM'
        }
    };

    const filteredSamples = samples.filter(sample => {
        if (!searchTerm) return true;
        
        switch (searchType) {
            case 'sampleID':
                return sample.sampleID.toString().includes(searchTerm);
            case 'bookingID':
                return sample.bookingID.toString().includes(searchTerm);
            case 'participantID':
                return sample.participantID.toString().includes(searchTerm);
            case 'userID':
                return sample.userID.toString().includes(searchTerm);
            case 'sampleType':
                return sample.sampleType.toLowerCase().includes(searchTerm.toLowerCase());
            case 'typeOfCollection':
                return sample.typeOfCollection.toLowerCase().includes(searchTerm.toLowerCase());
            case 'receivedDate':
                return sample.receivedDate.includes(searchTerm);
            default:
                return sample.sampleID.toString().includes(searchTerm) ||
                       sample.bookingID.toString().includes(searchTerm) ||
                       sample.participantID.toString().includes(searchTerm);
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Validation cho các trường ID - không cho phép số âm
        if ((name === 'userID' || name === 'participantID') && value < 0) {
            return; // Không cập nhật state nếu giá trị âm
        }
        
        setNewSample(prev => ({ ...prev, [name]: value }));
    };

    const handleAddSample = () => {
        // Validation cơ bản
        if (!newSample.typeOfCollection || !newSample.sampleType || !newSample.receivedDate) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc (Loại mẫu, Phương thức lấy mẫu, Ngày nhận mẫu).');
            return;
        }
        
        // Validation cho các ID - phải là số dương
        if (newSample.userID && newSample.userID <= 0) {
            alert('Mã nhân viên phải là số dương!');
            return;
        }
        if (newSample.participantID && newSample.participantID <= 0) {
            alert('Mã bệnh nhân phải là số dương!');
            return;
        }
        
        const newSampleID = samples.length > 0 ? Math.max(...samples.map(s => s.sampleID)) + 1 : 1;
        // Tự động tạo mã booking tăng dần
        const maxBookingID = samples.length > 0 ? Math.max(...samples.map(s => s.bookingID)) : 1000;
        const newBookingID = maxBookingID + 1;
        
        setSamples(prev => [...prev, { 
            ...newSample, 
            sampleID: newSampleID,
            bookingID: newBookingID,
            participantID: newSample.participantID || (300 + samples.length + 1),
            userID: newSample.userID || 201 // Default staff ID
        }]);
        setNewSample({ 
            bookingID: '',
            userID: '',
            participantID: '',
            typeOfCollection: '', 
            sampleType: '', 
            receivedDate: ''
        });
        setShowAddModal(false);
        alert('Mẫu xét nghiệm mới đã được thêm thành công!');
    };

    const handleEditSample = () => {
        if (currentSample && newSample.typeOfCollection && newSample.sampleType && newSample.receivedDate) {
            setSamples(prev => prev.map(sample => 
                sample.sampleID === currentSample.sampleID ? { ...currentSample, ...newSample } : sample
            ));
            setShowEditModal(false);
            setCurrentSample(null);
            setNewSample({ 
                bookingID: '',
                userID: '',
                participantID: '',
                typeOfCollection: '', 
                sampleType: '', 
                receivedDate: ''
            });
            alert('Mẫu xét nghiệm đã được cập nhật thành công!');
        } else {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc (Loại mẫu, Phương thức lấy mẫu, Ngày nhận mẫu).');
        }
    };

    const handleDeleteSample = () => {
        if (currentSample) {
            setSamples(prev => prev.filter(sample => sample.sampleID !== currentSample.sampleID));
            setShowDeleteModal(false);
            setCurrentSample(null);
            alert('Mẫu xét nghiệm đã được xóa thành công!');
        }
    };

    const openEditModal = (sample) => {
        setCurrentSample(sample);
        setNewSample({
            bookingID: sample.bookingID,
            userID: sample.userID,
            participantID: sample.participantID,
            typeOfCollection: sample.typeOfCollection,
            sampleType: sample.sampleType,
            receivedDate: sample.receivedDate
        });
        setShowEditModal(true);
    };

    const openDeleteModal = (sample) => {
        setCurrentSample(sample);
        setShowDeleteModal(true);
    };

    const openDetailModal = (sample) => {
        setCurrentSample(sample);
        setCurrentParticipant(participantDetails[sample.participantID] || null);
        setShowDetailModal(true);
    };

    const closeModal = () => {
        setShowAddModal(false);
        setShowEditModal(false);
        setShowDeleteModal(false);
        setShowDetailModal(false);
        setCurrentSample(null);
        setCurrentParticipant(null);
        setNewSample({ 
            bookingID: '',
            userID: '',
            participantID: '',
            typeOfCollection: '', 
            sampleType: '', 
            receivedDate: ''
        });
    };

    // Tính toán thống kê
    const totalSamples = samples.length;
    const bloodSamples = samples.filter(s => s.sampleType === 'Máu').length;
    const oralSamples = samples.filter(s => s.sampleType === 'Tế bào niêm mạc miệng').length;
    const hairSamples = samples.filter(s => s.sampleType === 'Tóc').length;
    const nailSamples = samples.filter(s => s.sampleType === 'Móng tay').length;
    const umbilicalSamples = samples.filter(s => s.sampleType === 'Cuống rốn').length;
    const facilitySamples = samples.filter(s => s.typeOfCollection === 'Tại cơ sở').length;
    const homeSamples = samples.filter(s => s.typeOfCollection === 'Tại nhà').length;

    return (
        <div className="consultation-container">
            <div className="consultation-content">
                <div className="consultation-list-card">
                    <div className="consultation-header-row">
                        <h2 className="consultation-title">Quản lý Mẫu Xét nghiệm</h2>
                    </div>

                    {/* Statistics Section */}
                    <div className="statistics-section">
                        <div className="stat-card total">
                            <div className="stat-number">{totalSamples}</div>
                            <div className="stat-label">Tổng mẫu</div>
                        </div>
                        <div className="stat-card blood">
                            <div className="stat-number">{bloodSamples}</div>
                            <div className="stat-label">Mẫu máu</div>
                        </div>
                        <div className="stat-card urine">
                            <div className="stat-number">{oralSamples}</div>
                            <div className="stat-label">Niêm mạc miệng</div>
                        </div>
                        <div className="stat-card fluid">
                            <div className="stat-number">{hairSamples}</div>
                            <div className="stat-label">Mẫu tóc</div>
                        </div>
                        <div className="stat-card facility">
                            <div className="stat-number">{nailSamples}</div>
                            <div className="stat-label">Móng tay</div>
                        </div>
                        <div className="stat-card home">
                            <div className="stat-number">{umbilicalSamples}</div>
                            <div className="stat-label">Cuống rốn</div>
                        </div>
                    </div>

                    {/* Controls Section */}
                    <div className="consultation-controls">
                        <div className="search-controls">
                            <select
                                value={searchType}
                                onChange={(e) => setSearchType(e.target.value)}
                                className="search-type-select"
                            >
                                <option value="participantID">Mã bệnh nhân</option>
                                <option value="sampleID">Mã mẫu</option>
                                <option value="bookingID">Mã booking</option>
                                <option value="userID">Mã nhân viên</option>
                                <option value="sampleType">Loại mẫu</option>
                                <option value="typeOfCollection">Phương thức lấy mẫu</option>
                                <option value="receivedDate">Ngày nhận mẫu</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Nhập từ khóa tìm kiếm..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="add-sample-btn"
                        >
                            + Thêm mẫu mới
                        </button>
                    </div>

                    {/* Table Section */}
                    <div className="table-responsive">
                        {filteredSamples.length > 0 ? (
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Mã mẫu</th>
                                        <th>Mã booking</th>
                                        <th>Mã nhân viên</th>
                                        <th>Mã bệnh nhân</th>
                                        <th>Phương thức lấy mẫu</th>
                                        <th>Loại mẫu</th>
                                        <th>Ngày nhận mẫu</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSamples.map(sample => (
                                        <tr key={sample.sampleID}>
                                            <td>{sample.sampleID}</td>
                                            <td>{sample.bookingID}</td>
                                            <td>{sample.userID}</td>
                                            <td>
                                                <span 
                                                    onClick={() => openDetailModal(sample)}
                                                    style={{
                                                        color: '#007bff',
                                                        cursor: 'pointer',
                                                        textDecoration: 'underline',
                                                        fontWeight: '600'
                                                    }}
                                                    title="Click để xem chi tiết bệnh nhân"
                                                >
                                                    {sample.participantID}
                                                </span>
                                            </td>
                                            <td>{sample.typeOfCollection}</td>
                                            <td>{sample.sampleType}</td>
                                            <td>{sample.receivedDate}</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        onClick={() => openEditModal(sample)}
                                                        title="Chỉnh sửa mẫu"
                                                    >
                                                        ✎
                                                    </button>
                                                    <button
                                                        onClick={() => openDeleteModal(sample)}
                                                        title="Xóa mẫu"
                                                    >
                                                        ✕
                                                    </button>
                                                    <button
                                                        onClick={() => openDetailModal(sample)}
                                                        title="Xem chi tiết bệnh nhân"
                                                    >
                                                        👁
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div style={{textAlign: 'center', padding: '40px', color: '#6c757d'}}>
                                <p>Không tìm thấy mẫu xét nghiệm nào phù hợp với từ khóa tìm kiếm.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Sample Modal */}
            {showAddModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="sample-add-card" onClick={(e) => e.stopPropagation()}>
                        <h3>Thêm mẫu xét nghiệm mới</h3>
                        <div className="add-sample-form">
                            <div style={{
                                padding: '12px 16px',
                                backgroundColor: '#e7f3ff',
                                border: '1px solid #b3d9ff',
                                borderRadius: '8px',
                                marginBottom: '15px',
                                color: '#0056b3',
                                fontSize: '0.9em',
                                textAlign: 'center'
                            }}>
                                📋 Mã booking sẽ được tạo tự động: {samples.length > 0 ? Math.max(...samples.map(s => s.bookingID)) + 1 : 1001}
                            </div>
                            <input
                                name="userID"
                                type="number"
                                min="1"
                                placeholder="Mã nhân viên (Staff ID) *"
                                value={newSample.userID}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                name="participantID"
                                type="number"
                                min="1"
                                placeholder="Mã bệnh nhân *"
                                value={newSample.participantID}
                                onChange={handleInputChange}
                                required
                            />
                            <select
                                name="typeOfCollection"
                                value={newSample.typeOfCollection}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Chọn phương thức lấy mẫu *</option>
                                <option value="Tại cơ sở">Tại cơ sở</option>
                                <option value="Tại nhà">Tại nhà</option>
                            </select>
                            <select
                                name="sampleType"
                                value={newSample.sampleType}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Chọn loại mẫu *</option>
                                <option value="Máu">Máu</option>
                                <option value="Tế bào niêm mạc miệng">Tế bào niêm mạc miệng</option>
                                <option value="Tóc">Tóc</option>
                                <option value="Móng tay">Móng tay</option>
                                <option value="Cuống rốn">Cuống rốn</option>
                            </select>
                            <input
                                name="receivedDate"
                                type="date"
                                placeholder="Ngày nhận mẫu *"
                                value={newSample.receivedDate}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="form-buttons">
                                <button onClick={handleAddSample}>✅ Thêm mẫu</button>
                                <button onClick={closeModal}>❌ Hủy</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Sample Modal */}
            {showEditModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="sample-add-card" onClick={(e) => e.stopPropagation()}>
                        <h3>Chỉnh sửa mẫu xét nghiệm</h3>
                        <div className="add-sample-form">
                            <input
                                name="bookingID"
                                type="number"
                                placeholder="Mã Booking"
                                value={newSample.bookingID}
                                onChange={handleInputChange}
                                readOnly
                                style={{backgroundColor: '#e9ecef', color: '#6c757d'}}
                            />
                            <input
                                name="userID"
                                type="number"
                                placeholder="Mã nhân viên (Staff ID)"
                                value={newSample.userID}
                                onChange={handleInputChange}
                                readOnly
                                style={{backgroundColor: '#e9ecef', color: '#6c757d'}}
                            />
                            <input
                                name="participantID"
                                type="number"
                                placeholder="Mã bệnh nhân"
                                value={newSample.participantID}
                                onChange={handleInputChange}
                                readOnly
                                style={{backgroundColor: '#e9ecef', color: '#6c757d'}}
                            />
                            <select
                                name="typeOfCollection"
                                value={newSample.typeOfCollection}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Chọn phương thức lấy mẫu *</option>
                                <option value="Tại cơ sở">Tại cơ sở</option>
                                <option value="Tại nhà">Tại nhà</option>
                            </select>
                            <select
                                name="sampleType"
                                value={newSample.sampleType}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Chọn loại mẫu *</option>
                                <option value="Máu">Máu</option>
                                <option value="Tế bào niêm mạc miệng">Tế bào niêm mạc miệng</option>
                                <option value="Tóc">Tóc</option>
                                <option value="Móng tay">Móng tay</option>
                                <option value="Cuống rốn">Cuống rốn</option>
                            </select>
                            <input
                                name="receivedDate"
                                type="date"
                                placeholder="Ngày nhận mẫu *"
                                value={newSample.receivedDate}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="form-buttons">
                                <button onClick={handleEditSample}>✅ Cập nhật</button>
                                <button onClick={closeModal}>❌ Hủy</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="delete-confirmation-card" onClick={(e) => e.stopPropagation()}>
                        <h3>Xác nhận xóa mẫu</h3>
                        <p>
                            Bạn có chắc chắn muốn xóa mẫu <strong>ID: {currentSample?.sampleID}</strong> 
                            (Booking ID: <strong>{currentSample?.bookingID}</strong>, 
                            Participant ID: <strong>{currentSample?.participantID}</strong>) không?
                            <br/><br/>
                            Hành động này không thể hoàn tác!
                        </p>
                        <div className="delete-buttons">
                            <button onClick={handleDeleteSample}>🗑️ Xóa</button>
                            <button onClick={closeModal}>❌ Hủy</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Participant Detail Modal */}
            {showDetailModal && currentParticipant && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="sample-add-card participant-detail-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Chi tiết bệnh nhân</h3>
                        
                        {/* Thông tin bệnh nhân theo SQL Schema */}
                        <div className="participant-info-container">
                            <div className="participant-details">
                                <div className="detail-row">
                                    <span className="detail-label">Mã bệnh nhân</span>
                                    <span className="detail-value">{currentParticipant.participantID || 'Không có thông tin'}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Mối quan hệ đáng ngờ</span>
                                    <span className="detail-value">{currentParticipant.QuestionalbleRelationship || 'Không có thông tin'}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Họ và tên</span>
                                    <span className="detail-value">{currentParticipant.fullName || 'Không có thông tin'}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Ngày sinh</span>
                                    <span className="detail-value">{currentParticipant.dateOfBirth || 'Không có thông tin'}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Giới tính</span>
                                    <span className="detail-value">{currentParticipant.gender || 'Không có thông tin'}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Phương thức lấy mẫu</span>
                                    <span className="detail-value">{currentParticipant.collectionMethod || 'Không có thông tin'}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Mối quan hệ với khách hàng</span>
                                    <span className="detail-value">{currentParticipant.relationshipToCustomer || 'Không có thông tin'}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Số CMND/CCCD</span>
                                    <span className="detail-value">{currentParticipant.identityNumber || 'Không có thông tin'}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Địa chỉ</span>
                                    <span className="detail-value">{currentParticipant.address || 'Không có thông tin'}</span>
                                </div>
                            </div>

                            <div className="form-buttons">
                                <button onClick={closeModal}>✅ Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}