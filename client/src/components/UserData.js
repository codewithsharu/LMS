import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserData = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem('jwtToken'); // Retrieve the JWT token from sessionStorage

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const response = await axios.get('http://localhost:3007/user-data', { // Updated URL to localhost
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request header
            },
          });
          setUserData(response.data); // Store the user data in state
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
      <div style={{ color: 'red', textAlign: 'center' }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div
      className="user-data-container"
      style={{
        padding: '20px',
        maxWidth: '800px',
        margin: '50px auto',
        textAlign: 'center',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ color: '#007BFF', marginBottom: '20px' }}>User Data</h2>
      {userData ? (
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
          <p style={{ fontSize: '16px', color: '#555' }}>
            Personal Key: <strong>{userData.personalKey}</strong>
          </p>
        </div>
      ) : (
        <p style={{ fontSize: '16px', color: 'red' }}>Loading user data...</p>
      )}
    </div>
  );
};

export default UserData;