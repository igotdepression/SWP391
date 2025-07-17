import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './BookingCreate.css';
import api from '../services/api';
import vietnamLocations from '../data/vietnamLocations.json';

export default function BookingCreate() {
    // Lấy thông tin người dùng đã đăng nhập và trạng thái loading
    const { user, loading: authLoading } = useAuth();
    // Hook để điều hướng giữa các trang
    const navigate = useNavigate();
    // Hook để lấy dữ liệu từ trang trước (nếu có)
    const location = useLocation();

    // Lấy dữ liệu booking ban đầu nếu được truyền từ trang khác
    const initialBookingData = location.state?.initialBookingData;

    // === STATES QUẢN LÝ THÔNG TIN DỊCH VỤ ===
    const [serviceID, setServiceID] = useState(''); // ID của dịch vụ được chọn
    const [serviceList, setServiceList] = useState([]); // Danh sách dịch vụ từ backend
    const [serviceListError, setServiceListError] = useState(''); // Lỗi khi load danh sách dịch vụ
    const [serviceName, setServiceName] = useState(initialBookingData?.serviceName || ''); // Tên dịch vụ
    const [serviceType, setServiceType] = useState(initialBookingData?.serviceType || ''); // Loại dịch vụ (Hành chính/Tư pháp)
    const [typeSample, setTypeSample] = useState(initialBookingData?.typeSample || ''); // Loại mẫu xét nghiệm
    const [appointmentDate, setAppointmentDate] = useState(initialBookingData?.appointmentDate || ''); // Ngày hẹn
    const [notes, setNotes] = useState(initialBookingData?.notes || ''); // Ghi chú thêm
    const [resultTime, setResultTime] = useState(initialBookingData?.resultTime || ''); // Thời gian nhận kết quả
    const today = new Date().toISOString().split('T')[0]; // Ngày hiện tại để validate ngày hẹn

    // === STATES QUẢN LÝ THÔNG TIN NGƯỜI THAM GIA ===
    const [participants, setParticipants] = useState(initialBookingData?.participants || []); // Danh sách người tham gia
    const [numSamples, setNumSamples] = useState(initialBookingData?.numSamples || 2); // Số lượng mẫu cần xét nghiệm

    // State để lưu các tùy chọn quan hệ nghi vấn
    const [relationshipOptions, setRelationshipOptions] = useState(['Quan hệ nghi vấn']);

    // Lấy các tên dịch vụ duy nhất từ danh sách dịch vụ (không hardcode nữa)
    const uniqueServiceNames = Array.from(new Set(serviceList.map(s => s.serviceName)));

    // === HÀM MAPPING QUAN HỆ NGHI VẤN CHO TỪNG LOẠI DỊCH VỤ ===
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

    // === DANH SÁCH CÁC OPTION MẶC ĐỊNH ===
    // Danh sách dịch vụ hardcode (backup, không còn sử dụng)
    const serviceOptions = [
        'Xét nghiệm ADN Cha con',
        'Xét nghiệm ADN Mẹ con',
        'Xét nghiệm ADN Ông cháu',
        'Xét nghiệm ADN Bà cháu',
        'Xét nghiệm ADN Anh em ruột',
        'Xét nghiệm ADN Thai nhi',
    ];

    // Các phương pháp thu mẫu có sẵn
    const collectionMethodOptions = [
        'Tự thu mẫu',
        'Thu mẫu tại nhà/văn phòng',
        'Thu mẫu tại trung tâm',
    ];

    // Danh sách loại mẫu mặc định (sẽ được cập nhật từ backend)
    const [sampleTypeOptions, setSampleTypeOptions] = useState([
        'Mẫu máu/Tế bào niêm mạc miệng',
        'Mẫu tóc, móng tay, chân',
        'Mẫu bàn chải đánh răng, dao cạo râu',
        // Add more sample types as needed
    ]);

    // === HÀM PARSE ĐỊA CHỈ TỪ INITIAL DATA ===
    // Parse lại locationSelections từ địa chỉ string thành object
    const parseLocationSelections = (participants) =>
        (participants || []).map(p => {
            const addressParts = (p.address || '').split(',').map(s => s.trim());
            return {
                province: addressParts[3] || '', // Tỉnh/thành
                district: addressParts[2] || '', // Quận/huyện
                ward: addressParts[1] || '', // Phường/xã
            };
        });

    // Parse chi tiết địa chỉ (số nhà, đường) từ phần đầu của string địa chỉ
    const parseAddressDetails = (participants) =>
        (participants || []).map(p => {
            const addressParts = (p.address || '').split(',').map(s => s.trim());
            return addressParts[0] || ''; // Số nhà, ấp, đường
        });

    // === STATES QUẢN LÝ ĐỊA CHỈ ===
    // State lưu các lựa chọn địa chỉ (tỉnh, huyện, xã) cho từng participant
    const [locationSelections, setLocationSelections] = useState(
        initialBookingData?.participants ? parseLocationSelections(initialBookingData.participants)
            : []
    );
    // State lưu chi tiết địa chỉ (số nhà, đường) cho từng participant
    const [addressDetails, setAddressDetails] = useState(
        initialBookingData?.participants ? parseAddressDetails(initialBookingData.participants)
            : []
    );

    // === EFFECT: KIỂM TRA ĐĂNG NHẬP ===
    // Chuyển hướng đến trang login nếu chưa đăng nhập
    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
        }
    }, [user, authLoading, navigate]);

    // === EFFECT: TỰ ĐỘNG SET THỜI GIAN KẾT QUẢ CHO THAI NHI ===
    // Thai nhi chỉ có 1 loại thời gian kết quả cố định
    useEffect(() => {
        if (serviceName === 'Thai nhi (không xâm lấn)') {
            setResultTime('Tiêu chuẩn (7-10 ngày làm việc)');
        } else if (initialBookingData?.resultTime && resultTime === '') {
            setResultTime(initialBookingData.resultTime);
        }
    }, [serviceName]);

    // === EFFECT: CẬP NHẬT PARTICIPANTS KHI THAY ĐỔI SỐ LƯỢNG HOẶC DỊCH VỤ ===
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

        // Chỉ cập nhật participants nếu không có initial data hoặc số lượng thay đổi
        if (!initialBookingData || initialBookingData.numSamples !== numSamples) {
            setParticipants(prevParticipants => {
                // Tạo array participants mới với số lượng = numSamples
                const newParticipants = Array.from({ length: numSamples }, (_, i) => {
                    const existingParticipant = prevParticipants[i]; // Participant cũ (nếu có)
                    const relationshipOptions = getRelationshipOptions(); // Lấy các option quan hệ

                    // Xác định quan hệ mặc định cho participant này
                    let defaultRelationship = 'Quan hệ nghi vấn';
                    if (serviceName === 'Thai nhi (không xâm lấn)') {
                        if (i === 0) { defaultRelationship = 'Thai nhi (Mẫu từ mẹ)'; }
                        else { defaultRelationship = 'Cha nghi vấn'; }
                    } else {
                        defaultRelationship = relationshipOptions[i] || 'Quan hệ nghi vấn';
                    }

                    // Xác định phương pháp thu mẫu mặc định
                    let defaultCollectionMethod = '';
                    if (serviceName === 'Thai nhi (không xâm lấn)') {
                        defaultCollectionMethod = 'Thu mẫu tại trung tâm';
                    }

                    // Xác định giới tính mặc định dựa vào quan hệ
                    let defaultGender = '';
                    if (defaultRelationship === 'Cha' || defaultRelationship === 'Ông' || defaultRelationship === 'Cha nghi vấn') {
                        defaultGender = 'Nam';
                    } else if (defaultRelationship === 'Mẹ' || defaultRelationship === 'Bà' || defaultRelationship === 'Thai nhi (Mẫu từ mẹ)') {
                        defaultGender = 'Nữ';
                    }

                    // Nếu đã có participant cũ thì merge với data mới
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
                        // Tạo participant mới với giá trị mặc định
                        const baseParticipant = {
                            fullName: '',
                            gender: defaultGender,
                            dob: '',
                            relationship: defaultRelationship,
                            collectionMethod: defaultCollectionMethod,
                            sampleType: '',
                        };

                        // Thêm các field bổ sung cho dịch vụ thai nhi
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

    // === EFFECT: LẤY DANH SÁCH DỊCH VỤ TỪ BACKEND ===
    useEffect(() => {
        // Gọi API để lấy danh sách dịch vụ từ backend khi component được mount
        api.get('/service/listService')
            .then(res => {
                // Lấy dữ liệu từ response
                let services = res.data;

                // Kiểm tra nếu dữ liệu trả về là string thì parse thành array
                // (Đôi khi backend trả về JSON string thay vì object)
                if (typeof services === 'string') {
                    try {
                        services = JSON.parse(services);
                    } catch (e) {
                        // Nếu parse lỗi thì set thành array rỗng
                        services = [];
                    }
                }

                // Kiểm tra nếu dữ liệu là array hợp lệ
                if (Array.isArray(services)) {
                    // Lưu danh sách dịch vụ vào state
                    setServiceList(services);
                    // Xóa thông báo lỗi
                    setServiceListError('');
                    console.log('serviceList từ backend:', services);
                } else {
                    // Nếu dữ liệu không phải array, set thành array rỗng và hiển thị lỗi
                    setServiceList([]);
                    setServiceListError('Không lấy được danh sách dịch vụ. Vui lòng thử lại hoặc liên hệ quản trị.');
                }
            })
            .catch(err => {
                // Xử lý khi có lỗi khi gọi API (network error, server error, etc.)
                setServiceList([]);
                setServiceListError('Không lấy được danh sách dịch vụ. Có thể bạn chưa đăng nhập hoặc backend đang lỗi.');
                console.error('Lỗi lấy danh sách dịch vụ:', err);
            });
    }, []); // Empty dependency array - chỉ chạy 1 lần khi component mount

    // === EFFECT: LẤY DANH SÁCH LOẠI MẪU TỪ BACKEND ===
    useEffect(() => {
        // Gọi API để lấy danh sách các loại mẫu xét nghiệm
        api.get('/service/sample-types')
            .then(res => {
                // Kiểm tra nếu dữ liệu trả về là array và có ít nhất 1 phần tử
                if (Array.isArray(res.data) && res.data.length > 0) {
                    // Cập nhật danh sách loại mẫu từ backend
                    setSampleTypeOptions(res.data);
                }
                // Nếu không có dữ liệu thì giữ nguyên danh sách mặc định đã khai báo
            })
            .catch(err => {
                // Nếu lỗi thì giữ nguyên danh sách mặc định
                // Không hiển thị lỗi cho user vì đây không phải thông tin quan trọng
                console.error('Không lấy được danh sách sampleType:', err);
            });
    }, []); // Empty dependency array - chỉ chạy 1 lần khi component mount

    // === HÀM TÍNH TUỔI CHÍNH XÁC ===
    // Tính tuổi dựa trên ngày sinh, tính cả tháng và ngày
    const calculateAge = (dob) => {
        if (!dob) return null;
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        // Điều chỉnh tuổi nếu chưa đến sinh nhật trong năm
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    // === HÀM XỬ LÝ THAY ĐỔI THÔNG TIN PARTICIPANT ===
    // Cập nhật thông tin của 1 participant tại index cụ thể
    const handleParticipantChange = (index, field, value) => {
        const updatedParticipants = [...participants];
        updatedParticipants[index] = { ...updatedParticipants[index], [field]: value };
        setParticipants(updatedParticipants);
    };

    // === CÁC HÀM XỬ LÝ THAY ĐỔI DROPDOWN DỊCH VỤ ===
    // Xử lý khi thay đổi tên dịch vụ - reset các field phụ thuộc
    const handleServiceNameChange = (e) => {
        const name = e.target.value;
        setServiceName(name);
        setServiceType(''); // Reset loại xét nghiệm
        setTypeSample(''); // Reset loại mẫu
    };

    // Xử lý khi thay đổi loại xét nghiệm - reset loại mẫu
    const handleServiceTypeChange = (e) => {
        const type = e.target.value;
        setServiceType(type);
        setTypeSample(''); // Reset loại mẫu
    };

    // Xử lý khi thay đổi loại mẫu
    const handleTypeSampleChange = (e) => {
        setTypeSample(e.target.value);
    };

    // === HÀM XỬ LÝ THAY ĐỔI ĐỊA CHỈ ===
    // Xử lý khi thay đổi dropdown địa chỉ (tỉnh/huyện/xã)
    const handleLocationChange = (index, field, value) => {
        const updated = [...locationSelections];
        updated[index] = {
            ...updated[index],
            [field]: value,
            // Reset các trường sau nếu thay đổi trường trước
            // VD: Đổi tỉnh thì reset huyện và xã
            ...(field === 'province' ? { district: '', ward: '' } : {}),
            ...(field === 'district' ? { ward: '' } : {})
        };
        setLocationSelections(updated);

        // Ghép lại thành chuỗi địa chỉ và cập nhật vào participant
        const province = updated[index].province;
        const district = updated[index].district;
        const ward = updated[index].ward;
        const address = [ward, district, province].filter(Boolean).join(', ');
        handleParticipantChange(index, 'address', address);
    };

    // === EFFECT: ĐỒNG BỘ LOCATION SELECTIONS VỚI SỐ LƯỢNG PARTICIPANTS ===
    // Khi thay đổi số lượng participant, đồng bộ state locationSelections
    useEffect(() => {
        setLocationSelections(prev => {
            const arr = [...prev];
            // Thêm các phần tử rỗng nếu thiếu
            while (arr.length < numSamples) arr.push({ province: '', district: '', ward: '' });
            // Cắt bớt nếu thừa
            return arr.slice(0, numSamples);
        });
    }, [numSamples]);

    // === HÀM XỬ LÝ THAY ĐỔI CHI TIẾT ĐỊA CHỈ ===
    // Khi thay đổi input số nhà/ấp, đường
    const handleAddressDetailChange = (index, value) => {
        const updated = [...addressDetails];
        updated[index] = value;
        setAddressDetails(updated);

        // Ghép lại thành chuỗi địa chỉ đầy đủ
        const province = locationSelections[index]?.province;
        const district = locationSelections[index]?.district;
        const ward = locationSelections[index]?.ward;
        const detail = value;
        const address = [detail, ward, district, province].filter(Boolean).join(', ');
        handleParticipantChange(index, 'address', address);
    };

    // === EFFECT: ĐỒNG BỘ ADDRESS DETAILS VỚI SỐ LƯỢNG PARTICIPANTS ===
    // Khi thay đổi số lượng participant, đồng bộ state addressDetails
    useEffect(() => {
        setAddressDetails(prev => {
            const arr = [...prev];
            // Thêm các string rỗng nếu thiếu
            while (arr.length < numSamples) arr.push('');
            // Cắt bớt nếu thừa
            return arr.slice(0, numSamples);
        });
    }, [numSamples]);

    // === HÀM XỬ LÝ SUBMIT BOOKING ===
    const handleSubmitBooking = (e) => {
        e.preventDefault();

        // === VALIDATION CƠ BẢN ===
        // Kiểm tra các trường bắt buộc
        if (!serviceName || !appointmentDate || !resultTime) {
            alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
            return;
        }

        // === VALIDATION RIÊNG CHO DỊCH VỤ THAI NHI ===
        if (serviceName === 'Thai nhi (không xâm lấn)') {
            const fetalSamples = participants.filter(p => p.relationship === 'Thai nhi (Mẫu từ mẹ)').length;
            const allegedFatherSamples = participants.filter(p => p.relationship === 'Cha nghi vấn').length;

            // Phải có đúng 1 mẫu thai nhi
            if (fetalSamples !== 1) {
                alert('Dịch vụ "Xét nghiệm ADN Thai nhi" yêu cầu chính xác 1 mẫu Thai nhi (Mẫu từ mẹ).');
                return;
            }
            // Phải có 2-3 mẫu cha nghi vấn
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
        // === VALIDATION CHO DỊCH VỤ ANH EM RUỘT ===
        else if (serviceName === 'Xét nghiệm anh em ruột') {
            const hasMother = participants.some(p => p.relationship === 'Mẹ (tùy chọn)');
            if (hasMother && numSamples < 3) {
                alert('Khi xét nghiệm "Anh em ruột" có bao gồm "Mẹ (tùy chọn)", số mẫu phải là 3.');
                return;
            }
            if (!hasMother && numSamples < 2) {
                alert('Xét nghiệm "Anh em ruột" tối thiểu phải có 2 mẫu (anh và em).');
                return;
            }
        }
        // === VALIDATION CHO CÁC DỊCH VỤ KHÁC ===
        else {
            if (numSamples < 2) {
                alert('Số mẫu xét nghiệm phải tối thiểu là 2 cho dịch vụ này.');
                return;
            }
        }

        // === VALIDATION THÔNG TIN PARTICIPANTS ===
        // Kiểm tra tất cả participants đã điền đủ thông tin chưa
        const allParticipantsFilled = participants.every(p => {
            // Xác định xem có cần thông tin cá nhân không
            const shouldRequirePersonalInfo = !(serviceName === 'Xét nghiệm anh em ruột' && p.relationship === 'Mẹ (tùy chọn)');

            let commonRequiredFieldsFilled = true;

            // Xác định xem có cần loại mẫu không (thai nhi không cần)
            const isSampleTypeRequired = !(serviceName === 'Thai nhi (không xâm lấn)' && p.relationship === 'Thai nhi (Mẫu từ mẹ)');

            // Kiểm tra các trường bắt buộc
            if (shouldRequirePersonalInfo) {
                commonRequiredFieldsFilled = p.relationship && p.fullName && p.gender && p.dob && p.collectionMethod && (isSampleTypeRequired ? p.sampleType : true);
            } else {
                commonRequiredFieldsFilled = p.relationship && p.collectionMethod && (isSampleTypeRequired ? p.sampleType : true);
            }

            if (!commonRequiredFieldsFilled) {
                return false;
            }

            // Validation đặc biệt cho thai nhi
            if (serviceName === 'Thai nhi (không xâm lấn)' && p.relationship === 'Thai nhi (Mẫu từ mẹ)') {
                const age = calculateAge(p.dob);
                // Trẻ dưới 14 tuổi không bắt buộc mã định danh
                const personalIdConditionMet = (age !== null && age < 14) || (p.personalId && age >= 14);

                if (!personalIdConditionMet || !p.address || !p.relationToRegistrant) {
                    return false;
                }
            }
            return true;
        });

        // Hiển thị lỗi nếu thiếu thông tin
        if (!allParticipantsFilled) {
            alert('Vui lòng điền đầy đủ thông tin cho tất cả người tham gia. Lưu ý: Mã định danh cá nhân là bắt buộc đối với người từ 14 tuổi trở lên cho xét nghiệm Hành chính.');
            return;
        }

        // === CHUẨN HÓA DỮ LIỆU CHO BACKEND ===
        // Format lại participants theo cấu trúc backend yêu cầu
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

        // Tạo object booking data hoàn chỉnh
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

        // Log để debug
        console.log('serviceName state:', serviceName);
        console.log('bookingDetailsData:', bookingDetailsData);

        // Chuyển sang trang chi tiết booking để xác nhận (CHƯA gọi API tạo booking)
        navigate('/booking-details', { state: { bookingData: bookingDetailsData } });
    };

    // === HIỂN THỊ LOADING KHI ĐANG XÁC THỰC ===
    if (authLoading || !user) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontSize: '24px' }}>
                Đang tải...
            </div>
        );
    }

    // === RENDER COMPONENT ===
    return (
        <div className="homepage-root">
            <Header />
            <main className="booking-create-content">
                <form className="booking-form-section" onSubmit={handleSubmitBooking}>
                    <h2>Tạo Lịch Hẹn Mới</h2>
                    <p>Vui lòng điền thông tin dưới đây để đặt lịch xét nghiệm ADN.</p>

                    {/* === HIỂN THỊ LỖI HOẶC DROPDOWN DỊCH VỤ === */}
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
                                {/* Render các service name từ backend */}
                                {uniqueServiceNames.map((name, idx) => (
                                    <option key={name || idx} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* === DROPDOWN SỐ LƯỢNG MẪU === */}
                    {/* Xử lý khác nhau cho dịch vụ thai nhi */}
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
                            {/* Ghi chú đặc biệt cho anh em ruột */}
                            {serviceName === 'Xét nghiệm anh em ruột' && (
                                <small>Nếu có mẹ (tùy chọn), vui lòng chọn 3 mẫu.</small>
                            )}
                        </div>
                    )}

                    {/* === DROPDOWN LOẠI XÉT NGHIỆM === */}
                    <div className="form-group">
                        <label htmlFor="serviceType">Loại xét nghiệm:</label>
                        <select
                            id="serviceType"
                            value={serviceType}
                            onChange={handleServiceTypeChange}
                            required
                            disabled={!serviceName} // Chỉ enable khi đã chọn dịch vụ
                        >
                            <option value="">Chọn loại xét nghiệm</option>
                            {/* Lấy các service type từ backend theo service name */}
                            {Array.from(new Set(
                                serviceList.filter(s => s.serviceName === serviceName).map(s => s.serviceType)
                            )).map((type, idx) => (
                                <option key={type || idx} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* === DROPDOWN LOẠI MẪU === */}
                    <div className="form-group">
                        <label htmlFor="typeSample">Mẫu:</label>
                        <select
                            id="typeSample"
                            value={typeSample}
                            onChange={handleTypeSampleChange}
                            required
                            disabled={!serviceType} // Chỉ enable khi đã chọn loại xét nghiệm
                        >
                            <option value="">Chọn loại mẫu</option>
                            {/* Hiển thị các option loại mẫu từ backend */}
                            {sampleTypeOptions.map((sample, idx) => (
                                <option key={sample || idx} value={sample}>{sample}</option>
                            ))}
                        </select>
                    </div>

                    {/* === INPUT NGÀY HẸN === */}
                    <div className="form-group">
                        <label htmlFor="appointmentDate">Ngày hẹn:</label>
                        <input
                            type="date"
                            id="appointmentDate"
                            value={appointmentDate}
                            onChange={(e) => setAppointmentDate(e.target.value)}
                            min={today} // Không cho chọn ngày trong quá khứ
                            required
                        />
                    </div>

                    {/* === DROPDOWN THỜI GIAN KẾT QUẢ === */}
                    <div className="form-group">
                        <label htmlFor="resultTime">Thời gian nhận kết quả:</label>
                        {/* Thai nhi có thời gian cố định */}
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
                                {/* Lấy các package type từ backend */}
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

                    {/* === TEXTAREA GHI CHÚ === */}
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

                    {/* === SECTION THÔNG TIN PARTICIPANTS === */}
                    <div className="participants-section">
                        <h3>Thông tin người tham gia:</h3>
                        {/* Render form cho từng participant */}
                        {Array.from({ length: numSamples }).map((_, index) => {
                            const currentParticipant = participants[index] || {};
                            const participantAge = calculateAge(currentParticipant.dob);

                            // Xác định các điều kiện hiển thị field
                            const isPersonalInfoRequired = !(serviceName === 'Xét nghiệm anh em ruột' && currentParticipant.relationship === 'Mẹ (tùy chọn)');
                            const hideSampleType = serviceName === 'Thai Nhi' && currentParticipant.relationship === 'Thai nhi (Mẫu từ mẹ)';
                            const isCollectionMethodFixedToCenter = serviceName === 'Thai nhi (không xâm lấn)' && currentParticipant.relationship === 'Thai nhi (Mẫu từ mẹ)';

                            return (
                                <div key={index} className="participant-form">
                                    {/* === HEADER VÀ QUAN HỆ === */}
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
                                                {/* Hiển thị các option quan hệ theo loại dịch vụ */}
                                                {getRelationshipOptions().map((rel, relIndex) => (
                                                    <option key={rel} value={rel}>{rel}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* === GHI CHÚ ĐẶC BIỆT CHO THAI NHI === */}
                                    {currentParticipant.relationship === 'Thai nhi (Mẫu từ mẹ)' && (
                                        <p className="participant-sub-label">**(Thông tin cá nhân của người mẹ)**</p>
                                    )}

                                    {/* === THÔNG TIN CÁ NHÂN === */}
                                    {isPersonalInfoRequired ? (
                                        <>
                                            {/* Họ tên */}
                                            <div className="form-group">
                                                <label>Họ và tên:</label>
                                                <input
                                                    type="text"
                                                    value={currentParticipant.fullName || ''}
                                                    onChange={(e) => handleParticipantChange(index, 'fullName', e.target.value)}
                                                    required={true}
                                                />
                                            </div>
                                            {/* Giới tính */}
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
                                            {/* Ngày sinh */}
                                            <div className="form-group">
                                                <label>Ngày sinh:</label>
                                                <input
                                                    type="date"
                                                    value={currentParticipant.dob ? currentParticipant.dob.slice(0, 10) : ''}
                                                    onChange={(e) => handleParticipantChange(index, 'dob', e.target.value)}
                                                    max={today} // Không cho chọn ngày tương lai
                                                    required={true}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <p>**(Thông tin cá nhân không bắt buộc cho mẫu này)**</p>
                                    )}

                                    {/* === THÔNG TIN BỔ SUNG CHO XÉT NGHIỆM HÀNH CHÍNH === */}
                                    {serviceType === 'Hành chính' && isPersonalInfoRequired && (
                                        <>
                                            {/* Mã định danh cá nhân */}
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

                                            {/* === DROPDOWN ĐỊA CHỈ === */}
                                            <div className="form-group">
                                                <label>Địa chỉ:</label>
                                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                                    {/* Dropdown tỉnh/thành */}
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
                                                    {/* Dropdown quận/huyện */}
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
                                                    {/* Dropdown phường/xã */}
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
                                            {/* Input số nhà/đường */}
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
                                            {/* Quan hệ với người đăng ký */}
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

                                    {/* === DROPDOWN LOẠI MẪU XÉT NGHIỆM === */}
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

                                    {/* === PHƯƠNG PHÁP THU MẪU === */}
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

                    {/* === BUTTON SUBMIT === */}
                    <button type="submit" className="submit-booking-btn">Hoàn thành</button>
                </form>
            </main>

            <Footer />
        </div>
    );
}