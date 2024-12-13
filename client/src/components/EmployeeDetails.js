import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeDetails.css"; // Link to your CSS file

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  const empid = sessionStorage.getItem("empid");

  const fetchEmployeeDetails = async () => {
    try {
      const response = await axios.get(`http://10.10.31.146:3007/employee/${empid}`);
      setEmployee(response.data);
      setError("");
    } catch (err) {
      setError("Employee not found or server error.");
      setEmployee(null);
    }
  };

  useEffect(() => {
    if (empid) {
      fetchEmployeeDetails();
    } else {
      setError("No Employee ID found in session.");
    }
  }, [empid]);

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
