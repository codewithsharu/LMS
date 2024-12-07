// UnauthorizedPage.js
import React from 'react';

const UnauthorizedPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Unauthorized Access</h1>
      <p style={styles.message}>You do not have permission to view this page.</p>
      <p style={styles.suggestion}>Please contact your administrator if you believe this is a mistake.</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#f8d7da',
    border: '1px solid #f5c6cb',
    borderRadius: '8px',
    marginTop: '100px',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    color: '#721c24',
    fontSize: '36px',
    fontWeight: 'bold',
  },
  message: {
    color: '#721c24',
    fontSize: '18px',
    marginTop: '20px',
  },
  suggestion: {
    color: '#155724',
    fontSize: '16px',
    marginTop: '15px',
  },
};

export default UnauthorizedPage;
