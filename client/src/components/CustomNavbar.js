import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

function CustomNavbar() {
  return (
    <Navbar  expand="lg" className="custom-navbar">
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
