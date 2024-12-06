import React from 'react';

const SessionPage = () => {
  // Retrieve session variables from sessionStorage
  const empid = sessionStorage.getItem('empid');
  const role = sessionStorage.getItem('role');

  // Display the session variables or a message if they're not set
  return (
    <div className="session-container">
      <h2>Session Variables</h2>
      <div>
        <strong>Employee ID:</strong> {empid ? empid : 'Not set'}
      </div>
      <div>
        <strong>Role:</strong> {role ? role : 'Not set'}
      </div>
      {/* You can add more session variables if needed */}
    </div>
  );
};

export default SessionPage;
