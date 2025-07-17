// pages/Manager/ServicePrice.jsx
import React, { useEffect, useState } from 'react';
import { Card, Button } from '../../components/ui/ui';
import './ServicePrice.css';

const fakeServices = [
    {
        serviceID: 1,
        serviceName: 'Xét nghiệm ADN cha con',
        serviceType: 'Dân sự',
        packageType: 'Tiêu chuẩn',
        price: 2500000,
        status: 'Hoạt động',
        extraSampleFee: 500000
    },
    {
        serviceID: 2,
        serviceName: 'Xét nghiệm ADN mẹ con',
        serviceType: 'Dân sự',
        packageType: 'Lấy nhanh',
        price: 2300000,
        status: 'Hoạt động',
        extraSampleFee: 300000
    },
    {
        serviceID: 3,
        serviceName: 'Xét nghiệm ADN anh em ruột',
        serviceType: 'Hành chính',
        packageType: 'Tiêu chuẩn',
        price: 2800000,
        status: 'Ngừng hoạt động',
        extraSampleFee: 600000
    }
];

const fakeSurcharges = [
    {
        surchargeID: 1,
        sampleType: 'Mẫu tóc',
        surcharge: 200000,
        note: 'Phí bổ sung cho mẫu tóc có chất lượng kém'
    },
    {
        surchargeID: 2,
        sampleType: 'Mẫu móng tay',
        surcharge: 300000,
        note: 'Phí bổ sung cho mẫu móng tay'
    },
    {
        surchargeID: 3,
        sampleType: 'Mẫu nước bọt',
        surcharge: 150000,
        note: 'Phí bổ sung cho mẫu nước bọt chất lượng thấp'
    }
];

