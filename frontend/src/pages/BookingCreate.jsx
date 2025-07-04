import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './BookingCreate.css';
import api from '../services/api';
import vietnamLocations from '../data/vietnamLocations.json';

export default function BookingCreate() {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const initialBookingData = location.state?.initialBookingData;

    const [serviceID, setServiceID] = useState('');
    const [serviceList, setServiceList] = useState([]);
    const [serviceListError, setServiceListError] = useState('');
    const [serviceName, setServiceName] = useState(initialBookingData?.serviceName || '');
    const [serviceType, setServiceType] = useState(initialBookingData?.serviceType || '');
    const [typeSample, setTypeSample] = useState(initialBookingData?.typeSample || '');
    const [appointmentDate, setAppointmentDate] = useState(initialBookingData?.appointmentDate || '');
    const [notes, setNotes] = useState(initialBookingData?.notes || '');
    const [resultTime, setResultTime] = useState(initialBookingData?.resultTime || '');
    const today = new Date().toISOString().split('T')[0];

    const [participants, setParticipants] = useState(initialBookingData?.participants || []);
    const [numSamples, setNumSamples] = useState(initialBookingData?.numSamples || 2);

    // State mới để lưu relationship options tách từ serviceName
    const [relationshipOptions, setRelationshipOptions] = useState(['Quan hệ nghi vấn']);

    // Không hardcode serviceOptions nữa
    // Sử dụng serviceList để lấy các serviceName duy nhất
    const uniqueServiceNames = Array.from(new Set(serviceList.map(s => s.serviceName)));

    // Mapping quan hệ nghi vấn cho từng loại dịch vụ
    const getRelationshipOptions = () => {
        switch (serviceName) {
            case 'Xét nghiệm cha con':
                return ['Cha', 'Con'];
            case 'Xét nghiệm mẹ con':
                return ['Mẹ', 'Con'];
            case 'Xét nghiệm ông cháu':
                return ['Ông', 'Cháu'];
            case 'Xét nghiệm bà cháu':
                return ['Bà', 'Cháu'];
            case 'Xét nghiệm anh em ruột':
                return ['Anh', 'Em', 'Mẹ (tùy chọn)'];
            case 'Thai nhi (không xâm lấn)':
                return ['Thai nhi (Mẫu từ mẹ)', 'Cha nghi vấn'];
            default:
                return ['Khác'];
        }
    };

    const serviceOptions = [
        'Xét nghiệm ADN Cha con',
        'Xét nghiệm ADN Mẹ con',
        'Xét nghiệm ADN Ông cháu',
        'Xét nghiệm ADN Bà cháu',
        'Xét nghiệm ADN Anh em ruột',
        'Xét nghiệm ADN Thai nhi',
    ];

    const collectionMethodOptions = [
        'Tự thu mẫu',
        'Thu mẫu tại nhà/văn phòng',
        'Thu mẫu tại trung tâm',
    ];

    const [sampleTypeOptions, setSampleTypeOptions] = useState([
        'Mẫu máu/Tế bào niêm mạc miệng',
        'Mẫu tóc, móng tay, chân',
        'Mẫu bàn chải đánh răng, dao cạo râu',
        // Add more sample types as needed
    ]);

    // Parse lại locationSelections và addressDetails từ initialBookingData nếu có
    const parseLocationSelections = (participants) =>
        (participants || []).map(p => {
            const addressParts = (p.address || '').split(',').map(s => s.trim());
            return {
                province: addressParts[3] || '',
                district: addressParts[2] || '',
                ward: addressParts[1] || '',
            };
        });
    const parseAddressDetails = (participants) =>
        (participants || []).map(p => {
            const addressParts = (p.address || '').split(',').map(s => s.trim());
            return addressParts[0] || '';
        });

    const [locationSelections, setLocationSelections] = useState(
        initialBookingData?.participants ? parseLocationSelections(initialBookingData.participants)
        : []
    );
    const [addressDetails, setAddressDetails] = useState(
        initialBookingData?.participants ? parseAddressDetails(initialBookingData.participants)
        : []
    );

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        if (serviceName === 'Thai nhi (không xâm lấn)') {
            setResultTime('Tiêu chuẩn (7-10 ngày làm việc)');
        } else if (initialBookingData?.resultTime && resultTime === '') {
            setResultTime(initialBookingData.resultTime);
        }
    }, [serviceName]);

    useEffect(() => {
        // Copy logic getRelationshipOptions vào trong useEffect để tránh vòng lặp
        const getRelationshipOptions = () => {
            switch (serviceName) {
                case 'Xét nghiệm cha con':
                    return ['Cha', 'Con'];
                case 'Xét nghiệm mẹ con':
                    return ['Mẹ', 'Con'];
                case 'Xét nghiệm ông cháu':
                    return ['Ông', 'Cháu'];
                case 'Xét nghiệm bà cháu':
                    return ['Bà', 'Cháu'];
                case 'Xét nghiệm anh em ruột':
                    return ['Anh', 'Em', 'Mẹ (tùy chọn)'];
                case 'Thai nhi (không xâm lấn)':
                    return ['Thai nhi (Mẫu từ mẹ)', 'Cha nghi vấn'];
                default:
                    return ['Khác'];
            }
        };
        if (!initialBookingData || initialBookingData.numSamples !== numSamples) {
            setParticipants(prevParticipants => {
                const newParticipants = Array.from({ length: numSamples }, (_, i) => {
                    const existingParticipant = prevParticipants[i];
                    const relationshipOptions = getRelationshipOptions();
                    let defaultRelationship = 'Quan hệ nghi vấn';
                    if (serviceName === 'Thai nhi (không xâm lấn)') {
                        if (i === 0) { defaultRelationship = 'Thai nhi (Mẫu từ mẹ)'; }
                        else { defaultRelationship = 'Cha nghi vấn'; }
                    } else {
                        defaultRelationship = relationshipOptions[i] || 'Quan hệ nghi vấn';
                    }
                    let defaultCollectionMethod = '';
                    if (serviceName === 'Thai nhi (không xâm lấn)') {
                        defaultCollectionMethod = 'Thu mẫu tại trung tâm';
                    }
                    let defaultGender = '';
                    if (defaultRelationship === 'Cha' || defaultRelationship === 'Ông' || defaultRelationship === 'Cha nghi vấn') {
                        defaultGender = 'Nam';
                    } else if (defaultRelationship === 'Mẹ' || defaultRelationship === 'Bà' || defaultRelationship === 'Thai nhi (Mẫu từ mẹ)') {
                        defaultGender = 'Nữ';
                    }
                    if (existingParticipant) {
                        return {
                            ...existingParticipant,
                            gender: existingParticipant.gender || defaultGender,
                            collectionMethod: (serviceName === 'Thai nhi (không xâm lấn)')
                                ? 'Thu mẫu tại trung tâm'
                                : (existingParticipant.collectionMethod || ''),
                            relationship: relationshipOptions.includes(existingParticipant.relationship)
                                ? existingParticipant.relationship
                                : defaultRelationship,
                            personalId: existingParticipant.personalId || '',
                            address: existingParticipant.address || '',
                            relationToRegistrant: existingParticipant.relationToRegistrant || '',
                            fullName: existingParticipant.fullName || '',
                            dob: existingParticipant.dob || '',
                            sampleType: existingParticipant.sampleType || '',
                        };
                    } else {
                        const baseParticipant = {
                            fullName: '',
                            gender: defaultGender,
                            dob: '',
                            relationship: defaultRelationship,
                            collectionMethod: defaultCollectionMethod,
                            sampleType: '',
                        };
                        if (serviceName === 'Thai nhi (không xâm lấn)') {
                            return {
                                ...baseParticipant,
                                personalId: '',
                                address: '',
                                relationToRegistrant: '',
                            };
                        } else {
                            return baseParticipant;
                        }
                    }
                });
                return newParticipants;
            });
        }
    }, [numSamples, serviceName, initialBookingData]);

    // Fetch service list from backend on mount
    useEffect(() => {
        api.get('/service/listService')
            .then(res => {
                let services = res.data;
                // Nếu là string, parse lại thành mảng
                if (typeof services === 'string') {
                    try {
                        services = JSON.parse(services);
                    } catch (e) {
                        services = [];
                    }
                }
                if (Array.isArray(services)) {
                    setServiceList(services);
                    setServiceListError('');
                    console.log('serviceList từ backend:', services);
                } else {
                    setServiceList([]);
                    setServiceListError('Không lấy được danh sách dịch vụ. Vui lòng thử lại hoặc liên hệ quản trị.');
                }
            })
            .catch(err => {
                setServiceList([]);
                setServiceListError('Không lấy được danh sách dịch vụ. Có thể bạn chưa đăng nhập hoặc backend đang lỗi.');
                console.error('Lỗi lấy danh sách dịch vụ:', err);
            });
    }, []);

    // Lấy danh sách sampleType từ backend
    useEffect(() => {
        api.get('/service/sample-types')
            .then(res => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setSampleTypeOptions(res.data);
                }
            })
            .catch(err => {
                // Nếu lỗi thì giữ nguyên danh sách mặc định
                console.error('Không lấy được danh sách sampleType:', err);
            });
    }, []);

    // Hàm tính tuổi chính xác (tính cả tháng và ngày)
    const calculateAge = (dob) => {
        if (!dob) return null;
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleParticipantChange = (index, field, value) => {
        const updatedParticipants = [...participants];
        updatedParticipants[index] = { ...updatedParticipants[index], [field]: value };
        setParticipants(updatedParticipants);
    };

    // Sửa handleServiceChange để lưu lại các trường
    const handleServiceNameChange = (e) => {
        const name = e.target.value;
        setServiceName(name);
        setServiceType('');
        setTypeSample('');
    };

    const handleServiceTypeChange = (e) => {
        const type = e.target.value;
        setServiceType(type);
        setTypeSample('');
    };

    const handleTypeSampleChange = (e) => {
        setTypeSample(e.target.value);
    };

    // Khi thay đổi dropdown địa chỉ
    const handleLocationChange = (index, field, value) => {
        const updated = [...locationSelections];
        updated[index] = {
            ...updated[index],
            [field]: value,
            // Reset các trường sau nếu thay đổi trường trước
            ...(field === 'province' ? { district: '', ward: '' } : {}),
            ...(field === 'district' ? { ward: '' } : {})
        };
        setLocationSelections(updated);
        // Ghép lại thành chuỗi địa chỉ
        const province = updated[index].province;
        const district = updated[index].district;
        const ward = updated[index].ward;
        const address = [ward, district, province].filter(Boolean).join(', ');
        handleParticipantChange(index, 'address', address);
    };

    // Khi thay đổi số lượng participant, đồng bộ state locationSelections
    useEffect(() => {
        setLocationSelections(prev => {
            const arr = [...prev];
            while (arr.length < numSamples) arr.push({ province: '', district: '', ward: '' });
            return arr.slice(0, numSamples);
        });
    }, [numSamples]);

    // Khi thay đổi input số nhà/ấp, đường
    const handleAddressDetailChange = (index, value) => {
        const updated = [...addressDetails];
        updated[index] = value;
        setAddressDetails(updated);
        // Ghép lại thành chuỗi địa chỉ
        const province = locationSelections[index]?.province;
        const district = locationSelections[index]?.district;
        const ward = locationSelections[index]?.ward;
        const detail = value;
        const address = [detail, ward, district, province].filter(Boolean).join(', ');
        handleParticipantChange(index, 'address', address);
    };

    // Khi thay đổi số lượng participant, đồng bộ state addressDetails
    useEffect(() => {
        setAddressDetails(prev => {
            const arr = [...prev];
            while (arr.length < numSamples) arr.push('');
            return arr.slice(0, numSamples);
        });
    }, [numSamples]);

    const handleSubmitBooking = (e) => {
        e.preventDefault();

        if (!serviceName || !appointmentDate || !resultTime) {
            alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
            return;
        }

        if (serviceName === 'Thai nhi (không xâm lấn)') {
            const fetalSamples = participants.filter(p => p.relationship === 'Thai nhi (Mẫu từ mẹ)').length;
            const allegedFatherSamples = participants.filter(p => p.relationship === 'Cha nghi vấn').length;

            if (fetalSamples !== 1) {
                alert('Dịch vụ "Xét nghiệm ADN Thai nhi" yêu cầu chính xác 1 mẫu Thai nhi (Mẫu từ mẹ).');
                return;
            }
            if (allegedFatherSamples < 2 || allegedFatherSamples > 3) {
                alert('Dịch vụ "Xét nghiệm ADN Thai nhi" với nhiều cha nghi vấn yêu cầu 2 đến 3 mẫu Cha nghi vấn.');
                return;
            }
            if (fetalSamples + allegedFatherSamples !== numSamples) {
                alert('Số lượng mẫu và quan hệ của người tham gia không khớp. Vui lòng kiểm tra lại.');
                return;
            }
        } else if (serviceName === 'Xét nghiệm anh em ruột') {
            const hasMother = participants.some(p => p.relationship === 'Mẹ (tùy chọn)');
            if (hasMother && numSamples < 3) {
                alert('Khi xét nghiệm "Anh em ruột" có bao gồm "Mẹ (tùy chọn)", số mẫu phải là 3.');
                return;
            }
            if (!hasMother && numSamples < 2) {
                alert('Xét nghiệm "Anh em ruột" tối thiểu phải có 2 mẫu (anh và em).');
                return;
            }
        } else {
            if (numSamples < 2) {
                alert('Số mẫu xét nghiệm phải tối thiểu là 2 cho dịch vụ này.');
                return;
            }
        }

        const allParticipantsFilled = participants.every(p => {
            const shouldRequirePersonalInfo = !(serviceName === 'Xét nghiệm anh em ruột' && p.relationship === 'Mẹ (tùy chọn)');

            let commonRequiredFieldsFilled = true;

            const isSampleTypeRequired = !(serviceName === 'Thai nhi (không xâm lấn)' && p.relationship === 'Thai nhi (Mẫu từ mẹ)');

            if (shouldRequirePersonalInfo) {
                commonRequiredFieldsFilled = p.relationship && p.fullName && p.gender && p.dob && p.collectionMethod && (isSampleTypeRequired ? p.sampleType : true);
            } else {
                commonRequiredFieldsFilled = p.relationship && p.collectionMethod && (isSampleTypeRequired ? p.sampleType : true);
            }

            if (!commonRequiredFieldsFilled) {
                return false;
            }

            if (serviceName === 'Thai nhi (không xâm lấn)' && p.relationship === 'Thai nhi (Mẫu từ mẹ)') {
                const age = calculateAge(p.dob);
                const personalIdConditionMet = (age !== null && age < 14) || (p.personalId && age >= 14);

                if (!personalIdConditionMet || !p.address || !p.relationToRegistrant) {
                    return false;
                }
            }
            return true;
        });

        if (!allParticipantsFilled) {
            alert('Vui lòng điền đầy đủ thông tin cho tất cả người tham gia. Lưu ý: Mã định danh cá nhân là bắt buộc đối với người từ 14 tuổi trở lên cho xét nghiệm Hành chính.');
            return;
        }

        // Chuẩn hóa participants cho đúng backend
        const formattedParticipants = participants.map(p => ({
            fullName: p.fullName,
            gender: p.gender,
            dateOfBirth: p.dob,
            relationshipToCustomer: p.relationship,
            identityNumber: p.personalId,
            address: p.address,
            typeOfCollection: p.collectionMethod,
            sampleType: p.sampleType
        }));

        const bookingDetailsData = {
            serviceName: serviceName,
            serviceType: serviceType,
            numSamples: numSamples,
            testType: serviceType,
            typeSample: typeSample,
            appointmentDate: appointmentDate,
            resultTime: resultTime,
            notes: notes,
            participants: formattedParticipants
        };
        console.log('serviceName state:', serviceName);
        console.log('bookingDetailsData:', bookingDetailsData);
        // Chỉ chuyển sang trang xác nhận, KHÔNG gọi API
        navigate('/booking-details', { state: { bookingData: bookingDetailsData } });
    };

    if (authLoading || !user) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontSize: '24px' }}>
                Đang tải...
            </div>
        );
    }

    return (
        <div className="homepage-root">
            <Header />
            <main className="booking-create-content">
                <form className="booking-form-section" onSubmit={handleSubmitBooking}>
                    <h2>Tạo Lịch Hẹn Mới</h2>
                    <p>Vui lòng điền thông tin dưới đây để đặt lịch xét nghiệm ADN.</p>

                    {serviceListError ? (
                        <div style={{color: 'red', marginBottom: 8}}>{serviceListError}</div>
                    ) : (
                        <div className="form-group">
                            <label htmlFor="serviceName">Loại dịch vụ:</label>
                            <select
                                id="serviceName"
                                value={serviceName}
                                onChange={handleServiceNameChange}
                                required
                            >
                                <option value="">Chọn loại dịch vụ</option>
                                {uniqueServiceNames.map((name, idx) => (
                                    <option key={name || idx} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {serviceName === 'Thai nhi (không xâm lấn)' ? (
                        <div className="form-group">
                            <label htmlFor="numSamples">Số mẫu cần xét nghiệm:</label>
                            <input
                                type="number"
                                id="numSamples"
                                value={numSamples}
                                onChange={(e) => setNumSamples(Math.max(2, parseInt(e.target.value) || 2))}
                                min="3" // Tối thiểu 1 thai nhi + 2 cha nghi vấn
                                max="4" // Tối đa 1 thai nhi + 3 cha nghi vấn
                                required
                            />
                        </div>
                    ) : (
                        <div className="form-group">
                            <label htmlFor="numSamples">Số mẫu cần xét nghiệm:</label>
                            <input
                                type="number"
                                id="numSamples"
                                value={numSamples}
                                onChange={(e) => setNumSamples(Math.max(2, parseInt(e.target.value) || 2))}
                                min="2"
                                required
                            />
                            {serviceName === 'Xét nghiệm anh em ruột' && (
                                <small>Nếu có mẹ (tùy chọn), vui lòng chọn 3 mẫu.</small>
                            )}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="serviceType">Loại xét nghiệm:</label>
                        <select
                            id="serviceType"
                            value={serviceType}
                            onChange={handleServiceTypeChange}
                            required
                            disabled={!serviceName}
                        >
                            <option value="">Chọn loại xét nghiệm</option>
                            {Array.from(new Set(
                                serviceList.filter(s => s.serviceName === serviceName).map(s => s.serviceType)
                            )).map((type, idx) => (
                                <option key={type || idx} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="typeSample">Mẫu:</label>
                        <select
                            id="typeSample"
                            value={typeSample}
                            onChange={handleTypeSampleChange}
                            required
                            disabled={!serviceType}
                        >
                            <option value="">Chọn loại mẫu</option>
                            {sampleTypeOptions.map((sample, idx) => (
                                <option key={sample || idx} value={sample}>{sample}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="appointmentDate">Ngày hẹn:</label>
                        <input
                            type="date"
                            id="appointmentDate"
                            value={appointmentDate}
                            onChange={(e) => setAppointmentDate(e.target.value)}
                            min={today}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="resultTime">Thời gian nhận kết quả:</label>
                        {serviceName === 'Thai nhi (không xâm lấn)' ? (
                            <p className="static-option">{resultTime || 'Tiêu chuẩn (7-10 ngày làm việc)'}</p>
                        ) : (
                            <select
                                id="resultTime"
                                value={resultTime}
                                onChange={(e) => setResultTime(e.target.value)}
                                required
                            >
                                <option value="">Chọn thời gian nhận kết quả</option>
                                {Array.from(new Set(
                                    serviceList
                                        .filter(s =>
                                            s.serviceName === serviceName &&
                                            s.serviceType === serviceType
                                        )
                                        .map(s => s.packageType)
                                )).map((pkg, idx) => (
                                    <option key={pkg || idx} value={pkg}>{pkg}</option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="notes">Ghi chú:</label>
                        <textarea
                            id="notes"
                            placeholder="Ghi chú thêm (nếu có)"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows="3"
                        ></textarea>
                    </div>

                    <div className="participants-section">
                        <h3>Thông tin người tham gia:</h3>
                        {Array.from({ length: numSamples }).map((_, index) => {
                            const currentParticipant = participants[index] || {};
                            const participantAge = calculateAge(currentParticipant.dob);

                            const isPersonalInfoRequired = !(serviceName === 'Xét nghiệm anh em ruột' && currentParticipant.relationship === 'Mẹ (tùy chọn)');
                            const hideSampleType = serviceName === 'Thai Nhi' && currentParticipant.relationship === 'Thai nhi (Mẫu từ mẹ)';

                            const isCollectionMethodFixedToCenter = serviceName === 'Thai nhi (không xâm lấn)' && currentParticipant.relationship === 'Thai nhi (Mẫu từ mẹ)';

                            return (
                                <div key={index} className="participant-form">
                                    <div className="participant-header">
                                        <h4>Người tham gia {index + 1}</h4>
                                        <div className="form-group-inline">
                                            <label htmlFor={`relationship-${index}`}>Quan hệ nghi vấn:</label>
                                            <select
                                                id={`relationship-${index}`}
                                                value={currentParticipant.relationship || ''}
                                                onChange={(e) => handleParticipantChange(index, 'relationship', e.target.value)}
                                                required
                                            >
                                                <option value="">Chọn quan hệ</option>
                                                {getRelationshipOptions().map((rel, relIndex) => (
                                                    <option key={rel} value={rel}>{rel}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {currentParticipant.relationship === 'Thai nhi (Mẫu từ mẹ)' && (
                                        <p className="participant-sub-label">**(Thông tin cá nhân của người mẹ)**</p>
                                    )}

                                    {isPersonalInfoRequired ? (
                                        <>
                                            <div className="form-group">
                                                <label>Họ và tên:</label>
                                                <input
                                                    type="text"
                                                    value={currentParticipant.fullName || ''}
                                                    onChange={(e) => handleParticipantChange(index, 'fullName', e.target.value)}
                                                    required={true}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Giới tính:</label>
                                                <select
                                                    value={currentParticipant.gender || ''}
                                                    onChange={(e) => handleParticipantChange(index, 'gender', e.target.value)}
                                                    required={true}
                                                >
                                                    <option value="">Chọn giới tính</option>
                                                    <option value="Nam">Nam</option>
                                                    <option value="Nữ">Nữ</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Ngày sinh:</label>
                                                <input
                                                    type="date"
                                                    value={currentParticipant.dob ? currentParticipant.dob.slice(0, 10) : ''}
                                                    onChange={(e) => handleParticipantChange(index, 'dob', e.target.value)}
                                                    max={today}
                                                    required={true}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <p>**(Thông tin cá nhân không bắt buộc cho mẫu này)**</p>
                                    )}

                                    {serviceType === 'Hành chính' && isPersonalInfoRequired && (
                                        <>
                                            {participantAge === null || participantAge >= 14 ? (
                                                <div className="form-group">
                                                    <label>Mã định danh cá nhân:</label>
                                                    <input
                                                        type="text"
                                                        value={currentParticipant.personalId || ''}
                                                        onChange={(e) => handleParticipantChange(index, 'personalId', e.target.value)}
                                                        required={true}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="form-group">
                                                    <label>Mã định danh cá nhân:</label>
                                                    <input
                                                        type="text"
                                                        value={currentParticipant.personalId || ''}
                                                        onChange={(e) => handleParticipantChange(index, 'personalId', e.target.value)}
                                                        placeholder="Không bắt buộc với trẻ dưới 14 tuổi"
                                                        required={false}
                                                    />
                                                </div>
                                            )}

                                            <div className="form-group">
                                                <label>Địa chỉ:</label>
                                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                                    <select
                                                        value={locationSelections[index]?.province || ''}
                                                        onChange={e => handleLocationChange(index, 'province', e.target.value)}
                                                        required={isPersonalInfoRequired}
                                                    >
                                                        <option value="">Chọn tỉnh/thành</option>
                                                        {(vietnamLocations.provinces || []).map((prov, i) => (
                                                            <option key={prov.name} value={prov.name}>{prov.name}</option>
                                                        ))}
                                                    </select>
                                                    <select
                                                        value={locationSelections[index]?.district || ''}
                                                        onChange={e => handleLocationChange(index, 'district', e.target.value)}
                                                        required={isPersonalInfoRequired}
                                                        disabled={!locationSelections[index]?.province}
                                                    >
                                                        <option value="">Chọn quận/huyện</option>
                                                        {(vietnamLocations.provinces.find(p => p.name === locationSelections[index]?.province)?.districts || []).map((dist, i) => (
                                                            <option key={dist.name} value={dist.name}>{dist.name}</option>
                                                        ))}
                                                    </select>
                                                    <select
                                                        value={locationSelections[index]?.ward || ''}
                                                        onChange={e => handleLocationChange(index, 'ward', e.target.value)}
                                                        required={isPersonalInfoRequired}
                                                        disabled={!locationSelections[index]?.district}
                                                    >
                                                        <option value="">Chọn phường/xã</option>
                                                        {(vietnamLocations.provinces.find(p => p.name === locationSelections[index]?.province)?.districts.find(d => d.name === locationSelections[index]?.district)?.communes || []).map((ward, i) => (
                                                            <option key={ward.name} value={ward.name}>{ward.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Số nhà/ấp, đường:</label>
                                                <input
                                                    type="text"
                                                    value={addressDetails[index] || ''}
                                                    onChange={e => handleAddressDetailChange(index, e.target.value)}
                                                    placeholder="Số nhà, ấp, đường..."
                                                    required={isPersonalInfoRequired}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Quan hệ với người đăng ký:</label>
                                                <input
                                                    type="text"
                                                    value={currentParticipant.relationToRegistrant || ''}
                                                    onChange={(e) => handleParticipantChange(index, 'relationToRegistrant', e.target.value)}
                                                    required={isPersonalInfoRequired}
                                                />
                                            </div>
                                        </>
                                    )}

                                    {!hideSampleType && (
                                        <div className="form-group">
                                            <label>Mẫu xét nghiệm:</label>
                                            <select
                                                value={currentParticipant.sampleType || ''}
                                                onChange={(e) => handleParticipantChange(index, 'sampleType', e.target.value)}
                                                required={isPersonalInfoRequired}
                                            >
                                                <option value="">Chọn loại mẫu</option>
                                                {sampleTypeOptions.map((sample, sampleIndex) => (
                                                    <option key={sample} value={sample}>{sample}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    {isCollectionMethodFixedToCenter ? (
                                        <div className="form-group">
                                            <label>Phương pháp thu mẫu:</label>
                                            <p className="static-option">Thu mẫu tại trung tâm</p>
                                        </div>
                                    ) : (
                                        <div className="form-group">
                                            <label>Phương pháp thu mẫu:</label>
                                            <select
                                                value={currentParticipant.collectionMethod || ''}
                                                onChange={(e) => handleParticipantChange(index, 'collectionMethod', e.target.value)}
                                                required={isPersonalInfoRequired}
                                            >
                                                <option value="">Chọn phương pháp thu mẫu</option>
                                                {collectionMethodOptions.map((method, methodIndex) => (
                                                    <option key={method} value={method}>{method}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <button type="submit" className="submit-booking-btn">Hoàn thành</button>
                </form>
            </main>

            <Footer />
        </div>
    );
}