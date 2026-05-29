import React, { useState } from "react";

function ExportButton({ deviceId }) {

  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const exportXML = () => {

    if (!startDate || !startTime || !endDate || !endTime) {
      alert("Please select full date & time");
      return;
    }

    const start = `${startDate} ${startTime}`;
    const end = `${endDate} ${endTime}`;

    window.open(
      `http://192.168.29.81:8000/export/${deviceId}?start=${start}&end=${end}`
    );
  };

  return (
    <div className="export-inner">

      {/* START */}
      <div className="export-row">
        <label>Start</label>
        <input
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="time"
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>

      {/* END */}
      <div className="export-row">
        <label>End</label>
        <input
          type="date"
          onChange={(e) => setEndDate(e.target.value)}
        />
        <input
          type="time"
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>

      {/* BUTTON */}
      <button onClick={exportXML}>
        Export XML
      </button>

    </div>
  );
}

export default ExportButton;
