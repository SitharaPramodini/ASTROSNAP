// withAuth.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (Component, isAuthenticated) => {
  return (props) => {
    const { location } = props; // Destructure location prop directly

    if (isAuthenticated) {
      return <Component {...props} />;
    } else {
      // Check if authentication is required before redirecting to login
      if (location.pathname !== '/') {
        return <Navigate to="/login" replace />;
      } else {
        return null; // Avoid infinite redirect loop if already on the login page
      }
    }
  };
};

export default withAuth;
