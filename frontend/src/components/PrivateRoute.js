// src/utils/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = ({ children, requirePaid = false }) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    const isPaid = decoded.isPaid;

    // if route needs paid user and user is free → redirect
    if (requirePaid && !isPaid) {
      return <Navigate to="/upgrade" />;
    }

    return children;
  } catch {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
