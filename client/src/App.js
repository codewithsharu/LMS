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
import WelcomePage from './components/WelcomePage';
import UnauthorizedPage from './components/UnauthorizedPage';
import UserData from './components/UserData';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const key = sessionStorage.getItem('personalKey');
    if (key) {
      setAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = (key) => {
    setAuthenticated(true);
    sessionStorage.setItem('personalKey', key); // Save the key in sessionStorage
  };

  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem('personalKey'); // Clear sessionStorage on logout
  };

  return (
    <BrowserRouter>
      <CustomNavbar onLogout={handleLogout} />
      <div style={{ marginTop: "64px" }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/user-data" element={<UserData />} />
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
          <Route
            path="/hod"
            element={
              sessionStorage.getItem('personalKey') === 'hodKey' ? (
                <HodDashboard />
              ) : (
                <Navigate to="/unauthorized" />
              )
            }
          />
          <Route
            path="/principal"
            element={
              sessionStorage.getItem('personalKey') === 'principalKey' ? (
                <PrincipalDashboard />
              ) : (
                <Navigate to="/unauthorized" />
              )
            }
          />
          <Route
            path="/director"
            element={
              sessionStorage.getItem('personalKey') === 'directorKey' ? (
                <DirectorDashboard />
              ) : (
                <Navigate to="/unauthorized" />
              )
            }
          />

          {/* Unauthorized Page Route */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
