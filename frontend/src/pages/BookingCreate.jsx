import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './BookingCreate.css';

export default function BookingCreate() {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const initialBookingData = location.state?.initialBookingData;

    const [serviceType, setServiceType] = useState(initialBookingData?.serviceType || '');
    // Cho phép numSamples thay đổi cho xét nghiệm thai nhi
    const [numSamples, setNumSamples] = useState(initialBookingData?.numSamples || 2);
    const [testType, setTestType] = useState(initialBookingData?.testType || '');
    const [appointmentDate, setAppointmentDate] = useState(initialBookingData?.appointmentDate || '');
    const [notes, setNotes] = useState(initialBookingData?.notes || '');
    const [resultTime, setResultTime] = useState(initialBookingData?.resultTime || '');
    const today = new Date().toISOString().split('T')[0];

    const [participants, setParticipants] = useState(initialBookingData?.participants || []);

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

    const sampleTypeOptions = [
        'Mẫu máu/Tế bào niêm mạc miệng',
        'Mẫu tóc, móng tay, chân',
        'Mẫu bàn chải đánh răng, dao cạo râu',
        // Add more sample types as needed
    ];

    const getRelationshipOptions = useCallback(() => {
        switch (serviceType) {
            case 'Xét nghiệm ADN Cha con':
                return ['Cha', 'Con'];
            case 'Xét nghiệm ADN Mẹ con':
                return ['Mẹ', 'Con'];
            case 'Xét nghiệm ADN Ông cháu':
                return ['Ông', 'Cháu'];
            case 'Xét nghiệm ADN Bà cháu':
                return ['Bà', 'Cháu'];
            case 'Xét nghiệm ADN Anh em ruột':
                return ['Anh/Em ruột 1', 'Anh/Em ruột 2', 'Mẹ (tùy chọn)'];
            case 'Xét nghiệm ADN Thai nhi':
                // Cho phép nhiều "Cha nghi vấn"
                return ['Thai nhi (Mẫu từ mẹ)', 'Cha nghi vấn'];
            default:
                return ['Quan hệ nghi vấn'];
        }
    }, [serviceType]);

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        if (serviceType === 'Xét nghiệm ADN Thai nhi') {
            setResultTime('Tiêu chuẩn (7-10 ngày làm việc)');
        } else if (initialBookingData?.serviceType !== serviceType) {
            setResultTime('');
        }
    }, [serviceType, initialBookingData]);

    useEffect(() => {
        // Cập nhật participants khi numSamples hoặc serviceType, testType thay đổi
        setParticipants(prevParticipants => {
            const newParticipants = Array.from({ length: numSamples }, (_, i) => {
                const existingParticipant = prevParticipants[i];
                const relationshipOptions = getRelationshipOptions();

                let defaultRelationship = 'Quan hệ nghi vấn';
                if (serviceType === 'Xét nghiệm ADN Thai nhi') {
                    if (i === 0) { // Giả định người đầu tiên là thai nhi
                        defaultRelationship = 'Thai nhi (Mẫu từ mẹ)';
                    } else { // Các người còn lại là cha nghi vấn
                        defaultRelationship = 'Cha nghi vấn';
                    }
                } else {
                    defaultRelationship = relationshipOptions[i] || 'Quan hệ nghi vấn';
                }

                let defaultCollectionMethod = '';
                if (testType === 'Hành chính' || (serviceType === 'Xét nghiệm ADN Thai nhi' && defaultRelationship === 'Thai nhi (Mẫu từ mẹ)')) {
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
                        collectionMethod: (testType === 'Hành chính' || (serviceType === 'Xét nghiệm ADN Thai nhi' && existingParticipant.relationship === 'Thai nhi (Mẫu từ mẹ)'))
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

                    if (testType === 'Hành chính') {
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
    }, [numSamples, testType, serviceType, getRelationshipOptions, initialBookingData]);


    const calculateAge = (dobYear) => {
        if (!dobYear) return null;
        const currentYear = new Date().getFullYear();
        return currentYear - parseInt(dobYear);
    };

    const handleParticipantChange = (index, field, value) => {
        const updatedParticipants = [...participants];
        updatedParticipants[index] = { ...updatedParticipants[index], [field]: value };
        setParticipants(updatedParticipants);
    };

    const handleSubmitBooking = (e) => {
        e.preventDefault();

        if (!serviceType || !testType || !appointmentDate || !resultTime) {
            alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
            return;
        }

        if (serviceType === 'Xét nghiệm ADN Thai nhi') {
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
        } else if (serviceType === 'Xét nghiệm ADN Anh em ruột') {
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
            const shouldRequirePersonalInfo = !(serviceType === 'Xét nghiệm ADN Anh em ruột' && p.relationship === 'Mẹ (tùy chọn)');

            let commonRequiredFieldsFilled = true;

            const isSampleTypeRequired = !(serviceType === 'Xét nghiệm ADN Thai nhi' && p.relationship === 'Thai nhi (Mẫu từ mẹ)');

            if (shouldRequirePersonalInfo) {
                commonRequiredFieldsFilled = p.relationship && p.fullName && p.gender && p.dob && p.collectionMethod && (isSampleTypeRequired ? p.sampleType : true);
            } else {
                commonRequiredFieldsFilled = p.relationship && p.collectionMethod && (isSampleTypeRequired ? p.sampleType : true);
            }

            if (!commonRequiredFieldsFilled) {
                return false;
            }

            if (testType === 'Hành chính' && shouldRequirePersonalInfo) {
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

        const bookingData = {
            serviceType,
            numSamples,
            testType,
            appointmentDate,
            notes,
            resultTime,
            participants,
            registrantId: user.id
        };

        navigate('/booking-details', { state: { bookingData } });
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

                    <div className="form-group">
                        <label htmlFor="serviceType">Loại dịch vụ:</label>
                        <select
                            id="serviceType"
                            value={serviceType}
                            onChange={(e) => {
                                const selectedService = e.target.value;
                                setServiceType(selectedService);
                                // Thay đổi logic numSamples cho Xét nghiệm ADN Thai nhi
                                if (selectedService === 'Xét nghiệm ADN Thai nhi') {
                                    setNumSamples(3); // Mặc định 1 thai nhi + 2 cha nghi vấn
                                } else if (selectedService === 'Xét nghiệm ADN Anh em ruột') {
                                    setNumSamples(2);
                                } else {
                                    setNumSamples(2);
                                }
                                setTestType('');
                            }}
                            required
                        >
                            <option value="">Chọn loại dịch vụ</option>
                            {serviceOptions.map((service, index) => (
                                <option key={index} value={service}>{service}</option>
                            ))}
                        </select>
                    </div>

                    {serviceType === 'Xét nghiệm ADN Thai nhi' ? (
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
                            {serviceType === 'Xét nghiệm ADN Anh em ruột' && (
                                <small>Nếu có mẹ (tùy chọn), vui lòng chọn 3 mẫu.</small>
                            )}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="testType">Loại xét nghiệm:</label>
                        <select
                            id="testType"
                            value={testType}
                            onChange={(e) => setTestType(e.target.value)}
                            required
                        >
                            <option value="">Chọn loại xét nghiệm</option>
                            <option value="Dân sự">Dân sự</option>
                            <option value="Hành chính">Hành chính</option>
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
                        {serviceType === 'Xét nghiệm ADN Thai nhi' ? (
                            <p className="static-option">Tiêu chuẩn (7-10 ngày làm việc)</p>
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

                            const isPersonalInfoRequired = !(serviceType === 'Xét nghiệm ADN Anh em ruột' && currentParticipant.relationship === 'Mẹ (tùy chọn)');
                            const hideSampleType = serviceType === 'Xét nghiệm ADN Thai nhi' && currentParticipant.relationship === 'Thai nhi (Mẫu từ mẹ)';

                            const isCollectionMethodFixedToCenter = testType === 'Hành chính' || (serviceType === 'Xét nghiệm ADN Thai nhi' && currentParticipant.relationship === 'Thai nhi (Mẫu từ mẹ)');

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
                                                // Disable chọn quan hệ nếu là thai nhi và đã được gán mặc định
                                                disabled={serviceType === 'Xét nghiệm ADN Thai nhi' && (index === 0 || (index > 0 && currentParticipant.relationship === 'Cha nghi vấn'))}
                                            >
                                                <option value="">Chọn quan hệ</option>
                                                {getRelationshipOptions().map((rel, relIndex) => (
                                                    <option key={relIndex} value={rel}>{rel}</option>
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
                                                <label>Năm sinh:</label>
                                                <input
                                                    type="number"
                                                    value={currentParticipant.dob || ''}
                                                    onChange={(e) => handleParticipantChange(index, 'dob', parseInt(e.target.value) || '')}
                                                    min="1900"
                                                    max={new Date().getFullYear()}
                                                    required={true}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <p>**(Thông tin cá nhân không bắt buộc cho mẫu này)**</p>
                                    )}

                                    {testType === 'Hành chính' && isPersonalInfoRequired && (
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
                                                    <option key={sampleIndex} value={sample}>{sample}</option>
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
                                                    <option key={methodIndex} value={method}>{method}</option>
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