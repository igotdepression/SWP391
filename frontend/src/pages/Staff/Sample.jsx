// Staff/Sample.jsx
import React, { useState } from 'react';
import { Card, Button, Input, Select } from '../../components/ui/ui';
import './Sample.css';

export default function Sample() {
    const [samples, setSamples] = useState([
        { id: 'SAMP001', patientName: 'Nguyễn Văn A', testType: 'Máu', collectionDate: '2025-06-20', status: 'pending', barcode: 'BC12345' },
        { id: 'SAMP002', patientName: 'Trần Thị B', testType: 'Nước tiểu', collectionDate: '2025-06-20', status: 'received', barcode: 'BC12346' },
        { id: 'SAMP003', patientName: 'Lê Văn C', testType: 'Dịch', collectionDate: '2025-06-19', status: 'testing', barcode: 'BC12347' },
        { id: 'SAMP004', patientName: 'Phạm Thị D', testType: 'Máu', collectionDate: '2025-06-19', status: 'completed', barcode: 'BC12348' },
        { id: 'SAMP005', patientName: 'Võ Văn E', testType: 'Tóc', collectionDate: '2025-06-18', status: 'pending', barcode: 'BC12349' },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [newSample, setNewSample] = useState({ id: '', patientName: '', testType: '', collectionDate: '', status: 'pending', barcode: '' });

    const filteredSamples = samples.filter(sample => {
        const matchesSearch = sample.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              sample.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              sample.barcode.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || sample.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSample(prev => ({ ...prev, [name]: value }));
    };

    const handleAddSample = () => {
        if (newSample.id && newSample.patientName && newSample.testType && newSample.collectionDate) {
            setSamples(prev => [...prev, { ...newSample, id: `SAMP${String(samples.length + 1).padStart(3, '0')}`, status: 'pending' }]);
            setNewSample({ id: '', patientName: '', testType: '', collectionDate: '', status: 'pending', barcode: '' });
            alert('Mẫu xét nghiệm mới đã được thêm!');
        } else {
            alert('Vui lòng điền đầy đủ thông tin mẫu xét nghiệm.');
        }
    };

    const handleUpdateStatus = (id, newStatus) => {
        setSamples(prevSamples =>
            prevSamples.map(sample =>
                sample.id === id ? { ...sample, status: newStatus } : sample
            )
        );
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'pending': return 'Đang chờ tiếp nhận';
            case 'received': return 'Đã tiếp nhận';
            case 'testing': return 'Đang chạy';
            case 'completed': return 'Hoàn thành';
            default: return status;
        }
    };

    return (
        <div className="sample-management-container">
            <Card className="sample-add-card">
                <h3>Thêm mẫu xét nghiệm mới</h3>
                <div className="add-sample-form">
                    <Input
                        name="patientName"
                        placeholder="Tên bệnh nhân"
                        value={newSample.patientName}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="testType"
                        placeholder="Loại xét nghiệm"
                        value={newSample.testType}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="collectionDate"
                        type="date"
                        placeholder="Ngày lấy mẫu"
                        value={newSample.collectionDate}
                        onChange={handleInputChange}
                    />
                     <Input
                        name="barcode"
                        placeholder="Mã vạch (nếu có)"
                        value={newSample.barcode}
                        onChange={handleInputChange}
                    />
                    <Button onClick={handleAddSample}>Thêm mẫu</Button>
                </div>
            </Card>

            <Card className="sample-controls">
                <Input
                    type="text"
                    placeholder="Tìm kiếm theo tên bệnh nhân, mã mẫu, mã vạch..."
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
                    <option value="pending">Đang chờ tiếp nhận</option>
                    <option value="received">Đã tiếp nhận</option>
                    <option value="testing">Đang chạy</option>
                    <option value="completed">Hoàn thành</option>
                </Select>
            </Card>

            <Card className="sample-list-card">
                <h3>Danh sách mẫu xét nghiệm</h3>
                {filteredSamples.length > 0 ? (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Mã mẫu</th>
                                <th>Tên bệnh nhân</th>
                                <th>Loại xét nghiệm</th>
                                <th>Ngày lấy mẫu</th>
                                <th>Mã vạch</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSamples.map(sample => (
                                <tr key={sample.id}>
                                    <td>{sample.id}</td>
                                    <td>{sample.patientName}</td>
                                    <td>{sample.testType}</td>
                                    <td>{sample.collectionDate}</td>
                                    <td>{sample.barcode}</td>
                                    <td>
                                        <span className={`status-badge status-${sample.status}`}>
                                            {getStatusLabel(sample.status)}
                                        </span>
                                    </td>
                                    <td className="sample-actions">
                                        {sample.status === 'pending' && (
                                            <Button size="sm" onClick={() => handleUpdateStatus(sample.id, 'received')}>Tiếp nhận</Button>
                                        )}
                                        {sample.status === 'received' && (
                                            <Button size="sm" variant="primary" onClick={() => handleUpdateStatus(sample.id, 'testing')}>Chạy mẫu</Button>
                                        )}
                                        {sample.status === 'testing' && (
                                            <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(sample.id, 'completed')}>Hoàn thành</Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Không tìm thấy mẫu xét nghiệm nào.</p>
                )}
            </Card>
        </div>
    );
}