import React from 'react';
import './About.css';
import teamImage1 from './images/team1.jpg';
import teamImage2 from './images/team2.png';
import teamImage3 from './images/team3.jpg';

function About() {
  return (
    <div className="about-page">
      <h1>About Leave Management System</h1>
      <p className="intro">
        Our Leave Management System streamlines the leave application and approval process,
        making it easy for employees and administrators to manage leaves efficiently.
      </p>

      <h2>Key Features</h2>
      <ul className="features">
        <li>Apply for leave with ease</li>
        <li>View leave history and balance</li>
        <li>Receive leave status notifications</li>
        <li>Admin approval and rejection system</li>
        <li>Track leave balances and generate reports</li>
      </ul>

      <h2>Meet the Team</h2>
      <div className="team-section">
        <div className="team-member">
          <img src={teamImage1} alt="John Doe" />
          <h3>Reddi Tirumala</h3>
          <h6>Lead Developer</h6>
          <p>CSM Department</p>
        </div>
        <div className="team-member">
          <img src={teamImage2} alt="Jane Smith" />
          <h3>Sri. K.V.Chandra Sekhar</h3>
          <h6>Project Manager</h6>
          <p>Assistant Professor,</p>
          <p>CSM Department</p>
        </div>
        <div className="team-member">
          <img src={teamImage3} alt="Emily Davis" />
          <h3>Dandasi Shareen</h3>
          <h6>Lead Developer</h6>
          <p>CSM Department</p>
        </div>
      </div>

      <h2>Technology Stack</h2>
      <p className="stack">
        Our system is built using modern technologies to ensure performance, scalability, and security.
      </p>
      <ul className="stack-list">
        <li><strong>Frontend:</strong> React.js</li>
        <li><strong>Backend:</strong> Node.js with Express</li>
        <li><strong>Database:</strong> MongoDB</li>
      </ul>

      <h2>Future Plans</h2>
      <p className="future-plans">
        We plan to continuously enhance the system with advanced features such as automated leave approval workflows,
        performance review systems, and deeper integrations with HR systems.
      </p>
    </div>
  );
}

export default About;
