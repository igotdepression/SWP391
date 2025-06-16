import React from 'react';
import './BookingCreate.css';

export default function BookingDetails({
    serviceType,
    numSamples,
    testType,
    collectionMethod,
    appointmentDate,
    appointmentTime,
    notes,
    participants
}) {
    return (
        <section className="confirmation-section">
            <h2>Xác nhận thông tin đặt lịch</h2>
            <div className="confirmation-details">
                <p><strong>Loại dịch vụ:</strong> {serviceType}</p>
                <p><strong>Số mẫu:</strong> {numSamples}</p>
                <p><strong>Loại xét nghiệm:</strong> {testType}</p>
                <p><strong>Phương pháp thu mẫu:</strong> {collectionMethod}</p>
                <p><strong>Ngày hẹn:</strong> {appointmentDate}</p>
                <p><strong>Giờ hẹn:</strong> {appointmentTime}</p>
                <p><strong>Ghi chú:</strong> {notes || 'Không có'}</p>

                <h3>Thông tin người tham gia:</h3>
                {participants && participants.length > 0 ? (
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
        </section>
    );
}
