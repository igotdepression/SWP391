<<<<<<< HEAD
// src/pages/BookingCreatePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './BookingCreate.css';

export default function BookingCreatePage() {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    // === State cho Form đặt lịch ===
    const [serviceType, setServiceType] = useState(''); // Loại dịch vụ (vd: Cha con)
    const [numSamples, setNumSamples] = useState(2); // Số mẫu cần xét nghiệm, mặc định 2
    const [testType, setTestType] = useState(''); // Loại xét nghiệm (Dân sự / Hành chính)
    const [collectionMethod, setCollectionMethod] = useState(''); // Phương pháp thu mẫu (Tự thu mẫu, Thu mẫu tại nhà/văn phòng, Thu mẫu tại trung tâm)
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState(''); // Đã sửa tên state
    const [notes, setNotes] = useState('');

    // State cho thông tin người tham gia
    // participants sẽ tự động được tạo dựa trên numSamples
    const [participants, setParticipants] = useState([]);

    // State để quản lý bước của form (form điền / trang xác nhận)
    const [currentStep, setCurrentStep] = useState('form'); // 'form' hoặc 'confirmation'

    // Danh sách các loại dịch vụ (tạm thời hardcode, bạn có thể lấy từ API nếu cần)
=======
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './BookingCreate.css';
import api from '../services/api';

export default function BookingCreate() {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const initialBookingData = location.state?.initialBookingData;

    const [serviceID, setServiceID] = useState('');
    const [serviceList, setServiceList] = useState([]);
    const [serviceListError, setServiceListError] = useState('');
    const [serviceName, setServiceName] = useState(initialBookingData?.serviceName || '');
    const [typeOfService, setTypeOfService] = useState(initialBookingData?.typeOfService || '');
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
            case 'Cha - Con':
                return ['Cha', 'Con'];
            case 'Mẹ - Con':
                return ['Mẹ', 'Con'];
            case 'Ông - Cháu':
                return ['Ông', 'Cháu'];
            case 'Bà - Cháu':
                return ['Bà', 'Cháu'];
            case 'Anh - Em':
                return ['Anh', 'Em', 'Mẹ (tùy chọn)'];
            case 'Thai Nhi':
                return ['Thai nhi (Mẫu từ mẹ)', 'Cha nghi vấn'];
            default:
                return ['Quan hệ nghi vấn'];
        }
    };

>>>>>>> 8e0ece6428b87162344c8e84a8b730fb73989ce8
    const serviceOptions = [
        'Xét nghiệm ADN Cha con',
        'Xét nghiệm ADN Mẹ con',
        'Xét nghiệm ADN Ông cháu',
        'Xét nghiệm ADN Bà cháu',
        'Xét nghiệm ADN Anh em ruột',
        'Xét nghiệm ADN Thai nhi',
    ];

<<<<<<< HEAD
    // === Redirect nếu chưa đăng nhập ===
=======
    const collectionMethodOptions = [
        'Tự thu mẫu',
        'Thu mẫu tại nhà/văn phòng',
        'Thu mẫu tại trung tâm',
    ];

    const sampleTypeOptions = [
        'Mẫu máu/Tế bào niêm mạc miệng',
        'Mẫu tóc, móng tay, chân',
        'Mẫu bàn chải đánh răng, dao cạo râu',
        // Add more sample types as needed
    ];

>>>>>>> 8e0ece6428b87162344c8e84a8b730fb73989ce8
    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
        }
    }, [user, authLoading, navigate]);

