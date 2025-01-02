import './App.css';
import CustomNavbar from './components/CustomNavbar';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from './store/slices/authSlice';
import { getUserDataFromToken } from './utils/authUtils';
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

import RoleDisplay from './components/RoleDisplay';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState(null);
  const { isAuthenticated, token } = useSelector(state => state.auth);
  const userData = token ? getUserDataFromToken(token) : null;

  // Add loading state
  const [isLoading, setIsLoading] = useState(true);

  // Update token initialization
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = sessionStorage.getItem('jwtToken');
      if (storedToken) {
        console.log('Found token on load:', storedToken);
        const decodedToken = getUserDataFromToken(storedToken);
        console.log('Decoded token:', decodedToken);
        dispatch(setUserData({ token: storedToken }));
        
        try {
          const response = await axios.get('http://localhost:3007/user-data', {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          console.log('API Response:', response.data);
          if (response.data && response.data.role) {
            setUserRole(response.data.role);
            console.log('Set userRole to:', response.data.role);
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
          setUserRole(null);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('isLoggedIn');
    setUserRole(null);
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  // Create a role-based protected route component
  const RoleProtectedRoute = ({ children, allowedRole }) => {
    console.log('RoleProtectedRoute Check:', {
      isAuthenticated,
      userRole,
      allowedRole,
      isLoading,
      token: !!token
    });

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting to login');
      return <Navigate to="/login" />;
    }

    if (!userRole) {
      console.log('No role found, redirecting to unauthorized');
      return <Navigate to="/unauthorized" />;
    }

    if (userRole !== allowedRole) {
      console.log(`Unauthorized role: ${userRole}, required: ${allowedRole}`);
      return <Navigate to="/unauthorized" />;
    }

    console.log('Access granted for role:', userRole);
    return children;
  };

  return (
    <BrowserRouter>
      <CustomNavbar 
        isAuthenticated={isAuthenticated} 
        onLogout={handleLogout} 
        userRole={userData?.role} 
      />
      <div style={{ marginTop: '64px' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/non-teaching" element={<NonTeaching />} />
          <Route path="/user-data" element={<UserData />} />
          <Route 
            path="/login" 
            element={!isAuthenticated ? <Login /> : <Navigate to="/welcome" replace />} 
          />

          {/* Protected Routes */}
          <Route
            path="/welcome"
            element={
              <ProtectedRoute>
                <WelcomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/test"
            element={<RoleDisplay />}
          />

          <Route
            path="/casual-leave"
            element={
              <ProtectedRoute>
                <CasualLeaveForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/od-leave"
            element={
              <ProtectedRoute>
                <ODLeaveForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hpcl-leave"
            element={
              <ProtectedRoute>
                <HPCLLeaveForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/emp"
            element={
           
                <EmployeeDetails />
             
            }
          />

          {/* Role-based Routes */}
          <Route
            path="/hod"
            element={
              <RoleProtectedRoute allowedRole="hod">
                {console.log('Attempting to render HodDashboard')}
                <HodDashboard />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/principal"
            element={
              <RoleProtectedRoute allowedRole="principal">
                {console.log('Attempting to render PrincipalDashboard')}
                <PrincipalDashboard />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/director"
            element={
              <RoleProtectedRoute allowedRole="director">
                {console.log('Attempting to render DirectorDashboard')}
                <DirectorDashboard />
              </RoleProtectedRoute>
            }
          />

          <Route path="/role" element={<RoleDisplay />} />

          {/* Unauthorized Page Route */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
