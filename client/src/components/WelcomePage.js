import React from 'react';

const WelcomePage = () => {
  // Retrieve session variables from sessionStorage
  const empid = sessionStorage.getItem('empid');
  const role = sessionStorage.getItem('role');

  return (
    <div className="welcome-container">
      <h2>Welcome!</h2>
      {empid ? (
        <div>
          <p>Welcome back, <strong>{empid}</strong>!</p>
          <p>Your role is: <strong>{role}</strong></p>
        </div>
      ) : (
        <p>You're not logged in. Please log in to continue.</p>
      )}
    </div>
  );
};

export default WelcomePage;
