
// models/ApprovedLeaves.js
const mongoose = require('mongoose');

const approvedLeavesSchema =  new mongoose.Schema({
    employeeId: { type: String, required: true },
    name: { type: String, required: true },
    designation: { type: String, required: true },
    department: { type: String, required: true },
    leaveDays: { type: Number, required: true },
    leaveStartDate: { type: Date, required: true },
    leaveEndDate: { type: Date, required: true },
    approvalDate:{ type: Date, required: true },
    leaveReasons: { type: String, required: true },
    leaveAddress: { type: String, required: true },
    mobileNumber: { type: String, required: true }
  });

// Export the ApprovedLeaves model
module.exports = mongoose.model('ApprovedLeaves', approvedLeavesSchema);
