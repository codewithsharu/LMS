import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"; 
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios"; // For making API requests
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

function CustomNavbar() {
  const navigate = useNavigate();

  // Check if the user is logged in
  const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      // Make an API call to log out from the backend
      await axios.post('http://localhost:3007/logout'); // Adjust URL based on your backend endpoint

      // Clear session data on the frontend
      sessionStorage.clear();

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('There was an error logging you out.');
    }
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <div className="d-flex w-100 justify-content-between align-items-center">
          <Navbar.Brand href="#home" className="navbar-brand-custom">
            <img
              src="./logo.png"
              width="140"
              height="40"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="border-0"
          />
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link className="nav-link-custom">Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/admin-dashboard">
              <Nav.Link className="nav-link-custom">Admin</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/about">
              <Nav.Link className="nav-link-custom">About</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/contact">
              <Nav.Link className="nav-link-custom">Contact</Nav.Link>
            </LinkContainer>

            {/* Conditionally render Login/Logout button */}
            {isLoggedIn ? (
              <Button variant="danger" onClick={handleLogout} className="ms-2">
                Logout
              </Button>
            ) : (
              <Button variant="success" onClick={() => navigate('/login')} className="ms-2">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
