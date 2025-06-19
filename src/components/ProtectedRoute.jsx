import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    // Redirect based on role
    switch (user?.role) {
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

  return children;
};

export default ProtectedRoute; 