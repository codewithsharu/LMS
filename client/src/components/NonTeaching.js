import React, { useState, useEffect } from "react";
import "./NonTeaching.css";
import jsPDF from "jspdf";
import logo from './images/log.jpeg'; // Assuming you have the logo

const employeeData = {
  "A50ME0NT01": { name: "KANCHARI KALIDAS", designation: "Technician", department: "CSE" },
  "A50ME0NT02": { name: "MENDA RAMINAIDU", designation: "Attender", department: "ECE" },
  "A50ME0NT03": { name: "DESULA ANANDA RAO", designation: "Technician", department: "Mechanical" },
  "A50ME0NT05": { name: "PANGA SATYANARAYANA", designation: "Attender", department: "Civil" },
  "A50ME0NT06": { name: "Y GANGADHARA RAO", designation: "Technician", department: "IT" },
  "A50ME0NT07": { name: "G HARISHANKAR", designation: "Attender", department: "CSD" },
  "A50PD0NT01": { name: "S LAKSHMANA MURTHY", designation: "Technician", department: "CSM" },
  "A50PD0NT02": { name: "V MOTILAL", designation: "Technician", department: "ECE" },
  "A50PD0NT03": { name: "V ESWARA RAO", designation: "Attender", department: "Civil" },
  "A50PD0NT04": { name: "T MURALI MOHANA RAO", designation: "Technician", department: "Mechanical" },
  "A50PD0NT05": { name: "J TEJESWARI", designation: "Attender", department: "CSE" },
};

function NonTeaching() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    designation: "",
    department: "",
    leaveDays: "",
    leaveStartDate: "",
    leaveEndDate: "",
    leaveReasons: "",
    leaveAddress: "",
    mobileNumber: "",
    assignedTo: "",  // New field for "Apply To"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the form data
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      // Automatically set name, designation, and department if employeeId changes
      if (name === "employeeId") {
        const employeeInfo = employeeData[value] || { name: "", designation: "", department: "" };
        updatedData.name = employeeInfo.name;
        updatedData.designation = employeeInfo.designation;
        updatedData.department = employeeInfo.department;
      }

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
          department: "",
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
            list="employeeIdList"
            value={formData.employeeId}
            onChange={handleInputChange}
            required
          />
          <datalist id="employeeIdList">
            {Object.keys(employeeData).map(id => (
              <option key={id} value={id}>
                {employeeData[id].name}
              </option>
            ))}
          </datalist>
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
          Department:
          <input
            type="text"
            name="department"
            value={formData.department}
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
