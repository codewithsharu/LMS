import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [empid, setEmpid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://10.10.31.146:3007/login', { empid, password });

      if (response.status === 200) {
        const { empId, role, name, branch, employee_type } = response.data;

        // Store user data in sessionStorage
        sessionStorage.setItem('empid', empId);
        sessionStorage.setItem('role', role);
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('branch', branch);
        sessionStorage.setItem('employee_type', employee_type); // Store employee_type
        sessionStorage.setItem('loggedIn', true);

        // Redirect to the welcome page
        navigate('/welcome');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Employee ID:</label>
          <input
            type="text"
            value={empid}
            onChange={(e) => setEmpid(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 15px',
            backgroundColor: '#007BFF',
            color: '#FFF',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
          }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {error && (
        <div style={{ marginTop: '20px', color: 'red', textAlign: 'center' }}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
