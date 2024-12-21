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
        default: 0
    },
    extra_leaves: {
        type: Number,
        default: 0
    },
    available_leaves: {
        type: Number,
        default: 0
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
    },
    leave_counts: {
        casual: { type: Number, default: 0 }, 
        hpcl: { type: Number, default: 0 },   
        od: { type: Number, default: 0 }      
    },
  
    assigned_duties: [{
        assigned_on_duty: { type: Boolean, default: false },
        assigned_on_duty_from: { type: Date },
        assigned_on_duty_to: { type: Date },
        purpose_of_duty: { type: String },
        assigned_to: { type: String },
        assigned_to_empid: { type: String }
    }],
    
    duties_taken_over: [{
        duty_taken_over_from: { type: Date },
        duty_taken_over_to: { type: Date },
        purpose_of_duty: { type: String },
        taken_over_by: { type: String }, 
        taken_over_by_empid: { type: String } 
    }]
});

const EmployeeData = mongoose.model('EmployeeData', EmployeeDataSchema);

module.exports = EmployeeData;
