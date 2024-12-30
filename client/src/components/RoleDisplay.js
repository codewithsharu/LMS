// src/components/SomeComponent.js

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserDataFromToken } from '../utils/authUtils';

const RoleDisplay = () => {
  // Get auth state from Redux store
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  
  // Get user data from token
  const userData = token ? getUserDataFromToken(token) : null;

  // Show login prompt if not authenticated
  if (!isAuthenticated || !userData) {
    return (
      <div style={{ 
        textAlign: 'center', 
        marginTop: '50px',
        padding: '20px'
      }}>
        <h2>Please log in to view your role</h2>
        <Link to="/login" style={{
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          marginTop: '20px'
        }}>
          Go to Login
        </Link>
      </div>
    );
  }

  // Show only the role if authenticated
  return (
    <div style={{
      padding: '20px',
      maxWidth: '400px',
      margin: '50px auto',
      textAlign: 'center',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff'
    }}>
      <h2 style={{ color: '#007BFF', marginBottom: '20px' }}>User Role</h2>
      <p style={{ 
        fontSize: '24px', 
        fontWeight: 'bold',
        color: '#333',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px'
      }}>
        {userData.role.toUpperCase()}
      </p>
    </div>
  );
};

export default RoleDisplay;
