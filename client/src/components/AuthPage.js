import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Retrieve state from location
    const { empid, role } = location.state || {};

    if (!empid || !role) {
      // If no user data is found, redirect to login
      navigate('/login');
    } else {
      // Set the user details for display
      setUserDetails({
        empid,
        role,
      });
    }
  }, [location, navigate]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p><strong>Employee ID:</strong> {userDetails.empid}</p>
      <p><strong>Role:</strong> {userDetails.role}</p>
    </div>
  );
};

export default AuthPage;
