// pages/Manager/Feedback.jsx
import React, { useEffect, useState } from 'react';
import { Card, Button, Input } from '../../components/ui/ui';
import { Eye, MessageCircle, EyeOff } from 'lucide-react';
import './Feedback.css';

const fakeFeedbacks = [
    {
        feedbackID: 1,
        bookingID: 'BK001',
        customerName: 'Nguyễn Văn A',
        comments: 'Dịch vụ xét nghiệm rất tốt, nhân viên chuyên nghiệp và thân thiện!',
        answers: 'Cảm ơn anh đã tin tưởng dịch vụ của chúng tôi!',
        rating: 5,
        createDate: '2024-06-01',
        returnDate: '2024-06-05',
        status: 'Đã trả lời',
        isVisible: true
    },
    {
        feedbackID: 2,
        bookingID: 'BK002',
        customerName: 'Trần Thị B',
        comments: 'Thời gian chờ hơi lâu, nhưng kết quả chính xác.',
        answers: null,
        rating: 4,
        createDate: '2024-06-02',
        returnDate: null,
        status: 'Chờ xác nhận',
        isVisible: true
    },
    {
        feedbackID: 3,
        bookingID: 'BK003',
        customerName: 'Lê Văn C',
        comments: 'Cần cải thiện quy trình đăng ký.',
        answers: 'Chúng tôi sẽ cải thiện quy trình để phục vụ khách hàng tốt hơn.',
        rating: 3,
        createDate: '2024-06-03',
        returnDate: '2024-06-06',
        status: 'Đã trả lời',
        isVisible: true
    },
    {
        feedbackID: 4,
        bookingID: 'BK004',
        customerName: 'Phạm Thị D',
        comments: 'Excellent service! Very satisfied with the results.',
        answers: null,
        rating: 5,
        createDate: '2024-06-04',
        returnDate: null,
        status: 'Chờ xác nhận',
        isVisible: false
    },
    {
        feedbackID: 5,
        bookingID: 'BK005',
        customerName: 'Hoàng Văn E',
        comments: 'Phòng khám sạch sẽ, thiết bị hiện đại. Tuy nhiên giá hơi cao.',
        answers: 'Chúng tôi cam kết mang đến chất lượng dịch vụ tốt nhất với giá cả hợp lý.',
        rating: 4,
        createDate: '2024-06-05',
        returnDate: '2024-06-08',
        status: 'Đã trả lời',
        isVisible: true
    },
    {
        feedbackID: 6,
        bookingID: 'BK006',
        customerName: 'Vũ Thị F',
        comments: 'Nhân viên nhiệt tình, kết quả nhanh chóng và chính xác.',
        answers: null,
        rating: 5,
        createDate: '2024-06-06',
        returnDate: null,
        status: 'Chờ xác nhận',
        isVisible: true
    },
    {
        feedbackID: 7,
        bookingID: 'BK007',
        customerName: 'Ngô Minh G',
        comments: 'Có thể cải thiện hệ thống đặt lịch online để thuận tiện hơn.',
        answers: 'Cảm ơn góp ý của bạn. Chúng tôi đang nâng cấp hệ thống đặt lịch.',
        rating: 3,
        createDate: '2024-06-07',
        returnDate: '2024-06-10',
        status: 'Đã trả lời',
        isVisible: true
    },
    {
        feedbackID: 8,
        bookingID: 'BK008',
        customerName: 'Đặng Thị H',
        comments: 'Dịch vụ tuyệt vời! Tôi sẽ giới thiệu cho bạn bè.',
        answers: 'Cảm ơn bạn rất nhiều! Chúng tôi rất vui khi được phục vụ bạn.',
        rating: 5,
        createDate: '2024-06-08',
        returnDate: '2024-06-09',
        status: 'Đã trả lời',
        isVisible: true
    },
    {
        feedbackID: 9,
        bookingID: 'BK009',
        customerName: 'Bùi Văn I',
        comments: 'Thời gian chờ kết quả khá lâu, mong cải thiện.',
        answers: null,
        rating: 2,
        createDate: '2024-06-09',
        returnDate: null,
        status: 'Chờ xác nhận',
        isVisible: true
    },
    {
        feedbackID: 10,
        bookingID: 'BK010',
        customerName: 'Lý Thị K',
        comments: 'Địa điểm thuận tiện, bác sĩ tư vấn chi tiết và dễ hiểu.',
        answers: 'Cảm ơn chị đã lựa chọn dịch vụ của chúng tôi!',
        rating: 4,
        createDate: '2024-06-10',
        returnDate: '2024-06-11',
        status: 'Đã trả lời',
        isVisible: true
    }
];

