import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function TeacherCourse() {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const courses = [
    { id: 1, name: "Data Structures and Algorithms" },
    { id: 2, name: "Operating Systems" },
    { id: 3, name: "Computer Networks" },
    { id: 4, name: "Database Management Systems" },
    { id: 5, name: "Software Engineering" },
    { id: 6, name: "Artificial Intelligence" },
    { id: 7, name: "Machine Learning" },
    { id: 8, name: "Compiler Design" },
    { id: 9, name: "Web Technologies" },
    { id: 10, name: "Computer Architecture" },
  ];

  const fetchStudentsByCourse = async () => {
    if (!selectedCourseId) {
      setError("Please select a course");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8010/reports/course/${selectedCourseId}`
      );
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      setError("Could not fetch students for this course");
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

      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
        Students by Course
      </h2>

      {/* Course Selector */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", marginRight: "10px" }}
        >
          <option value="">-- Select Course --</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          onClick={fetchStudentsByCourse}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        >
          View Students
        </button>
      </div>

      {/* Error or Loading */}
      {loading && <p style={{ color: "yellow" }}>Loading students...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Scrollable Table */}
      <div
        style={{
          flex: 1,
          width: "100%",
          overflowY: "auto",
          backgroundColor: "rgba(0,0,0,0.5)",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        {students.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "center",
                color: "limegreen",
              }}
            >
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "rgba(0,0,0,0.7)",
                }}
              >
                <tr>
                  <th style={{ padding: "10px" }}>Student Name</th>
                  <th style={{ padding: "10px" }}>Grade</th>
                  <th style={{ padding: "10px" }}>Attendance %</th>
                  <th style={{ padding: "10px" }}>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td style={{ padding: "8px" }}>{s.studentName || s.name}</td>
                    <td>{s.grade}</td>
                    <td>{s.attendancePercentage}</td>
                    <td>{s.remarks}</td>
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