export default function ServicePrice() {
    const [services, setServices] = useState([]);
    const [surcharges, setSurcharges] = useState([]);
    const [activeTab, setActiveTab] = useState('services');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [editingService, setEditingService] = useState(null);
    const [editingSurcharge, setEditingSurcharge] = useState(null);
    const [showAddServiceForm, setShowAddServiceForm] = useState(false);
    const [showAddSurchargeForm, setShowAddSurchargeForm] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setServices(fakeServices);
            setSurcharges(fakeSurcharges);
            setLoading(false);
        }, 300);
    }, []);

    // Lọc services
    const filteredServices = services.filter(service => {
        const matchesSearch = service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             service.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             service.packageType.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Lọc surcharges
    const filteredSurcharges = surcharges.filter(surcharge => {
        return surcharge.sampleType.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleEditService = (service) => {
        setEditingService(service);
    };

    const handleSaveService = (updatedService) => {
        setServices(services.map(s => 
            s.serviceID === updatedService.serviceID ? updatedService : s
        ));
        setEditingService(null);
    };

    const handleDeleteService = (serviceID) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) {
            setServices(services.filter(s => s.serviceID !== serviceID));
        }
    };

    const handleEditSurcharge = (surcharge) => {
        setEditingSurcharge(surcharge);
    };

    const handleSaveSurcharge = (updatedSurcharge) => {
        setSurcharges(surcharges.map(s => 
            s.surchargeID === updatedSurcharge.surchargeID ? updatedSurcharge : s
        ));
        setEditingSurcharge(null);
    };

    const handleDeleteSurcharge = (surchargeID) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa phụ phí này?')) {
            setSurcharges(surcharges.filter(s => s.surchargeID !== surchargeID));
        }
    };

    if (loading) {
        return <div className="loading">Đang tải...</div>;
    }

    return (
        <div className="service-price-container">
            {/* Header chính */}
            <div className="main-header">
                <h1 className="page-title">Quản lý giá dịch vụ</h1>
                <p className="page-subtitle">Quản lý thông tin và giá của các dịch vụ xét nghiệm ADN</p>
            </div>

            {/* Tabs */}
            <div className="tabs-container">
                <button 
                    className={`tab ${activeTab === 'services' ? 'active' : ''}`}
                    onClick={() => setActiveTab('services')}
                >
                    <span className="tab-icon">⚕️</span>
                    Quản lý Dịch vụ
                </button>
                <button 
                    className={`tab ${activeTab === 'surcharges' ? 'active' : ''}`}
                    onClick={() => setActiveTab('surcharges')}
                >
                    <span className="tab-icon">💰</span>
                    Quản lý Phụ phí
                </button>
            </div>

            {activeTab === 'services' && (
                <div className="content-section">
                    <Card className="info-card">
                        <div className="card-header">
                            <div className="header-content">
                                <h2 className="section-title">
                                    <span className="title-icon">🧬</span>
                                    Danh sách Dịch vụ
                                </h2>
                                <p className="section-subtitle">Quản lý thông tin và giá của các dịch vụ xét nghiệm ADN</p>
                            </div>
                        </div>

                        {/* Bộ lọc và tìm kiếm */}
                        <div className="filter-section">
                            <div className="search-container">
                                <div className="search-box">
                                    <span className="search-icon">🔍</span>
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm dịch vụ..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="search-input"
                                    />
                                </div>
                            </div>
                            <div className="filter-controls">
                                <div className="filter-group">
                                    <label className="filter-label">Trạng thái:</label>
                                    <select 
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="status-filter"
                                    >
                                        <option value="all">Tất cả trạng thái</option>
                                        <option value="Hoạt động">Hoạt động</option>
                                        <option value="Ngừng hoạt động">Ngừng hoạt động</option>
                                    </select>
                                </div>
                                <Button 
                                    onClick={() => setShowAddServiceForm(true)}
                                    className="add-button primary"
                                >
                                    <span className="btn-icon">➕</span>
                                    Thêm Dịch vụ Mới
                                </Button>
                            </div>
                        </div>

                        {/* Bảng dịch vụ */}
                        <div className="table-container">
                            <div className="table-responsive">
                                <table className="services-table">
                                    <thead>
                                        <tr>
                                            <th className="th-id">ID</th>
                                            <th className="th-name">Tên Dịch vụ</th>
                                            <th className="th-type">Loại dịch vụ</th>
                                            <th className="th-package">Gói dịch vụ</th>
                                            <th className="th-price">Giá (VNĐ)</th>
                                            <th className="th-extra">Phí mẫu thứ 3 (VNĐ)</th>
                                            <th className="th-status">Trạng thái</th>
                                            <th className="th-actions">Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredServices.length > 0 ? (
                                            filteredServices.map(service => (
                                                <tr key={service.serviceID} className="service-row">
                                                    <td className="td-id">{service.serviceID}</td>
                                                    <td className="td-name">
                                                        <div className="service-name">
                                                            <span className="name-text">{service.serviceName}</span>
                                                        </div>
                                                    </td>
                                                    <td className="td-type">
                                                        <span className="service-type">{service.serviceType}</span>
                                                    </td>
                                                    <td className="td-package">
                                                        <span className="package-type">{service.packageType}</span>
                                                    </td>
                                                    <td className="td-price">
                                                        <div className="price-display">
                                                            <span className="price-amount">{service.price.toLocaleString('vi-VN')}</span>
                                                            <span className="price-currency">VNĐ</span>
                                                        </div>
                                                    </td>
                                                    <td className="td-extra">
                                                        <div className="price-display">
                                                            {service.extraSampleFee ? (
                                                                <>
                                                                    <span className="price-amount">{service.extraSampleFee.toLocaleString('vi-VN')}</span>
                                                                    <span className="price-currency">VNĐ</span>
                                                                </>
                                                            ) : (
                                                                <span className="no-fee">Không có</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="td-status">
                                                        <span className={`status-badge ${service.status === 'Hoạt động' ? 'status-active' : 'status-inactive'}`}>
                                                            <span className="status-dot"></span>
                                                            {service.status}
                                                        </span>
                                                    </td>
                                                    <td className="td-actions">
                                                        <div className="action-buttons">
                                                            <button 
                                                                onClick={() => handleEditService(service)}
                                                                className="action-btn edit-btn"
                                                                title="Chỉnh sửa"
                                                            >
                                                                <span className="btn-icon">✏️</span>
                                                                <span className="btn-text">Sửa</span>
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDeleteService(service.serviceID)}
                                                                className="action-btn delete-btn"
                                                                title="Xóa"
                                                            >
                                                                <span className="btn-icon">🗑️</span>
                                                                <span className="btn-text">Xóa</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="no-data">
                                                    <div className="empty-state">
                                                        <span className="empty-icon">📊</span>
                                                        <span className="empty-text">Không tìm thấy dịch vụ nào</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Thống kê */}
                        <div className="stats-section">
                            <div className="stats-grid">
                                <div className="stat-card total">
                                    <div className="stat-icon">📊</div>
                                    <div className="stat-content">
                                        <div className="stat-label">Tổng dịch vụ</div>
                                        <div className="stat-value">{services.length}</div>
                                    </div>
                                </div>
                                <div className="stat-card active">
                                    <div className="stat-icon">✅</div>
                                    <div className="stat-content">
                                        <div className="stat-label">Đang hoạt động</div>
                                        <div className="stat-value">{services.filter(s => s.status === 'Hoạt động').length}</div>
                                    </div>
                                </div>
                                <div className="stat-card inactive">
                                    <div className="stat-icon">⏸️</div>
                                    <div className="stat-content">
                                        <div className="stat-label">Ngừng hoạt động</div>
                                        <div className="stat-value">{services.filter(s => s.status === 'Ngừng hoạt động').length}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {activeTab === 'surcharges' && (
                <Card className="info-card">
                    <div className="header-section">
                        <h2>Quản lý Phụ phí</h2>
                        <p>Quản lý phụ phí theo loại mẫu xét nghiệm</p>
                    </div>

                    {/* Bộ lọc và tìm kiếm */}
                    <div className="filter-section">
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Tìm kiếm loại mẫu..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                        <div className="filter-controls">
                            <Button 
                                onClick={() => setShowAddSurchargeForm(true)}
                                className="add-button"
                            >
                                + Thêm Phụ phí Mới
                            </Button>
                        </div>
                    </div>

                    {/* Bảng phụ phí */}
                    <div className="table-responsive">
                        <table className="services-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Loại mẫu</th>
                                    <th>Phụ phí (VNĐ)</th>
                                    <th>Ghi chú</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSurcharges.length > 0 ? (
                                    filteredSurcharges.map(surcharge => (
                                        <tr key={surcharge.surchargeID}>
                                            <td>{surcharge.surchargeID}</td>
                                            <td>{surcharge.sampleType}</td>
                                            <td className="price-cell">
                                                {surcharge.surcharge ? surcharge.surcharge.toLocaleString('vi-VN') + ' VNĐ' : 'Miễn phí'}
                                            </td>
                                            <td className="note-cell">{surcharge.note}</td>
                                            <td className="actions-cell">
                                                <Button 
                                                    size="sm" 
                                                    onClick={() => handleEditSurcharge(surcharge)}
                                                    className="edit-btn"
                                                >
                                                    Sửa
                                                </Button>
                                                <Button 
                                                    size="sm" 
                                                    variant="danger" 
                                                    onClick={() => handleDeleteSurcharge(surcharge.surchargeID)}
                                                    className="delete-btn"
                                                >
                                                    Xóa
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="no-data">
                                            Không tìm thấy phụ phí nào
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}

            {/* Modal chỉnh sửa service */}
            {editingService && (
                <EditServiceModal 
                    service={editingService}
                    onSave={handleSaveService}
                    onCancel={() => setEditingService(null)}
                />
            )}

            {/* Modal thêm mới service */}
            {showAddServiceForm && (
                <AddServiceModal 
                    onSave={(newService) => {
                        setServices([...services, { ...newService, serviceID: Date.now() }]);
                        setShowAddServiceForm(false);
                    }}
                    onCancel={() => setShowAddServiceForm(false)}
                />
            )}

            {/* Modal chỉnh sửa surcharge */}
            {editingSurcharge && (
                <EditSurchargeModal 
                    surcharge={editingSurcharge}
                    onSave={handleSaveSurcharge}
                    onCancel={() => setEditingSurcharge(null)}
                />
            )}

            {/* Modal thêm mới surcharge */}
            {showAddSurchargeForm && (
                <AddSurchargeModal 
                    onSave={(newSurcharge) => {
                        setSurcharges([...surcharges, { ...newSurcharge, surchargeID: Date.now() }]);
                        setShowAddSurchargeForm(false);
                    }}
                    onCancel={() => setShowAddSurchargeForm(false)}
                />
            )}
        </div>
    );
}

// Component Modal chỉnh sửa Service
const EditServiceModal = ({ service, onSave, onCancel }) => {
    const [formData, setFormData] = useState(service);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            price: parseFloat(formData.price),
            extraSampleFee: formData.extraSampleFee ? parseFloat(formData.extraSampleFee) : null
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Chỉnh sửa Dịch vụ</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Tên dịch vụ:</label>
                        <input
                            type="text"
                            value={formData.serviceName}
                            onChange={(e) => setFormData({...formData, serviceName: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Loại dịch vụ:</label>
                        <select
                            value={formData.serviceType}
                            onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                            required
                        >
                            <option value="Dân sự">Dân sự</option>
                            <option value="Hành chính">Hành chính</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Gói dịch vụ:</label>
                        <select
                            value={formData.packageType}
                            onChange={(e) => setFormData({...formData, packageType: e.target.value})}
                            required
                        >
                            <option value="Tiêu chuẩn">Tiêu chuẩn</option>
                            <option value="Lấy nhanh">Lấy nhanh</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Giá (VNĐ):</label>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phí mẫu thứ 3 (VNĐ):</label>
                        <input
                            type="number"
                            value={formData.extraSampleFee || ''}
                            onChange={(e) => setFormData({...formData, extraSampleFee: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái:</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                            required
                        >
                            <option value="Hoạt động">Hoạt động</option>
                            <option value="Ngừng hoạt động">Ngừng hoạt động</option>
                        </select>
                    </div>
                    <div className="form-actions">
                        <Button type="submit">Lưu</Button>
                        <Button type="button" variant="secondary" onClick={onCancel}>Hủy</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Component Modal thêm mới Service
const AddServiceModal = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        serviceName: '',
        serviceType: 'Dân sự',
        packageType: 'Tiêu chuẩn',
        price: '',
        extraSampleFee: '',
        status: 'Hoạt động'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            price: parseFloat(formData.price),
            extraSampleFee: formData.extraSampleFee ? parseFloat(formData.extraSampleFee) : null
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Thêm Dịch vụ Mới</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Tên dịch vụ:</label>
                        <input
                            type="text"
                            value={formData.serviceName}
                            onChange={(e) => setFormData({...formData, serviceName: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Loại dịch vụ:</label>
                        <select
                            value={formData.serviceType}
                            onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                            required
                        >
                            <option value="Dân sự">Dân sự</option>
                            <option value="Hành chính">Hành chính</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Gói dịch vụ:</label>
                        <select
                            value={formData.packageType}
                            onChange={(e) => setFormData({...formData, packageType: e.target.value})}
                            required
                        >
                            <option value="Tiêu chuẩn">Tiêu chuẩn</option>
                            <option value="Lấy nhanh">Lấy nhanh</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Giá (VNĐ):</label>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phí mẫu thứ 3 (VNĐ):</label>
                        <input
                            type="number"
                            value={formData.extraSampleFee}
                            onChange={(e) => setFormData({...formData, extraSampleFee: e.target.value})}
                            placeholder="Để trống nếu không có"
                        />
                    </div>
                    <div className="form-actions">
                        <Button type="submit">Thêm</Button>
                        <Button type="button" variant="secondary" onClick={onCancel}>Hủy</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Component Modal chỉnh sửa Surcharge
const EditSurchargeModal = ({ surcharge, onSave, onCancel }) => {
    const [formData, setFormData] = useState(surcharge);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            surcharge: formData.surcharge ? parseFloat(formData.surcharge) : null
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Chỉnh sửa Phụ phí</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Loại mẫu:</label>
                        <input
                            type="text"
                            value={formData.sampleType}
                            onChange={(e) => setFormData({...formData, sampleType: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phụ phí (VNĐ):</label>
                        <input
                            type="number"
                            value={formData.surcharge || ''}
                            onChange={(e) => setFormData({...formData, surcharge: e.target.value})}
                            placeholder="Để trống nếu miễn phí"
                        />
                    </div>
                    <div className="form-group">
                        <label>Ghi chú:</label>
                        <textarea
                            value={formData.note}
                            onChange={(e) => setFormData({...formData, note: e.target.value})}
                            rows="3"
                        />
                    </div>
                    <div className="form-actions">
                        <Button type="submit">Lưu</Button>
                        <Button type="button" variant="secondary" onClick={onCancel}>Hủy</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Component Modal thêm mới Surcharge
const AddSurchargeModal = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        sampleType: '',
        surcharge: '',
        note: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            surcharge: formData.surcharge ? parseFloat(formData.surcharge) : null
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Thêm Phụ phí Mới</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Loại mẫu:</label>
                        <input
                            type="text"
                            value={formData.sampleType}
                            onChange={(e) => setFormData({...formData, sampleType: e.target.value})}
                            required
                            placeholder="Ví dụ: Mẫu tóc, Mẫu móng tay..."
                        />
                    </div>
                    <div className="form-group">
                        <label>Phụ phí (VNĐ):</label>
                        <input
                            type="number"
                            value={formData.surcharge}
                            onChange={(e) => setFormData({...formData, surcharge: e.target.value})}
                            placeholder="Để trống nếu miễn phí"
                        />
                    </div>
                    <div className="form-group">
                        <label>Ghi chú:</label>
                        <textarea
                            value={formData.note}
                            onChange={(e) => setFormData({...formData, note: e.target.value})}
                            rows="3"
                            placeholder="Mô tả về phụ phí này..."
                        />
                    </div>
                    <div className="form-actions">
                        <Button type="submit">Thêm</Button>
                        <Button type="button" variant="secondary" onClick={onCancel}>Hủy</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};