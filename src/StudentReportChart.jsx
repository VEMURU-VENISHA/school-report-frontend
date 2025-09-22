import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import axios from "axios";
import { Link } from "react-router-dom";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Map letter grades to numeric values
const gradeMap = {
  "A+": 95,
  "A": 90,
  "B+": 85,
  "B": 80,
  "C+": 75,
  "C": 70,
  "D": 65,
  "F": 50,
};

export default function StudentReportChart() {
  const [studentId, setStudentId] = useState("");
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState("");

  const fetchReport = async () => {
    if (!studentId) {
      setError("Please enter a Student ID");
      return;
    }

    try {
      setError("");
      const res = await axios.get(
        `http://localhost:8010/reports/student/${studentId}`
      );

      const data = res.data;

      if (!data || data.length === 0) {
        setError("No data found for this student");
        setReportData([]);
        return;
      }

      // Aggregate grades per semester
      const semesterMap = {};
      data.forEach((row) => {
        const sem = row.semester;
        const numericGrade = gradeMap[row.grade] || 0;

        if (!semesterMap[sem]) semesterMap[sem] = [];
        semesterMap[sem].push(numericGrade);
      });

      const semesters = Object.keys(semesterMap).sort((a, b) => a - b);
      const chartData = semesters.map((sem) => ({
        semester: sem,
        avgGrade:
          semesterMap[sem].reduce((a, b) => a + b, 0) / semesterMap[sem].length,
      }));

      setReportData(chartData);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch report. Please try again.");
    }
  };

  const chartJsData = {
    labels: reportData.map((r) => `Sem ${r.semester}`),
    datasets: [
      {
        type: "line",
        label: "Grades",
        data: reportData.map((r) => r.avgGrade),
        borderColor: "green",            // Line color
        backgroundColor: "green",        // Point fill color
        tension: 0.3,
        fill: false,
        pointRadius: 6,
        pointBackgroundColor: "green",
        pointBorderColor: "green",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: "top", 
        labels: { color: "red" }          // Legend text color
      },
      title: { 
        display: true, 
        text: "Student Grades by Semester", 
        color: "red"                      // Title text color
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Grade: ${context.raw}`;
          },
        },
        bodyColor: "red",       // Tooltip text color
        titleColor: "red",      // Tooltip title color
        backgroundColor: "rgba(255,255,255,0.8)", 
        borderColor: "red",
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: { display: true, text: "Grade", color: "red" },
        ticks: { color: "red" },
      },
      x: {
        title: { display: true, text: "Semester", color: "red" },
        ticks: { color: "red" },
      },
    },
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
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Link to="/" style={{ position: "absolute", top: "20px", right: "20px" }}>
        <img src="/logo.jpg" alt="Logo" style={{ width: "70px", height: "70px" }} />
      </Link>

      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "red" }}>Student Grades</h1>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <input
          type="number"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #646cff",
            marginRight: "10px",
            minWidth: "200px",
          }}
        />
        <button
          onClick={fetchReport}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#646cff",
            color: "white",
            cursor: "pointer",
          }}
        >
          View Grades
        </button>
      </div>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {reportData.length > 0 && (
        <div
          style={{
            width: "90%",
            height: "60%",
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: "15px",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Chart type="line" data={chartJsData} options={options} />
        </div>
      )}
    </div>
  );
}
