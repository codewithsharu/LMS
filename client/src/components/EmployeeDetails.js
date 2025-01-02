import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserDataFromToken } from '../utils/authUtils';
import axios from "axios";
import "./EmployeeDetails.css";

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const userData = token ? getUserDataFromToken(token) : null;

  useEffect(() => {
    let isMounted = true;

    const fetchEmployeeDetails = async () => {
      if (!isAuthenticated || !userData || isLoading) {
        return;
      }

      setIsLoading(true);
      try {
        const empId = userData.empId;
        const employeeResponse = await axios.get(`http://localhost:3007/employee/${empId}`);
        if (isMounted) {
          setEmployee(employeeResponse.data);
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError("Employee not found or server error.");
          setEmployee(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchEmployeeDetails();

    return () => {
      isMounted = false;
    };
  }, [userData?.empId, isAuthenticated]); // Only depend on empId and auth status

  if (!isAuthenticated || !userData) {
    return (
      <div className="employee-details-container">
        <h2>Please log in to view employee details</h2>
      </div>
    );
  }

  return (
    <div className="employee-details-container">
      <h1 className="title">Employee Details</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {employee && !isLoading && (
        <div className="employee-info">
          <h2>{employee.name}</h2>
          <p>Employee ID: {employee.empid}</p>
          <p>Contact: {employee.contact_number}</p>
          <p>Joining Date: {new Date(employee.joining_date).toLocaleDateString()}</p>

          <div className="leave-summary">
            <h3>Leave Summary</h3>
            <div className="leave-section">
              <div className="leave-detail">
                <h4>Total Leaves</h4>
                <p>{employee.total_leaves}</p>
              </div>
              <div className="leave-detail">
                <h4>Available Leaves</h4>
                <p>{employee.available_leaves}</p>
              </div>
              <div className="leave-detail">
                <h4>Extra Leaves</h4>
                <p>{employee.extra_leaves}</p>
              </div>
            </div>

            <div className="monthly-leaves">
              <h3>Monthly Leave Usage</h3>
              <div className="monthly-leaves-grid">
                {Object.keys(employee.monthly_leaves).map((month) => (
                  <div key={month} className="monthly-leave">
                    <p>{month}</p>
                    <p>{employee.monthly_leaves[month]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;