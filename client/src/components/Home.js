import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Typical from 'react-typical';
import { FaRegCalendarAlt, FaClipboardList, FaCheckCircle } from 'react-icons/fa'; 
import CalendarModal from './CalendarModal'; 
import HolidayModal from './HolidayModal'; 
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { getUserDataFromToken } from '../utils/authUtils';

import HPCLLeaveForm from './HPCLLeaveForm';
import ODLeaveForm from './ODLeaveForm';
import './Home.css';

function Home() {
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [isHolidayOpen, setHolidayOpen] = useState(false);
  const [isTeachingFormVisible, setTeachingFormVisible] = useState(false);
  const [isNonTeachingFormVisible, setNonTeachingFormVisible] = useState(false);
  const navigate = useNavigate(); 
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const data = getUserDataFromToken(token);
      setUserData(data);
    }
    setIsLoading(false);
  }, [token]);

  const openCalendar = () => {
    setCalendarOpen(true);
    document.body.classList.add('no-scroll');  
  };

  const closeCalendar = () => {
    setCalendarOpen(false);
    document.body.classList.remove('no-scroll');  
  };

  const openHolidayModal = () => {
    setHolidayOpen(true);
    document.body.classList.add('no-scroll');  
  };

  const closeHolidayModal = () => {
    setHolidayOpen(false);
    document.body.classList.remove('no-scroll');  
  };

  const getButtonStyle = (buttonType) => {
    if (!isAuthenticated || !userData) return {};

    const isEnabled = userData.employee_type === buttonType;
    return {
      backgroundColor: isEnabled ? '#4CAF50' : '#ccc', // Green for enabled, gray for disabled
      cursor: isEnabled ? 'pointer' : 'not-allowed',
      opacity: isEnabled ? 1 : 0.6
    };
  };

  const handleButtonClick = (type) => {
    if (!isAuthenticated || !userData) {
      alert('Please login first');
      return;
    }

    if (userData.employee_type !== type) {
      alert(`This option is only available for ${type} staff`);
      return;
    }

    if (type === 'Non-Teaching') {
      setNonTeachingFormVisible(true);
    } else if (type === 'Teaching') {
      setTeachingFormVisible(true);
    }
  };

  const closeTeachingForm = () => {
    setTeachingFormVisible(false);
  };

  const closeNonTeachingForm = () => {
    setNonTeachingFormVisible(false);
  };

  return (
    <div className="home-container">
      <div className="left-content">
        <h2 className="welcome-text">
          {isAuthenticated && userData ? (
            `Welcome, ${userData.name}!`
          ) : (
            'Welcome to'
          )}
        </h2>
        <h1 className="typing-text">
          <Typical
            steps={['Leave Management System', 1000, 'Manage Your Leaves with Ease', 1000]}
            loop={Infinity}
            wrapper="span"
          />
        </h1>
        <p className="description">
          Your go-to solution for managing employee leaves! Apply for leave, track your status, and stay updated seamlessly.
        </p>

        <div className="button-container">
          {isAuthenticated && userData ? (
            <>
              <button 
                className="action-button"
                onClick={() => handleButtonClick('Teaching')}
                style={getButtonStyle('Teaching')}
                title={userData?.employee_type !== 'Teaching' ? 'Only available for teaching staff' : ''}
              >
                Teaching
              </button>
              <button 
                className="action-button"
                onClick={() => handleButtonClick('Non-Teaching')}
                style={getButtonStyle('Non-Teaching')}
                title={userData?.employee_type !== 'Non-Teaching' ? 'Only available for non-teaching staff' : ''}
              >
                Non-Teaching
              </button>
            </>
          ) : (
            <button 
              className="action-button"
              onClick={() => navigate('/login')}
              style={{ backgroundColor: '#4CAF50' }}
            >
              Login
            </button>
          )}
        </div>
      </div>

      <div className="right-content">
        <div className="info-card" onClick={openCalendar}>
          <FaRegCalendarAlt className="icon" />
          <h3>Check Calendar</h3>
          <p>View upcoming holidays and your leave days</p>
        </div>
        <div className="info-card" onClick={openHolidayModal}>
          <FaClipboardList className="icon" />
          <h3>Leave Planner</h3>
          <p>Explore Upcoming Holidays</p>
        </div>
        <div className="info-card">
          <FaCheckCircle className="icon" />
          <h3>Track Status</h3>
          <p>Stay updated on your leave request status</p>
        </div>
      </div>

      {isCalendarOpen && <CalendarModal onClose={closeCalendar} />}
      {isHolidayOpen && <HolidayModal onClose={closeHolidayModal} />}
      
      {isTeachingFormVisible && (
        <div className="teaching-form-overlay">
          <div className="teaching-form-container">
            <button className="close-button" onClick={closeTeachingForm}>
              <AiOutlineClose className="close-icon" />
            </button>
            <h2 className="form-title">Select Leave Type</h2>
            <div className="leave-types">
              <button className="leave-button" onClick={() => navigate('/casual-leave')}>Casual Leaves</button>
              <button className="leave-button" onClick={() => navigate('/hpcl-leave')}>HPCL's</button>
              <button className="leave-button" onClick={() => navigate('/od-leave')}>OD's</button>
            </div>
          </div>
        </div>
      )}

      {isNonTeachingFormVisible && (
        <div className="teaching-form-overlay">
          <div className="teaching-form-container">
            <button className="close-button" onClick={closeNonTeachingForm}>
              <AiOutlineClose className="close-icon" />
            </button>
            <h2 className="form-title">Select Leave Type</h2>
            <div className="leave-types">
              <button className="leave-button" onClick={() => navigate('/cl')}>Casual Leaves</button>
              <button className="leave-button" onClick={() => navigate('/hpcl-leave')}>HPCL's</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
