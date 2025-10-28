import React from 'react';
import '../styles/VehicleTooltip.css';

const VehicleTooltip = ({ speed, distance, batteryLife, status }) => {
  return (
    <div className="vehicle-tooltip">
      <div className="tooltip-header">
        <div className="header-left">
          <span>🔵 WIRELESS</span>
        </div>
        <div className="header-right">
          <span>{new Date().toLocaleString()}</span>
        </div>
      </div>
      <div className="tooltip-content">
        <div className="info-grid">
          <div className="info-item">
            <div className="value">{speed.toFixed(2)} km/h</div>
            <div className="label">Speed</div>
          </div>
          <div className="info-item">
            <div className="value">{distance.toFixed(2)} km</div>
            <div className="label">Distance</div>
          </div>
          <div className="info-item">
            <div className="value">{batteryLife}%</div>
            <div className="label">Battery</div>
          </div>
        </div>
        <div className="status-section">
          <div className="status-item">
            <span className="label">Status:</span>
            <span className="value">{status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleTooltip;