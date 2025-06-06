import React, { useState } from 'react';
import './LoginPage.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const GoogleIcon = () => (
  <svg className="google-svg" width="22" height="22" viewBox="0 0 48 48">
    <g>
      <path fill="#4285F4" d="M24 9.5c3.54 0 6.07 1.53 7.47 2.81l5.54-5.39C33.64 3.54 29.2 1.5 24 1.5 14.98 1.5 7.06 7.44 3.68 15.09l6.44 5.01C11.36 14.01 17.13 9.5 24 9.5z"/>
      <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.03l7.18 5.59C43.93 37.13 46.1 31.36 46.1 24.55z"/>
      <path fill="#FBBC05" d="M10.12 28.09a14.5 14.5 0 0 1 0-8.18l-6.44-5.01A23.97 23.97 0 0 0 1.9 24c0 3.77.9 7.34 2.48 10.5l6.44-5.01z"/>
      <path fill="#EA4335" d="M24 46.5c6.48 0 11.92-2.15 15.89-5.86l-7.18-5.59c-2 1.36-4.56 2.18-8.71 2.18-6.87 0-12.64-4.51-14.88-10.59l-6.44 5.01C7.06 40.56 14.98 46.5 24 46.5z"/>
      <path fill="none" d="M1.9 1.9h44.2v44.2H1.9z"/>
    </g>
  </svg>
);

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await login(email, password);
    setLoading(false);
    if (!result.success) {
      setError(result.error);
    } else {
      navigate('/home');
    }
  };

  // Đăng nhập với tư cách khách
  const handleGuestLogin = () => {
    // Tạo user giả lập role GUEST
    const guestUser = {
      email: 'guest@bloodline.com',
      fullName: 'Guest User',
      role: 'GUEST',
    };
    localStorage.setItem('user', JSON.stringify(guestUser));
    localStorage.removeItem('token');
    navigate('/home');
  };

  // Đăng nhập bằng Google (placeholder)
  const handleGoogleLogin = () => {
    alert('Tính năng đăng nhập bằng Google sẽ được cập nhật sau!');
  };

  return (
    <div className="login-root">
      <div className="login-left">
        <img src="/logo.png" alt="Logo" className="login-logo" />
        <h2>WELCOME</h2>
        <p>Register with your personal details to use all of site feature</p>
        <button className="signup-btn" onClick={() => navigate('/signup')}>SIGN UP</button>
      </div>
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>SIGN IN</h2>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="show-password"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>
          <div className="forgot-row">
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>
          {error && <div className="error-msg">{error}</div>}
          <button className="signin-btn" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'SIGN IN'}
          </button>
          <div className="other-login-btns">
            <button type="button" className="guest-btn" onClick={handleGuestLogin}>
              Đăng nhập với tư cách Khách
            </button>
            <button type="button" className="google-btn" onClick={handleGoogleLogin}>
              <GoogleIcon /> Đăng nhập bằng Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
