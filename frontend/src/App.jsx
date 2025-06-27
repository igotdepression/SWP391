import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import PersonalInfoPage from './pages/PersonalInfoPage';
import StaffPage from './pages/StaffPage';
import ManagerPage from './pages/ManagerPage';
import Admin from './pages/Admin';
<<<<<<< HEAD
// import BookingCreate from './pages/BookingCreate'; // Removed as booking functionality is removed
=======
import BookingCreate from './pages/BookingCreate';
import BookingDetails from './pages/BookingDetails';
import BookingPayment from './pages/BookingPayment';
>>>>>>> 8e0ece6428b87162344c8e84a8b730fb73989ce8
import About from './pages/About';


// Protected Route component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      // Chuyển hướng dựa trên role
      switch (userRole) {
        case 'ADMIN':
          return <Navigate to="/admin" replace />;
        case 'MANAGER':
          return <Navigate to="/manager" replace />;
        case 'STAFF':
          return <Navigate to="/staff" replace />;
        default:
          return <Navigate to="/home" replace />;
      }
    }
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<ProtectedRoute allowedRoles={['CUSTOMER', 'STAFF', 'MANAGER', 'ADMIN', 'GUEST']}><HomePage /></ProtectedRoute>} />
<<<<<<< HEAD
          <Route path="/personal-info" element={<ProtectedRoute allowedRoles={['CUSTOMER', 'STAFF', 'MANAGER', 'ADMIN']}><PersonalInfoPage /></ProtectedRoute>} />
          <Route path="/staff" element={<ProtectedRoute allowedRoles={['STAFF', 'MANAGER', 'ADMIN']}><StaffPage /></ProtectedRoute>} />
          <Route path="/manager" element={<ProtectedRoute allowedRoles={['MANAGER', 'ADMIN']}><ManagerPage /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><Admin /></ProtectedRoute>} />
          {/* <Route path="/booking/create" element={<ProtectedRoute allowedRoles={['CUSTOMER', 'STAFF', 'MANAGER', 'ADMIN']}><BookingCreate /></ProtectedRoute>} /> Removed as booking functionality is removed */}
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
=======
          {/*<Route path="/personal-info" element={<ProtectedRoute allowedRoles={['CUSTOMER', 'STAFF', 'MANAGER', 'ADMIN']}><PersonalInfoPage /></ProtectedRoute>} /> */}
          <Route path="/personal-info" element={<PersonalInfoPage  />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/manager" element={<ManagerPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/booking-create" element={<BookingCreate />} />
          <Route path="/booking-details" element={<BookingDetails />} />
          <Route path='/booking-payment' element={<BookingPayment />} />

          {/* <Route path="/booking/create" element={<ProtectedRoute allowedRoles={['CUSTOMER', 'STAFF', 'MANAGER', 'ADMIN']}><BookingCreate /></ProtectedRoute>} /> Removed as booking functionality is removed */}
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
>>>>>>> 8e0ece6428b87162344c8e84a8b730fb73989ce8
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
