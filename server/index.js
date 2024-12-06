// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path'); 
const Employee = require('./models/employee'); 
const NonTeaching = require('./models/NonTeaching'); 
const Applied = require('./models/Applied');
const ApprovedLeaves = require('./models/ApprovedLeaves');
const Credentials = require('./models/Credentials');
const app = express();
const session = require('express-session');
const PORT = process.env.PORT || 3007;
require('dotenv').config();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected to the  database");
       
        // insertDefaultData();
    })
    .catch(err => console.error("MongoDB connection error:", err));

// Configure session middleware
app.use(
    session({
      secret: 'your_secret_key', // Replace with a secure key
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 1000 * 60 * 60 } // 1 hour
    })
  );


// Default users for testing
const defaultUsers = [
    {
      empId: 'A50ME0NT01',
      password: '1',
      role: 'Permanent',
    },
    {
      empId: '2',
      password: '2',
      role: 'Contract',
    },
    {
      empId: 'E003',
      password: 'password789',
      role: 'Intern',
    },
    {
      empId: 'E004',
      password: 'password101',
      role: 'Principal',
    },
    {
      empId: 'E005',
      password: 'password202',
      role: 'HOD',
    },
    {
      empId: 'E006',
      password: 'password303',
      role: 'Dean',
    }
  ];
  
  // Login route
  app.post('/login', async (req, res) => {
    console.log("Reached login");
  
    const { empid, password } = req.body;
  
    try {
      // Find user from the default data
      const user = defaultUsers.find(u => u.empId === empid);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Validate password (no bcrypt in this case, directly compare)
      if (password !== user.password) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Set session variables based on user role
      req.session.authenticated = true;
      req.session.empid = empid;
      req.session.role = user.role;
  

  
      res.status(200).json({ message: 'Login successful', role: user.role });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Middleware for role-based access
const requireRole = (role) => (req, res, next) => {
    if (req.session.authenticated && req.session.role === role) {
        return next();
    }
    res.status(403).json({ message: 'Access denied' });
};


// Logout route
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.status(200).json({ message: 'Logged out successfully' });
    });
});




app.get('/check', async (req, res) => {
    try {
        const data = await Employee.find();
        res.json(data);
    } catch (error) {
        res.status(500).send("Error fetching data: " + error.message);
    }
});

// app.js (Update this section)

app.post('/employees', async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).send("Error saving employee data: " + error.message);
    }
});




// developement----


// Route to update database from NonTeachingdata.json
app.get('/upnt', async (req, res) => {
    try {
        // Path to the JSON file
        const dataPath = path.join(__dirname, 'NonTeachingdata.json');
        
        // Read and parse the JSON file
        const jsonData = fs.readFileSync(dataPath, 'utf-8');
        const nonTeachingStaff = JSON.parse(jsonData);
        
        // Loop through the array and insert/update each record in the database
        for (let staff of nonTeachingStaff) {
            await NonTeaching.findOneAndUpdate(
                { empid: staff.empid }, // Find by employee ID
                { 
                    name: staff.name,
                    joining_date: staff.joining_date,
                    contact_number: staff.contact_number
                },
                { upsert: true, new: true } // Upsert option to insert if not found
            );
        }
        
        res.status(200).json({ message: 'Database updated successfully from NonTeachingdata.json' });
    } catch (error) {
        console.error('Error updating database:', error);
        res.status(500).json({ error: error.message });
    }
});

