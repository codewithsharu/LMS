import React from 'react';

const SessionPage = () => {
  // Retrieve session variables from sessionStorage
  const empid = sessionStorage.getItem('empid');
  const role = sessionStorage.getItem('role');
  const name = sessionStorage.getItem('name');
  const branch = sessionStorage.getItem('branch');

  // Display the session variables or a message if they're not set
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
      {empid && role ? (
        <div>
          <div style={{ marginBottom: '15px' }}>
            <span style={{ color: '#A3BE8C' }}>Employee ID:</span> {empid}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <span style={{ color: '#EBCB8B' }}>Name:</span> {name || 'Not set'}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <span style={{ color: '#BF616A' }}>Role:</span> {role}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <span style={{ color: '#D08770' }}>Branch:</span> {branch || 'Not set'}
          </div>
        </div>
      ) : (
        <p style={{ fontSize: '16px', color: '#BF616A', textAlign: 'center' }}>
          Session data is not available. Please log in to view your session details.
        </p>
      )}
    </div>
  );
};

export default SessionPage;
