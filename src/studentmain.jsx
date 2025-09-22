import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const StudentProfile = () => {
  const [studentId, setStudentId] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  const handleFetch = () => {
    if (!studentId) {
      setError("Please enter a student ID");
      setStudent(null);
      return;
    }

    axios
      .get(`http://localhost:8010/students/${studentId}`)
      .then((response) => {
        setStudent(response.data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Student not found");
        setStudent(null);
      });
  };

  return (
    <div
      style={{
        position: "fixed", // ✅ must be fixed
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
        overflowY: "auto", // scroll if content exceeds viewport
        paddingTop: "80px", // space for logo
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

      <h1 style={{ color: "white" }}>Student Profile</h1>

      <div style={{ margin: "20px", display: "flex", gap: "10px" }}>
        <input
          type="number"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <button
          onClick={handleFetch}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Fetch Profile
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {student && (
        <table
          border="1"
          cellPadding="10"
          style={{
            borderCollapse: "collapse",
            marginTop: "20px",
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        >
          <tbody>
            <tr>
              <td style={{ color: "white" }}>Name</td>
              <td style={{ color: "limegreen" }}>{student.name}</td>
            </tr>
            <tr>
              <td style={{ color: "white" }}>Roll Number</td>
              <td style={{ color: "limegreen" }}>{student.rollNumber}</td>
            </tr>
            <tr>
              <td style={{ color: "white" }}>Class</td>
              <td style={{ color: "limegreen" }}>{student.className}</td>
            </tr>
            <tr>
              <td style={{ color: "white" }}>Email</td>
              <td style={{ color: "limegreen" }}>{student.email}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentProfile;
