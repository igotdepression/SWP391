import React from 'react'; // Import thư viện React
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import các component điều hướng của React Router
import { AuthProvider, useAuth } from './context/AuthContext'; // Import context xác thực
import LoginPage from './pages/LoginPage'; // Import trang đăng nhập
import SignUpPage from './pages/SignUpPage'; // Import trang đăng ký
import HomePage from './pages/HomePage'; // Import trang chủ
import PersonalInfoPage from './pages/PersonalInfoPage'; // Import trang thông tin cá nhân
import StaffPage from './pages/StaffPage'; // Import trang nhân viên
import ManagerPage from './pages/ManagerPage'; // Import trang quản lý
import Admin from './pages/Admin'; // Import trang admin
import BookingCreate from './pages/BookingCreate'; // Import trang tạo booking
import BookingDetails from './pages/BookingDetails'; // Import trang chi tiết booking
import BookingPayment from './pages/BookingPayment'; // Import trang thanh toán booking
import About from './pages/About'; // Import trang giới thiệu
import DoctorDetail from './pages/DoctorDetail'; // Import trang chi tiết bác sĩ
import ServicePage from './pages/ServicePage'; // Import trang dịch vụ
import SendFeedback from './pages/SendFeedback'; // Import trang gửi phản hồi
import BlogPost from './pages/BlogPost'; // Import trang blog
import BlogDetail from './pages/BlogDetail'; // Import trang chi tiết blog

// Import các trang service
import FatherChild from './pages/Service/Father-child'; // Import dịch vụ cha-con
import MotherChild from './pages/Service/Mother-child'; // Import dịch vụ mẹ-con
import GrandfatherGrandchild from './pages/Service/Grandfather-grandchild'; // Import dịch vụ ông-cháu
import GrandmotherGrandchild from './pages/Service/Grandmother-grandchild'; // Import dịch vụ bà-cháu
import Siblings from './pages/Service/Siblings'; // Import dịch vụ anh chị em
import Prenatal from './pages/Service/Prenatal'; // Import dịch vụ trước sinh
import Civil from './pages/Service/Civil'; // Import dịch vụ dân sự
import Legal from './pages/Service/Legal'; // Import dịch vụ pháp lý

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles }) => { // Component bảo vệ route theo role
  const { isAuthenticated, loading, user } = useAuth(); // Lấy trạng thái xác thực và user từ context

  if (loading) { // Nếu đang loading
    return <div>Loading...</div>; // Hiển thị loading
  }

  if (!isAuthenticated) { // Nếu chưa đăng nhập
    return <Navigate to="/login" replace />; // Chuyển hướng về trang đăng nhập
  }

  if (allowedRoles && allowedRoles.length > 0) { // Nếu có quy định role được phép
    const userRole = user?.role; // Lấy role của user
    if (!userRole || !allowedRoles.includes(userRole)) { // Nếu user không có role hoặc không thuộc allowedRoles
      // Chuyển hướng dựa trên role
      switch (userRole) { // Kiểm tra role
        case 'ADMIN':
          return <Navigate to="/admin" replace />; // Chuyển hướng admin
        case 'MANAGER':
          return <Navigate to="/manager" replace />; // Chuyển hướng manager
        case 'STAFF':
          return <Navigate to="/staff" replace />; // Chuyển hướng staff
        default:
          return <Navigate to="/home" replace />; // Chuyển hướng mặc định về home
      }
    }
  }

  return children; // Nếu hợp lệ, render children
};

function App() { // Component App chính
  return (
    <AuthProvider> {/* Bọc toàn bộ app với AuthProvider để cung cấp context xác thực */}
      <Router> {/* Bọc với Router để sử dụng routing */}
        <Routes> {/* Định nghĩa các route */}
          <Route path="/login" element={<LoginPage />} /> {/* Route trang đăng nhập */}
          <Route path="/signup" element={<SignUpPage />} /> {/* Route trang đăng ký */}
          <Route path="/home" element={<ProtectedRoute allowedRoles={['CUSTOMER', 'STAFF', 'MANAGER', 'ADMIN', 'GUEST']}><HomePage /></ProtectedRoute>} /> {/* Route trang chủ, bảo vệ bởi ProtectedRoute */}
          {/*<Route path="/personal-info" element={<ProtectedRoute allowedRoles={['CUSTOMER', 'STAFF', 'MANAGER', 'ADMIN']}><PersonalInfoPage /></ProtectedRoute>} /> */} // Route cũ đã comment
          <Route path="/personal-info" element={<PersonalInfoPage />} /> {/* Route thông tin cá nhân */}
          <Route path="/staff" element={<StaffPage />} /> {/* Route trang nhân viên */}
          <Route path="/manager" element={<ManagerPage />} /> {/* Route trang quản lý */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><Admin /></ProtectedRoute>} /> {/* Route admin, chỉ cho ADMIN */}
          <Route path="/booking-create" element={<BookingCreate />} /> {/* Route tạo booking */}
          <Route path="/booking-details" element={<BookingDetails />} /> {/* Route chi tiết booking */}
          <Route path='/booking-payment' element={<BookingPayment />} /> {/* Route thanh toán booking */}
          <Route path='/blogpost' element={<BlogPost />} /> {/* Route blog */}
          <Route path='/blog/article/:id' element={<BlogDetail />} /> {/* Route chi tiết bài viết */}
          <Route path="/feedback" element={<SendFeedback />} /> {/* Route gửi phản hồi */}

          <Route path="/services" element={<ServicePage />} /> {/* Route trang dịch vụ */}
          {/* Các route cho các dịch vụ */}
          <Route path="/services/father-child" element={<FatherChild />} /> {/* Route dịch vụ cha-con */}
          <Route path="/services/mother-child" element={<MotherChild />} /> {/* Route dịch vụ mẹ-con */}
          <Route path="/services/grandfather-grandchild" element={<GrandfatherGrandchild />} /> {/* Route dịch vụ ông-cháu */}
          <Route path="/services/grandmother-grandchild" element={<GrandmotherGrandchild />} /> {/* Route dịch vụ bà-cháu */}
          <Route path="/services/siblings" element={<Siblings />} /> {/* Route dịch vụ anh chị em */}
          <Route path="/services/prenatal" element={<Prenatal />} /> {/* Route dịch vụ trước sinh */}
          <Route path="/services/civil" element={<Civil />} /> {/* Route dịch vụ dân sự */}
          <Route path="/services/legal" element={<Legal />} /> {/* Route dịch vụ pháp lý */}


          {/* <Route path="/booking/create" element={<ProtectedRoute allowedRoles={['CUSTOMER', 'STAFF', 'MANAGER', 'ADMIN']}><BookingCreate /></ProtectedRoute>} /> Removed as booking functionality is removed */} // Route cũ đã bỏ
          <Route path="/about" element={<About />} /> {/* Route trang giới thiệu */}
          <Route path="/doctor/:doctorId" element={<DoctorDetail />} /> {/* Route chi tiết bác sĩ */}
          <Route path="/" element={<Navigate to="/login" replace />} /> {/* Route mặc định chuyển về login */}
          <Route path="*" element={<Navigate to="/login" replace />} /> {/* Route wildcard chuyển về login */}
        </Routes> 
      </Router>
    </AuthProvider>
  );
}

export default App; // Export component App
