import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeDetails.css"; // Link to your CSS file

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");
  const token = sessionStorage.getItem("jwtToken"); // Retrieve the JWT token

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      try {
        // Fetch user data to get empid using the token
        const response = await axios.get("http://localhost:3007/user-data", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request header
          },
        });

        const empid = response.data.empId; // Extract empid from the response

        // Now, make the request with empid in the URL (no token in header)
        const employeeResponse = await axios.get(`http://localhost:3007/employee/${empid}`);
        setEmployee(employeeResponse.data); // Set employee data if successful
        setError(""); // Clear any previous errors
      } catch (err) {
        setError("Employee not found or server error.");
        setEmployee(null); // Clear employee data in case of an error
      }
    };

    fetchEmployeeDetails(); // Fetch employee details when the component mounts
  }, [token]);

  return (
    <div className="employee-details-container">
      <h1 className="title">Employee Details</h1>

      {error && <p className="error-message">{error}</p>}

      {employee && (
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
