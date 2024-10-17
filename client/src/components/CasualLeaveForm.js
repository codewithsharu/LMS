import React, { useState } from "react";
import "./NonTeaching.css";
import jsPDF from "jspdf";
import logo from './images/log.jpeg';

function CasualLeaveForm() {
  const [applicantSignature, setApplicantSignature] = useState("");
  const [sanctioned, setSanctioned] = useState("sanctioned");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    designation: "",
    department: "",
    availableLeaves: 15,
    leaveDays: "",
    leaveStartDate: "",
    leaveEndDate: "",
    leavesAvailed: 1,
    balanceLeave: 0,
    leaveReasons: "",
    leaveAddress: "",
    mobileNumber: "",
  });

  const [tableData, setTableData] = useState([
    { date: "", period: "", branchYear: "", subject: "", toWhom: "", signature: "" },
    { date: "", period: "", branchYear: "", subject: "", toWhom: "", signature: "" },
    { date: "", period: "", branchYear: "", subject: "", toWhom: "", signature: "" },
    { date: "", period: "", branchYear: "", subject: "", toWhom: "", signature: "" },
  ]);

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

  const handleTableDataChange = (index, field, value) => {
    const newTableData = [...tableData];
    newTableData[index][field] = value;
    setTableData(newTableData);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    
    doc.setFillColor(255, 255, 255); 
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, "F");
 


    const logoPath = './images/log.jpeg'; 

    fetch(logoPath)
        .then(response => response.blob())
        .then(blob => {
            const imgUrl = URL.createObjectURL(blob);

           
            doc.addImage(imgUrl, 'JPEG', 20, 20, 30, 30);

            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.text("ADITYA INSTITUTE OF TECHNOLOGY AND MANAGEMENT", 105, 15, { align: "center" });

            doc.setFontSize(10);
            doc.text("K.KOTTURU, TEKKALI, SRIKAKULAM DIST.", 105, 25, { align: "center" });
            doc.text("PH : 08945-2452666 & 245666", 105, 32, { align: "center" });

            doc.setLineWidth(0.5);
            doc.line(20, 38, 190, 38);

            doc.setFontSize(12);
            doc.text("                             APPLICATION FOR CASUAL LEAVE / TEACHING", 20, 50);
            doc.line(20, 55, 190, 55);

            const fieldWidth = 130;
            const startX = 70; 
            const fieldStartY = 65; 
            const labelStartX = 20; 
            const lineHeight = 10; 

            const fields = [
                { label: "Employee ID :", value: formData.employeeId },
                { label: "Name:", value: formData.name },
                { label: "Designation:", value: formData.designation },
                { label: "Department:", value: formData.department },
                { label: "Available Leaves:", value: formData.availableLeaves },
                { label: "Leave required (days):", value: formData.leaveDays },
                { label: "From:", value: formData.leaveStartDate },
                { label: "To:", value: formData.leaveEndDate },
                { label: "Leaves availed this month:", value: formData.leavesAvailed },
                { label: "Balance Leaves:", value: formData.balanceLeave },
                { label: "Reasons for leave:", value: formData.leaveReasons },
                { label: "Leave address:", value: formData.leaveAddress },
                { label: "Mobile No:", value: formData.mobileNumber },
                { label: "Sanctioned/Not Sanctioned:", value: "  ___________________" },
                { label: "Signature of Applicant:", value: "  ___________________" },
                { label: "Principal / Director Signature:", value: "   ___________________" },
            ];

            let currentY = fieldStartY;

        
            fields.forEach(({ label, value }) => {
                doc.text(label, labelStartX, currentY);
                doc.text(value.toString(), startX, currentY);
                currentY += lineHeight;
            });

         
            const tableStartY = currentY + 10; 
            doc.text("Leave Adjustment Table:", labelStartX, tableStartY);
            currentY = tableStartY + 5;

         
            const headers = ["Date", "Periods", "Branch/Year", "Subject", "To Whom Adjust", "Signature"];

        
            const cellWidth = 30; 
            const headerHeight = 10; 

         
            headers.forEach((header, i) => {
             
                doc.rect(labelStartX + i * cellWidth, currentY, cellWidth, headerHeight); 
                doc.text(header, labelStartX + i * cellWidth + 2, currentY + 7); 
            });

         
            currentY += headerHeight;

            
            tableData.forEach((row) => {
                const rowHeight = 10; 
                const rowValues = [row.date, row.period, row.branchYear, row.subject, row.toWhom, row.signature];

               
                rowValues.forEach((value, j) => {
                  
                    doc.rect(labelStartX + j * cellWidth, currentY, cellWidth, rowHeight); 
                    doc.text(value, labelStartX + j * cellWidth + 2, currentY + 7); 
                });

               
                currentY += rowHeight;
            });

           
            doc.save("Teaching_Leave_Application.pdf");
            setIsSubmitted(true);
        })
        .catch(error => console.error("Error loading image:", error));
};


  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="non-teaching-form">
      <h1 className="head">Leave Application for Teaching Staff</h1>
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
            <option value="principal">Principal</option>
            <option value="director">Director</option>
            <option value="dean">Dean</option>
            <option value="associate dean">Associate Dean</option>
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

        
          <label>Available Leaves:
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

        <label>Leave Adjustment:</label>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Periods</th>
              <th>Branch/Year</th>
              <th>Subject</th>
              <th>To Whom Adjusted</th>
              <th>Signature of Concerned Staff</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="date"
                    value={row.date}
                    onChange={(e) => handleTableDataChange(index, "date", e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.period}
                    onChange={(e) => handleTableDataChange(index, "period", e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.branchYear}
                    onChange={(e) => handleTableDataChange(index, "branchYear", e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.subject}
                    onChange={(e) => handleTableDataChange(index, "subject", e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.toWhom}
                    onChange={(e) => handleTableDataChange(index, "toWhom", e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.signature}
                    onChange={(e) => handleTableDataChange(index, "signature", e.target.value)}
                    required
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button type="button" onClick={downloadPDF}>
          Download PDF
        </button>
        <button type="button" onClick={handleSubmit} className="submit-button">
          Submit Successfully
        </button>
        {isSubmitted && <p>Your leave application has been submitted!</p>}
      </form>
    </div>
  );
}

export default CasualLeaveForm;
