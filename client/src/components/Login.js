import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [empid, setEmpid] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Send the login request with empid and password
      const response = await axios.post('http://localhost:3007/login', { empid, password });

      if (response.status === 200) {
        const { token, empId, role, name, branch, employee_type, personalKey } = response.data;

        // Store JWT token and user data in sessionStorage
        sessionStorage.setItem('jwtToken', token);
        sessionStorage.setItem('empid', empId);
        sessionStorage.setItem('role', role);
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('branch', branch);
        sessionStorage.setItem('employee_type', employee_type);
        sessionStorage.setItem('personalKey', personalKey);
        sessionStorage.setItem('isLoggedIn', true);

        // Clear input fields
        setEmpid('');
        setPassword('');

        // Redirect to the welcome page
        navigate('/welcome');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An unexpected error occurred.';
      setError(errorMessage);

      // Clear error after 5 seconds
      setTimeout(() => setError(''), 5000);
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: 'calc(100% - 60px)', padding: '8px' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ marginLeft: '10px', padding: '8px 15px' }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
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
