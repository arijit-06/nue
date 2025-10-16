import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  
  // TODO: Replace with actual auth check
  // const { user, loading } = useAuth();
  
  // Mock authentication check
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  // if (loading) {
  //   return <div className="d-flex justify-content-center mt-5">
  //     <div className="spinner-border" role="status"></div>
  //   </div>;
  // }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

export default ProtectedRoute;