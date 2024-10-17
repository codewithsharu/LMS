import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HODDashboard.css';

const HODDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [rejectionMessage, setRejectionMessage] = useState('');

  // Fetch leave applications assigned to HOD
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:3007/api/hod-applications');
        setApplications(response.data);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      }
    };

    fetchApplications();
  }, []);

  const handleReject = async (employeeId) => {
    if (!rejectionMessage) {
      alert('Please provide a message for rejection');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3007/api/reject-leave/${employeeId}`, {
        message: rejectionMessage,
      });

      // Update the application state after rejection
      setApplications(applications.map(app => 
        app.employeeId === employeeId ? response.data : app
      ));
      setRejectionMessage(''); // Clear the rejection message
      setSelectedApplicationId(null); // Reset selection after rejection
    } catch (error) {
      console.error('Failed to reject application:', error);
    }
  };

  const handleApprove = async (employeeId) => {
    try {
      const response = await axios.post(`http://localhost:3007/approve-leave/${employeeId}`);

      // Update the application state after approval
      setApplications(applications.map(app => 
        app.employeeId === employeeId ? response.data : app
      ));
    } catch (error) {
      console.error('Failed to approve application:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">HOD Dashboard</h2>
      {applications.length === 0 ? (
        <p className="no-applications">No leave applications assigned to you.</p>
      ) : (
        <table className="applications-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Leave Days</th>
              <th>Leave Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(application => (
              <tr key={application._id}>
                <td>{application.name}</td>
                <td>{application.designation}</td>
                <td>{application.department}</td>
                <td>{application.leaveDays}</td>
                <td>{application.leaveReasons}</td>
                <td>
                  {application.hodApproval?.status || 'Pending'}
                  {application.hodApproval?.status === 'Rejected' && (
                    <div><small>{application.hodApproval.message}</small></div>
                  )}
                </td>
                <td>
                  {application.hodApproval?.status === 'Pending' && (
                    <>
                      {selectedApplicationId === application.employeeId ? (
                        <>
                          <textarea
                            className="message-textarea"
                            placeholder="Add rejection message"
                            value={rejectionMessage}
                            onChange={e => setRejectionMessage(e.target.value)}
                          />
                          <button
                            className="reject-btn"
                            onClick={() => handleReject(application.employeeId)}
                          >
                            Confirm Reject
                          </button>
                          <button
                            className="cancel-btn"
                            onClick={() => {
                              setSelectedApplicationId(null);
                              setRejectionMessage('');
                            }}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="approve-btn"
                            onClick={() => handleApprove(application.employeeId)}
                          >
                            Approve
                          </button>
                          <button
                            className="reject-btn"
                            onClick={() => setSelectedApplicationId(application.employeeId)}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HODDashboard;
