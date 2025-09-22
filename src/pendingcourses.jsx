import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PendingCoursesPage.css"; // optional for extra styling

export default function PendingCoursesPage() {
  const [pendingCourses, setPendingCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCourse, setFilterCourse] = useState("");

  // Fetch all pending courses
  useEffect(() => {
    axios
      .get("http://localhost:8010/api/courses/pending")
      .then((res) => {
        setPendingCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Filter courses based on input
  const filteredCourses = pendingCourses.filter(course =>
    course.courseName.toLowerCase().includes(filterCourse.toLowerCase())
  );

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

      <h2 style={{ marginBottom: "20px" }}>Pending Courses</h2>

      {/* Search input */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Enter course name to filter..."
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          style={{
            padding: "8px",
            fontSize: "1em",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #646cff",
          }}
        />
      </div>

      {/* Table container */}
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
        {loading ? (
          <p>Loading...</p>
        ) : filteredCourses.length > 0 ? (
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
                <th style={{ padding: "10px" }}>Student ID</th>
                <th style={{ padding: "10px" }}>Course Name</th>
                <th style={{ padding: "10px" }}>Course ID</th>
                <th style={{ padding: "10px" }}>Credits</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={`${course.studentId}-${course.courseId}`}>
                  <td style={{ padding: "8px" }}>{course.studentName}</td>
                  <td>{course.studentId}</td>
                  <td>{course.courseName}</td>
                  <td>{course.courseId}</td>
                  <td>{course.courseCredits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No pending courses found for "{filterCourse}".</p>
        )}
      </div>
    </div>
  );
}
