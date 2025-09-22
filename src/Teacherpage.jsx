import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function TeacherPage() {
  const [studentId, setStudentId] = useState("");          
  const [reports, setReports] = useState([]);             
  const [report, setReport] = useState({                  
    id: "", 
    student: { id: "" },
    subject: { id: "" },
    grade: "",
    attendancePercentage: "",
    remarks: ""
  });
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

  const addReport = async () => {
    try {
      await axios.post("http://localhost:8010/reports", report);
      alert("Report added successfully!");
      resetForm();
      fetchReports(); 
    } catch (err) {
      console.error(err);
      alert("Error adding report");
    }
  };

  const updateReport = async () => {
    if (!report.id) {
      alert("Please select a report to edit");
      return;
    }
    try {
      await axios.put(`http://localhost:8010/reports/${report.id}`, report);
      alert("Report updated successfully!");
      resetForm();
      fetchReports(); 
    } catch (err) {
      console.error(err);
      alert("Error updating report");
    }
  };

  const editReport = (r) => {
    setReport({
      id: r.id,
      student: { id: r.student?.id || "" },
      subject: { id: r.subject?.id || "" },
      grade: r.grade || "",
      attendancePercentage: r.attendancePercentage || "",
      remarks: r.remarks || ""
    });
  };

  const resetForm = () => {
    setReport({ student: { id: "" }, subject: { id: "" }, grade: "", attendancePercentage: "", remarks: "" });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", position: "relative" }}>
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

      <h2>Teacher Report Management</h2>

      {/* Fetch reports by student */}
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

      {/* Add / Edit form */}
      <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
        <h3>{report.id ? "Edit Report" : "Add New Report"}</h3>
        <input
          type="number"
          placeholder="Student ID"
          value={report.student.id}
          onChange={(e) => setReport({ ...report, student: { id: e.target.value } })}
          style={{ marginRight: "10px", marginBottom: "10px" }}
        />
        <input
          type="number"
          placeholder="Subject ID"
          value={report.subject.id}
          onChange={(e) => setReport({ ...report, subject: { id: e.target.value } })}
          style={{ marginRight: "10px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Grade"
          value={report.grade}
          onChange={(e) => setReport({ ...report, grade: e.target.value })}
          style={{ marginRight: "10px", marginBottom: "10px" }}
        />
        <input
          type="number"
          placeholder="Attendance %"
          value={report.attendancePercentage}
          onChange={(e) => setReport({ ...report, attendancePercentage: e.target.value })}
          style={{ marginRight: "10px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Remarks"
          value={report.remarks}
          onChange={(e) => setReport({ ...report, remarks: e.target.value })}
          style={{ marginRight: "10px", marginBottom: "10px" }}
        />
        <div>
          <button onClick={addReport} style={{ marginRight: "10px" }}>Add Report</button>
          <button onClick={updateReport} style={{ marginRight: "10px" }}>Update Report</button>
        </div>
      </div>

      {/* Reports table */}
      {reports.length > 0 && (
        <table
          border="1"
          style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}
        >
          <thead style={{ backgroundColor: "#f2f2f2" }}>
            <tr>
              <th>Student Name</th>
              <th>Subject Name</th>
              <th>Semester</th>
              <th>Attendance %</th>
              <th>Grade</th>
              <th>Remarks</th>
              <th>Edit</th>
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
                <td>
                  <button onClick={() => editReport(r)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
