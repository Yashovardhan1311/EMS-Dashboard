import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import ExportButton from "../components/ExportButton";
import { devices } from "../config/devices";
import "./DevicePage.css";

function DevicePage() {
  const { device_ip } = useParams();   //  get IP from URL
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  //  Get device name using IP
  const deviceName =
    devices.find((d) => d.ip === device_ip)?.name || device_ip;

  useEffect(() => {
    let isMounted = true;

    const fetchData = () => {
      api.get(`/live/${device_ip}`)   //  use IP
        .then((res) => {
          if (isMounted) setData(res.data);
        })
        .catch((err) => console.error("API Error:", err));
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [device_ip]);

  return (
    <div className="hmi-root">

      {/* HEADER */}
      <div className="hmi-header">
        <div className="time">LIVE</div>
        <div className="title">OPERATING SCREEN</div>
        <div className="device">{deviceName}</div>
      </div>

      {/* MAIN SCREEN */}
      <div className="hmi-screen">

        <div className="panel-title">PARAMETERS</div>

        <div className="table">

          <div>KW</div>        <div>{data?.kw ?? "----"}</div>
          <div>KVAR</div>      <div>{data?.kvar ?? "----"}</div>
          <div>KVA</div>       <div>{data?.kva ?? "----"}</div>
          <div>V (AVG)</div>   <div>{data?.voltage ?? "----"}</div>
          <div>AMP</div>       <div>{data?.current ?? "----"}</div>
          <div>PF</div>        <div>{data?.pf ?? "----"}</div>
          <div>FREQ</div>      <div>{data?.freq ?? "----"}</div>

          <div>CURRENT KWH</div> <div>{data?.current_kwh ?? "----"}</div>
          <div>OLD KWH</div>     <div>{data?.old_kwh ?? "----"}</div>

        </div>
      </div>

      {/* FOOTER */}
      <div className="hmi-footer">

        {/* LEFT */}
        <button onClick={() => navigate("/")}>
          RETURN
        </button>

        {/* RIGHT */}
        <div className="export-container">
          <ExportButton deviceIp={device_ip} />  {/*  updated prop */}
        </div>

      </div>

    </div>
  );
}

export default DevicePage;
