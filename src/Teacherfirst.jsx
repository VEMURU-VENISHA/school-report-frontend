import { Link } from 'react-router-dom';

export default function Teacherfirst() {
  return (
    <div
      style={{
        backgroundImage: `url('/bg7.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'fixed', // ✅ must be fixed for full viewport
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'red',
        textAlign: 'center',
        overflowY: 'auto', // allows scrolling if needed
      }}
    >
      {/* Logo at top-right with hover effect */}
      <Link to="/" style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <img
          src="/logo.jpg"
          alt="Logo"
          style={{
            width: '70px',
            height: '70px',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </Link>

      <h1>Welcome to Teacher Report</h1>
      <Link
        to="/ViewReports"
        style={{ margin: '10px', fontSize: '20px', color: 'blue' }}
      >
        Report by student id
      </Link>
      <Link
        to="/TeacherCourse"
        style={{ margin: '10px', fontSize: '20px', color: 'blue' }}
      >
        Report by course
      </Link>
      <Link
        to="/AddReport"
        style={{ margin: '10px', fontSize: '20px', color: 'blue' }}
      >
        Adding reports
      </Link>
      <Link
        to="/PendingCourses"
        style={{ margin: '10px', fontSize: '20px', color: 'blue' }}
      >
        Pending Courses of students
      </Link>
      <Link
        to="/CurrentCoursesByStudentTeacher"
        style={{ margin: '10px', fontSize: '20px', color: 'blue' }}
      >
        Current Courses of students
      </Link>
      <Link
        to="/StudentReportCompare"
        style={{ margin: '10px', fontSize: '20px', color: 'blue' }}
      >
        Student Report Compare
      </Link>
    </div>
  );
}
