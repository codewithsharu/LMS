// src/components/SomeComponent.js

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserDataFromToken } from '../utils/authUtils';

const RoleDisplay = () => {
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const userData = token ? getUserDataFromToken(token) : null;
  const userRole = userData ? userData.role : null;

  if (!isAuthenticated || !userData) {
    return (
      <div>
        <h2>Please log in to view your role</h2>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>User Role</h2>
      <p>{userRole.toUpperCase()}</p>
    </div>
  );
};

export default RoleDisplay;
