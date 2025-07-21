import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './BookingCreate.css';
import api from '../services/api';
import vietnamLocations from '../data/vietnamLocations.json';

export default function BookingCreate() {
    // Hook xử lý authentication context và navigation
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Lấy dữ liệu booking ban đầu từ state navigation (nếu có - dùng cho edit mode)
    const initialBookingData = location.state?.initialBookingData;

    // State declarations
    const [serviceName, setServiceName] = useState(initialBookingData?.serviceName || '');
    const [serviceType, setServiceType] = useState(initialBookingData?.serviceType || '');
    const [typeSample, setTypeSample] = useState(initialBookingData?.typeSample || '');
    const [numSamples, setNumSamples] = useState(initialBookingData?.numSamples || 2);
    const [appointmentDate, setAppointmentDate] = useState(initialBookingData?.appointmentDate || '');
    const [resultTime, setResultTime] = useState(initialBookingData?.resultTime || '');
    const [notes, setNotes] = useState(initialBookingData?.notes || '');
    const [participants, setParticipants] = useState(initialBookingData?.participants || []);
    const [serviceList, setServiceList] = useState([]);
    const [serviceListError, setServiceListError] = useState('');

    // Lấy ngày hôm nay để làm minimum date cho appointment
    const today = new Date().toISOString().split('T')[0];

    // Tạo mảng serviceName duy nhất từ serviceList để tránh duplicate trong dropdown
    const uniqueServiceNames = Array.from(new Set(serviceList.map(s => s.serviceName)));

    // Hàm mapping quan hệ nghi vấn cho từng loại dịch vụ - mỗi dịch vụ có relationship options khác nhau
    const getRelationshipOptions = () => {
        switch (serviceName) {
            case 'Xét nghiệm cha con':
                return ['Cha', 'Con']; // Chỉ có 2 vai trò: cha và con
            case 'Xét nghiệm mẹ con':
                return ['Mẹ', 'Con']; // Chỉ có 2 vai trò: mẹ và con
            case 'Xét nghiệm ông cháu':
                return ['Ông', 'Cháu']; // Relationship giữa ông và cháu
            case 'Xét nghiệm bà cháu':
                return ['Bà', 'Cháu']; // Relationship giữa bà và cháu
            case 'Xét nghiệm anh em ruột':
                return ['Anh', 'Em', 'Mẹ (tùy chọn)']; // Có thể có mẹ để tăng độ chính xác
            case 'Thai nhi (không xâm lấn)':
                return ['Thai nhi (Mẫu từ mẹ)', 'Cha nghi vấn']; // Đặc biệt: mẫu từ máu mẹ + DNA cha nghi vấn
            default:
                return ['Khác']; // Fallback cho các trường hợp không xác định
        }
    };

    // Các phương pháp thu mẫu khác nhau
    const collectionMethodOptions = [
        'Tự thu mẫu', // Khách hàng tự lấy mẫu tại nhà
        'Thu mẫu tại nhà/văn phòng', // Nhân viên đến tận nơi
        'Thu mẫu tại trung tâm', // Khách đến trung tâm
    ];

    // State lưu các loại mẫu có thể xét nghiệm
    const [sampleTypeOptions, setSampleTypeOptions] = useState([
        'Mẫu máu/Tế bào niêm mạc miệng', // Mẫu chính xác nhất
        'Mẫu tóc, móng tay, chân', // Mẫu thay thế khi không lấy được máu
        'Mẫu bàn chải đánh răng, dao cạo râu', // Mẫu gián tiếp
    ]);

    // Hàm phân tích địa chỉ từ string thành object để populate các dropdown địa chỉ
    // Parse lại locationSelections và addressDetails từ initialBookingData nếu có
    const parseLocationSelections = (participants) =>
        (participants || []).map(p => {
            // Tách địa chỉ theo dấu phẩy: "số nhà, phường, quận, tỉnh"
            const addressParts = (p.address || '').split(',').map(s => s.trim());
            return {
                province: addressParts[3] || '', // Tỉnh/thành phố - phần cuối cùng
                district: addressParts[2] || '', // Quận/huyện - phần thứ 3
                ward: addressParts[1] || '', // Phường/xã - phần thứ 2
            };
        });

    // Tách phần số nhà/đường từ địa chỉ đầy đủ để hiển thị trong input riêng
    const parseAddressDetails = (participants) =>
        (participants || []).map(p => {
            const addressParts = (p.address || '').split(',').map(s => s.trim());
            return addressParts[0] || ''; // Số nhà, ấp, đường (phần đầu tiên)
        });

    // State lưu trữ thông tin địa chỉ đã được parse thành object cho các dropdown
    const [locationSelections, setLocationSelections] = useState(
        initialBookingData?.participants ? parseLocationSelections(initialBookingData.participants)
            : [] // Nếu không có data ban đầu thì khởi tạo mảng rỗng
    );
    // State lưu chi tiết địa chỉ (số nhà/đường) riêng biệt với dropdown
    const [addressDetails, setAddressDetails] = useState(
        initialBookingData?.participants ? parseAddressDetails(initialBookingData.participants)
            : [] // Nếu không có data ban đầu thì khởi tạo mảng rỗng
    );

    // useEffect: Kiểm tra authentication - redirect đến login nếu chưa đăng nhập
    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login'); // Chuyển hướng đến trang login
        }
    }, [user, authLoading, navigate]); // Dependencies: chỉ chạy khi user, authLoading, navigate thay đổi

    // useEffect: Tự động set resultTime cho Thai nhi và khôi phục data ban đầu
    useEffect(() => {
        if (serviceName === 'Thai nhi (không xâm lấn)') {
            // Thai nhi chỉ có 1 loại thời gian nhận kết quả cố định
            setResultTime('Tiêu chuẩn (7-10 ngày làm việc)');
        } else if (initialBookingData?.resultTime && resultTime === '') {
            // Khôi phục resultTime từ data ban đầu nếu có (edit mode)
            setResultTime(initialBookingData.resultTime);
        }
    }, [serviceName]); // Chỉ chạy khi serviceName thay đổi

    // useEffect: Logic phức tạp để quản lý participants khi thay đổi serviceName hoặc numSamples
    useEffect(() => {
        // Copy logic getRelationshipOptions vào trong useEffect để tránh vòng lặp dependency
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

        // Chỉ update participants khi không phải từ initialBookingData hoặc số mẫu khác với data ban đầu
        if (!initialBookingData || initialBookingData.numSamples !== numSamples) {
            setParticipants(prevParticipants => {
                // Tạo mảng participants mới với length = numSamples
                const newParticipants = Array.from({ length: numSamples }, (_, i) => {
                    const existingParticipant = prevParticipants[i]; // Lấy data cũ nếu có
                    const relationshipOptions = getRelationshipOptions();

                    // Logic phức tạp để set default relationship dựa trên serviceName và index
                    let defaultRelationship = 'Quan hệ nghi vấn';
                    if (serviceName === 'Thai nhi (không xâm lấn)') {
                        // Thai nhi: index 0 = thai nhi, các index khác = cha nghi vấn
                        if (i === 0) {
                            defaultRelationship = 'Thai nhi (Mẫu từ mẹ)';
                        } else {
                            defaultRelationship = 'Cha nghi vấn';
                        }
                    } else {
                        // Các dịch vụ khác: dùng relationship theo thứ tự trong options
                        defaultRelationship = relationshipOptions[i] || 'Quan hệ nghi vấn';
                    }

                    // Set default collection method cho Thai nhi
                    let defaultCollectionMethod = '';
                    if (serviceName === 'Thai nhi (không xâm lấn)') {
                        defaultCollectionMethod = 'Thu mẫu tại trung tâm'; // Bắt buộc tại trung tâm
                    }

                    // Auto set gender dựa trên relationship
                    let defaultGender = '';
                    if (defaultRelationship === 'Cha' || defaultRelationship === 'Ông' || defaultRelationship === 'Cha nghi vấn') {
                        defaultGender = 'Nam';
                    } else if (defaultRelationship === 'Mẹ' || defaultRelationship === 'Bà' || defaultRelationship === 'Thai nhi (Mẫu từ mẹ)') {
                        defaultGender = 'Nữ';
                    }

                    // Nếu đã có participant cũ, merge với default values
                    if (existingParticipant) {
                        return {
                            ...existingParticipant,
                            gender: existingParticipant.gender || defaultGender,
                            // Thai nhi bắt buộc thu mẫu tại trung tâm
                            collectionMethod: (serviceName === 'Thai nhi (không xâm lấn)')
                                ? 'Thu mẫu tại trung tâm'
                                : (existingParticipant.collectionMethod || ''),
                            // Validate relationship còn hợp lệ không
                            relationship: relationshipOptions.includes(existingParticipant.relationship)
                                ? existingParticipant.relationship
                                : defaultRelationship,
                            // Đảm bảo các field bắt buộc tồn tại
                            personalId: existingParticipant.personalId || '',
                            address: existingParticipant.address || '',
                            relationToRegistrant: existingParticipant.relationToRegistrant || '',
                            fullName: existingParticipant.fullName || '',
                            dob: existingParticipant.dob || '',
                            sampleType: existingParticipant.sampleType || '',
                        };
                    } else {
                        // Tạo participant mới với base fields
                        const baseParticipant = {
                            fullName: '',
                            gender: defaultGender,
                            dob: '',
                            relationship: defaultRelationship,
                            collectionMethod: defaultCollectionMethod,
                            sampleType: '',
                        };

                        // Thai nhi cần thêm fields đặc biệt cho administrative purposes
                        if (serviceName === 'Thai nhi (không xâm lấn)') {
                            return {
                                ...baseParticipant,
                                personalId: '', // CMND/CCCD
                                address: '', // Địa chỉ đầy đủ
                                relationToRegistrant: '', // Quan hệ với người đăng ký
                            };
                        } else {
                            return baseParticipant;
                        }
                    }
                });
                return newParticipants;
            });
        }
    }, [numSamples, serviceName, initialBookingData]); // Dependencies để trigger re-calculate

    // useEffect: Fetch service list từ backend khi component mount
    useEffect(() => {
        api.get('/service/listService')
            .then(res => {
                let services = res.data;
                // Nếu response là string, parse lại thành mảng
                if (typeof services === 'string') {
                    try {
                        services = JSON.parse(services);
                    } catch (e) {
                        services = []; // Fallback nếu parse lỗi
                    }
                }
                if (Array.isArray(services)) {
                    setServiceList(services);
                    setServiceListError('');
                    console.log('serviceList từ backend:', services);
                } else {
                    // Handle trường hợp data không phải array
                    setServiceList([]);
                    setServiceListError('Không lấy được danh sách dịch vụ. Vui lòng thử lại hoặc liên hệ quản trị.');
                }
            })
            .catch(err => {
                // Handle lỗi API call
                setServiceList([]);
                setServiceListError('Không lấy được danh sách dịch vụ. Có thể bạn chưa đăng nhập hoặc backend đang lỗi.');
                console.error('Lỗi lấy danh sách dịch vụ:', err);
            });
    }, []); // Empty dependency - chỉ chạy 1 lần khi mount

    // useEffect: Lấy danh sách sampleType từ backend để update dropdown options
    useEffect(() => {
        api.get('/service/sample-types')
            .then(res => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setSampleTypeOptions(res.data); // Update với data từ backend
                }
                // Nếu không có data hoặc lỗi thì giữ nguyên danh sách mặc định
            })
            .catch(err => {
                // Nếu lỗi thì giữ nguyên danh sách mặc định đã set trong useState
                console.error('Không lấy được danh sách sampleType:', err);
            });
    }, []); // Empty dependency - chỉ chạy 1 lần khi mount

    // Hàm tính tuổi chính xác (tính cả tháng và ngày) để validate CMND requirement
    const calculateAge = (dob) => {
        if (!dob) return null;
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        // Điều chỉnh tuổi nếu chưa qua sinh nhật trong năm nay
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

    // useEffect: Đồng bộ locationSelections array với số lượng participants
    useEffect(() => {
        setLocationSelections(prev => {
            const arr = [...prev];
            // Thêm object rỗng nếu mảng ngắn hơn numSamples
            while (arr.length < numSamples) arr.push({ province: '', district: '', ward: '' });
            // Cắt bớt nếu mảng dài hơn numSamples
            return arr.slice(0, numSamples);
        });
    }, [numSamples]); // Chạy khi numSamples thay đổi

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

    // useEffect: Đồng bộ addressDetails array với số lượng participants
    useEffect(() => {
        setAddressDetails(prev => {
            const arr = [...prev];
            // Thêm string rỗng nếu mảng ngắn hơn numSamples
            while (arr.length < numSamples) arr.push('');
            // Cắt bớt nếu mảng dài hơn numSamples
            return arr.slice(0, numSamples);
        });
    }, [numSamples]); // Chạy khi numSamples thay đổi

    // Hàm validation và submit booking - logic phức tạp để check từng loại dịch vụ
    const handleSubmitBooking = (e) => {
        e.preventDefault();

        if (!serviceName || !appointmentDate || !resultTime) {
            alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
            return;
        }

        // Validation đặc biệt cho Thai nhi
        if (serviceName === 'Thai nhi (không xâm lấn)') {
            const fetalSamples = participants.filter(p => p.relationship === 'Thai nhi (Mẫu từ mẹ)').length;
            const allegedFatherSamples = participants.filter(p => p.relationship === 'Cha nghi vấn').length;

            // Phải có đúng 1 mẫu thai nhi
            if (fetalSamples !== 1) {
                alert('Dịch vụ "Xét nghiệm ADN Thai nhi" yêu cầu chính xác 1 mẫu Thai nhi (Mẫu từ mẹ).');
                return;
            }
            // Phải có 2-3 mẫu cha nghi vấn (có thể so sánh nhiều cha)
            if (allegedFatherSamples < 2 || allegedFatherSamples > 3) {
                alert('Dịch vụ "Xét nghiệm ADN Thai nhi" với nhiều cha nghi vấn yêu cầu 2 đến 3 mẫu Cha nghi vấn.');
                return;
            }
            // Tổng số mẫu phải khớp
            if (fetalSamples + allegedFatherSamples !== numSamples) {
                alert('Số lượng mẫu và quan hệ của người tham gia không khớp. Vui lòng kiểm tra lại.');
                return;
            }
        }
        // Validation cho anh em ruột
        else if (serviceName === 'Xét nghiệm anh em ruột') {
            const hasMother = participants.some(p => p.relationship === 'Mẹ (tùy chọn)');
            // Nếu có mẹ thì phải đủ 3 mẫu
            if (hasMother && numSamples < 3) {
                alert('Khi xét nghiệm "Anh em ruột" có bao gồm "Mẹ (tùy chọn)", số mẫu phải là 3.');
                return;
            }
            // Không có mẹ thì tối thiểu 2 mẫu (anh + em)
            if (!hasMother && numSamples < 2) {
                alert('Xét nghiệm "Anh em ruột" tối thiểu phải có 2 mẫu (anh và em).');
                return;
            }
        }
        // Validation chung cho các dịch vụ khác
        else {
            if (numSamples < 2) {
                alert('Số mẫu xét nghiệm phải tối thiểu là 2 cho dịch vụ này.');
                return;
            }
        }

        // Validation chi tiết cho từng participant
        const allParticipantsFilled = participants.every(p => {
            // Mẹ (tùy chọn) trong anh em ruột không cần thông tin cá nhân đầy đủ
            const shouldRequirePersonalInfo = !(serviceName === 'Xét nghiệm anh em ruột' && p.relationship === 'Mẹ (tùy chọn)');

            let commonRequiredFieldsFilled = true;

            // Thai nhi (mẫu từ mẹ) không cần chọn sampleType
            const isSampleTypeRequired = !(serviceName === 'Thai nhi (không xâm lấn)' && p.relationship === 'Thai nhi (Mẫu từ mẹ)');

            // Check required fields dựa trên shouldRequirePersonalInfo
            if (shouldRequirePersonalInfo) {
                commonRequiredFieldsFilled = p.relationship && p.fullName && p.gender && p.dob && p.collectionMethod && (isSampleTypeRequired ? p.sampleType : true);
            } else {
                // Mẹ (tùy chọn) chỉ cần relationship và collectionMethod
                commonRequiredFieldsFilled = p.relationship && p.collectionMethod && (isSampleTypeRequired ? p.sampleType : true);
            }

            if (!commonRequiredFieldsFilled) {
                return false;
            }

            // Validation đặc biệt cho Thai nhi administrative requirements
            if (serviceName === 'Thai nhi (không xâm lấn)' && p.relationship === 'Thai nhi (Mẫu từ mẹ)') {
                const age = calculateAge(p.dob);
                // Dưới 14 tuổi không bắt buộc CMND, trên 14 tuổi bắt buộc
                const personalIdConditionMet = (age !== null && age < 14) || (p.personalId && age >= 14);

                // Phải có đầy đủ: personalId (nếu >= 14 tuổi), address, relationToRegistrant
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

        // Transform data để match backend API format
        const formattedParticipants = participants.map(p => ({
            fullName: p.fullName,
            gender: p.gender,
            dateOfBirth: p.dob, // Convert field name
            relationshipToCustomer: p.relationship, // Convert field name
            identityNumber: p.personalId, // Convert field name
            address: p.address,
            typeOfCollection: p.collectionMethod, // Convert field name
            sampleType: p.sampleType
        }));

        // Final data object để gửi đi
        const bookingDetailsData = {
            serviceName: serviceName,
            serviceType: serviceType,
            numSamples: numSamples,
            testType: serviceType, // Duplicate for backend compatibility
            typeSample: typeSample,
            appointmentDate: appointmentDate,
            resultTime: resultTime,
            notes: notes,
            participants: formattedParticipants
        };

        console.log('serviceName state:', serviceName);
        console.log('bookingDetailsData:', bookingDetailsData);

        // Navigate to confirmation page (không call API ở đây)
        navigate('/booking-details', { state: { bookingData: bookingDetailsData } });
    };

    // Loading state khi đang authenticate
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
                        <div style={{ color: 'red', marginBottom: 8 }}>{serviceListError}</div>
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