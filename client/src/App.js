import './App.css';
import CustomNavbar from './components/CustomNavbar';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
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
import SomeComponent from './components/SomeComponent';
import { setAuthenticated, setUserRole, clearUserData } from './actions/userActions'; // Import Redux actions

function App() {
  const dispatch = useDispatch();
  const { authenticated, userRole, loading } = useSelector((state) => state.user); // Use Redux state

  useEffect(() => {
    const token = sessionStorage.getItem('jwtToken'); // Retrieve the JWT token
    if (token) {
      const fetchUserRole = async () => {
        try {
          const response = await axios.get('http://localhost:3007/user-data', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const role = response.data.role;
          dispatch(setUserRole(role)); // Dispatch role action
          dispatch(setAuthenticated(true)); // Dispatch authenticated action
        } catch (error) {
          console.error('Error fetching user role:', error);
          dispatch(setAuthenticated(false)); // Dispatch failure action
        }
      };

      fetchUserRole();
    } else {
      dispatch(setAuthenticated(false)); // Dispatch failure action if no token
    }
  }, [dispatch]);

  const handleLoginSuccess = (token) => {
    sessionStorage.setItem('jwtToken', token); // Save the token in sessionStorage
    dispatch(setAuthenticated(true)); // Mark the user as authenticated
    // Fetch user details after login
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('http://localhost:3007/user-data', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request header
          },
        });
        const role = response.data.role; // Assuming 'role' is part of the response
        dispatch(setUserRole(role)); // Set the user's role
      } catch (error) {
        console.error('Error fetching user role:', error);
        dispatch(setAuthenticated(false)); // Mark as not authenticated
      }
    };

    fetchUserRole();
  };

  const handleLogout = () => {
    dispatch(clearUserData()); // Clear user data in Redux store
    sessionStorage.removeItem('jwtToken'); // Clear sessionStorage on logout
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while fetching role
  }

  return (
    <BrowserRouter>
      <CustomNavbar onLogout={handleLogout} />
      <div style={{ marginTop: '64px' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/user-data" element={<UserData />} />
          <Route path="/test" element={<SomeComponent />} />

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
              authenticated && userRole === 'hod' ? (
                <HodDashboard />
              ) : (
                <Navigate to="/unauthorized" />
              )
            }
          />
          <Route
            path="/principal"
            element={
              authenticated && userRole === 'principal' ? (
                <PrincipalDashboard />
              ) : (
                <Navigate to="/unauthorized" />
              )
            }
          />
          <Route
            path="/director"
            element={
              authenticated && userRole === 'director' ? (
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
