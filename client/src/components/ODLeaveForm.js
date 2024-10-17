import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "./ODLeaveForm.css";
import logo from './images/log.jpeg';

const ODLeaveForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    employeeId: "",
    name: "",
    onDutyFrom: "",
    onDutyTo: "",
    purpose: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const downloadPDF = async () => {
   
    const doc = new jsPDF();

  
    doc.setFillColor(255, 255, 255); 
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, "F");

   
    const response = await fetch(logo);
    const blob = await response.blob();
    const reader = new FileReader();

    reader.onloadend = () => {
      const imgData = reader.result;
      doc.addImage(imgData, "JPEG", 10, 10, 20, 20); 

    
      doc.setFontSize(14);
      doc.text("ADITYA INSTITUTE OF TECHNOLOGY AND MANAGEMENT", 105, 15, {
        align: "center",
      });
      doc.setFontSize(10);
      doc.text("K.KOTTURU, TEKKALI, SRIKAKULAM DIST.", 105, 25, {
        align: "center",
      });
      doc.text("PH: 08945-2452666 & 245666", 105, 32, { align: "center" });
      doc.setLineWidth(0.5);
      doc.line(20, 38, 190, 38);

  
      doc.setFontSize(12);
      doc.text("APPLICATION FOR ON-DUTY LEAVE", 105, 45, { align: "center" });
      doc.line(20, 50, 190, 50);

   
      const fieldStartY = 60;
      const labelX = 20;
      const valueX = 70;
      const lineHeight = 10;

      const fields = [
        { label: "Employee ID :", value: formData.employeeId },
        { label: "Name:", value: formData.name },
        { label: "Date:", value: formData.date },
        { label: "Assigned On Duty From:", value: formData.onDutyFrom },
        { label: "Assigned On Duty To:", value: formData.onDutyTo },
        { label: "Purpose of On-Duty:", value: formData.purpose },
      ];

      let currentY = fieldStartY;

    
      fields.forEach(({ label, value }) => {
        doc.text(label, labelX, currentY);
        doc.text(value || "________________________", valueX, currentY);
        currentY += lineHeight;
      });

    
      doc.text("Signature of Assigning Authority: ____________________", 20, currentY + 20);
      doc.text("Signature of Principal: ____________________", 20, currentY + 30);

     
      doc.save("OD_Leave_Application.pdf");
    };

    reader.readAsDataURL(blob); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true); 
  };

  return (
    <div className="od-leave-form">
      <h1 className="head">Leave Application for Teaching Staff (OD'S)</h1>
      <form onSubmit={handleSubmit}>
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
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
        />

        <label>Assigned On Duty From:</label>
        <input
          type="date"
          name="onDutyFrom"
          value={formData.onDutyFrom}
          onChange={handleInputChange}
          required
        />

        <label>Assigned On Duty To:</label>
        <input
          type="date"
          name="onDutyTo"
          value={formData.onDutyTo}
          onChange={handleInputChange}
          required
        />

        <label>Purpose of On-Duty:</label>
        <textarea
          name="purpose"
          value={formData.purpose}
          onChange={handleInputChange}
          required
        />

       
        <button type="button" onClick={downloadPDF} className="submit-button">
          Download PDF
        </button>

        
        <button type="submit" className="submit-button">
          Submit Successfully
        </button>

       
        {isSubmitted && <p>Your leave application has been submitted successfully!</p>}
      </form>
    </div>
  );
};

export default ODLeaveForm;
