import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AddReport() {
  const [report, setReport] = useState({
    student: { id: "" },
    subject: { id: "" },
    grade: "",
    attendancePercentage: "",
    remarks: "",
  });

  const addReport = async () => {
    try {
      await axios.post("http://localhost:8010/reports", report);
      alert("Report added successfully!");
      setReport({ student: { id: "" }, subject: { id: "" }, grade: "", attendancePercentage: "", remarks: "" });
    } catch (err) {
      console.error(err);
      alert("Error adding report");
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
        justifyContent: "center",
        padding: "20px",
        boxSizing: "border-box",
        overflow: "auto",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Logo */}
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

      <h2 style={{ marginBottom: "20px" }}>Add New Report</h2>

      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          padding: "20px",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <input
          type="number"
          placeholder="Student ID"
          value={report.student.id}
          onChange={(e) => setReport({ ...report, student: { id: e.target.value } })}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="number"
          placeholder="Subject ID"
          value={report.subject.id}
          onChange={(e) => setReport({ ...report, subject: { id: e.target.value } })}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Grade"
          value={report.grade}
          onChange={(e) => setReport({ ...report, grade: e.target.value })}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="number"
          placeholder="Attendance %"
          value={report.attendancePercentage}
          onChange={(e) => setReport({ ...report, attendancePercentage: e.target.value })}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Remarks"
          value={report.remarks}
          onChange={(e) => setReport({ ...report, remarks: e.target.value })}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <button
          onClick={addReport}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "limegreen",
            color: "black",
            fontWeight: "bold",
            cursor: "pointer",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Add Report
        </button>
      </div>
    </div>
  );
}
