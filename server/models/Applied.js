const mongoose = require('mongoose');

const AppliedSchema = new mongoose.Schema({
    employeeId: { type: String, required: true },
    name: { type: String, required: true },
    designation: { type: String, required: true },
    branch: { type: String, required: true },
    leaveDays: { type: Number, required: true },
    leaveStartDate: { type: Date, required: true },
    leaveEndDate: { type: Date, required: true },
    leaveReasons: { type: String, required: true },
    leaveAddress: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    assignedTo: { type: String, default: '' },
    forwardedTo: { type: String, default: null },
    forwardedBy: { type: String, default: null },
    hodApproval: {
        status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
        message: { type: String, default: '' }
    },
    principalApproval: {
        status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
        message: { type: String, default: '' }
    },
    directorApproval: {
        status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
        message: { type: String, default: '' }
    },
    adjustedTo: [{
        employeeId: { type: String, required: true },
        name: { type: String, required: true },
        designation: { type: String, required: true },
        adjustmentDetails: { type: String, required: true },
        date: { type: Date, default: Date.now }
    }],
    adjustmentStatus: {
        type: String,
        enum: ['pending', 'partially_adjusted', 'fully_adjusted'],
        default: 'pending'
    },
    employeeType: { 
        type: String, 
        enum: ['teaching', 'nonteaching'], 
        required: true 
    },
    leaveType: { 
        type: String, 
        enum: ['casual', 'hpcl'], 
        required: true 
    },
    halfDaySession: {
        type: String,
        enum: ['AM', 'PM'],
        required: function() {
            if (this.leaveType !== 'hpcl') return false;
            
            // Check if leaveDays has a .5 component
            return this.leaveDays % 1 !== 0;
        }
    },
});

const Applied = mongoose.model('Applied', AppliedSchema);

module.exports = Applied;
