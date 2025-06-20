import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom'; // Thêm useLocation để nhận dữ liệu khi chỉnh sửa
import Header from '../components/Header';
import Footer from '../components/Footer';
import './BookingCreate.css';

export default function BookingCreate() {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const initialBookingData = location.state?.initialBookingData;

    // Khởi tạo các state của form từ initialBookingData nếu có
    const [serviceType, setServiceType] = useState(initialBookingData?.serviceType || '');
    const [numSamples, setNumSamples] = useState(initialBookingData?.numSamples || 2);
    const [testType, setTestType] = useState(initialBookingData?.testType || '');
    const [appointmentDate, setAppointmentDate] = useState(initialBookingData?.appointmentDate || '');
    const [notes, setNotes] = useState(initialBookingData?.notes || '');
    const today = new Date().toISOString().split('T')[0];

    const [participants, setParticipants] = useState(initialBookingData?.participants || []);

    // Loại bỏ currentStep nếu bạn đã chuyển sang BookingDetails riêng
    // const [currentStep, setCurrentStep] = useState('form');

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
        if (initialBookingData && participants.length > 0) {
            return;
        }

        setParticipants(prevParticipants => {
            const newParticipants = Array.from({ length: numSamples }, (_, i) => {
                const existingParticipant = prevParticipants[i];

                let defaultCollectionMethod = '';
                if (testType === 'Hành chính' || serviceType === 'Xét nghiệm ADN Thai nhi') {
                    defaultCollectionMethod = 'Thu mẫu tại trung tâm';
                }

                const relationshipOptions = getRelationshipOptions();
                let defaultRelationship = 'Quan hệ nghi vấn';

                // Logic cho loại dịch vụ Thai nhi
                if (serviceType === 'Xét nghiệm ADN Thai nhi') {
                    if (i === 0) {
                        defaultRelationship = 'Thai nhi (Mẫu từ mẹ)';
                    } else if (i === 1) {
                        defaultRelationship = 'Cha nghi vấn';
                    }
                } else {
                    defaultRelationship = relationshipOptions[i] || 'Quan hệ nghi vấn';
                }

                // === SỬA ĐỔI ĐẦU TIÊN: Logic đặt giới tính mặc định ===
                let defaultGender = '';
                if (defaultRelationship === 'Cha' || defaultRelationship === 'Ông' || defaultRelationship === 'Cha nghi vấn') {
                    defaultGender = 'Nam';
                } else if (defaultRelationship === 'Mẹ' || defaultRelationship === 'Bà' || defaultRelationship === 'Thai nhi (Mẫu từ mẹ)') {
                    defaultGender = 'Nữ';
                }
                // Nếu không thuộc các trường hợp trên (ví dụ: Con, Cháu, Anh/Em ruột), giới tính sẽ là rỗng
                // và người dùng cần chọn.

                if (existingParticipant) {
                    return {
                        ...existingParticipant,
                        gender: existingParticipant.gender || defaultGender,
                        collectionMethod: (testType === 'Hành chính' || serviceType === 'Xét nghiệm ADN Thai nhi')
                            ? defaultCollectionMethod
                            : (existingParticipant.collectionMethod || ''),
                        relationship: relationshipOptions.includes(existingParticipant.relationship)
                            ? existingParticipant.relationship
                            : defaultRelationship,
                        personalId: existingParticipant.personalId || '',
                        address: existingParticipant.address || '',
                        relationToRegistrant: existingParticipant.relationToRegistrant || '',
                        fullName: existingParticipant.fullName || '',
                        dob: existingParticipant.dob || '',
                    };
                } else {
                    const baseParticipant = {
                        fullName: '',
                        gender: defaultGender,
                        dob: '',
                        relationship: defaultRelationship,
                        collectionMethod: defaultCollectionMethod,
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

        if (!serviceType || !testType || !appointmentDate) {
            alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
            return;
        }

        if (serviceType === 'Xét nghiệm ADN Thai nhi') {
            if (numSamples !== 2) {
                alert('Dịch vụ "Xét nghiệm ADN Thai nhi" yêu cầu chính xác 2 mẫu (Thai nhi và Cha nghi vấn).');
                return;
            }
            const firstParticipantRel = participants[0]?.relationship;
            const secondParticipantRel = participants[1]?.relationship;
            if (!((firstParticipantRel === 'Thai nhi (Mẫu từ mẹ)' && secondParticipantRel === 'Cha nghi vấn') ||
                (firstParticipantRel === 'Cha nghi vấn' && secondParticipantRel === 'Thai nhi (Mẫu từ mẹ)'))) {
                alert('Vui lòng chọn đúng quan hệ: "Thai nhi (Mẫu từ mẹ)" và "Cha nghi vấn" cho xét nghiệm thai nhi.');
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

            if (shouldRequirePersonalInfo) {
                commonRequiredFieldsFilled = p.relationship && p.fullName && p.gender && p.dob && p.collectionMethod;
            } else {
                commonRequiredFieldsFilled = p.relationship && p.collectionMethod;
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
            participants,
            registrantId: user.id
        };

        // Chuyển hướng sang trang BookingDetails với dữ liệu đặt lịch
        navigate('/booking-details', { state: { bookingData } });
    };

    if (authLoading || !user) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontSize: '24px' }}>
                Đang tải...
            </div>
        );
    }

    // --- LOẠI BỎ PHẦN currentStep === 'confirmation' Ở ĐÂY ---
    // Vì bạn đã có trang BookingDetails riêng biệt.

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
                                if (selectedService === 'Xét nghiệm ADN Thai nhi') {
                                    setNumSamples(2);
                                } else if (selectedService === 'Xét nghiệm ADN Anh em ruột') {
                                    setNumSamples(2);
                                }
                                else {
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
                            <label>Số mẫu cần xét nghiệm:</label>
                            <p className="static-option">2 (Thai nhi & Cha nghi vấn)</p>
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
                                                disabled={serviceType === 'Xét nghiệm ADN Thai nhi' && (currentParticipant.relationship === 'Thai nhi (Mẫu từ mẹ)' || currentParticipant.relationship === 'Cha nghi vấn')}
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
                                                    {/* === SỬA ĐỔI THỨ HAI: Loại bỏ tùy chọn 'Khác' === */}
                                                    <option value="Nam">Nam</option>
                                                    <option value="Nữ">Nữ</option>
                                                    {/* <option value="Khác">Khác</option> */} {/* Dòng này bị loại bỏ */}
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

                                    {(testType === 'Hành chính' || serviceType === 'Xét nghiệm ADN Thai nhi') ? (
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