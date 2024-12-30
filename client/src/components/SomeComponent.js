// src/components/SomeComponent.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../store/actions/authActions';

const SomeComponent = () => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('jwtToken');

  // Get user data from Redux store
  const userData = useSelector((state) => state.auth);
  const { name, empId, role, branch, employee_type, personalKey } = userData || {};

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData());
    }
  }, [dispatch, token]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p style={{ fontSize: '18px' }}>
        Name: <strong>{name}</strong>
      </p>
      <p style={{ fontSize: '16px', color: '#555' }}>
        Emp ID: <strong>{empId}</strong>
      </p>
      <p style={{ fontSize: '16px', color: '#555' }}>
        Role: <strong>{role}</strong>
      </p>
      <p style={{ fontSize: '16px', color: '#555' }}>
        Branch: <strong>{branch}</strong>
      </p>
      <p style={{ fontSize: '16px', color: '#555' }}>
        Employee Type: <strong>{employee_type}</strong>
      </p>
      <p style={{ fontSize: '16px', color: '#555' }}>
        Personal Key: <strong>{personalKey}</strong>
      </p>
    </div>
  );
};

export default SomeComponent;
