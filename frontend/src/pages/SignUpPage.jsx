import React, { useState, useEffect } from 'react';
import './SignUpPage.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import vietnamLocations from '../data/vietnamLocations.json';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Location states
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);

  // Update districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      const province = vietnamLocations.provinces.find(p => p.code === selectedProvince);
      setDistricts(province?.districts || []);
      setSelectedDistrict('');
      setSelectedCommune('');
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);

  // Update communes when district changes
  useEffect(() => {
    if (selectedDistrict) {
      const district = districts.find(d => d.code === selectedDistrict);
      setCommunes(district?.communes || []);
      setSelectedCommune('');
    } else {
      setCommunes([]);
    }
  }, [selectedDistrict, districts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirmPassword || !selectedProvince || !selectedDistrict || !selectedCommune) {
      setError('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }
    setLoading(true);
    try {
      const province = vietnamLocations.provinces.find(p => p.code === selectedProvince)?.name;
      const district = districts.find(d => d.code === selectedDistrict)?.name;
      const commune = communes.find(c => c.code === selectedCommune)?.name;
      const address = `${commune}, ${district}, ${province}`;
      
      await authAPI.register(name, email, password, address);
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
          <h2>ĐĂNG KÍ TÀI KHOẢN</h2>
          <div className="input-group">
            <input
              type="text"
              name="fullName"
              placeholder="Họ & tên"
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
              placeholder="Mật khẩu"
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
              placeholder="xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          
          {/* Location Selection */}
          <div className="input-group">
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              required
            >
              <option value="">Chọn Tỉnh/Thành phố</option>
              {vietnamLocations.provinces.map((province) => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="input-group">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              required
              disabled={!selectedProvince}
            >
              <option value="">Chọn Quận/Huyện</option>
              {districts.map((district) => (
                <option key={district.code} value={district.code}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="input-group">
            <select
              value={selectedCommune}
              onChange={(e) => setSelectedCommune(e.target.value)}
              required
              disabled={!selectedDistrict}
            >
              <option value="">Chọn Xã/Phường</option>
              {communes.map((commune) => (
                <option key={commune.code} value={commune.code}>
                  {commune.name}
                </option>
              ))}
            </select>
          </div>

          {error && <div className="error-msg">{error}</div>}
          <button className="signup-btn" type="submit" disabled={loading}>
            {loading ? 'Đang đăng ký...' : 'ĐĂNG KÍ'}
          </button>
        </form>
      </div>
      <div className="signup-right">
        <img src="/logo.png" alt="Logo" className="signup-logo" />
        <h2>CHÀO MỪNG</h2>
        <p>Nhập thông tin cá nhân của bạn để sử dụng tất cả các tính năng của trang web</p>
        <button className="signin-btn" onClick={() => navigate('/login')}>ĐĂNG NHẬP</button>
      </div>
    </div>
  );
};

export default SignUpPage; 