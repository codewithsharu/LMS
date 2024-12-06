import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of history

const LoginPage = () => {
  const [empid, setEmpid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null); // Store the response data
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send the login request to the backend
      const response = await axios.post('http://localhost:3007/login', { empid, password });

      if (response.status === 200) {
        // Store empid and role in sessionStorage (you can use localStorage as well)
        sessionStorage.setItem('empid', empid);
        sessionStorage.setItem('role', response.data.role); // Store role

        // Set the user data in state to show it on the page
        setUserData(response.data);

        // Redirect to /auth after successful login (you can comment this out if you don't want to navigate)
        // navigate('/auth');
      }
    } catch (err) {
      // Handle login error and set error message
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

      {/* Display the user data in JSON format if login is successful */}
      {userData && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          <h3>Logged in as:</h3>
          <pre>{JSON.stringify(userData, null, 2)}</pre> {/* Format the JSON */}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
