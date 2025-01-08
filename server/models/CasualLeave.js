const mongoose = require('mongoose');

// Sub-schema for individual leave records
const leaveRecordSchema = new mongoose.Schema({
    leaveId: {
        type: String,
        required: true
    },
    fromDate: {
        type: Date,
        required: true
    },
    toDate: {
        type: Date,
        required: true
    },
    adjustedTo: {
        type: String,
        required: true
    },
    adjustedToName: {
        type: String,
        required: true
    },
    reason: {
        type: String, 
        required: true
    }
}, {
    timestamps: true
});

// Main schema with leaves array
const casualLeaveSchema = new mongoose.Schema({
    empId: {
        type: String,
        required: true,
        unique: true
    },
    employeeName: {
        type: String,
        required: true
    },
    leaves: [leaveRecordSchema]
});

const CasualLeave = mongoose.model('CasualLeave', casualLeaveSchema);

module.exports = CasualLeave; 