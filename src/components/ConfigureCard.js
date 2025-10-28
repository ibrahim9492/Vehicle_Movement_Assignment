import React, { useState } from 'react';
import '../styles/ConfigureCard.css';

const ConfigureCard = () => {
  const [connection, setConnection] = useState('WIRELESS');
  const [timeFilter, setTimeFilter] = useState('Today');

  return (
    <div className="configure-card">
      <div className="configure-header">
        <span>Configure</span>
        <button className="close-button">×</button>
      </div>
      <div className="configure-content">
        <div className="dropdowns-container">
          <select 
            value={connection} 
            onChange={(e) => setConnection(e.target.value)}
            className="config-select"
          >
            <option value="WIRELESS">WIRELESS</option>
            <option value="WIRED">WIRED</option>
          </select>

          <select 
            value={timeFilter} 
            onChange={(e) => setTimeFilter(e.target.value)}
            className="config-select"
          >
            <option value="Today">Today</option>
            <option value="Yesterday">Yesterday</option>
            <option value="Last Week">Last Week</option>
          </select>
        </div>
        
        <button className="show-button">SHOW</button>
      </div>
    </div>
  );
};

export default ConfigureCard;