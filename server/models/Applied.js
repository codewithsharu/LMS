const mongoose = require('mongoose');

const AppliedSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  name: { type: String, required: true },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  leaveDays: { type: Number, required: true },
  leaveStartDate: { type: Date, required: true },
  leaveEndDate: { type: Date, required: true },
  leaveReasons: { type: String, required: true },
  leaveAddress: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  assignedTo: { type: String, default: '' },
  forwardedTo: { type: String, default: null }, // Field for the user it is forwarded to
  forwardedBy: { type: String, default: null }, // Field for the user who forwarded the application
  hodApproval: {
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    message: { type: String, default: '' }
  },
  principalApproval: {
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    message: { type: String, default: '' }
  }
});

const Applied = mongoose.model('Applied', AppliedSchema);

module.exports = Applied;
