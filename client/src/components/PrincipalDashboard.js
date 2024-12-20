import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PrincipalDashboard.css';

const PrincipalDashboard = () => {
    const [applications, setApplications] = useState([]);
    const [selectedApplicationId, setSelectedApplicationId] = useState(null);
    const [rejectionMessage, setRejectionMessage] = useState('');

    // Fetch leave applications assigned to Principal
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get('http://localhost:3007/api/principal-applications');
                setApplications(response.data);
            } catch (error) {
                console.error('Failed to fetch applications:', error);
            }
        };

        fetchApplications();
    }, []);

    // Function to reject an application
    const handleReject = async (employeeId) => {
        if (!rejectionMessage) {
            alert('Please provide a message for rejection');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3007/api/reject-principal-leave/${employeeId}`, {
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

    // Function to approve an application (not implemented here)
    const handleApprove = async (employeeId) => {
        // Add your logic for approving an application here
    };

    // Function to forward an application to Director
    const handleForward = async (employeeId) => {
        try {
            const response = await axios.post(`http://localhost:3007/api/forward-leave/${employeeId}`, {
                forwardedTo: 'Director',
                forwardedBy: 'Principal',
            });

            // Update the application state after forwarding
            setApplications(applications.map(app =>
                app.employeeId === employeeId ? response.data : app
            ));
        } catch (error) {
            console.error('Failed to forward application:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Principal Dashboard</h2>
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
                                <td>{application.branch}</td>
                                <td>{application.leaveDays}</td>
                                <td>{application.leaveReasons}</td>
                                <td>{application.principalApproval.status || 'Pending'}</td>
                                <td>
                                    {application.principalApproval.status === 'Pending' && (
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

                                    {application.principalApproval.status === 'Rejected' && (
                                        <button
                                            className="forward-btn"
                                            onClick={() => handleForward(application.employeeId)}
                                        >
                                            Forward to Director
                                        </button>
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

export default PrincipalDashboard;
