import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ReportsPage = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8010/students")
      .then(res => setReports(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ position: "relative", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Logo at top-right */}
      <Link to="/" style={{ position: "absolute", top: "10px", right: "10px" }}>
        <img
          src="/logo.jpg"
          alt="Logo"
          style={{
            width: "70px",
            height: "70px",
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </Link>

      <h2>Reports</h2>
      <table border="1" style={{ width: "100%", textAlign: "left", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student ID</th>
            <th>Subject ID</th>
            <th>Grade</th>
            <th>Attendance (%)</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.student_id}</td>
              <td>{r.subject_id}</td>
              <td>{r.grade}</td>
              <td>{r.attendance_percentage}</td>
              <td>{r.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsPage;
