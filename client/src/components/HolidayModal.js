import React from 'react';
import './HolidayModal.css'; 

function HolidayModal({ onClose }) {
  const holidays2024 = {
    January: ['14 - Bhogi', '15 - Makar Sankranti', '26 - Republic Day'],
    February: ['No Holidays'],
    March: ['8 - Maha Shivaratri', '25 - Holi', '29 - Good Friday'],
    April: ['5 - Babu Jagjivan Ram Jayanti', '9 - Ugadi', '10 - Idul Fitr', '14 - Dr. Ambedkar Jayanti', '17 - Ram Navami'],
    May: ['No Holidays'],
    June: ['17 - Bakrid'],
    July: ['17 - Muharram'],
    August: ['15 - Independence Day', '26 - Janmashtami'],
    September: ['7 - Vinayaka Chaturthi', '16 - Milad un-Nabi'],
    October: ['2 - Gandhi Jayanti', '13 - Vijaya Dashami', '31 - Deepavali'],
    November: ['No Holidays'],
    December: ['25 - Christmas'],
  };

  return (
    <div className="holiday-modal-overlay">
      <div className="holiday-modal-content">
        <h2>Holidays for 2024</h2>
        <div className="holiday-list">
          {Object.keys(holidays2024).map((month) => (
            <div key={month} className="holiday-month">
              <h3>{month}</h3>
              <ul>
                {holidays2024[month].map((holiday, index) => (
                  <li key={index}>{holiday}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default HolidayModal;
