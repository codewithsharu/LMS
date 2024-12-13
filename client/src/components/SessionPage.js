import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SessionPage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem('jwtToken'); // Get the JWT token from sessionStorage

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const response = await axios.get('http://localhost:3007/user-data', { // Updated URL to localhost
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request header
            },
          });
          setUserData(response.data); // Set the user data in state
        } catch (err) {
          setError('Failed to fetch user data. Please log in again.');
        }
      } else {
        setError('No token found. Please log in.');
      }
    };

    fetchUserData();
  }, [token]);

  if (error) {
    return (
      <div className="error-message" style={{ color: '#BF616A', textAlign: 'center' }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div
      className="session-container"
      style={{
        padding: '30px',
        maxWidth: '700px',
        margin: '50px auto',
        backgroundColor: '#2E3440', // Dark background
        borderRadius: '10px',
        color: '#ECEFF4', // Light text for contrast
        fontFamily: 'monospace',
        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
        textAlign: 'left',
      }}
    >
      <h2 style={{ color: '#88C0D0', marginBottom: '20px', textAlign: 'center' }}>
        Session Details
      </h2>
      {userData ? (
        <div>
          <div style={{ marginBottom: '15px' }}>
            <span style={{ color: '#A3BE8C' }}>Employee ID:</span> {userData.empId}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <span style={{ color: '#EBCB8B' }}>Name:</span> {userData.name || 'Not set'}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <span style={{ color: '#BF616A' }}>Role:</span> {userData.role}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <span style={{ color: '#D08770' }}>Branch:</span> {userData.branch || 'Not set'}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <span style={{ color: '#B48EAD' }}>Employee Type:</span> {userData.employee_type || 'Not set'}
          </div>
        </div>
      ) : (
        <p style={{ fontSize: '16px', color: '#BF616A', textAlign: 'center' }}>
          Loading session data...
        </p>
      )}
    </div>
  );
};

export default SessionPage;
