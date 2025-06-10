import React, { useState } from 'react';
import './SignUpPage.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirmPassword) {
      setError('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }
    setLoading(true);
    try {
      await authAPI.register(name, email, password);
      // Đăng ký thành công, tự động đăng nhập
      const result = await login(email, password);
      setLoading(false);
      if (result.success) {
        navigate('/home');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Đăng ký thất bại!');
    }
  };

  return (
    <div className="signup-root">
      <div className="signup-left">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>CREATE ACCOUNT</h2>
          <div className="input-group">
            <input
              type="text"
              name="fullName"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          {error && <div className="error-msg">{error}</div>}
          <button className="signup-btn" type="submit" disabled={loading}>
            {loading ? 'Đang đăng ký...' : 'SIGN UP'}
          </button>
        </form>
      </div>
      <div className="signup-right">
        <img src="/logo.png" alt="Logo" className="signup-logo" />
        <h2>WELCOME BACK</h2>
        <p>Enter your personal details to use all of site feature</p>
        <button className="signin-btn" onClick={() => navigate('/login')}>SIGN IN</button>
      </div>
    </div>
  );
};

export default SignUpPage; 