import './App.css';
import CustomNavbar from './components/CustomNavbar';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';  // Importing useState and useEffect
import Contact from './components/Contact';
import About from './components/About';
import Home from './components/Home';
import NonTeaching from './components/NonTeaching';
import CasualLeaveForm from './components/CasualLeaveForm';
import ODLeaveForm from './components/ODLeaveForm';
import HPCLLeaveForm from './components/HPCLLeaveForm';

import EmployeeDetails from './components/EmployeeDetails';
import HodDashboard from './components/HodDashboard';
import PrincipalDashboard from './components/PrincipalDashboard';
import DirectorDashboard from './components/DirectorDashboard';
import Login from './components/Login';
import AuthPage from './components/AuthPage';
import SessionPage from './components/SessionPage';
import WelcomePage from './components/WelcomePage'; 

function App() {
  // State to manage authentication and user data (such as role)
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // UseEffect to check session or local storage (depending on your implementation)
  useEffect(() => {
    // Example: Get the authentication state from session storage or backend (adjust to your needs)
    const sessionData = sessionStorage.getItem('authenticateduser');  // or use a context, cookie, or localStorage
    if (sessionData) {
      setAuthenticated(true);
      setUserRole(sessionData.role);  // Assuming the role is stored in sessionStorage
    }
  }, []);

  // Function to handle login success
  const handleLoginSuccess = (role) => {
    setAuthenticated(true);
    setUserRole(role);
    sessionStorage.setItem('authenticateduser', JSON.stringify({ authenticated: true, role })); // Save to sessionStorage
  };

  // Function to handle logout
  const handleLogout = () => {
    setAuthenticated(false);
    setUserRole(null);
    sessionStorage.removeItem('authenticateduser'); // Clear session
  };

  // Protected Route Component (to check if the user is authenticated)
  const ProtectedRoute = ({ element, requiredRole }) => {
    if (!authenticated) {
      return <Navigate to="/login" replace />;
    }
    if (requiredRole && requiredRole !== userRole) {
      return <Navigate to="/" replace />; // Redirect if user doesn't have the correct role
    }
    return element;
  };

  return (
    <BrowserRouter>
      {/* <CustomNavbar onLogout={handleLogout} /> */}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/welcome" element={<WelcomePage />} />

        <Route path="/auth" element={<AuthPage />} />
        <Route path="/session" element={<SessionPage />} />

        {/* Protected Routes (role-based routing) */}
        <Route path="/hod" element={<ProtectedRoute element={<HodDashboard />} requiredRole="hod" />} />
        <Route path="/principal" element={<ProtectedRoute element={<PrincipalDashboard />} requiredRole="principal" />} />
        <Route path="/director" element={<ProtectedRoute element={<DirectorDashboard />} requiredRole="director" />} />

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/non-teaching" element={<NonTeaching />} />
        <Route path="/casual-leave" element={<CasualLeaveForm />} />
        <Route path="/od-leave" element={<ODLeaveForm />} />
        <Route path="/hpcl-leave" element={<HPCLLeaveForm />} />
        <Route path="/emp" element={<EmployeeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
