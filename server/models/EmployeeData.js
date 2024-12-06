const mongoose = require('mongoose');

const EmployeeDataSchema = new mongoose.Schema({
    empid: {
        type: String,
        required: true,
        unique: true
    },
    employee_type: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    joining_date: {
        type: Date,
        required: true
    },
    contact_number: {
        type: String,
        required: true
    },
    total_leaves: {
        type: Number,
        default: 15
    },
    extra_leaves: {
        type: Number,
        default: 0
    },
    available_leaves: {
        type: Number,
        default: 15
    },
    monthly_leaves: {
        January: { type: Number, default: 0 },
        February: { type: Number, default: 0 },
        March: { type: Number, default: 0 },
        April: { type: Number, default: 0 },
        May: { type: Number, default: 0 },
        June: { type: Number, default: 0 },
        July: { type: Number, default: 0 },
        August: { type: Number, default: 0 },
        September: { type: Number, default: 0 },
        October: { type: Number, default: 0 },
        November: { type: Number, default: 0 },
        December: { type: Number, default: 0 }
    },
    branch: {
        type: String,
        required: true
    }
});

const EmployeeData = mongoose.model('EmployeeData', EmployeeDataSchema);

module.exports = EmployeeData;