<<<<<<< HEAD
    // === useEffect để tự động tạo số lượng participants dựa trên numSamples ===
    useEffect(() => {
        setParticipants(prevParticipants => {
            const newParticipants = Array.from({ length: numSamples }, (_, i) => {
                const existingParticipant = prevParticipants[i];
                if (existingParticipant) {
                    return existingParticipant;
                } else {
                    if (testType === 'Hành chính') {
                        return { fullName: '', age: '', dob: '', gender: '', cccd: '', address: '', relationship: '' };
                    } else { // Dân sự
                        return { fullName: '', age: '', dob: '' };
                    }
                }
            });
            return newParticipants;
        });
    }, [numSamples, testType]); // Thêm testType vào dependency để cập nhật trường khi đổi loại xét nghiệm

    // === Hàm tạo màu avatar ngẫu nhiên (giữ nguyên) ===
    const getRandomAvatarColors = useCallback(() => { // Wrap in useCallback
        const rBg = Math.floor(Math.random() * 56) + 200;
        const gBg = Math.floor(Math.random() * 56) + 200;
        const bBg = Math.floor(Math.random() * 56) + 200;
        const bgColor = `rgb(${rBg}, ${gBg}, ${bBg})`;

        const rText = Math.max(0, rBg - 100);
        const gText = Math.max(0, gBg - 100);
        const bText = Math.max(0, bBg - 100);
        const textColor = `rgb(${rText}, ${gText}, ${bText})`;
        return { backgroundColor: bgColor, color: textColor };
    }, []); // Empty dependency array as it doesn't depend on props/state

    // === Hàm xử lý thay đổi thông tin người tham gia ===
