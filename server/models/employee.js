// models/employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    EMP_ID: String,
    First_Name: String,
    Last_Name: String,
    Gender: String,
    Email: String,
    Contact: String,
    Date_Of_Joining: String,
    Designation: String,
    Department_Name: String,
    Salary: Number,
    Address: String,
    Emergency_Contact: String,
    Types_of_Leaves: Object,
    Emp_Type: String,
    DOB: String,
    Remarks: String,
    Leave_Entitlement: Object,
    Leaves_Taken: Object,
    Remaining_Leaves: Object,
    Last_Leave_Applied_Date: String,
    Supervisor_ID: String,
    Leave_Status: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
