import { jwtDecode } from 'jwt-decode';

export const getUserDataFromToken = (token) => {
  if (!token) return null;
  
  try {
    const decoded = jwtDecode(token);
    
    // Check if token is expired
    if (decoded.exp * 1000 < Date.now()) {
      return null;
    }
    
    return {
      empId: decoded.empId,
      role: decoded.role,
      name: decoded.name,
      branch: decoded.branch,
      employee_type: decoded.employee_type
    };
  } catch (error) {
    console.error('Token decode error:', error);
    return null;
  }
}; 