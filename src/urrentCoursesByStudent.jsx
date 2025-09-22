import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CurrentCoursesByStudent() {
  const [studentId, setStudentId] = useState("");
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  const fetchCurrentCourses = async () => {
    if (!studentId) {
      setError("Please enter a student ID.");
      return;
    }
    try {
      setError("");
      const res = await axios.get("http://localhost:8010/api/courses/current");
      const filtered = res.data.filter(c => c.studentId === Number(studentId));
      if (filtered.length === 0) {
        setError("No current courses found for this student.");
        setCourses([]);
      } else {
        setCourses(filtered);
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching data.");
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
        backgroundImage: "url('/bg3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
        color: "white",
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

      <h2 style={{ marginBottom: "20px" }}>Check Current Courses</h2>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Enter Student ID"
          style={{
            padding: "8px",
            fontSize: "1em",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #646cff",
            marginRight: "10px",
          }}
        />
        <button onClick={fetchCurrentCourses} style={{ padding: "8px 12px" }}>Search</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Table container */}
      {courses.length > 0 && (
        <div
          style={{
            flex: 1,
            width: "100%",
            maxWidth: "900px",
            overflowY: "auto",
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: "8px",
            padding: "10px",
          }}
        >
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
                <th style={{ padding: "10px" }}>Course ID</th>
                <th style={{ padding: "10px" }}>Course Name</th>
                <th style={{ padding: "10px" }}>Credits</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id}>
                  <td style={{ padding: "8px" }}>{course.studentName}</td>
                  <td>{course.courseId}</td>
                  <td>{course.courseName}</td>
                  <td>{course.courseCredits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
