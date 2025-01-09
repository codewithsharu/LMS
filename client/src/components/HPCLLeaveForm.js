import React, { useState, useEffect } from "react";
import "./NonTeaching.css";
import jsPDF from "jspdf";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserDataFromToken } from '../utils/authUtils';

const HPCLApplicationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    designation: "",
    branch: "",
    numberOfHPCL: "",
    leaveStartDate: "",
    halfDaySession: "", // AM or PM for half day
    leaveReasons: "",
    leaveAddress: "",
    mobileNumber: "",
    assignedTo: "",
    employeeType: "nonteaching",
    leaveType: "hpcl",
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
        }));
      }
    }
  }, [navigate, token, isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Convert numberOfHPCL to a number
      const numberOfHPCL = Number(formData.numberOfHPCL);
      
      // Check if it's a half day (1)
      if (numberOfHPCL === 1 && !formData.halfDaySession) {
        alert('Please select AM or PM session for the leave');
        return;
      }

      const submissionData = {
        ...formData,
        leaveEndDate: formData.leaveStartDate,
        leaveDays: numberOfHPCL,
        halfDaySession: formData.halfDaySession
      };

      const response = await fetch('http://localhost:3007/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data.message);
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit application');
    }
  };

  return (
    <div className="non-teaching-form">
      <h1 className="head">HPCL Application Form</h1>
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
            readOnly
          />
        </label>

        <label>
          Designation:
          <input
            type="text"
            name="designation"
            value={formData.designation}
            readOnly
          />
        </label>

        <label>
          Branch:
          <input
            type="text"
            name="branch"
            value={formData.branch}
            readOnly
          />
        </label>

        <label>
          Start Date:
          <input
            type="date"
            name="leaveStartDate"
            value={formData.leaveStartDate}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Number of HPCL Days:
          <input
            type="number"
            name="numberOfHPCL"
            value={formData.numberOfHPCL}
            onChange={handleInputChange}
            min="1"
            step="1"
            required
          />
        </label>

        <label>
          Session:
          <select
            name="halfDaySession"
            value={formData.halfDaySession}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Session</option>
            <option value="AM">Morning (AM)</option>
            <option value="PM">Afternoon (PM)</option>
          </select>
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

        <button type="submit">Submit</button>
      </form>
      {isSubmitted && <p>Form submitted successfully!</p>}
    </div>
  );
};

export default HPCLApplicationForm;