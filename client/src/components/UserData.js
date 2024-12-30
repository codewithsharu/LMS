import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../store/actions/authActions';

const UserData = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth);

  useEffect(() => {
    // Only fetch if we don't have the data yet
    if (!userData.isAuthenticated) {
      dispatch(fetchUserData());
    }
  }, [dispatch, userData.isAuthenticated]);

  if (!userData.isAuthenticated) {
    return <div>Loading user data...</div>;
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
