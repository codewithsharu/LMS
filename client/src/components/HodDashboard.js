import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HODDashboard.css";

const HODDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [rejectionMessage, setRejectionMessage] = useState("");
  const [error, setError] = useState("");

  const token = sessionStorage.getItem("jwtToken"); // Retrieve JWT token
  const [branch, setBranch] = useState("");

  // Fetch HOD details to get the branch
  useEffect(() => {
    const fetchHODDetails = async () => {
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3007/user-data", {
          headers: {
            Authorization: `Bearer ${token}`, // Correctly formatted header
          },
        });
        setBranch(response.data.branch); // Set branch from response
      } catch (err) {
        console.error("Failed to fetch HOD details:", err);
        setError("Failed to fetch user details. Please try again later.");
      }
    };

    fetchHODDetails();
  }, [token]);

  // Fetch applications based on the branch
  useEffect(() => {
    if (!branch) return; // Skip fetch until branch is loaded

    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3007/api/hod-applications",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include JWT token in header
            },
          }
        );
        // Filter applications for the HOD's branch
        const filteredApplications = response.data.filter(
          (application) => application.branch === branch
        );
        setApplications(filteredApplications);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      }
    };

    fetchApplications();
  }, [branch, token]);

  // Function to reject an application
  const handleReject = async (employeeId) => {
    if (!rejectionMessage) {
      alert("Please provide a message for rejection");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3007/api/reject-leave/${employeeId}`,
        { message: rejectionMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token
          },
        }
      );

      // Update application state after rejection
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.employeeId === employeeId ? response.data : app
        )
      );
      setRejectionMessage(""); // Clear rejection message
      setSelectedApplicationId(null); // Reset selection
    } catch (err) {
      console.error("Failed to reject application:", err);
    }
  };

  // Function to approve an application
  const handleApprove = async (employeeId) => {
    try {
      const response = await axios.post(
        `http://localhost:3007/approve-leave/${employeeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update application state after approval
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.employeeId === employeeId ? response.data : app
        )
      );
    } catch (err) {
      console.error("Failed to approve application:", err);
    }
  };

  // Function to forward an application to the Principal
  const handleForward = async (employeeId) => {
    try {
      const response = await axios.post(
        `http://localhost:3007/api/forward-leave/${employeeId}`,
        { forwardedTo: "Principal", forwardedBy: "HOD" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update application state after forwarding
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.employeeId === employeeId ? response.data : app
        )
      );
    } catch (err) {
      console.error("Failed to forward application:", err);
    }
  };

  // Render the dashboard
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">HOD Dashboard</h2>
      {error && <div className="error-message">{error}</div>}
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
            {applications.map((application) => (
              <tr key={application._id}>
                <td>{application.name}</td>
                <td>{application.designation}</td>
                <td>{application.branch}</td>
                <td>{application.leaveDays}</td>
                <td>{application.leaveReasons}</td>
                <td>
                  {application.hodApproval?.status || "Pending"}
                  {application.hodApproval?.status === "Rejected" && (
                    <div>
                      <small>{application.hodApproval.message}</small>
                    </div>
                  )}
                </td>
                <td>
                  {application.hodApproval?.status === "Pending" && (
                    <>
                      {selectedApplicationId === application.employeeId ? (
                        <>
                          <textarea
                            className="message-textarea"
                            placeholder="Add rejection message"
                            value={rejectionMessage}
                            onChange={(e) => setRejectionMessage(e.target.value)}
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
                              setRejectionMessage("");
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
                            onClick={() =>
                              setSelectedApplicationId(application.employeeId)
                            }
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </>
                  )}
                  {application.hodApproval?.status === "Rejected" && (
                    <button
                      className="forward-btn"
                      onClick={() => handleForward(application.employeeId)}
                    >
                      Forward to Principal
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

export default HODDashboard;
