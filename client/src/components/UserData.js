import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserDataFromToken } from '../utils/authUtils';

const UserData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (token) {
      const data = getUserDataFromToken(token);
      setUserData(data);
    }
    setIsLoading(false);
  }, [token]);

  if (isLoading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        marginTop: '50px',
        padding: '20px'
      }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!isAuthenticated || !userData) {
    return (
      <div style={{ 
        textAlign: 'center', 
        marginTop: '50px',
        padding: '20px'
      }}>
        <h2>Please log in to view your data</h2>
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

  return (
    <div style={{
      padding: '20px',
      maxWidth: '800px',
      margin: '50px auto',
      textAlign: 'center',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff'
    }}>
      <h2 style={{ color: '#007BFF', marginBottom: '20px' }}>User Data</h2>
      <div>
        <p style={{ fontSize: '18px' }}>
          Name: <strong>{userData.name}</strong>
        </p>
        <p style={{ fontSize: '16px', color: '#555' }}>
          Emp ID: <strong>{userData.empId}</strong>
        </p>
        <p style={{ fontSize: '16px', color: '#555' }}>
          Role: <strong>{userData.role}</strong>
        </p>
        <p style={{ fontSize: '16px', color: '#555' }}>
          Branch: <strong>{userData.branch}</strong>
        </p>
        <p style={{ fontSize: '16px', color: '#555' }}>
          Employee Type: <strong>{userData.employee_type}</strong>
        </p>
      </div>
    </div>
  );
};

export default UserData;
