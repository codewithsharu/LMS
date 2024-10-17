import React, { useState, useEffect } from 'react';
import './CalendarModal.css'; 

function CalendarModal({ onClose }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const renderCalendarDays = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const numDays = daysInMonth(month, year);
    const firstDay = firstDayOfMonth(month, year);

    let days = [];


    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>);
    }

  
    for (let day = 1; day <= numDays; day++) {
      const dayClass = (firstDay + day - 1) % 7 === 0 ? 'day sunday' : 'day';
      days.push(
        <div key={day} className={dayClass}>
          {day}
        </div>
      );
    }

    return days;
  };

  const prevMonth = () => {
    const prevDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    setCurrentDate(prevDate);
  };

  const nextMonth = () => {
    const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    setCurrentDate(nextDate);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h3>{`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</h3>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {daysOfWeek.map(day => (
          <div key={day} className="day-header">{day}</div>
        ))}
        {renderCalendarDays()}
      </div>
      <button className="close-btn" onClick={onClose}>Close</button>
    </div>
  );
}

export default CalendarModal;
