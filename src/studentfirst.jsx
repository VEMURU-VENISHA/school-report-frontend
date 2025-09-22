import { Link } from 'react-router-dom';

export default function StudentFirst() {
  return (
    <div
      style={{
        backgroundImage: `url('/bg3.jpg')`,
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
        overflowY: 'auto', // scroll if content grows
      }}
    >
      {/* Logo at top-right */}
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

      <h1>Welcome to Student Report</h1>

      <Link
        to="/StudentProfile"
        style={{ margin: '10px', fontSize: '20px', color: 'blue' }}
      >
        Profile
      </Link>
      <Link
        to="/StudentPage"
        style={{ margin: '10px', fontSize: '20px', color: 'blue' }}
      >
        Report
      </Link>
      <Link
        to="/PendingCoursesByStudent"
        style={{ margin: '10px', fontSize: '20px', color: 'blue' }}
      >
        My Pending Courses
      </Link>
      <Link
        to="/CurrentCoursesByStudent"
        style={{ margin: '10px', fontSize: '20px', color: 'blue' }}
      >
        My Current Courses
      </Link>
      <Link
        to="/StudentReportChart"
        style={{ margin: '10px', fontSize: '20px', color: 'blue' }}
      >
        My Report Chart
      </Link>
    </div>
  );
}
