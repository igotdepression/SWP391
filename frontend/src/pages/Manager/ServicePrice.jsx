// pages/Manager/ServicePrice.jsx
import React, { useEffect, useState } from 'react';
import { Card, Button } from '../../components/ui/ui';
import './ServicePrice.css';
import { serviceAPI } from '../../services/api';
import { surchargeAPI } from '../../services/api';
import { Eye, EyeOff, Edit } from 'lucide-react';

export default function ServicePrice() {
    const [services, setServices] = useState([]);
    const [activeTab, setActiveTab] = useState('services');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [editingService, setEditingService] = useState(null);
    const [showAddServiceForm, setShowAddServiceForm] = useState(false);

    // Lấy danh sách dịch vụ từ API khi load trang (chỉ hiển thị những dịch vụ đang hoạt động)
    useEffect(() => {
        async function fetchServices() {
            setLoading(true);
            setError(null);
            try {
                const res = await serviceAPI.getAllServices();
                // Lọc chỉ hiển thị dịch vụ đang hoạt động
                const activeServices = res.data.filter(service => service.status !== 'Đã ẩn');
                setServices(activeServices);
            } catch (err) {
                setError('Không thể tải danh sách dịch vụ');
            } finally {
                setLoading(false);
            }
        }
        fetchServices();
    }, []);

    // Lọc services
    const filteredServices = services.filter(service => {
        const matchesSearch = service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.packageType.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleEditService = (service) => {
        setEditingService(service);
    };

    // Thêm dịch vụ mới
    const handleAddService = async (newService) => {
        setLoading(true);
        setError(null);
        try {
            await serviceAPI.addService(newService);
            const res = await serviceAPI.getAllServices();
            setServices(res.data);
            setShowAddServiceForm(false);
        } catch (err) {
            setError('Không thể thêm dịch vụ mới');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveService = async (updatedService) => {
        setLoading(true);
        setError(null);
        try {
            await serviceAPI.updateService(updatedService.serviceID, updatedService);
            const res = await serviceAPI.getAllServices();
            setServices(res.data);
            setEditingService(null);
        } catch (err) {
            setError('Không thể cập nhật dịch vụ');
        } finally {
            setLoading(false);
        }
    };

    // Ẩn/hiện dịch vụ thay vì xóa
    const handleDeleteService = async (serviceID) => {
        if (window.confirm('Bạn có chắc chắn muốn ẩn dịch vụ này?')) {
            setLoading(true);
            setError(null);
            try {
                // Xóa mềm: cập nhật status thành 'Ngừng hoạt động'
                const service = services.find(s => s.serviceID === serviceID);
                await serviceAPI.updateService(serviceID, { ...service, status: 'Ngừng hoạt động' });
                const res = await serviceAPI.getAllServices();
                setServices(res.data);
            } catch (err) {
                setError('Không thể ẩn dịch vụ');
            } finally {
                setLoading(false);
            }
        }
    };




    return (
        <div className="service-price-container">
            {/* Header chính */}
            <div className="main-header">
                <h1 className="page-title">Xem bảng giá dịch vụ </h1>
            </div>

            <div className="content-section">
                <Card className="info-card">

                    {/* Nội dung tab Quản lý Dịch vụ */}
                    {activeTab === 'services' && (
                        <div className="stats-section-container">
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

                            {/* Bộ lọc và tìm kiếm cho dịch vụ */}
                            <div className="filter-section">
                                <div className="search-container">
                                    <div className="search-box">
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
                                </div>
                                <div className="action-buttons">
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
                                                            <div className="actions-cell">
                                                                <button
                                                                    onClick={() => handleEditService(service)}
                                                                    className="action-btn edit-btn"
                                                                    title="Chỉnh sửa"
                                                                >
                                                                    <Edit size={16} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteService(service.serviceID)}
                                                                    className="action-btn delete-btn"
                                                                    title="Ẩn dịch vụ"
                                                                >
                                                                    {service.status === 'Hoạt động' ? (
                                                                        <Eye size={16} />
                                                                    ) : (
                                                                        <EyeOff size={16} />
                                                                    )}
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
                        </div>
                    )}

                </Card>
            </div>

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
                    onSave={handleAddService}
                    onCancel={() => setShowAddServiceForm(false)}
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
                            onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Loại dịch vụ:</label>
                        <select
                            value={formData.serviceType}
                            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
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
                            onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
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
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phí mẫu thứ 3 (VNĐ):</label>
                        <input
                            type="number"
                            value={formData.extraSampleFee || ''}
                            onChange={(e) => setFormData({ ...formData, extraSampleFee: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái:</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
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
                <h3>Thêm dịch vụ mới</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Tên dịch vụ:</label>
                        <input
                            type="text"
                            value={formData.serviceName}
                            onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Loại dịch vụ:</label>
                        <select
                            value={formData.serviceType}
                            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
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
                            onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
                            required
                        >
                            <option value="Tiêu chuẩn">Tiêu chuẩn (2-5 ngày)</option>
                            <option value="Lấy nhanh">Lấy nhanh (6-24 tiếng)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Giá (VNĐ):</label>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phí mẫu thứ 3 (VNĐ):</label>
                        <input
                            type="number"
                            value={formData.extraSampleFee}
                            onChange={(e) => setFormData({ ...formData, extraSampleFee: e.target.value })}
                            placeholder="Để trống nếu không có"
                        />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái:</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            required
                        >
                            <option value="Hoạt động">Hoạt động</option>
                            <option value="Ngừng hoạt động">Ngừng hoạt động</option>
                        </select>
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
                            onChange={(e) => setFormData({ ...formData, sampleType: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phụ phí (VNĐ):</label>
                        <input
                            type="number"
                            value={formData.surcharge || ''}
                            onChange={(e) => setFormData({ ...formData, surcharge: e.target.value })}
                            placeholder="Để trống nếu miễn phí"
                        />
                    </div>
                    <div className="form-group">
                        <label>Ghi chú:</label>
                        <textarea
                            value={formData.note}
                            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
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
                            onChange={(e) => setFormData({ ...formData, sampleType: e.target.value })}
                            required
                            placeholder="Ví dụ: Mẫu tóc, Mẫu móng tay..."
                        />
                    </div>
                    <div className="form-group">
                        <label>Phụ phí (VNĐ):</label>
                        <input
                            type="number"
                            value={formData.surcharge}
                            onChange={(e) => setFormData({ ...formData, surcharge: e.target.value })}
                            placeholder="Để trống nếu miễn phí"
                        />
                    </div>
                    <div className="form-group">
                        <label>Ghi chú:</label>
                        <textarea
                            value={formData.note}
                            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
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