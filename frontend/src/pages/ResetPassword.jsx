import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authAPI } from '../services/api';
import './ResetPassword.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Lấy token từ URL params
    const tokenFromUrl = searchParams.get('token');
    if (!tokenFromUrl) {
      setError('Link đặt lại mật khẩu không hợp lệ');
      return;
    }
    setToken(tokenFromUrl);
    
    // Verify token khi component mount
    const verifyToken = async () => {
      try {
        await authAPI.verifyResetToken(tokenFromUrl);
      } catch (error) {
        setError('Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn');
      }
    };
    
    verifyToken();
  }, [searchParams]);

  const validatePassword = (password) => {
    // Ít nhất 8 ký tự, có chữ hoa, chữ thường, số
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    // Kiểm tra mật khẩu có được nhập không
    if (!password.trim() || !confirmPassword.trim()) {
      setError('Vui lòng nhập đầy đủ mật khẩu và xác nhận mật khẩu');
      setLoading(false);
      return;
    }

    // Kiểm tra mật khẩu có khớp không
    if (password !== confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp');
      setLoading(false);
      return;
    }

    // Kiểm tra độ mạnh của mật khẩu
    if (!validatePassword(password)) {
      setError('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.resetPassword(token, password);
      setMessage('Đặt lại mật khẩu thành công! Bạn có thể đăng nhập với mật khẩu mới.');
      
      // Chuyển hướng về trang đăng nhập sau 3 giây
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setError(error.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  if (!token) {
    return (
      <div className="reset-password-root">
        <div className="reset-password-container">
          <div className="error-container">
            <h2>Link không hợp lệ</h2>
            <p>Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.</p>
            <button className="back-btn" onClick={handleBackToLogin}>
              Quay lại đăng nhập
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-root">
      <div className="reset-password-container">
        <div className="reset-password-header">
          <img src="/logo.png" alt="Logo" className="reset-password-logo" />
          <h2>ĐẶT LẠI MẬT KHẨU</h2>
          <p>Tạo mật khẩu mới cho tài khoản của bạn</p>
        </div>

        <form className="reset-password-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Nhập mật khẩu mới"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              disabled={loading}
            />
            <span
              className="show-password"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? 'Ẩn' : 'Hiện'}
            </span>
          </div>

          <div className="input-group">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Xác nhận mật khẩu mới"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              disabled={loading}
            />
            <span
              className="show-password"
              onClick={() => setShowConfirmPassword((v) => !v)}
            >
              {showConfirmPassword ? 'Ẩn' : 'Hiện'}
            </span>
          </div>

          <div className="password-requirements">
            <h4>Yêu cầu mật khẩu:</h4>
            <ul>
              <li className={password.length >= 8 ? 'valid' : 'invalid'}>
                Ít nhất 8 ký tự
              </li>
              <li className={/[A-Z]/.test(password) ? 'valid' : 'invalid'}>
                Có chữ hoa
              </li>
              <li className={/[a-z]/.test(password) ? 'valid' : 'invalid'}>
                Có chữ thường
              </li>
              <li className={/\d/.test(password) ? 'valid' : 'invalid'}>
                Có số
              </li>
            </ul>
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
            {loading ? 'Đang xử lý...' : 'ĐẶT LẠI MẬT KHẨU'}
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

export default ResetPassword; 