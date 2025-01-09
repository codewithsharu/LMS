import React, { useState, useEffect } from "react";
import "./NonTeaching.css";
import jsPDF from "jspdf";
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserDataFromToken } from '../utils/authUtils';

const LeaveApplicationForm = () => {
  const location = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    designation: "",
    branch: "",
    leaveDays: "",
    leaveStartDate: "",
    leaveEndDate: "",
    leaveReasons: "",
    leaveAddress: "",
    mobileNumber: "",
    assignedTo: "",
    employeeType: "nonteaching",
    leaveType: location.pathname === '/cl' ? 'casual' : 'hpcl',
    halfDaySession: "",
    adjustedToEmpId: "",
  });

  const navigate = useNavigate();
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      const userData = getUserDataFromToken(token);
      if (userData) {
        setFormData(prev => ({
          ...prev,
          employeeId: userData.empId || '',
          name: userData.name || '',
          designation: userData.role || '',
          branch: userData.branch || '',
          leaveType: location.pathname === '/cl' ? 'casual' : 'hpcl',
        }));
      }
    }
  }, [navigate, token, isAuthenticated, location.pathname]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('adjustedTo[')) {
      setFormData(prevData => ({
        ...prevData,
        adjustedTo: [
          {
            ...prevData.adjustedTo[0],
            employeeId: value
          }
        ]
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  // Effect to calculate leave days whenever the start or end date changes
  useEffect(() => {
    const { leaveStartDate, leaveEndDate } = formData;
    if (leaveStartDate && leaveEndDate) {
      const startDate = new Date(leaveStartDate);
      const endDate = new Date(leaveEndDate);
      if (endDate >= startDate) {
        const timeDiff = endDate - startDate;
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // Include both start and end date
        setFormData((prevData) => ({
          ...prevData,
          leaveDays: daysDiff,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          leaveDays: "",
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        leaveDays: "",
      }));
    }
  }, [formData.leaveStartDate, formData.leaveEndDate]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    // (PDF generation code can be added here)
    setIsSubmitted(true);
  };

  const handleSubmit = async () => {
    console.log(formData); // Check form data before submitting
    try {
      const response = await fetch('http://localhost:3007/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send form data to the backend
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setIsSubmitted(true);
  
        // Reset the form after successful submission
        setFormData({
          employeeId: "",
          name: "",
          designation: "",
          branch: "",
          leaveDays: "",
          leaveStartDate: "",
          leaveEndDate: "",
          leaveReasons: "",
          leaveAddress: "",
          mobileNumber: "",
          assignedTo: "",  // Reset assignedTo
        });
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="non-teaching-form">
      <div className="leave-type-indicator">
        Current Leave Type: {formData.leaveType === 'casual' ? 'Casual Leave' : 'Half Pay Commuted Leave'}
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Employee ID:
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            readOnly
          />
        </label>

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            readOnly
          />
        </label>

        <label>
          Designation:
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            required
            readOnly
          />
        </label>

        <label>
          Branch:
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleInputChange}
            required
            readOnly
          />
        </label>

        <div className="date-range">
          <label>
            From:
            <input
              type="date"
              name="leaveStartDate"
              value={formData.leaveStartDate}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            To:
            <input
              type="date"
              name="leaveEndDate"
              value={formData.leaveEndDate}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <label>
          Leave required (days):
          <input
            type="number"
            name="leaveDays"
            value={formData.leaveDays}
            readOnly
            required
          />
        </label>

        <label>
          Reasons for leave:
          <textarea
            name="leaveReasons"
            value={formData.leaveReasons}
            onChange={handleInputChange}
            required
          ></textarea>
        </label>

        <label>
          Leave Address:
          <input
            type="text"
            name="leaveAddress"
            value={formData.leaveAddress}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Mobile No.:
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Apply to:
          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Authority</option>
            <option value="HOD">HOD</option>
            <option value="Principal">Principal</option>
            <option value="DIRECTOR">Director</option>
          </select>
        </label>

      
        <input
         
          name="leaveType"
          value={formData.leaveType}
        />

        <div className="adjustment-section">
          <label>
            Adjusted To (Employee ID):
            <input
              type="text"
              name="adjustedToEmpId"
              value={formData.adjustedToEmpId}
              onChange={handleInputChange}
              required
              placeholder="Enter employee ID for adjustment"
            />
          </label>
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      {isSubmitted && <p>Form submitted successfully!</p>}
    </div>
  );
}

export default LeaveApplicationForm;
