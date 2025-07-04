import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PersonalInfoPage.css"; // Import the CSS file
import { userAPI } from "../services/api"; // Import userAPI
import vietnamLocations from "../data/vietnamLocations.json"; // Import location data

// Sample test history data
const testHistory = [
  {
    id: "12345",
    date: "12/06/2025",
    type: "Cha - Con",
    status: "Đã hoàn thành",
    hasResult: true,
    details: {
      sampleDate: "10/06/2025",
      sampleLocation: "Bệnh viện Đa khoa Quốc tế Vinmec",
      sampleCode: "SMP12345",
      resultFile: "https://example.com/result12345.pdf",
      expertMessage: "Kết quả xét nghiệm cho thấy mối quan hệ cha con được xác nhận với độ chính xác 99.99%."
    }
  },
  {
    id: "12412",
    date: "01/05/2025",
    type: "Mẹ - Con",
    status: "Đang xử lý",
    hasResult: false,
    details: {
      sampleDate: "30/04/2025",
      sampleLocation: "Bệnh viện Đa khoa Quốc tế Vinmec",
      sampleCode: "SMP12412"
    }
  }
];

export default function PersonalInfoPage() {
  const { user, updateUser, logout } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [phone, setPhone] = useState(user?.phoneNumber || "");
  const [address, setAddress] = useState(user?.address || "");
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [email, setEmail] = useState(user?.email || "");
  const [idNumber, setIdNumber] = useState(user?.idNumber || "");
  const [idType, setIdType] = useState(user?.idType || "CMND");
  const [idFrontImage, setIdFrontImage] = useState(user?.idFrontImage || "");
  const [idBackImage, setIdBackImage] = useState(user?.idBackImage || "");

  // Location states
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);

  const [isBasicInfoEditing, setIsBasicInfoEditing] = useState(false);
  const [isContactInfoEditing, setIsContactInfoEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

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
        setEmail(userData.email || "");
        setIdNumber(userData.idNumber || "");
        setIdType(userData.idType || "CMND");
        setIdFrontImage(userData.idFrontImage || "");
        setIdBackImage(userData.idBackImage || "");

        // Parse address string into houseNumber, province, district, commune
        if (userData.address) {
          const addressParts = userData.address.split(", ").map(part => part.trim());
          let currentCommuneName = '';
          let currentDistrictName = '';
          let currentProvinceName = '';
          let currentHouseNumber = '';

          // Try to identify province, district, commune from the end
          if (addressParts.length >= 3) {
            currentProvinceName = addressParts[addressParts.length - 1];
            currentDistrictName = addressParts[addressParts.length - 2];
            currentCommuneName = addressParts[addressParts.length - 3];

            const province = vietnamLocations.provinces.find(p => p.name === currentProvinceName);
            if (province) {
              setSelectedProvince(province.code);
              const district = province.districts.find(d => d.name === currentDistrictName);
              if (district) {
                setSelectedDistrict(district.code);
                const commune = district.communes.find(c => c.name === currentCommuneName);
                if (commune) {
                  setSelectedCommune(commune.code);
                  // If there are more parts, the first part is the house number
                  if (addressParts.length > 3) {
                    currentHouseNumber = addressParts.slice(0, addressParts.length - 3).join(', ');
                  }
                }
              }
            }
          }
          setHouseNumber(currentHouseNumber); // Set the house number state
        }
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

  // Update districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      const province = vietnamLocations.provinces.find(p => p.code === selectedProvince);
      setDistricts(province?.districts || []);
      setSelectedDistrict("");
      setSelectedCommune("");
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);

  // Update communes when district changes
  useEffect(() => {
    if (selectedDistrict) {
      const district = districts.find(d => d.code === selectedDistrict);
      setCommunes(district?.communes || []);
      setSelectedCommune("");
    } else {
      setCommunes([]);
    }
  }, [selectedDistrict, districts]);

  const handleUpdateProfile = async (section) => {
    setIsLoading(true);
    try {
      let updatedData = {
        fullName,
        phoneNumber: phone,
        address,
        dateOfBirth,
        gender,
        email,
        idNumber,
        idType,
        idFrontImage,
        idBackImage,
      };

      if (section === "contact") {
        const provinceName = vietnamLocations.provinces.find(p => p.code === selectedProvince)?.name;
        const districtName = districts.find(d => d.code === selectedDistrict)?.name;
        const communeName = communes.find(c => c.code === selectedCommune)?.name;
        
        let fullAddressParts = [];
        if (communeName) {
          fullAddressParts.push(communeName);
        }
        if (districtName) {
          fullAddressParts.push(districtName);
        }
        if (provinceName) {
          fullAddressParts.push(provinceName);
        }
        if (houseNumber) {
          fullAddressParts.push(houseNumber);
        }
        updatedData.address = fullAddressParts.join(', ');
      }
      
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
      setSelectedProvince("");
      setSelectedDistrict("");
      setSelectedCommune("");
      setHouseNumber("");
      // Re-parse address if user existed
      if (user?.address) {
        const addressParts = user.address.split(", ").map(part => part.trim());
        let currentCommuneName = '';
        let currentDistrictName = '';
        let currentProvinceName = '';
        let currentHouseNumber = '';

        if (addressParts.length >= 3) {
          currentProvinceName = addressParts[addressParts.length - 1];
          currentDistrictName = addressParts[addressParts.length - 2];
          currentCommuneName = addressParts[addressParts.length - 3];

          const province = vietnamLocations.provinces.find(p => p.name === currentProvinceName);
          if (province) {
            setSelectedProvince(province.code);
            const district = province.districts.find(d => d.name === currentDistrictName);
            if (district) {
              setSelectedDistrict(district.code);
              const commune = district.communes.find(c => c.name === currentCommuneName);
              if (commune) {
                setSelectedCommune(commune.code);
                if (addressParts.length > 3) {
                  currentHouseNumber = addressParts.slice(0, addressParts.length - 3).join(', ');
                }
              }
            }
          }
        }
        setHouseNumber(currentHouseNumber);
      }
      setIsContactInfoEditing(false);
    }
  };

  const handleViewDetails = (test) => {
    setSelectedTest(test);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedTest(null);
  };

  const handleContactSupport = () => {
    // Implement contact support functionality
    window.location.href = "tel:19001234";
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate('/login'); // Redirect to login page
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="personal-info-page">
      <div className="sidebar">
        <div className="sidebar-header">
          <i className="fa-solid fa-user icon"></i>
          <a href="/homehome" className="sidebar-home-link">Quay về 🏠</a>
        </div>
        <ul className="sidebar-menu">
          <li className={activeTab === "basic" ? "active" : ""}>
            <a href="#" onClick={() => handleTabClick("basic")}>
              <i className="fa-solid fa-user icon"></i>👤 Thông tin cơ bản
            </a>
          </li>
          <li className={activeTab === "contact" ? "active" : ""}>
            <a href="#" onClick={() => handleTabClick("contact")}>
              <i className="fa-solid fa-address-book icon"></i>📋 Thông tin liên hệ
            </a>
          </li>
          <li className={activeTab === "id" ? "active" : ""}>
            <a href="#" onClick={() => handleTabClick("id")}>
              <i className="fa-solid fa-id-card icon"></i>🪪 CMND/CCCD
            </a>
          </li>
          <li className={activeTab === "test-history" ? "active" : ""}>
            <a href="#" onClick={() => handleTabClick("test-history")}>
              <i className="fa-solid fa-clipboard-list icon"></i>🧬 Lịch sử xét nghiệm
            </a>
          </li>
          <li>
            <a href="#" onClick={handleLogout}>
              <i className="fa-solid fa-sign-out-alt icon"></i>Đăng xuất
            </a>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <h1 className="main-content-title">Thông tin cá nhân</h1>
        <p className="main-content-subtitle">Cập nhật thông tin của bạn và tìm hiểu xem thông tin này được sử dụng như thế nào.</p>

        {activeTab === "basic" && (
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
        )}

        {activeTab === "contact" && (
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
              <span>{email || "N/A"}</span>
              <span className="verified">Đã xác thực</span>
            </div>
            <div className="info-item">
              <label>Địa chỉ liên hệ</label>
              {isContactInfoEditing ? (
                <div className="address-edit-group">
                  <input
                    type="text"
                    placeholder="Số nhà, Tên đường, Ấp, ..."
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                  />
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
              ) : (
                <span>{address || "N/A"}</span>
              )}
            </div>
          </div>
        )}

        {activeTab === "id" && (
          <div className="section">
            <div className="section-header">
              <h3>Thông tin CMND/CCCD</h3>
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
              <label>Số CMND/CCCD</label>
              {isBasicInfoEditing ? (
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                />
              ) : (
                <span>{idNumber || "N/A"}</span>
              )}
            </div>
            <div className="info-item">
              <label>Loại CMND/CCCD</label>
              {isBasicInfoEditing ? (
                <select
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                >
                  <option value="CMND">CMND</option>
                  <option value="CCCD">CCCD</option>
                </select>
              ) : (
                <span>{idType || "N/A"}</span>
              )}
            </div>
            <div className="info-item">
              <label>Ảnh CMND/CCCD</label>
              <div className="id-images">
                {idFrontImage && (
                  <img src={idFrontImage} alt="Front of ID" />
                )}
                {idBackImage && (
                  <img src={idBackImage} alt="Back of ID" />
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "test-history" && (
          <div className="section">
            <div className="section-header">
              <h3>Lịch sử xét nghiệm</h3>
              <button
                className="change-button"
                onClick={() => setActiveTab("test-history")}
              >
                Xem lịch sử xét nghiệm
              </button>
            </div>
            <div className="test-history-section">
              <h2>Lịch sử xét nghiệm</h2>
              <div className="test-history-table">
                <table>
                  <thead>
                    <tr>
                      <th>Mã Xét Nghiệm</th>
                      <th>Ngày ĐK</th>
                      <th>Loại Xét Nghiệm</th>
                      <th>Trạng Thái</th>
                      <th>Kết Quả</th>
                      <th>Xem Kết Quả</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testHistory.map((test) => (
                      <tr key={test.id}>
                        <td>#{test.id}</td>
                        <td>{test.date}</td>
                        <td>{test.type}</td>
                        <td>{test.status}</td>
                        <td>{test.hasResult ? "Có" : "-"}</td>
                        <td>
                          {test.hasResult ? (
                            <button 
                              className="view-details-btn"
                              onClick={() => handleViewDetails(test)}
                            >
                              Xem chi tiết
                            </button>
                          ) : (
                            "--"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Test Details Modal */}
      {showDetailModal && selectedTest && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Chi tiết xét nghiệm #{selectedTest.id}</h3>
              <button className="close-btn" onClick={handleCloseModal}>
                <i className="fas fa-times">❌</i>
              </button>
            </div>
            <div className="modal-body">
              <div className="test-details">
                <h4>Thông tin mẫu</h4>
                <p><strong>Ngày lấy mẫu:</strong> {selectedTest.details.sampleDate}</p>
                <p><strong>Địa điểm lấy mẫu:</strong> {selectedTest.details.sampleLocation}</p>
                <p><strong>Mã mẫu:</strong> {selectedTest.details.sampleCode}</p>
                
                {selectedTest.details.resultFile && (
                  <div className="result-file">
                    <h4>File kết quả</h4>
                    <a 
                      href={selectedTest.details.resultFile} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="download-btn"
                    >
                      <i className="fas fa-download"></i> Tải kết quả
                    </a>
                  </div>
                )}

                {selectedTest.details.expertMessage && (
                  <div className="expert-message">
                    <h4>Lời nhắn chuyên gia</h4>
                    <p>{selectedTest.details.expertMessage}</p>
                  </div>
                )}

                <button 
                  className="contact-support-btn"
                  onClick={handleContactSupport}
                >
                  <i className="fas fa-headset"></i> Liên hệ hỗ trợ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
