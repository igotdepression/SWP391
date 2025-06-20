import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './BookingCreate.css';

export default function BookingCreate() {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    // === State cho Form đặt lịch ===
    const [serviceType, setServiceType] = useState(''); // Loại dịch vụ (vd: Cha con)
    const [numSamples, setNumSamples] = useState(2); // Số mẫu cần xét nghiệm, mặc định 2
    const [testType, setTestType] = useState(''); // Loại xét nghiệm (Dân sự / Hành chính)
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [notes, setNotes] = useState('');
    const today = new Date().toISOString().split('T')[0];

    // State cho thông tin người tham gia
    const [participants, setParticipants] = useState([]);

    // State để quản lý bước của form (form điền / trang xác nhận)
    const [currentStep, setCurrentStep] = useState('form'); // 'form' hoặc 'confirmation'

    // Danh sách các loại dịch vụ (tạm thời hardcode, bạn có thể lấy từ API nếu cần)
    const serviceOptions = [
        'Xét nghiệm ADN Cha con',
        'Xét nghiệm ADN Mẹ con',
        'Xét nghiệm ADN Ông cháu',
        'Xét nghiệm ADN Bà cháu',
        'Xét nghiệm ADN Anh em ruột',
        'Xét nghiệm ADN Thai nhi',
    ];

    // Danh sách phương thức thu mẫu (có thể lấy từ API nếu cần)
    const collectionMethodOptions = [
        'Tự thu mẫu',
        'Thu mẫu tại nhà/văn phòng',
        'Thu mẫu tại trung tâm',
    ];

    // Hàm để lấy các tùy chọn quan hệ dựa trên loại dịch vụ
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
                return ['Thai nhi (Mẫu từ mẹ)', 'Cha nghi vấn']; // Thai nhi cần mẫu từ mẹ để phân tích
            default:
                return ['Quan hệ nghi vấn'];
        }
    }, [serviceType]);

    // === Redirect nếu chưa đăng nhập ===
    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
        }
    }, [user, authLoading, navigate]);

    // === useEffect để tự động tạo/cập nhật số lượng participants và collectionMethod mặc định ===
    useEffect(() => {
        setParticipants(prevParticipants => {
            const newParticipants = Array.from({ length: numSamples }, (_, i) => {
                const existingParticipant = prevParticipants[i];

                let defaultCollectionMethod = '';
                if (testType === 'Hành chính' || serviceType === 'Xét nghiệm ADN Thai nhi') {
                    defaultCollectionMethod = 'Thu mẫu tại trung tâm';
                }

                const relationshipOptions = getRelationshipOptions();
                const defaultRelationship = relationshipOptions[i] || 'Quan hệ nghi vấn';

                // Logic để đặt giới tính mặc định dựa trên quan hệ
                let defaultGender = '';
                if (defaultRelationship === 'Cha' || defaultRelationship === 'Ông' || defaultRelationship === 'Cha nghi vấn') {
                    defaultGender = 'Nam';
                } else if (defaultRelationship === 'Mẹ' || defaultRelationship === 'Bà') {
                    defaultGender = 'Nữ';
                }

                if (existingParticipant) {
                    return {
                        ...existingParticipant,
                        gender: existingParticipant.gender || defaultGender, // Giữ giá trị cũ nếu có, nếu không thì đặt mặc định
                        collectionMethod: (testType === 'Hành chính' || serviceType === 'Xét nghiệm ADN Thai nhi')
                            ? defaultCollectionMethod
                            : (existingParticipant.collectionMethod || ''),
                        personalId: existingParticipant.personalId || '', // Đảm bảo personalId được giữ lại nếu có
                        address: existingParticipant.address || '', // Đảm bảo address được giữ lại nếu có
                        relationToRegistrant: existingParticipant.relationToRegistrant || '', // Đảm bảo relationToRegistrant được giữ lại nếu có
                        relationship: relationshipOptions.includes(existingParticipant.relationship)
                            ? existingParticipant.relationship
                            : defaultRelationship
                    };
                } else {
                    const baseParticipant = {
                        fullName: '',
                        gender: defaultGender, // Đặt giới tính mặc định khi tạo mới
                        dob: '', // Năm sinh
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
    }, [numSamples, testType, serviceType, getRelationshipOptions]);

    // === Hàm tính tuổi từ năm sinh ===
    const calculateAge = (dobYear) => {
        if (!dobYear) return null;
        const currentYear = new Date().getFullYear();
        return currentYear - parseInt(dobYear);
    };

    // === Hàm xử lý thay đổi thông tin người tham gia ===
    const handleParticipantChange = (index, field, value) => {
        const updatedParticipants = [...participants];
        updatedParticipants[index] = { ...updatedParticipants[index], [field]: value };
        setParticipants(updatedParticipants);
    };

    // === Hàm xử lý submit form ===
    const handleSubmitBooking = (e) => {
        e.preventDefault();

        // Kiểm tra các trường bắt buộc chung
        if (!serviceType || !testType || !appointmentDate || !appointmentTime) {
            alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
            return;
        }

        // Kiểm tra số mẫu dựa trên loại dịch vụ
        if (serviceType === 'Xét nghiệm ADN Thai nhi') {
            if (numSamples !== 2) {
                alert('Dịch vụ "Xét nghiệm ADN Thai nhi" yêu cầu chính xác 2 mẫu (Thai nhi và Cha nghi vấn).');
                return;
            }
            // Đảm bảo quan hệ đúng
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
        } else { // Các loại dịch vụ khác
            if (numSamples < 2) {
                alert('Số mẫu xét nghiệm phải tối thiểu là 2 cho dịch vụ này.');
                return;
            }
        }

        // Kiểm tra xem tất cả thông tin người tham gia đã được điền đầy đủ chưa
        const allParticipantsFilled = participants.every(p => {
            // Đối với Thai nhi (Mẫu từ mẹ), không yêu cầu thông tin cá nhân chi tiết
            if (serviceType === 'Xét nghiệm ADN Thai nhi' && p.relationship === 'Thai nhi (Mẫu từ mẹ)') {
                // Chỉ cần đảm bảo collectionMethod đã được đặt (luôn là "Thu mẫu tại trung tâm")
                return p.collectionMethod !== '';
            }

            const age = calculateAge(p.dob); // Tính tuổi để kiểm tra điều kiện Mã định danh

            // Common required fields for all types
            let commonRequired = p.relationship && p.fullName && p.gender && p.dob && p.collectionMethod;

            // Đặc biệt xử lý cho Mẹ (tùy chọn) trong Anh em ruột - nếu là tùy chọn thì không bắt buộc tất cả các trường
            if (serviceType === 'Xét nghiệm ADN Anh em ruột' && p.relationship === 'Mẹ (tùy chọn)') {
                // Nếu có mẹ tùy chọn, chỉ yêu cầu collectionMethod và relationship
                return p.relationship && p.collectionMethod;
            }


            if (testType === 'Hành chính') {
                const personalIdRequired = age === null || age >= 14 ? p.personalId : true;

                return (
                    commonRequired &&
                    personalIdRequired &&
                    p.address &&
                    p.relationToRegistrant
                );
            } else { // Dân sự
                return commonRequired;
            }
        });

        if (!allParticipantsFilled) {
            alert('Vui lòng điền đầy đủ thông tin cho tất cả người tham gia. Lưu ý: Mã định danh cá nhân là bắt buộc đối với người từ 14 tuổi trở lên cho xét nghiệm Hành chính.');
            return;
        }

        // Chuyển sang trang xác nhận
        setCurrentStep('confirmation');
    };

    // === Render Loading State ===
    if (authLoading || !user) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontSize: '24px' }}>
                Đang tải...
            </div>
        );
    }

    // === Render Confirmation Page ===
    if (currentStep === 'confirmation') {
        return (
            <div className="homepage-root">
                <Header /> {/* Sử dụng Header component */}
                <main className="booking-create-content">
                    <section className="confirmation-section">
                        <h2>Xác nhận thông tin đặt lịch</h2>
                        <div className="confirmation-details">
                            <p><strong>Loại dịch vụ:</strong> {serviceType}</p>
                            <p><strong>Số mẫu:</strong> {numSamples}</p>
                            <p><strong>Loại xét nghiệm:</strong> {testType}</p>
                            <p><strong>Ngày hẹn:</strong> {appointmentDate}</p>
                            <p><strong>Giờ hẹn:</strong> {appointmentTime}</p>
                            <p><strong>Ghi chú:</strong> {notes || 'Không có'}</p>

                            <h3>Thông tin người tham gia:</h3>
                            {participants.length > 0 ? (
                                participants.map((p, index) => (
                                    <div key={index} className="participant-summary">
                                        <h4>Người tham gia {index + 1} ({p.relationship || 'Quan hệ nghi vấn'})</h4>
                                        {/* Hiển thị thông tin theo thứ tự yêu cầu */}
                                        {serviceType !== 'Xét nghiệm ADN Thai nhi' || p.relationship !== 'Thai nhi (Mẫu từ mẹ)' ? (
                                            <>
                                                <p>Họ và tên: {p.fullName || 'Chưa điền'}</p>
                                                <p>Giới tính: {p.gender || 'Chưa điền'}</p>
                                                <p>Năm sinh: {p.dob || 'Chưa điền'}</p>
                                            </>
                                        ) : (
                                            <p>Loại mẫu: Mẫu từ mẹ</p>
                                        )}


                                        {testType === 'Hành chính' && calculateAge(p.dob) >= 14 && (
                                            <p>Mã định danh cá nhân: {p.personalId || 'Chưa điền'}</p>
                                        )}
                                        {testType === 'Hành chính' && (
                                            <>
                                                <p>Địa chỉ: {p.address || 'Chưa điền'}</p>
                                                <p>Quan hệ với người đăng ký: {p.relationToRegistrant || 'Chưa điền'}</p>
                                            </>
                                        )}
                                        <p>Phương pháp thu mẫu: {p.collectionMethod || 'Chưa điền'}</p>
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

                <footer />
            </div>
        );
    }

    // === Render Booking Form (Default) ===
    return (
        <div className="homepage-root">
            <Header /> {/* Sử dụng Header component */}
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
                                    setNumSamples(2); // Mặc định 2, người dùng có thể thêm
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

                    {/* Hiển thị input số mẫu hoặc số mẫu cố định */}
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
                        <label htmlFor="appointmentTime">Giờ hẹn:</label>
                        <input
                            type="time"
                            id="appointmentTime"
                            value={appointmentTime}
                            onChange={(e) => setAppointmentTime(e.target.value)}
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

                    {/* === Phần thông tin người tham gia === */}
                    <div className="participants-section">
                        <h3>Thông tin người tham gia:</h3>
                        {Array.from({ length: numSamples }).map((_, index) => {
                            const currentParticipant = participants[index] || {};
                            const participantAge = calculateAge(currentParticipant.dob);

                            // Xác định liệu có nên yêu cầu các trường thông tin cá nhân hay không
                            const isPersonalInfoRequired = !(serviceType === 'Xét nghiệm ADN Thai nhi' && currentParticipant.relationship === 'Thai nhi (Mẫu từ mẹ)') &&
                                !(serviceType === 'Xét nghiệm ADN Anh em ruột' && currentParticipant.relationship === 'Mẹ (tùy chọn)');

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
                                                    <option key={relIndex} value={rel}>{rel}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Các trường thông tin cá nhân chỉ hiển thị nếu không phải là "Thai nhi (Mẫu từ mẹ)" */}
                                    {serviceType !== 'Xét nghiệm ADN Thai nhi' || currentParticipant.relationship !== 'Thai nhi (Mẫu từ mẹ)' ? (
                                        <>
                                            <div className="form-group">
                                                <label>Họ và tên:</label>
                                                <input
                                                    type="text"
                                                    value={currentParticipant.fullName || ''}
                                                    onChange={(e) => handleParticipantChange(index, 'fullName', e.target.value)}
                                                    required={isPersonalInfoRequired}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Giới tính:</label>
                                                <select
                                                    value={currentParticipant.gender || ''}
                                                    onChange={(e) => handleParticipantChange(index, 'gender', e.target.value)}
                                                    required={isPersonalInfoRequired}
                                                >
                                                    <option value="">Chọn giới tính</option>
                                                    <option value="Nam">Nam</option>
                                                    <option value="Nữ">Nữ</option>
                                                    <option value="Khác">Khác</option>
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
                                                    required={isPersonalInfoRequired}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <p>**(Thông tin cá nhân không áp dụng cho mẫu thai nhi)**</p>
                                    )}


                                    {/* Các trường dành riêng cho Hành chính */}
                                    {testType === 'Hành chính' && isPersonalInfoRequired && (
                                        <>
                                            {/* Mã định danh cá nhân chỉ hiển thị và bắt buộc nếu >= 14 tuổi */}
                                            {participantAge === null || participantAge >= 14 ? (
                                                <div className="form-group">
                                                    <label>Mã định danh cá nhân:</label>
                                                    <input
                                                        type="text"
                                                        value={currentParticipant.personalId || ''}
                                                        onChange={(e) => handleParticipantChange(index, 'personalId', e.target.value)}
                                                        required={true} // Bắt buộc nếu hiển thị
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
                                                        required={false} // Không bắt buộc
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

                                    {/* Phương thức thu mẫu (hiển thị cuối cùng) */}
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