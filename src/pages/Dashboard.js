import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { devices } from "../config/devices";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [status, setStatus] = useState({});

  useEffect(() => {

    const checkStatus = () => {

      devices.forEach((device) => {
        api.get(`/live/${device.ip}`)   //  use IP instead of ID
          .then((res) => {
            if (res.data && !res.data.error) {
              setStatus(prev => ({ ...prev, [device.ip]: true }));
            } else {
              setStatus(prev => ({ ...prev, [device.ip]: false }));
            }
          })
          .catch(() => {
            setStatus(prev => ({ ...prev, [device.ip]: false }));
          });
      });

    };

    checkStatus();
    const interval = setInterval(checkStatus, 4000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="hmi-root">

      {/* HEADER */}
      <div className="hmi-header">
        <div>ENERGY MONITORING SYSTEM</div>
      </div>

      {/* DEVICE GRID */}
      <div className="device-grid">
        {devices.map((device) => (
          <button
            key={device.ip}   //  unique key = IP
            className="device-btn"
            onClick={() => navigate(`/device/${device.ip}`)}   //  pass IP
          >

            {/* STATUS DOT */}
            <span
              className="status-dot"
              style={{
                backgroundColor: status[device.ip] ? "lime" : "red"
              }}
            ></span>

            {device.name}

          </button>
        ))}
      </div>

      {/* FOOTER */}
      <div className="hmi-footer">
        <span>Select Device</span>
      </div>

    </div>
  );
}

export default Dashboard;
