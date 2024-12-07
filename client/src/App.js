import './App.css';
import CustomNavbar from './components/CustomNavbar';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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

// ProtectedRoute Component
import UnauthorizedPage from './components/UnauthorizedPage'; // Import the new UnauthorizedPage component

const ProtectedRoute = ({ element, requiredRole }) => {
  const role = sessionStorage.getItem('role'); // Retrieve role directly from sessionStorage
  
  if (!role) {
    return <Navigate to="/login" />;
  }

  if (role !== requiredRole) {
    return <UnauthorizedPage />; // Show UnauthorizedPage component if role does not match
  }

  return element; // Render the protected component if the role matches
};

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = sessionStorage.getItem('role');
    if (role) {
      setAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  const handleLoginSuccess = (role) => {
    setAuthenticated(true);
    setUserRole(role);
    sessionStorage.setItem('role', role); // Save only the role in sessionStorage
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setUserRole(null);
    sessionStorage.removeItem('role'); // Clear sessionStorage on logout
  };

  return (
    <BrowserRouter>
      <CustomNavbar onLogout={handleLogout} />
  
      <div style={{ marginTop: "64px" }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/session" element={<SessionPage />} />
  
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/non-teaching" element={<NonTeaching />} />
          <Route path="/casual-leave" element={<CasualLeaveForm />} />
          <Route path="/od-leave" element={<ODLeaveForm />} />
          <Route path="/hpcl-leave" element={<HPCLLeaveForm />} />
          <Route path="/emp" element={<EmployeeDetails />} />
  
          {/* Protected Role-based Routes */}
          <Route path="/hod" element={<ProtectedRoute element={<HodDashboard />} requiredRole="hod" />} />
          <Route path="/principal" element={<ProtectedRoute element={<PrincipalDashboard />} requiredRole="principal" />} />
          <Route path="/director" element={<ProtectedRoute element={<DirectorDashboard />} requiredRole="director" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
