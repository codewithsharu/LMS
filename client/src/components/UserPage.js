import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserPage = () => {
  const { empid } = useParams(); // Get empid from the URL
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3007/employee/${empid}`);
        setUserDetails(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user details');
      }
    };

    fetchUserDetails();
  }, [empid]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-details-container">
      <h2>User Details</h2>
      <div>
        <strong>Employee ID:</strong> {userDetails.empid}
      </div>
      <div>
        <strong>Name:</strong> {userDetails.name}
      </div>
      <div>
        <strong>Designation:</strong> {userDetails.designation}
      </div>
      <div>
        <strong>Department:</strong> {userDetails.department}
      </div>
      <div>
        <strong>Contact Number:</strong> {userDetails.contact_number}
      </div>
      {/* Add more fields if necessary */}
    </div>
  );
};

export default UserPage;
