import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LeaveDashboard.css';

const LeaveDashboard = ({ role }) => {
  const [appliedLeaves, setAppliedLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectionMessage, setRejectionMessage] = useState('');

  useEffect(() => {
    fetchAppliedLeaves();
  }, [role]);

  const fetchAppliedLeaves = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3007/applied-leaves');
      const leaves = response.data;

      // Normalize role and assignedTo values to lowercase for case-insensitive comparison
      const normalizedRole = role.toLowerCase();

      // Filter complaints based on the assignedTo field
      const filteredLeaves = leaves.filter(leave => {
        const assignedToNormalized = leave.assignedTo.toLowerCase();

        if (assignedToNormalized === normalizedRole) {
          return true;
        }
        return false;
      });

      setAppliedLeaves(filteredLeaves);
    } catch (error) {
      console.error('Error fetching applied leaves:', error);
    } finally {
      setLoading(false);
    }
  };

  const approveLeave = async (employeeId) => {
    try {
      const endpoint =
        role === 'HOD' ? `approve-hod/${employeeId}` :
        role === 'Principal' ? `approve-principal/${employeeId}` :
        `approve-director/${employeeId}`;
      await axios.post(`http://localhost:3007/${endpoint}`);
      fetchAppliedLeaves();
    } catch (error) {
      console.error('Error approving leave:', error);
    }
  };

  const rejectLeave = async (employeeId) => {
    try {
      const endpoint =
        role === 'HOD' ? `reject-hod/${employeeId}` :
        role === 'Principal' ? `reject-principal/${employeeId}` :
        `reject-director/${employeeId}`;
      await axios.post(`http://localhost:3007/${endpoint}`, { rejectionMessage });
      fetchAppliedLeaves();
      setRejectionMessage('');
    } catch (error) {
      console.error('Error rejecting leave:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="leave-dashboard">
      <h1>{role} Leave Approval Dashboard</h1>
      <div className="leave-table">
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Leave Days</th>
              <th>Leave Start Date</th>
              <th>Leave End Date</th>
              <th>Reasons</th>
              <th>HOD Approval</th>
              <th>Principal Approval</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appliedLeaves.map((leave) => (
              <tr key={leave.employeeId}>
                <td>{leave.employeeId}</td>
                <td>{leave.name}</td>
                <td>{leave.designation}</td>
                <td>{leave.department}</td>
                <td>{leave.leaveDays}</td>
                <td>{new Date(leave.leaveStartDate).toLocaleDateString()}</td>
                <td>{new Date(leave.leaveEndDate).toLocaleDateString()}</td>
                <td>{leave.leaveReasons}</td>
                <td>{leave.hodApproval?.status || 'Pending'}</td>
                <td>{leave.principalApproval?.status || 'Pending'}</td>
                <td>
                  {role === 'HOD' && leave.hodApproval?.status === 'Pending' && (
                    <>
                      <button onClick={() => approveLeave(leave.employeeId)}>Approve</button>
                      <button className="reject" onClick={() => rejectLeave(leave.employeeId)}>Reject</button>
                      <input
                        type="text"
                        placeholder="Rejection Message"
                        value={rejectionMessage}
                        onChange={(e) => setRejectionMessage(e.target.value)}
                      />
                    </>
                  )}
                  {role === 'Principal' && leave.hodApproval?.status === 'Approved' && leave.principalApproval?.status === 'Pending' && (
                    <>
                      <button onClick={() => approveLeave(leave.employeeId)}>Approve</button>
                      <button className="reject" onClick={() => rejectLeave(leave.employeeId)}>Reject</button>
                      <input
                        type="text"
                        placeholder="Rejection Message"
                        value={rejectionMessage}
                        onChange={(e) => setRejectionMessage(e.target.value)}
                      />
                    </>
                  )}
                  {role === 'Director' && leave.principalApproval?.status === 'Approved' && (
                    <>
                      <button onClick={() => approveLeave(leave.employeeId)}>Approve</button>
                      <button className="reject" onClick={() => rejectLeave(leave.employeeId)}>Reject</button>
                      <input
                        type="text"
                        placeholder="Rejection Message"
                        value={rejectionMessage}
                        onChange={(e) => setRejectionMessage(e.target.value)}
                      />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveDashboard;
