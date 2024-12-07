import React from 'react';

const WelcomePage = () => {
  // Retrieve session variables from sessionStorage
  const empid = sessionStorage.getItem('empid');
  const role = sessionStorage.getItem('role');
  const name = sessionStorage.getItem('name');
  const branch = sessionStorage.getItem('branch');

  return (
    <div 
      className="welcome-container" 
      style={{
        padding: '20px',
        maxWidth: '600px',
        margin: '50px auto',
        textAlign: 'center',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      <h2 style={{ color: '#007BFF', marginBottom: '20px' }}>Welcome!</h2>
      {empid ? (
        <div>
          <p style={{ fontSize: '18px' }}>
            Hello, <strong>{name || empid}</strong>!
          </p>
          <p style={{ fontSize: '16px', color: '#555' }}>
            Role: <strong>{role}</strong>
          </p>
          <p style={{ fontSize: '16px', color: '#555' }}>
            Branch: <strong>{branch}</strong>
          </p>
        </div>
      ) : (
        <p style={{ fontSize: '16px', color: 'red' }}>
          You're not logged in. Please log in to continue.
        </p>
      )}
    </div>
  );
};

export default WelcomePage;
