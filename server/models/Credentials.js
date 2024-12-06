const mongoose = require('mongoose');

// Define the Credentials schema
const CredentialsSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
    unique: true,
  },
  empPassword: {
    type: String,
    required: true,
  },
  empType: {
    type: String,
    enum: ['Permanent', 'Contract', 'Intern'], // Customize types as needed
    required: false, // Optional
  },
});

// Create the Credentials model
const Credentials = mongoose.model('Credentials', CredentialsSchema);

module.exports = Credentials;
