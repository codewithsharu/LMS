import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate hook for navigation
import axios from 'axios';

const LoginPage = () => {
  const [empid, setEmpid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://172.16.0.128:3007/login', { empid, password });

      if (response.status === 200) {
        sessionStorage.setItem('empid', empid);
        sessionStorage.setItem('role', response.data.role);
        setUserData(response.data);
        // console.log(response.data);

        // After successful login, navigate to the session page
        // navigate('/session');
         // Redirect to the welcome page after login
         navigate('/welcome');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Employee ID:</label>
          <input
            type="text"
            value={empid}
            onChange={(e) => setEmpid(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
