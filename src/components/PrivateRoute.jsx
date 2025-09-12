import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const isTokenValid = (token) => {
  if (!token) return false;
  // JWT'nin süresi dolmuş mu kontrolü (isteğe bağlı, basit kontrol)
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!isTokenValid(token)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute; 