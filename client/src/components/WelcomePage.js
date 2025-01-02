import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserDataFromToken } from '../utils/authUtils';

const WelcomePage = () => {
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const data = getUserDataFromToken(token);
      setUserData(data);
    }
    setIsLoading(false);
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div
      className="welcome-container"
      style={{
        padding: '20px',
        maxWidth: '600px',
        margin: '50px auto',
        textAlign: 'center',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ color: '#007BFF', marginBottom: '20px' }}>Welcome!</h2>
      {userData ? (
        <div>
          <p style={{ fontSize: '18px' }}>
            Hello, <strong>{userData.name || userData.empId}</strong>!
          </p>
          <p style={{ fontSize: '16px', color: '#555' }}>
            Role: <strong>{userData.role}</strong>
          </p>
          <p style={{ fontSize: '16px', color: '#555' }}>
            Branch: <strong>{userData.branch}</strong>
          </p>
        </div>
      ) : (
        <p style={{ fontSize: '16px', color: 'red' }}>
          Loading user data...
        </p>
      )}
    </div>
  );
};

export default WelcomePage;