export default function Feedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showReplyModal, setShowReplyModal] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterRating, setFilterRating] = useState('all');
    const [searchBookingID, setSearchBookingID] = useState('');

    useEffect(() => {
        setTimeout(() => setFeedbacks(fakeFeedbacks), 300);
    }, []);

    // Filter feedbacks
    const filteredFeedbacks = feedbacks.filter(feedback => {
        const statusMatch = filterStatus === 'all' || feedback.status === filterStatus;
        const ratingMatch = filterRating === 'all' || feedback.rating.toString() === filterRating;
        const bookingMatch = searchBookingID === '' || feedback.bookingID.toLowerCase().includes(searchBookingID.toLowerCase());
        return statusMatch && ratingMatch && bookingMatch;
    });

    const handleViewDetail = (feedback) => {
        setSelectedFeedback(feedback);
        setShowDetailModal(true);
    };

    const handleReply = (feedback) => {
        setSelectedFeedback(feedback);
        setReplyText(feedback.answers || '');
        setShowReplyModal(true);
    };

    const handleToggleVisibility = (feedbackID) => {
        const updatedFeedbacks = feedbacks.map(feedback => 
            feedback.feedbackID === feedbackID 
                ? { ...feedback, isVisible: !feedback.isVisible }
                : feedback
        );
        setFeedbacks(updatedFeedbacks);
        const action = updatedFeedbacks.find(f => f.feedbackID === feedbackID).isVisible ? 'hiển thị' : 'ẩn';
        alert(`Đã ${action} feedback thành công!`);
    };

    const handleSaveReply = () => {
        if (!replyText.trim()) {
            alert('Vui lòng nhập nội dung trả lời!');
            return;
        }

        const updatedFeedbacks = feedbacks.map(feedback => 
            feedback.feedbackID === selectedFeedback.feedbackID 
                ? { 
                    ...feedback, 
                    answers: replyText,
                    returnDate: new Date().toISOString().split('T')[0],
                    status: 'Đã trả lời'
                }
                : feedback
        );
        
        setFeedbacks(updatedFeedbacks);
        setShowReplyModal(false);
        setReplyText('');
        alert('Trả lời feedback thành công!');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Đã trả lời': return 'status-replied';
            case 'Chờ xác nhận': return 'status-pending';
            default: return '';
        }
    };

    const renderStars = (rating) => {
        return '⭐'.repeat(rating) + ` (${rating}/5)`;
    };

    return (
        <div className="feedback-management-container">
            <Card className="feedback-card">
                <h3>💬 Quản lý Feedback từ Khách hàng</h3>
                
                {/* Filters */}
                <div className="feedback-filters">
                    <div className="filter-group">
                        <label>Tìm theo Booking ID:</label>
                        <Input
                            type="text"
                            placeholder="Nhập Booking ID..."
                            value={searchBookingID}
                            onChange={(e) => setSearchBookingID(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <div className="filter-group">
                        <label>Trạng thái:</label>
                        <select 
                            value={filterStatus} 
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">Tất cả</option>
                            <option value="Chờ xác nhận">Chờ xác nhận</option>
                            <option value="Đã trả lời">Đã trả lời</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Đánh giá:</label>
                        <select 
                            value={filterRating} 
                            onChange={(e) => setFilterRating(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">Tất cả</option>
                            <option value="5">5 sao ⭐⭐⭐⭐⭐</option>
                            <option value="4">4 sao ⭐⭐⭐⭐</option>
                            <option value="3">3 sao ⭐⭐⭐</option>
                            <option value="2">2 sao ⭐⭐</option>
                            <option value="1">1 sao ⭐</option>
                        </select>
                    </div>
                </div>

                {/* Statistics */}
                <div className="feedback-stats">
                    <div className="stat-item">
                        <span className="stat-number">{feedbacks.length}</span>
                        <span className="stat-label">Tổng feedback</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{feedbacks.filter(f => f.status === 'Chờ xác nhận').length}</span>
                        <span className="stat-label">Chờ trả lời</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{feedbacks.filter(f => f.status === 'Đã trả lời').length}</span>
                        <span className="stat-label">Đã trả lời</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">
                            {feedbacks.length > 0 ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1) : '0'}
                        </span>
                        <span className="stat-label">Đánh giá TB</span>
                    </div>
                </div>

                {/* Table */}
                <div className="table-responsive">
                    <table className="feedback-table">
                        <thead>
                            <tr>
                                <th>#ID</th>
                                <th>📋 Mã đơn</th>
                                <th>👤 Khách hàng</th>
                                <th>⭐ Đánh giá</th>
                                <th>💬 Nội dung đánh giá</th>
                                <th>📅 Ngày tạo</th>
                                <th>📅 Ngày trả lời</th>
                                <th>🏷️ Trạng thái</th>
                                <th>⚙️ Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFeedbacks.map(feedback => (
                                <tr key={feedback.feedbackID}>
                                    <td className="feedback-id">#{feedback.feedbackID}</td>
                                    <td className="booking-id">{feedback.bookingID}</td>
                                    <td>{feedback.customerName}</td>
                                    <td className="rating-cell">{renderStars(feedback.rating)}</td>
                                    <td className="comment-cell">
                                        <div className="comment-preview">
                                            {feedback.comments.length > 40 
                                                ? feedback.comments.substring(0, 40) + '...' 
                                                : feedback.comments}
                                        </div>
                                    </td>
                                    <td>{new Date(feedback.createDate).toLocaleDateString('vi-VN')}</td>
                                    <td>
                                        {feedback.returnDate 
                                            ? new Date(feedback.returnDate).toLocaleDateString('vi-VN')
                                            : '⏳ Chưa trả lời'}
                                    </td>
                                    <td>
                                        <span className={`status-badge ${getStatusColor(feedback.status)}`}>
                                            {feedback.status === 'Đã trả lời' ? '✅ Đã trả lời' : '⏳ Chờ xác nhận'}
                                        </span>
                                    </td>
                                    <td className="action-cell">
                                        <button 
                                            className="action-btn view-btn"
                                            onClick={() => handleViewDetail(feedback)}
                                            title="Xem chi tiết"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button 
                                            className="action-btn reply-btn"
                                            onClick={() => handleReply(feedback)}
                                            title="Trả lời feedback"
                                        >
                                            <MessageCircle size={16} />
                                        </button>
                                        <button 
                                            className={`action-btn ${feedback.isVisible ? 'hide-btn' : 'show-btn'}`}
                                            onClick={() => handleToggleVisibility(feedback.feedbackID)}
                                            title={feedback.isVisible ? 'Ẩn feedback' : 'Hiển thị feedback'}
                                        >
                                            {feedback.isVisible ? (
                                                <EyeOff size={16} />
                                            ) : (
                                                <Eye size={16} />
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredFeedbacks.length === 0 && (
                    <div className="no-data">
                        <p>📭 Không có feedback nào phù hợp với bộ lọc hiện tại.</p>
                    </div>
                )}
            </Card>

            {/* Detail Modal */}
            {showDetailModal && selectedFeedback && (
                <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
                    <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>💬 Chi tiết Feedback</h3>
                        <div className="feedback-detail">
                            <div className="detail-row">
                                <label>Feedback ID:</label>
                                <span>#{selectedFeedback.feedbackID}</span>
                            </div>
                            <div className="detail-row">
                                <label>Booking ID:</label>
                                <span>{selectedFeedback.bookingID}</span>
                            </div>
                            <div className="detail-row">
                                <label>Khách hàng:</label>
                                <span>{selectedFeedback.customerName}</span>
                            </div>
                            <div className="detail-row">
                                <label>Đánh giá:</label>
                                <span className="rating-display">{renderStars(selectedFeedback.rating)}</span>
                            </div>
                            <div className="detail-row">
                                <label>Feedback:</label>
                                <p className="feedback-content">{selectedFeedback.comments}</p>
                            </div>
                            <div className="detail-row">
                                <label>Trả lời:</label>
                                <p className="answer-content">
                                    {selectedFeedback.answers || '⏳ Chưa có trả lời'}
                                </p>
                            </div>
                            <div className="detail-row">
                                <label>Ngày tạo:</label>
                                <span>{new Date(selectedFeedback.createDate).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <div className="detail-row">
                                <label>Ngày trả lời:</label>
                                <span>
                                    {selectedFeedback.returnDate 
                                        ? new Date(selectedFeedback.returnDate).toLocaleDateString('vi-VN')
                                        : '⏳ Chưa trả lời'}
                                </span>
                            </div>
                            <div className="detail-row">
                                <label>Trạng thái:</label>
                                <span className={`status-badge ${getStatusColor(selectedFeedback.status)}`}>
                                    {selectedFeedback.status === 'Đã trả lời' ? '✅ Đã trả lời' : '⏳ Chờ xác nhận'}
                                </span>
                            </div>
                            <div className="detail-row">
                                <label>Hiển thị:</label>
                                <span className={`visibility-badge ${selectedFeedback.isVisible ? 'visible' : 'hidden'}`}>
                                    {selectedFeedback.isVisible ? '👁️ Hiển thị' : '🙈 Ẩn'}
                                </span>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <Button onClick={() => setShowDetailModal(false)}>🔙 Đóng</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reply Modal */}
            {showReplyModal && selectedFeedback && (
                <div className="modal-overlay" onClick={() => setShowReplyModal(false)}>
                    <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>📝 Trả lời Feedback</h3>
                        <div className="reply-form">
                            <div className="feedback-info">
                                <p><strong>📋 Booking ID:</strong> {selectedFeedback.bookingID}</p>
                                <p><strong>👤 Khách hàng:</strong> {selectedFeedback.customerName}</p>
                                <p><strong>⭐ Đánh giá:</strong> {renderStars(selectedFeedback.rating)}</p>
                                <div className="original-feedback">
                                    <strong>💬 Feedback:</strong>
                                    <p className="feedback-text">{selectedFeedback.comments}</p>
                                </div>
                            </div>
                            <div className="reply-input-group">
                                <label>✏️ Nội dung trả lời:</label>
                                <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder="Nhập nội dung trả lời cho khách hàng..."
                                    rows="5"
                                    className="reply-textarea"
                                />
                            </div>
                        </div>
                        <div className="modal-actions">
                            <Button onClick={handleSaveReply}>📤 Gửi trả lời</Button>
                            <Button variant="outline" onClick={() => setShowReplyModal(false)}>❌ Hủy</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}