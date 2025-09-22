import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function StudentPage() {
  const [studentId, setStudentId] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReports = async () => {
    if (!studentId) {
      setError("Please enter a student ID");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8010/reports/student/${studentId}`
      );
      setReports(res.data);
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError("Could not fetch reports for this student ID");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed", // ✅ ensures full viewport coverage
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url('/bg3.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        overflowY: "auto", // scroll if table grows
        paddingTop: "80px", // space for top-right logo
      }}
    >
      {/* Logo at top-right with hover effect */}
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

      <h2 style={{ color: "red" }}>Check Student Reports</h2>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ color: "green" }}>Enter Student ID: </label>
        <input
          type="number"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px" }}
        />
        <button
          onClick={fetchReports}
          style={{ marginLeft: "10px", padding: "5px 10px" }}
        >
          Get Reports
        </button>
      </div>

      {loading && <p style={{ color: "yellow" }}>Loading reports...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {reports.length > 0 && (
        <table
          border="1"
          style={{
            width: "80%",
            borderCollapse: "collapse",
            textAlign: "center",
            backgroundColor: "rgba(0,0,0,0.6)",
            color: "limegreen",
            marginBottom: "20px",
          }}
        >
          <thead style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
            <tr>
              <th style={{ padding: "8px" }}>Student Name</th>
              <th style={{ padding: "8px" }}>Subject Name</th>
              <th style={{ padding: "8px" }}>Semester</th>
              <th style={{ padding: "8px" }}>Attendance %</th>
              <th style={{ padding: "8px" }}>Grade</th>
              <th style={{ padding: "8px" }}>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id}>
                <td>{r.studentName}</td>
                <td>{r.subjectName}</td>
                <td>{r.semester}</td>
                <td>{r.attendancePercentage}</td>
                <td>{r.grade}</td>
                <td>{r.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
