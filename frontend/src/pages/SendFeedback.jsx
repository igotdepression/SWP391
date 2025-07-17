import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './SendFeedback.css';

const SendFeedback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    // Lấy bookingId từ URL params hoặc state
    const searchParams = new URLSearchParams(location.search);
    const bookingIdFromUrl = searchParams.get('bookingId');
    const bookingIdFromState = location.state?.bookingId;
    const initialBookingId = bookingIdFromUrl || bookingIdFromState || '';

    // Lấy tab từ URL params hoặc localStorage
    const tabFromUrl = searchParams.get('tab');
    const savedTab = localStorage.getItem('feedback-active-tab');
    const initialTab = tabFromUrl || savedTab || 'create';

    const [formData, setFormData] = useState({
        bookingId: initialBookingId,
        rating: 0,
        content: '',
        customerName: user?.fullName || '',
        customerEmail: user?.email || ''
    });

    const [feedbackList, setFeedbackList] = useState([]);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [editingFeedback, setEditingFeedback] = useState(null);
    const [activeTab, setActiveTab] = useState(initialTab); // Sử dụng initialTab

    // Load existing feedback on component mount
    useEffect(() => {
        loadFeedbackList();
    }, []);

    // Lưu activeTab vào localStorage và URL khi thay đổi
    useEffect(() => {
        localStorage.setItem('feedback-active-tab', activeTab);

        // Cập nhật URL params
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set('tab', activeTab);

        // Giữ nguyên bookingId nếu có
        if (initialBookingId) {
            newSearchParams.set('bookingId', initialBookingId);
        }

        // Thay đổi URL mà không reload trang
        const newUrl = `${location.pathname}?${newSearchParams.toString()}`;
        window.history.replaceState(null, '', newUrl);
    }, [activeTab, location.pathname, location.search, initialBookingId]);

    const loadFeedbackList = async () => {
        try {
            // Giả lập API call để load feedback
            const mockFeedbacks = [
                {
                    id: 1,
                    bookingId: 'BK001',
                    rating: 5,
                    content: 'Dịch vụ rất tốt, nhân viên tận tình',
                    customerName: 'Nguyễn Văn A',
                    customerEmail: 'vana@email.com',
                    createdAt: '2024-01-15',
                    updatedAt: '2024-01-15'
                },
                {
                    id: 2,
                    bookingId: 'BK002',
                    rating: 4,
                    content: 'Quy trình chuyên nghiệp, kết quả chính xác',
                    customerName: 'Trần Thị B',
                    customerEmail: 'thib@email.com',
                    createdAt: '2024-01-20',
                    updatedAt: '2024-01-20'
                }
            ];
            setFeedbackList(mockFeedbacks);
        } catch (error) {
            console.error('Error loading feedback:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'content' && value.length > 500) return; // Giới hạn 500 ký tự

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRatingClick = (rating) => {
        setFormData(prev => ({
            ...prev,
            rating: rating
        }));
    };

    const handleRatingHover = (rating) => {
        setHoveredRating(rating);
    };

    const handleRatingLeave = () => {
        setHoveredRating(0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.bookingId.trim()) {
            alert('Vui lòng nhập ID đơn booking');
            return;
        }

        if (!formData.rating || !formData.content.trim()) {
            alert('Vui lòng đánh giá và nhập nội dung phản hồi');
            return;
        }

        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (editingFeedback) {
                // Update existing feedback
                const updatedFeedback = {
                    ...editingFeedback,
                    ...formData,
                    updatedAt: new Date().toISOString().split('T')[0]
                };

                setFeedbackList(prev =>
                    prev.map(item =>
                        item.id === editingFeedback.id ? updatedFeedback : item
                    )
                );

                setEditingFeedback(null);
                console.log('Feedback updated:', updatedFeedback);
            } else {
                // Create new feedback
                const newFeedback = {
                    id: Date.now(),
                    ...formData,
                    createdAt: new Date().toISOString().split('T')[0],
                    updatedAt: new Date().toISOString().split('T')[0]
                };

                setFeedbackList(prev => [newFeedback, ...prev]);
                console.log('Feedback created:', newFeedback);
            }

            setShowSuccess(true);

            // Reset form
            setTimeout(() => {
                setFormData({
                    bookingId: '',
                    rating: 0,
                    content: '',
                    customerName: user?.fullName || '',
                    customerEmail: user?.email || ''
                });
                setShowSuccess(false);
                // Chuyển sang tab xem phản hồi sau khi tạo/cập nhật thành công
                setActiveTab('view');
            }, 2000);

        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Có lỗi xảy ra khi gửi phản hồi. Vui lòng thử lại!');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (feedback) => {
        setFormData({
            bookingId: feedback.bookingId,
            rating: feedback.rating,
            content: feedback.content,
            customerName: feedback.customerName,
            customerEmail: feedback.customerEmail
        });
        setEditingFeedback(feedback);
        setActiveTab('create');
    };

    const handleDelete = async (feedbackId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa phản hồi này?')) {
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                setFeedbackList(prev => prev.filter(item => item.id !== feedbackId));
                console.log('Feedback deleted:', feedbackId);
            } catch (error) {
                console.error('Error deleting feedback:', error);
                alert('Có lỗi xảy ra khi xóa phản hồi');
            }
        }
    };

    const handleCancel = () => {
        setFormData({
            bookingId: '',
            rating: 0,
            content: '',
            customerName: user?.fullName || '',
            customerEmail: user?.email || ''
        });
        setEditingFeedback(null);
    };

    // Hàm xử lý thay đổi tab
    const handleTabChange = (newTab) => {
        setActiveTab(newTab);
        // Nếu cancel editing khi chuyển tab
        if (newTab !== 'create' && editingFeedback) {
            setEditingFeedback(null);
            handleCancel();
        }
    };

    const getRatingText = (rating) => {
        switch (rating) {
            case 1: return 'Rất không hài lòng';
            case 2: return 'Không hài lòng';
            case 3: return 'Bình thường';
            case 4: return 'Hài lòng';
            case 5: return 'Rất hài lòng';
            default: return 'Chọn đánh giá';
        }
    };

    const renderStars = (rating, isInteractive = false) => {
        return (
            <div className={`rating-stars ${isInteractive ? 'interactive' : 'readonly'}`}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`star ${star <= rating ? 'active' : ''}`}
                        onClick={isInteractive ? () => handleRatingClick(star) : undefined}
                        onMouseEnter={isInteractive ? () => handleRatingHover(star) : undefined}
                        onMouseLeave={isInteractive ? handleRatingLeave : undefined}
                    >
                        ⭐
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className="feedback-page">
            <Header />

            <div className="feedback-hero">
                <div className="container">
                    <h1>Phản hồi & Đánh giá</h1>
                    <p>Ý kiến của bạn giúp chúng tôi cải thiện dịch vụ tốt hơn</p>
                </div>
            </div>

            <div className="feedback-content">
                <div className="container">
                    <div className="feedback-tabs">
                        <button
                            className={`tab-button ${activeTab === 'create' ? 'active' : ''}`}
                            onClick={() => handleTabChange('create')}
                        >
                            {editingFeedback ? 'Sửa phản hồi' : 'Tạo phản hồi'}
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'view' ? 'active' : ''}`}
                            onClick={() => handleTabChange('view')}
                        >
                            Xem phản hồi ({feedbackList.length})
                        </button>
                    </div>

                    {activeTab === 'create' && (
                        <div className="feedback-form-container">
                            {showSuccess && (
                                <div className="success-message">
                                    <div className="success-icon">✅</div>
                                    <h3>
                                        {editingFeedback ? 'Cập nhật thành công!' : 'Cảm ơn bạn!'}
                                    </h3>
                                    <p>
                                        {editingFeedback
                                            ? 'Phản hồi đã được cập nhật thành công.'
                                            : 'Phản hồi của bạn đã được gửi thành công. Chúng tôi sẽ xem xét và phản hồi sớm nhất.'
                                        }
                                    </p>
                                </div>
                            )}

                            <form className="feedback-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>ID Đơn Booking *</label>
                                    <input
                                        type="text"
                                        name="bookingId"
                                        placeholder="Nhập ID đơn booking (VD: BK001)"
                                        value={formData.bookingId}
                                        onChange={handleInputChange}
                                        readOnly={!!initialBookingId}
                                        required
                                        className={initialBookingId ? 'readonly' : ''}
                                    />
                                    {initialBookingId && (
                                        <small className="field-note">
                                            ID được tự động điền từ đơn booking của bạn
                                        </small>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Thông tin khách hàng</label>
                                    <div className="contact-info">
                                        <input
                                            type="text"
                                            name="customerName"
                                            placeholder="Họ và tên"
                                            value={formData.customerName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <input
                                            type="email"
                                            name="customerEmail"
                                            placeholder="Email"
                                            value={formData.customerEmail}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Đánh giá tổng thể *</label>
                                    <div className="rating-container">
                                        {renderStars(hoveredRating || formData.rating, true)}
                                        <span className="rating-text">
                                            {getRatingText(hoveredRating || formData.rating)}
                                        </span>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Nội dung đánh giá *</label>
                                    <textarea
                                        name="content"
                                        placeholder="Chia sẻ trải nghiệm, ý kiến hoặc đề xuất của bạn về dịch vụ..."
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        rows="6"
                                        required
                                        maxLength="500"
                                    />
                                    <div className="char-count">
                                        {formData.content.length}/500 ký tự
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button
                                        type="button"
                                        className="btn-cancel"
                                        onClick={handleCancel}
                                    >
                                        {editingFeedback ? 'Hủy sửa' : 'Xóa'}
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn-submit"
                                        disabled={isSubmitting || !formData.rating || !formData.content.trim() || !formData.bookingId.trim()}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="loading-spinner"></span>
                                                {editingFeedback ? 'Đang cập nhật...' : 'Đang gửi...'}
                                            </>
                                        ) : (
                                            editingFeedback ? 'Cập nhật phản hồi' : 'Gửi phản hồi'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'view' && (
                        <div className="feedback-list-container">
                            <div className="feedback-list-header">
                                <h2>Danh sách phản hồi</h2>
                                <p>Tất cả phản hồi và đánh giá từ khách hàng</p>
                            </div>

                            {feedbackList.length === 0 ? (
                                <div className="empty-feedback">
                                    <div className="empty-icon">📝</div>
                                    <h3>Chưa có phản hồi nào</h3>
                                    <p>Hãy tạo phản hồi đầu tiên của bạn</p>
                                    <button
                                        className="btn-create-feedback"
                                        onClick={() => handleTabChange('create')}
                                    >
                                        Tạo phản hồi
                                    </button>
                                </div>
                            ) : (
                                <div className="feedback-list">
                                    {feedbackList.map((feedback) => (
                                        <div key={feedback.id} className="feedback-item">
                                            <div className="feedback-header">
                                                <div className="feedback-info">
                                                    <h4>Booking ID: {feedback.bookingId}</h4>
                                                    <div className="feedback-meta">
                                                        <span className="customer-name">{feedback.customerName}</span>
                                                        <span className="separator">•</span>
                                                        <span className="feedback-date">
                                                            {feedback.updatedAt !== feedback.createdAt
                                                                ? `Cập nhật: ${feedback.updatedAt}`
                                                                : `Tạo: ${feedback.createdAt}`
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="feedback-rating">
                                                    {renderStars(feedback.rating)}
                                                    <span className="rating-number">({feedback.rating}/5)</span>
                                                </div>
                                            </div>

                                            <div className="feedback-content-text">
                                                <p>{feedback.content}</p>
                                            </div>

                                            <div className="feedback-actions">
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => handleEdit(feedback)}
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => handleDelete(feedback.id)}
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default SendFeedback;