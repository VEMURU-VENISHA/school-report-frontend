import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ViewReports() {
  const [studentId, setStudentId] = useState("");          
  const [reports, setReports] = useState([]);              
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReports = async () => {
    if (!studentId) {
      setError("Enter student ID to fetch reports");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8010/reports/student/${studentId}`);
      setReports(res.data);
    } catch (err) {
      console.error(err);
      setError("Could not fetch reports");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('/bg7.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
        overflow: "hidden",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
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

      <h2 style={{ marginBottom: "20px" }}>View Student Reports</h2>

      {/* Input and button */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="number"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button onClick={fetchReports}>View Reports</button>
      </div>

      {loading && <p>Loading reports...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Scrollable table container */}
      <div
        style={{
          flex: 1,
          width: "100%",
          overflowY: "auto",
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        {reports.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "center",
                color: "limegreen",
              }}
            >
              <thead style={{ position: "sticky", top: 0, backgroundColor: "rgba(0,0,0,0.7)" }}>
                <tr>
                  <th style={{ padding: "10px" }}>Student Name</th>
                  <th style={{ padding: "10px" }}>Subject Name</th>
                  <th style={{ padding: "10px" }}>Attendance %</th>
                  <th style={{ padding: "10px" }}>Grade</th>
                  <th style={{ padding: "10px" }}>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.id}>
                    <td style={{ padding: "8px" }}>{r.studentName}</td>
                    <td>{r.subjectName}</td>
                    <td>{r.attendancePercentage}</td>
                    <td>{r.grade}</td>
                    <td>{r.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
