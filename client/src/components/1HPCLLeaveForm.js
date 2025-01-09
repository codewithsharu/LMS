import React, { useState } from "react";
import "./HPCLLeaveForm.css";
import jsPDF from "jspdf";
import logo from './images/log.jpeg';

function HPCLLeaveForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    designation: "",
    department: "",
    availableLeaves: 20,
    leaveDays: "",
    leaveStartDate: "",
    leaveEndDate: "",
    leavesAvailed: 1,
    balanceLeave: 0,
    leaveReasons: "",
    leaveAddress: "",
    mobileNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "leaveDays") {
      const leaveDaysValue = Number(value);

      if (leaveDaysValue > 1) {
        alert("More than 1 leave will result in pay off cutting");
      }

      const balanceLeave = formData.availableLeaves - leaveDaysValue;

      setFormData((prevData) => ({
        ...prevData,
        leaveDays: leaveDaysValue,
        balanceLeave: balanceLeave,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
  
   
    doc.setFillColor(255, 255, 255); 
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, "F");
  
    
    doc.addImage(logo, 'JPEG', 10, 10, 20, 20); 
  
  
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("ADITYA INSTITUTE OF TECHNOLOGY AND MANAGEMENT", 105, 15, { align: "center" });
  
    doc.setFontSize(10);
    doc.text("K.KOTTURU, TEKKALI, SRIKAKULAM DIST.", 105, 25, { align: "center" });
    doc.text("PH : 08945-2452666 & 245666", 105, 32, { align: "center" });
  
    doc.setLineWidth(0.5);
    doc.line(20, 38, 190, 38);
  
    doc.setFontSize(12);
    doc.text("APPLICATION FOR CASUAL LEAVE / TEACHING", 20, 50);
    doc.line(20, 55, 190, 55);
  
    const fields = [
      { label: "Employee ID :", value: formData.employeeId },
      { label: "Name:", value: formData.name },
      { label: "Designation:", value: formData.designation },
      { label: "Department:", value: formData.department },
      { label: "Available Leaves:", value: String(formData.availableLeaves) }, 
      { label: "Leave required (days):", value: String(formData.leaveDays) }, 
      { label: "From:", value: formData.leaveStartDate },
      { label: "To:", value: formData.leaveEndDate },
      { label: "Leaves availed this month:", value: String(formData.leavesAvailed) }, 
      { label: "Balance Leaves:", value: String(formData.balanceLeave) }, 
      { label: "Reasons for leave:", value: formData.leaveReasons },
      { label: "Leave address:", value: formData.leaveAddress },
      { label: "Mobile No:", value: formData.mobileNumber },
      { label: "Sanctioned/Not Sanctioned:", value: "  ___________________" },
      { label: "Signature of Applicant:", value: "  ___________________" },
      { label: "Principal / Director Signature:", value: "   ___________________" },
    ];
  
    const fieldStartY = 65; 
    const lineHeight = 10; 
  
    fields.forEach((field, index) => {
      doc.setFontSize(10);
      doc.text(field.label, 20, fieldStartY + index * lineHeight);
      doc.text(field.value, 100, fieldStartY + index * lineHeight);
    });
  
  
    doc.save("Teaching_Leave_Application.pdf");
    setIsSubmitted(true);
  };
  

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="non-teaching-form">
      <h1 className="head">Leave Application for Teaching Staff (HPCL'S)</h1>
      <form>
        <label>
          Employee ID:
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleInputChange}
            required
          />
        </label>
        
        <label>Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange} 
            required
          />
        </label>

        <label>
          Designation:
          <select
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="hodcsE">HOD-CSE</option>
            <option value="hodcsm">HOD-CSM</option>
            <option value="hodcsd">HOD-CSD</option>
            <option value="hodit">HOD-IT</option>
            <option value="hodece">HOD-ECE</option>
            <option value="hodeee">HOD-EEE</option>
            <option value="hodmech">HOD-MECH</option>
            <option value="hodcivil">HOD-CIVIL</option>
            <option value="hoddiploma">HOD-DIPLOMA</option>
            <option value="hodmtech">HOD-MTECH</option>
            <option value="hodmba">HOD-MBA</option>
            <option value="hodmca">HOD-MCA</option>
            <option value="hodbsh">HOD-BS&H</option>
            <option value="professor">Professor</option>
            <option value="teacher">Teacher</option>
          </select>
        </label>

        <label>
          Department:
          <select
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Department</option>
            <option value="CSE">CSE</option>
            <option value="CSM">CSM</option>
            <option value="CSD">CSD</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="CIVIL">CIVIL</option>
            <option value="MECH">MECH</option>
            <option value="M-TECH">M-TECH</option>
            <option value="MBA">MBA</option>
            <option value="MCA">MCA</option>
            <option value="DIPLOMA">DIPLOMA</option>
          </select>
        </label>

        <label>Available HPCL Leaves:
          <input
            type="text"
            name="availableLeaves"
            value={formData.availableLeaves}
            readOnly
          />
        </label>
        
        <label>Leave required (days):
          <input
            type="number"
            name="leaveDays"
            value={formData.leaveDays}
            onChange={handleInputChange}
            required
          />
        </label>
        
        <label>From:
          <input
            type="date"
            name="leaveStartDate"
            value={formData.leaveStartDate}
            onChange={handleInputChange}
            required
          />
        </label>
        
        <label>To:
          <input
            type="date"
            name="leaveEndDate"
            value={formData.leaveEndDate}
            onChange={handleInputChange}
            required
          />
        </label>
        
        <div>
          <label>Leaves availed this month:</label>
          <input
            type="number"
            name="leavesAvailed"
            value={formData.leavesAvailed}
            onChange={handleInputChange}
          />
        </div>
        
        <div>
          <label>Balance Leaves:</label>
          <input
            type="number"
            name="balanceLeave"
            value={formData.balanceLeave}
            readOnly
          />
        </div>
        
        <div>
          <label>Reasons for leave:</label>
          <input
            type="text"
            name="leaveReasons"
            value={formData.leaveReasons}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label>Leave address:</label>
          <input
            type="text"
            name="leaveAddress"
            value={formData.leaveAddress}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label>Mobile No:</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="button" className="sub" onClick={downloadPDF} >
          Download PDF
        </button>
        
        <button type="button" onClick={handleSubmit} className="submit-button">Submit Successfully</button>
        {isSubmitted && <p>Your leave application has been submitted!</p>}
      </form>
    </div>
  );
}

export default HPCLLeaveForm;
