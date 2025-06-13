import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PersonalInfoPage.css"; // Import the CSS file
import { userAPI } from "../services/api"; // Import userAPI

export default function PersonalInfoPage() {
  const { user, updateUser } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [phone, setPhone] = useState(user?.phoneNumber || "");
  const [address, setAddress] = useState(user?.address || "");
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth || "");
  const [gender, setGender] = useState(user?.gender || "");

  const [isBasicInfoEditing, setIsBasicInfoEditing] = useState(false);
  const [isContactInfoEditing, setIsContactInfoEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await userAPI.getUserProfile();
        const userData = response.data;
        setFullName(userData.fullName || "");
        setPhone(userData.phoneNumber || "");
        setAddress(userData.address || "");
        setDateOfBirth(userData.dateOfBirth || "");
        setGender(userData.gender || "");
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Optionally, navigate to login if unauthorized
        // navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async (section) => {
    setIsLoading(true);
    try {
      const updatedData = {
        fullName,
        phoneNumber: phone,
        address,
        dateOfBirth,
        gender,
      };
      const response = await userAPI.updateUserProfile(updatedData);
      updateUser(response.data); // Update user in AuthContext
      alert("Thông tin đã được lưu thành công!");
      if (section === "basic") {
        setIsBasicInfoEditing(false);
      } else if (section === "contact") {
        setIsContactInfoEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Đã xảy ra lỗi khi lưu thông tin: " + (error.response?.data?.message || error.message || "Không xác định"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = (section) => {
    // Reset fields to original user data or last saved data
    if (section === "basic") {
      setFullName(user?.fullName || "");
      setDateOfBirth(user?.dateOfBirth || "");
      setGender(user?.gender || "");
      setIsBasicInfoEditing(false);
    } else if (section === "contact") {
      setPhone(user?.phoneNumber || "");
      setAddress(user?.address || "");
      setIsContactInfoEditing(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="personal-info-page">
      <div className="sidebar">
        <div className="sidebar-header">
          <i className="fa-solid fa-user icon"></i>
          <span>Thông tin cá nhân</span>
        </div>
        <ul className="sidebar-menu">
          <li className="active">
            <a href="#">Thông tin cơ bản</a>
          </li>
          <li>
            <a href="#">Thông tin liên hệ</a>
          </li>
          <li>
            <a href="#">CMND/CCCD</a>
          </li>
          <li>
            <a href="#">Công việc và học vấn</a>
          </li>
          <li>
            <a href="#">Bảo vệ tài khoản</a>
          </li>
          <li>
            <a href="#">Giới thiệu - Tích điểm</a>
          </li>
          <li>
            <a href="#">Giấy phép</a>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <h2 className="main-content-title">Thông tin cá nhân</h2>
        <p className="main-content-subtitle">Quản lý thông tin cá nhân</p>

        <div className="section">
          <div className="section-header">
            <h3>Thông tin cơ bản</h3>
            {!isBasicInfoEditing ? (
              <button
                className="change-button"
                onClick={() => setIsBasicInfoEditing(true)}
              >
                Thay đổi
              </button>
            ) : (
              <div className="edit-actions">
                <button
                  className="save-button"
                  onClick={() => handleUpdateProfile("basic")}
                  disabled={isLoading}
                >
                  Lưu
                </button>
                <button
                  className="cancel-button"
                  onClick={() => handleCancelEdit("basic")}
                  disabled={isLoading}
                >
                  Hủy
                </button>
              </div>
            )}
          </div>
          <div className="info-item">
            <label>Họ và tên</label>
            {isBasicInfoEditing ? (
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            ) : (
              <span>{fullName}</span>
            )}
          </div>
          <div className="info-item">
            <label>Giới tính</label>
            {isBasicInfoEditing ? (
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            ) : (
              <span>{gender || "N/A"}</span>
            )}
          </div>
          <div className="info-item">
            <label>Ngày sinh</label>
            {isBasicInfoEditing ? (
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            ) : (
              <span>{dateOfBirth || "N/A"}</span>
            )}
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <h3>Thông tin liên hệ</h3>
            {!isContactInfoEditing ? (
              <button
                className="change-button"
                onClick={() => setIsContactInfoEditing(true)}
              >
                Thay đổi
              </button>
            ) : (
              <div className="edit-actions">
                <button
                  className="save-button"
                  onClick={() => handleUpdateProfile("contact")}
                  disabled={isLoading}
                >
                  Lưu
                </button>
                <button
                  className="cancel-button"
                  onClick={() => handleCancelEdit("contact")}
                  disabled={isLoading}
                >
                  Hủy
                </button>
              </div>
            )}
          </div>
          <div className="info-item">
            <label>Số điện thoại</label>
            {isContactInfoEditing ? (
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            ) : (
              <span>{phone || "N/A"}</span>
            )}
          </div>
          <div className="info-item">
            <label>Email</label>
            <span>{user?.email || "N/A"}</span>
            <span className="verified">Đã xác thực</span>
          </div>
          <div className="info-item">
            <label>Địa chỉ liên hệ</label>
            {isContactInfoEditing ? (
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            ) : (
              <span>{address || "N/A"}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
