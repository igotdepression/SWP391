import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    // Kiểm tra email có được nhập không
    if (!email.trim()) {
      setError('Vui lòng nhập địa chỉ email');
      setLoading(false);
      return;
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Vui lòng nhập địa chỉ email hợp lệ');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.forgotPassword(email);
      setMessage('Đã gửi email hướng dẫn đặt lại mật khẩu. Vui lòng kiểm tra hộp thư của bạn.');
      setEmail('');
    } catch (error) {
      setError(error.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="forgot-password-root">
      <div className="forgot-password-container">
        <div className="forgot-password-header">
          <img src="/logo.png" alt="Logo" className="forgot-password-logo" />
          <h2>QUÊN MẬT KHẨU</h2>
          <p>Nhập địa chỉ email của bạn để nhận hướng dẫn đặt lại mật khẩu</p>
        </div>

        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Nhập địa chỉ email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="error-msg" role="alert">
              {error}
            </div>
          )}

          {message && (
            <div className="success-msg" role="alert">
              {message}
            </div>
          )}

          <button 
            className="submit-btn" 
            type="submit" 
            disabled={loading}
          >
            {loading ? 'Đang gửi...' : 'GỬI YÊU CẦU'}
          </button>

          <div className="back-to-login">
            <button 
              type="button" 
              className="back-btn"
              onClick={handleBackToLogin}
              disabled={loading}
            >
              ← Quay lại đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword; 