// Sample route to fetch all non-teaching staff records
app.get('/non-teaching', async (req, res) => {
    try {
        const employees = await NonTeaching.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST endpoint to receive form data
app.post('/submit-application', async (req, res) => {
    try {
        const formData = req.body;

        // Create a new document in the Applied collection
        const newApplication = new Applied({
            employeeId: formData.employeeId,
            name: formData.name,
            designation: formData.designation,
            department: formData.department,
            leaveDays: formData.leaveDays,
            leaveStartDate: formData.leaveStartDate,
            leaveEndDate: formData.leaveEndDate,
            leaveReasons: formData.leaveReasons,
            leaveAddress: formData.leaveAddress,
            mobileNumber: formData.mobileNumber,
            assignedTo: formData.assignedTo  
        });

        await newApplication.save();
        res.status(201).json({ message: 'Application submitted successfully!' });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/applied-leaves', async (req, res) => {
    try {
        const applications = await Applied.find();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});   


// Simplified month calculation function
const calculateMonth = (date) => {
    const monthMap = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const day = date.getDate();
    let month = date.getMonth(); // 0-based, so 0 is January

    // Special case for December (up to day 30)
    if (month === 11 && day <= 30) return 'December'; // December ends on 30th

    // Adjust for other months based on day > 25
    if (day > 25) month = (month + 1) % 12; // Move to the next month if day > 25

    return monthMap[month];
};

// Approve leave API
app.post('/approve-leave/:employeeId', async (req, res) => {
    try {
        const employeeId = req.params.employeeId; // Fetch the employee ID from the request parameters
        const leaveRequest = await Applied.findOne({ employeeId }); // Fetch the leave request by employeeId

        // Check if leaveRequest exists
        if (!leaveRequest) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        const employee = await NonTeaching.findOne({ empid: leaveRequest.employeeId });

        // Check if employee exists
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Get the month of the leave start date
        const leaveMonth = calculateMonth(new Date(leaveRequest.leaveStartDate));
        const leaveDays = leaveRequest.leaveDays;

        // First 6 months are always counted from January of the current year
        const currentYear = new Date().getFullYear();
        const januaryStart = new Date(currentYear, 0, 1); // January 1st of current year
        const currentDate = new Date();

        // Calculate the difference in months from January 1st of the current year
        const diffInMonthsFromJan = (currentDate.getFullYear() - januaryStart.getFullYear()) * 12 + (currentDate.getMonth() - januaryStart.getMonth());

        if (diffInMonthsFromJan < 6) {
            // First 6 months: 1 leave per month allowed
            if (employee.monthly_leaves[leaveMonth] === 0) {
                // If no leave taken this month
                if (employee.available_leaves > 0) {
                    // Can take only 1 leave
                    const leavesToTake = Math.min(1, leaveDays); // Allow only 1 leave
                    employee.monthly_leaves[leaveMonth] = leavesToTake; // Set to 1 if requested
                    employee.available_leaves -= leavesToTake; // Subtract from available leaves

                    // Add remaining requested leaves to extra leaves if any
                    const remainingLeaves = leaveDays - leavesToTake;
                    if (remainingLeaves > 0) {
                        employee.extra_leaves += remainingLeaves; // Add remaining to extra leaves
                    }
                } else {
                    // If available leaves are 0, all leaves go to extra
                    employee.extra_leaves += leaveDays; // Add all requested leaves to extra leaves
                }
            } else {
                // If leave already taken this month
                if (employee.available_leaves > 0) {
                    // Add all requested leaves to extra leaves
                    employee.extra_leaves += leaveDays; 
                } else {
                    // If available leaves are 0, all leaves go to extra
                    employee.extra_leaves += leaveDays; // Add all requested leaves to extra leaves
                }
            }
        } else {
            // After 6 months: 3 leaves per month allowed
            const totalLeavesTaken = employee.monthly_leaves[leaveMonth] + leaveDays;

            if (totalLeavesTaken <= 3) {
                // Under limit
                if (employee.available_leaves > 0) {
                    const leavesToTake = Math.min(leaveDays, employee.available_leaves); // Can only take what is available
                    employee.monthly_leaves[leaveMonth] += leavesToTake; // Update monthly leaves
                    employee.available_leaves -= leavesToTake; // Deduct available leaves
                } else {
                    // If available leaves are 0, all leaves go to extra
                    employee.extra_leaves += leaveDays; // Add all requested leaves to extra leaves
                }
            } else {
                // Over limit
                if (employee.available_leaves > 0) {
                    const usedLeaves = Math.min(employee.available_leaves, 3 - employee.monthly_leaves[leaveMonth]);
                    employee.monthly_leaves[leaveMonth] += usedLeaves; // Use available leaves for this month
                    employee.available_leaves -= usedLeaves; // Subtract from available leaves

                    // Add excess leaves to extra
                    employee.extra_leaves += (totalLeavesTaken - 3); // Add excess to extra leaves
                } else {
                    // If available leaves are 0, all leaves go to extra
                    employee.extra_leaves += leaveDays; // Add all requested leaves to extra leaves
                }
            }
        }

        await employee.save();

        // Create a new entry in ApprovedLeaves
        const approvedLeave = new ApprovedLeaves({
            employeeId: leaveRequest.employeeId,
            name: leaveRequest.name,  // Include name
            designation: leaveRequest.designation,  // Include designation
            department: leaveRequest.department,  // Include department
            leaveDays: leaveRequest.leaveDays,
            leaveStartDate: leaveRequest.leaveStartDate,
            leaveEndDate: leaveRequest.leaveEndDate,
            leaveReasons: leaveRequest.leaveReasons,  // Use leaveReasons instead of reasons
            leaveAddress: leaveRequest.leaveAddress,  // Add leaveAddress
            mobileNumber: leaveRequest.mobileNumber,  // Add mobileNumber
            approvalDate: new Date()  // Include approvalDate
        });
        
        await approvedLeave.save();

        // Delete the original leave request
        await Applied.deleteOne({ employeeId }); // Deleting the leave request based on employeeId

        res.json({ message: 'Leave approved and updated successfully' });
    } catch (error) {
        console.error('Error approving leave:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/employee/:empid', async (req, res) => {
    try {
      // Log the empid received from React request
      const empid = req.params.empid;
      console.log('Request received for empid:', empid); // Logging the empid from React
  
      // Fetch employee from the database
      const employee = await NonTeaching.findOne({ empid });
  
      // Log the employee data fetched from the database
      console.log('Employee data from database:', employee);
  
      if (!employee) {
        console.log('Employee not found'); // Log when employee is not found
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      // Send employee data as response
      res.json(employee);
    } catch (err) {
      console.error('Server error:', err); // Log any server errors
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  
// Route to get all applications assigned to HOD
app.get('/api/hod-applications', async (req, res) => {
    try {
      const applications = await Applied.find({ assignedTo: 'HOD' });
      res.json(applications);
    } catch (error) {
      res.status(500).send('Error fetching applications');
    }
  });
  
  // Reject leave API
 

  app.post('/api/reject-leave/:employeeId', async (req, res) => {
      const { employeeId } = req.params;
      const { message } = req.body;
  
      try {
          // Update the status and message in the Applied model
          const application = await Applied.findOneAndUpdate(
              { employeeId },
              {
                  $set: {
                      "hodApproval.status": "Rejected",
                      "hodApproval.message": message
                  }
              },
              { new: true }
          );
  
          if (!application) {
              return res.status(404).json({ error: 'Application not found' });
          }
  
          // Respond with the updated application
          res.status(200).json(application);
      } catch (error) {
          console.error('Error rejecting leave application:', error);
          res.status(500).json({ error: 'Failed to reject leave application' });
      }
  });
  
  app.post('/api/forward-leave/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
    const { forwardedTo, forwardedBy } = req.body;
  
    try {
      const updatedApplication = await Applied.findOneAndUpdate(
        { employeeId },
        {
          $set: {
            assignedTo: forwardedTo,        // Principal
            forwardedTo,                    // Principal
            forwardedBy                     // HOD
          }
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedApplication) {
        return res.status(404).json({ message: 'Application not found' });
      }
  
      res.json(updatedApplication);
    } catch (error) {
      console.error('Error forwarding leave application:', error);
      res.status(500).json({ message: 'Failed to forward application' });
    }
  });
  

// Route to get all applications assigned to Principal
// Route to get all applications assigned to Principal
app.get('/api/principal-applications', async (req, res) => {
    try {
      const applications = await Applied.find({ assignedTo: 'Principal' });
      console.log(applications); // Log the fetched applications for debugging
      res.json(applications);
    } catch (error) {
      console.error('Error fetching applications:', error);
      res.status(500).send('Error fetching applications');
    }
  });
  
  // Route to reject leave application by Principal
app.post('/api/reject-principal-leave/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
    const { message } = req.body;

    try {
        // Update the status and message in the Applied model
        const application = await Applied.findOneAndUpdate(
            { employeeId },
            {
                $set: {
                    "principalApproval.status": "Rejected",
                    "principalApproval.message": message,
                }
            },
            { new: true }
        );

        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }

        // Respond with the updated application
        res.status(200).json(application);
    } catch (error) {
        console.error('Error rejecting leave application:', error);
        res.status(500).json({ error: 'Failed to reject leave application' });
    }
});


app.post('/api/forward-principal-leave/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
    const { forwardedTo, forwardedBy } = req.body;

    try {
        const updatedApplication = await Applied.findOneAndUpdate(
            { employeeId },
            {
                $set: {
                    assignedTo: forwardedTo,  // Director
                    forwardedTo,              // Director
                    forwardedBy               // Principal
                }
            },
            { new: true } // Return the updated document
        );

        if (!updatedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.json(updatedApplication);
    } catch (error) {
        console.error('Error forwarding leave application:', error);
        res.status(500).json({ message: 'Failed to forward application' });
    }
});


app.get('/api/director-applications', async (req, res) => {
    try {
        const applications = await Applied.find({ assignedTo: 'Director' });
        res.json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).send('Error fetching applications');
    }
});

app.post('/api/reject-director-leave/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
    const { message } = req.body;

    try {
        const application = await Applied.findOneAndUpdate(
            { employeeId },
            {
                $set: {
                    "directorApproval.status": "Rejected",
                    "directorApproval.message": message
                }
            },
            { new: true }
        );

        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }

        res.status(200).json(application);
    } catch (error) {
        console.error('Error rejecting leave application:', error);
        res.status(500).json({ error: 'Failed to reject leave application' });
    }
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