=======
    useEffect(() => {
        if (serviceName === 'Thai Nhi') {
            setResultTime('Tiêu chuẩn (7-10 ngày làm việc)');
        } else if (initialBookingData?.resultTime && resultTime === '') {
            setResultTime(initialBookingData.resultTime);
        }
    }, [serviceName]);

    useEffect(() => {
        // Cập nhật participants khi numSamples hoặc serviceName, testType thay đổi
        // Chỉ cập nhật nếu không có initialBookingData hoặc khi thay đổi số lượng mẫu
        if (!initialBookingData || initialBookingData.numSamples !== numSamples) {
            setParticipants(prevParticipants => {
                const newParticipants = Array.from({ length: numSamples }, (_, i) => {
                    const existingParticipant = prevParticipants[i];
                    const relationshipOptions = getRelationshipOptions();

                    let defaultRelationship = 'Quan hệ nghi vấn';
                    if (serviceName === 'Thai Nhi') {
                        if (i === 0) { // Giả định người đầu tiên là thai nhi
                            defaultRelationship = 'Thai nhi (Mẫu từ mẹ)';
                        } else { // Các người còn lại là cha nghi vấn
                            defaultRelationship = 'Cha nghi vấn';
                        }
                    } else {
                        defaultRelationship = relationshipOptions[i] || 'Quan hệ nghi vấn';
                    }

                    let defaultCollectionMethod = '';
                    if (serviceName === 'Thai Nhi') {
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
                            collectionMethod: (serviceName === 'Thai Nhi')
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

                        if (serviceName === 'Thai Nhi') {
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
    }, [numSamples, serviceName, getRelationshipOptions, initialBookingData]);

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

>>>>>>> 8e0ece6428b87162344c8e84a8b730fb73989ce8
    const handleParticipantChange = (index, field, value) => {
        const updatedParticipants = [...participants];
        updatedParticipants[index] = { ...updatedParticipants[index], [field]: value };
        setParticipants(updatedParticipants);
    };

<<<<<<< HEAD
    // === Hàm xử lý submit form ===
    const handleSubmitBooking = (e) => {
        e.preventDefault();

        // Kiểm tra các trường bắt buộc
        if (!serviceType || !testType || !collectionMethod || !appointmentDate || !appointmentTime) {
=======
    // Sửa handleServiceChange để lưu lại các trường
    const handleServiceNameChange = (e) => {
        const name = e.target.value;
        setServiceName(name);
        setTypeOfService('');
        setTypeSample('');
    };

    const handleTypeOfServiceChange = (e) => {
        const type = e.target.value;
        setTypeOfService(type);
        setTypeSample('');
    };

    const handleTypeSampleChange = (e) => {
        setTypeSample(e.target.value);
    };

    const handleSubmitBooking = (e) => {
        e.preventDefault();

        if (!serviceName || !appointmentDate || !resultTime) {
>>>>>>> 8e0ece6428b87162344c8e84a8b730fb73989ce8
            alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
            return;
        }

<<<<<<< HEAD
        // Kiểm tra số mẫu dựa trên loại dịch vụ
        if (serviceType === 'Xét nghiệm ADN Thai nhi') {
            if (numSamples !== 2) { // Thai nhi luôn là 2 mẫu
                alert('Dịch vụ Xét nghiệm ADN Thai nhi yêu cầu chính xác 2 mẫu.');
                return;
            }
        } else {
            if (numSamples < 2) { // Các dịch vụ khác tối thiểu 2 mẫu
=======
        if (serviceName === 'Thai Nhi') {
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
        } else if (serviceName === 'Anh - Em') {
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
>>>>>>> 8e0ece6428b87162344c8e84a8b730fb73989ce8
                alert('Số mẫu xét nghiệm phải tối thiểu là 2 cho dịch vụ này.');
                return;
            }
        }

<<<<<<< HEAD
        // Kiểm tra xem tất cả thông tin participant đã được điền đầy đủ chưa
        const allParticipantsFilled = participants.every(p => {
            if (testType === 'Hành chính') {
                return p.fullName && p.age && p.dob && p.gender && p.cccd && p.address && p.relationship;
            } else { // Dân sự
                return p.fullName && p.age && p.dob;
            }
        });

        if (!allParticipantsFilled) {
            alert('Vui lòng điền đầy đủ thông tin cho tất cả người tham gia.');
            return;
        }

        // Chuyển sang trang xác nhận
        setCurrentStep('confirmation');
    };

    // === Render Loading State ===
=======
        const allParticipantsFilled = participants.every(p => {
            const shouldRequirePersonalInfo = !(serviceName === 'Anh - Em' && p.relationship === 'Mẹ (tùy chọn)');

            let commonRequiredFieldsFilled = true;

            const isSampleTypeRequired = !(serviceName === 'Thai Nhi' && p.relationship === 'Thai nhi (Mẫu từ mẹ)');

            if (shouldRequirePersonalInfo) {
                commonRequiredFieldsFilled = p.relationship && p.fullName && p.gender && p.dob && p.collectionMethod && (isSampleTypeRequired ? p.sampleType : true);
            } else {
                commonRequiredFieldsFilled = p.relationship && p.collectionMethod && (isSampleTypeRequired ? p.sampleType : true);
            }

            if (!commonRequiredFieldsFilled) {
                return false;
            }

            if (serviceName === 'Thai Nhi' && p.relationship === 'Thai nhi (Mẫu từ mẹ)') {
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
            relationship: p.relationship,
            personalId: p.personalId,
            address: p.address,
            typeOfCollection: p.collectionMethod,
            sampleType: p.sampleType
        }));

        const bookingDetailsData = {
            serviceType: serviceName,
            numSamples: numSamples,
            testType: typeOfService,
            typeSample: typeSample,
            appointmentDate: appointmentDate,
            resultTime: resultTime,
            notes: notes,
            participants: formattedParticipants
        };

        // Chỉ chuyển sang trang xác nhận, KHÔNG gọi API
        navigate('/booking-details', { state: { bookingData: bookingDetailsData } });
    };

>>>>>>> 8e0ece6428b87162344c8e84a8b730fb73989ce8
    if (authLoading || !user) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontSize: '24px' }}>
                Đang tải...
            </div>
        );
    }

<<<<<<< HEAD
    // === Render Confirmation Page ===
    if (currentStep === 'confirmation') {
        return (
            <div className="homepage-root">
                {/* Header */}
                <header className="homepage-header">
                    <div className="header-left">
                        {/* Logo removed */}
                        <nav className="header-nav">
                            <ul>
                                <li><button className="nav-link" onClick={() => navigate('/about')}>GIỚI THIỆU</button></li>
                                <li><button className="nav-link" onClick={() => navigate('/services')}>DỊCH VỤ</button></li>
                                <li><button className="nav-link" onClick={() => navigate('/info')}>THÔNG TIN</button></li>
                                <li><button className="nav-link nav-link-highlight" onClick={() => navigate('/booking-create')}>ĐẶT LỊCH HẸN</button></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="header-right">
                        <div className="header-search-box">
                            <input type="text" placeholder="Tìm kiếm..." className="header-search-input" />
                            <button className="header-search-btn">🔍</button>
                        </div>
                        {user && (
                            <div className="header-user-profile" onClick={() => navigate('/personal-info')}>
                                <span className="header-user-info">{user.fullName || user.email}</span>
                                <div className="header-profile-icon" style={getRandomAvatarColors()}>
                                    {user.avatar ? (
                                        <img src={user.avatar} alt={user.fullName} />
                                    ) : (
                                        user.fullName ? user.fullName.split(" ").map(n => n[0]).join("").toUpperCase() : user.email?.charAt(0).toUpperCase() || ''
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                <main className="booking-create-content">
                    <section className="confirmation-section">
                        <h2>Xác nhận thông tin đặt lịch</h2>
                        <div className="confirmation-details">
                            <p><strong>Loại dịch vụ:</strong> {serviceType}</p>
                            <p><strong>Số mẫu:</strong> {numSamples}</p> {/* Luôn hiển thị số mẫu */}
                            <p><strong>Loại xét nghiệm:</strong> {testType}</p>
                            <p><strong>Phương pháp thu mẫu:</strong> {collectionMethod}</p>
                            <p><strong>Ngày hẹn:</strong> {appointmentDate}</p>
                            <p><strong>Giờ hẹn:</strong> {appointmentTime}</p>
                            <p><strong>Ghi chú:</strong> {notes || 'Không có'}</p>

                            <h3>Thông tin người tham gia:</h3>
                            {participants.length > 0 ? (
                                participants.map((p, index) => (
                                    <div key={index} className="participant-summary">
                                        <h4>Người tham gia {index + 1}</h4>
                                        <p>Họ và tên: {p.fullName || 'Chưa điền'}</p>
                                        <p>Tuổi: {p.age || 'Chưa điền'}</p>
                                        <p>Năm sinh: {p.dob || 'Chưa điền'}</p>
                                        {testType === 'Hành chính' && (
                                            <>
                                                <p>Giới tính: {p.gender || 'Chưa điền'}</p>
                                                <p>CCCD: {p.cccd || 'Chưa điền'}</p>
                                                <p>Địa chỉ: {p.address || 'Chưa điền'}</p>
                                                <p>Quan hệ: {p.relationship || 'Chưa điền'}</p>
                                            </>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>Không có thông tin người tham gia được yêu cầu.</p>
                            )}
                        </div>
                        <div className="confirmation-actions">
                            <button className="btn-back" onClick={() => setCurrentStep('form')}>Chỉnh sửa</button>
                            <button className="btn-confirm" onClick={() => alert('Xác nhận đặt lịch...')}>Xác nhận đặt lịch</button>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="homepage-footer">
                    <div className="footer-section">
                        <h3>LOCATION</h3>
                        <p>70, D1, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh</p>
                    </div>
                    <div className="footer-section">
                        <h3>CONTACT US</h3>
                        <p>02020202304</p>
                    </div>
                    <div className="footer-section">
                        <h3>PAYMENT</h3>
                        <div className="payment-icons">
                            <div className="payment-icon-placeholder">Pay1</div>
                            <div className="payment-icon-placeholder">Pay2</div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }

    // === Render Booking Form (Default) ===
    return (
        <div className="homepage-root">
            {/* Header */}
            <header className="homepage-header">
                <div className="header-left">
                    {/* Logo removed */}
                    <nav className="header-nav">
                        <ul>
                            <li><button className="nav-link" onClick={() => navigate('/about')}>GIỚI THIỆU</button></li>
                            <li><button className="nav-link" onClick={() => navigate('/services')}>DỊCH VỤ</button></li>
                            <li><button className="nav-link" onClick={() => navigate('/info')}>THÔNG TIN</button></li>
                            <li><button className="nav-link nav-link-highlight" onClick={() => navigate('/booking-create')}>ĐẶT LỊCH HẸN</button></li>
                        </ul>
                    </nav>
                </div>
                <div className="header-right">
                    <div className="header-search-box">
                        <input type="text" placeholder="Tìm kiếm..." className="header-search-input" />
                        <button className="header-search-btn">🔍</button>
                    </div>
                    {user ? (
                        <div className="header-user-profile" onClick={() => navigate('/personal-info')}>
                            <span className="header-user-info">{user.fullName || user.email}</span>
                            <div className="header-profile-icon" style={getRandomAvatarColors()}>
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.fullName} />
                                ) : (
                                    user.fullName ? user.fullName.split(" ").map(n => n[0]).join("").toUpperCase() : user.email?.charAt(0).toUpperCase() || ''
                                )}
                            </div>
                        </div>
                    ) : (
                        <button className="header-login-button" onClick={() => navigate('/login')}>Đăng nhập</button>
                    )}
                </div>
            </header>

            {/* Main content of Booking Create page */}
=======
    return (
        <div className="homepage-root">
            <Header />
>>>>>>> 8e0ece6428b87162344c8e84a8b730fb73989ce8
            <main className="booking-create-content">
                <form className="booking-form-section" onSubmit={handleSubmitBooking}>
                    <h2>Tạo Lịch Hẹn Mới</h2>
                    <p>Vui lòng điền thông tin dưới đây để đặt lịch xét nghiệm ADN.</p>

<<<<<<< HEAD
                    <div className="form-group">
                        <label htmlFor="serviceType">Loại dịch vụ:</label>
                        <select
                            id="serviceType"
                            value={serviceType}
                            onChange={(e) => {
                                const selectedService = e.target.value;
                                setServiceType(selectedService);
                                if (selectedService === 'Xét nghiệm ADN Thai nhi') {
                                    setNumSamples(2); // THAY ĐỔI: Thai nhi luôn 2 mẫu
                                    setCollectionMethod('Thu mẫu tại trung tâm'); // Thai nhi mặc định thu tại trung tâm
                                    setTestType(''); // Reset test type nếu cần
                                } else {
                                    setNumSamples(2); // Mặc định 2 mẫu cho các loại khác
                                    setCollectionMethod(''); // Reset collection method
                                    setTestType('');
                                }
                                // Participants sẽ được cập nhật tự động bởi useEffect khi numSamples thay đổi
                            }}
                            required
                        >
                            <option value="">Chọn loại dịch vụ</option>
                            {serviceOptions.map((service, index) => (
                                <option key={index} value={service}>{service}</option>
                            ))}
                        </select>
                    </div>

                    {/* Hiển thị input số mẫu hoặc số mẫu cố định */}
                    {serviceType === 'Xét nghiệm ADN Thai nhi' ? (
                        <div className="form-group">
                            <label>Số mẫu cần xét nghiệm:</label>
                            <p className="static-option">2</p> {/* THAY ĐỔI: Giá trị cố định là 2 */}
=======
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

                    {serviceName === 'Thai Nhi' ? (
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
>>>>>>> 8e0ece6428b87162344c8e84a8b730fb73989ce8
                        </div>
                    ) : (
                        <div className="form-group">
                            <label htmlFor="numSamples">Số mẫu cần xét nghiệm:</label>
                            <input
                                type="number"
                                id="numSamples"
                                value={numSamples}
<<<<<<< HEAD
                                onChange={(e) => setNumSamples(Math.max(2, parseInt(e.target.value) || 2))} // Mặc định min 2 mẫu
                                min="2"
                                required
                            />
                        </div>
                    )}


                    <div className="form-group">
                        <label htmlFor="testType">Loại xét nghiệm:</label>
                        <select
                            id="testType"
                            value={testType}
                            onChange={(e) => {
                                const selectedTestType = e.target.value;
                                setTestType(selectedTestType);
                                if (selectedTestType === 'Hành chính') {
                                    setCollectionMethod('Thu mẫu tại trung tâm'); // Hành chính mặc định thu tại trung tâm
                                } else {
                                    setCollectionMethod(''); // Reset cho dân sự
                                }
                                // Participants sẽ được cập nhật tự động bởi useEffect khi testType thay đổi
                            }}
                            required
                        >
                            <option value="">Chọn loại xét nghiệm</option>
                            <option value="Dân sự">Dân sự</option>
                            <option value="Hành chính">Hành chính</option>
                        </select>
                    </div>

                    {testType === 'Dân sự' && serviceType !== 'Xét nghiệm ADN Thai nhi' && (
                        <div className="form-group">
                            <label htmlFor="collectionMethod">Phương pháp thu mẫu:</label>
                            <select
                                id="collectionMethod"
                                value={collectionMethod}
                                onChange={(e) => setCollectionMethod(e.target.value)}
                                required
                            >
                                <option value="">Chọn phương pháp thu mẫu</option>
                                <option value="Tự thu mẫu">Tự thu mẫu</option>
                                <option value="Thu mẫu tại nhà/văn phòng">Thu mẫu tại nhà/văn phòng</option>
                                <option value="Thu mẫu tại trung tâm">Thu mẫu tại trung tâm</option>
                            </select>
                        </div>
                    )}

                    {(testType === 'Hành chính' || serviceType === 'Xét nghiệm ADN Thai nhi') && (
                        <div className="form-group">
                            <label>Phương pháp thu mẫu:</label>
                            <p className="static-option">Thu mẫu tại trung tâm</p>
                        </div>
                    )}
=======
                                onChange={(e) => setNumSamples(Math.max(2, parseInt(e.target.value) || 2))}
                                min="2"
                                required
                            />
                            {serviceName === 'Anh - Em' && (
                                <small>Nếu có mẹ (tùy chọn), vui lòng chọn 3 mẫu.</small>
                            )}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="typeOfService">Loại xét nghiệm:</label>
                        <select
                            id="typeOfService"
                            value={typeOfService}
                            onChange={handleTypeOfServiceChange}
                            required
                            disabled={!serviceName}
                        >
                            <option value="">Chọn loại xét nghiệm</option>
                            {Array.from(new Set(
                                serviceList.filter(s => s.serviceName === serviceName).map(s => s.typeOfService)
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
                            disabled={!typeOfService}
                        >
                            <option value="">Chọn loại mẫu</option>
                            {Array.from(new Set(
                                serviceList.filter(s => s.serviceName === serviceName && s.typeOfService === typeOfService).map(s => s.typeSample)
                            )).map((sample, idx) => (
                                <option key={sample || idx} value={sample}>{sample}</option>
                            ))}
                        </select>
                    </div>
>>>>>>> 8e0ece6428b87162344c8e84a8b730fb73989ce8

                    <div className="form-group">
                        <label htmlFor="appointmentDate">Ngày hẹn:</label>
                        <input
                            type="date"
                            id="appointmentDate"
                            value={appointmentDate}
                            onChange={(e) => setAppointmentDate(e.target.value)}
<<<<<<< HEAD
=======
                            min={today}
>>>>>>> 8e0ece6428b87162344c8e84a8b730fb73989ce8
                            required
                        />
                    </div>

                    <div className="form-group">
<<<<<<< HEAD
                        <label htmlFor="appointmentTime">Giờ hẹn:</label>
                        <input
                            type="time"
                            id="appointmentTime"
                            value={appointmentTime}
                            onChange={(e) => setAppointmentTime(e.target.value)} // Đã sửa: dùng setAppointmentTime
                            required
                        />
=======
                        <label htmlFor="resultTime">Thời gian nhận kết quả:</label>
                        {serviceName === 'Thai Nhi' ? (
                            <p className="static-option">{resultTime || 'Tiêu chuẩn (7-10 ngày làm việc)'}</p>
                        ) : (
                            <select
                                id="resultTime"
                                value={resultTime}
                                onChange={(e) => setResultTime(e.target.value)}
                                required
                            >
                                <option value="">Chọn thời gian nhận kết quả</option>
                                <option value="Tiêu chuẩn (2-5 ngày)">Tiêu chuẩn (2-5 ngày)</option>
                                <option value="Lấy nhanh (6-24 tiếng)">Lấy nhanh (6-24 tiếng)</option>
                            </select>
                        )}
>>>>>>> 8e0ece6428b87162344c8e84a8b730fb73989ce8
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

<<<<<<< HEAD
                    {/* === Phần thông tin người tham gia === */}
                    <div className="participants-section">
                        <h3>Thông tin người tham gia:</h3>
                        {Array.from({ length: numSamples }).map((_, index) => (
                            <div key={index} className="participant-form">
                                <h4>Người tham gia {index + 1}</h4>
                                <div className="form-group">
                                    <label>Họ và tên:</label>
                                    <input
                                        type="text"
                                        value={participants[index]?.fullName || ''}
                                        onChange={(e) => handleParticipantChange(index, 'fullName', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Tuổi:</label>
                                    <input
                                        type="number"
                                        value={participants[index]?.age || ''}
                                        onChange={(e) => handleParticipantChange(index, 'age', parseInt(e.target.value) || '')}
                                        min="0"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Năm sinh:</label>
                                    <input
                                        type="number"
                                        value={participants[index]?.dob || ''}
                                        onChange={(e) => handleParticipantChange(index, 'dob', parseInt(e.target.value) || '')}
                                        min="1900"
                                        max={new Date().getFullYear()}
                                        required
                                    />
                                </div>

                                {testType === 'Hành chính' && (
                                    <>
                                        <div className="form-group">
                                            <label>Giới tính:</label>
                                            <select
                                                value={participants[index]?.gender || ''}
                                                onChange={(e) => handleParticipantChange(index, 'gender', e.target.value)}
                                                required
                                            >
                                                <option value="">Chọn giới tính</option>
                                                <option value="Nam">Nam</option>
                                                <option value="Nữ">Nữ</option>
                                                <option value="Khác">Khác</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>CCCD:</label>
                                            <input
                                                type="text"
                                                value={participants[index]?.cccd || ''}
                                                onChange={(e) => handleParticipantChange(index, 'cccd', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Địa chỉ:</label>
                                            <input
                                                type="text"
                                                value={participants[index]?.address || ''}
                                                onChange={(e) => handleParticipantChange(index, 'address', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Quan hệ với người đăng ký:</label>
                                            <input
                                                type="text"
                                                value={participants[index]?.relationship || ''}
                                                onChange={(e) => handleParticipantChange(index, 'relationship', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
=======
                    <div className="participants-section">
                        <h3>Thông tin người tham gia:</h3>
                        {Array.from({ length: numSamples }).map((_, index) => {
                            const currentParticipant = participants[index] || {};
                            const participantAge = calculateAge(currentParticipant.dob);

                            const isPersonalInfoRequired = !(serviceName === 'Anh - Em' && currentParticipant.relationship === 'Mẹ (tùy chọn)');
                            const hideSampleType = serviceName === 'Thai Nhi' && currentParticipant.relationship === 'Thai nhi (Mẫu từ mẹ)';

                            const isCollectionMethodFixedToCenter = serviceName === 'Thai Nhi' && currentParticipant.relationship === 'Thai nhi (Mẫu từ mẹ)';

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
                                                    value={currentParticipant.dob || ''}
                                                    onChange={(e) => handleParticipantChange(index, 'dob', e.target.value)}
                                                    max={today}
                                                    required={true}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <p>**(Thông tin cá nhân không bắt buộc cho mẫu này)**</p>
                                    )}

                                    {typeOfService === 'Hành Chính' && isPersonalInfoRequired && (
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
                                                <input
                                                    type="text"
                                                    value={currentParticipant.address || ''}
                                                    onChange={(e) => handleParticipantChange(index, 'address', e.target.value)}
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
>>>>>>> 8e0ece6428b87162344c8e84a8b730fb73989ce8
                    </div>

                    <button type="submit" className="submit-booking-btn">Hoàn thành</button>
                </form>
            </main>

<<<<<<< HEAD
            {/* Footer */}
            <footer className="homepage-footer">
                <div className="footer-section">
                    <h3>LOCATION</h3>
                    <p>70, D1, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh</p>
                </div>
                <div className="footer-section">
                    <h3>CONTACT US</h3>
                    <p>02020202304</p>
                </div>
                <div className="footer-section">
                    <h3>PAYMENT</h3>
                    <div className="payment-icons">
                        <div className="payment-icon-placeholder">Pay1</div>
                        <div className="payment-icon-placeholder">Pay2</div>
                    </div>
                </div>
            </footer>
=======
            <Footer />
>>>>>>> 8e0ece6428b87162344c8e84a8b730fb73989ce8
        </div>
    );
}