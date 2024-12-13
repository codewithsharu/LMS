import React, { useState, useEffect } from "react";
import "./NonTeaching.css";
import jsPDF from "jspdf";
import { useNavigate } from 'react-router-dom'; // Using useNavigate for navigation

const NonTeaching = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    designation: "",
    branch: "", // Make sure this field is part of the form data
    leaveDays: "",
    leaveStartDate: "",
    leaveEndDate: "",
    leaveReasons: "",
    leaveAddress: "",
    mobileNumber: "",
    assignedTo: "",  // New field for "Apply To"
  });

  const navigate = useNavigate(); // For redirecting to login page

  // Check if the user is logged in and populate the form
  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    if (!loggedIn) {
      // Redirect to login page if not logged in
      navigate("/login");
    } else {
      // Populate form from session data
      const empId = sessionStorage.getItem('empid');
      const role = sessionStorage.getItem('role');
      const name = sessionStorage.getItem('name');
      const branch = sessionStorage.getItem('branch');
      
      setFormData({
        employeeId: empId,
        name: name,
        designation: role, // Role as designation
        branch: branch, // Ensure this value is set
        leaveDays: "",
        leaveStartDate: "",
        leaveEndDate: "",
        leaveReasons: "",
        leaveAddress: "",
        mobileNumber: "",
        assignedTo: "",  // Keep this empty initially
      });
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      return updatedData;
    });
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
      <h1 className="head">Leave Application for Non-Teaching Staff</h1>
      <form>
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
            <option value="PRINCIPAL">Principal</option>
            <option value="DIRECTOR">Director</option>
          </select>
        </label>

        <button
          type="button"
          className="generate-pdf-button"
          onClick={downloadPDF}
        >
          Generate PDF
        </button>
        <button type="button" onClick={handleSubmit} className="submit-button">
          Submit 
        </button>
      </form>
      {isSubmitted && <p>Form submitted successfully!</p>}
    </div>
  );
}

export default NonTeaching;
