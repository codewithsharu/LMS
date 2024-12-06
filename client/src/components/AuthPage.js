import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate hook

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the session data exists
    const empid = sessionStorage.getItem('empid');
    const role = sessionStorage.getItem('role');

    if (!empid || !role) {
      // If no session data, redirect to login page
      navigate('/login');
    } else {
      // If session data exists, redirect based on role
      if (role === 'hod') {
        navigate('/hod'); // Redirect to HOD Dashboard
      } else if (role === 'principal') {
        navigate('/principal'); // Redirect to Principal Dashboard
      } else if (role === 'director') {
        navigate('/director'); // Redirect to Director Dashboard
      } else {
        navigate('/'); // Default redirect to Home
      }
    }
  }, [navigate]);

  return (
    <div className="auth-page-container">
      <h2>Authenticating...</h2>
      <p>Checking your session data...</p>
    </div>
  );
};

export default AuthPage;
