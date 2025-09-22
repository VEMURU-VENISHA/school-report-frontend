import { Link } from 'react-router-dom';

export default function FirstPage() {
  return (
    <div
      style={{
        backgroundImage: `url('/bg4.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'red',
        textAlign: 'center',
      }}
    >
      {/* Logo at top-right with hover effect */}
      <Link to="/" style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <img
          src="/logo.jpg"
          alt="Logo"
          style={{
            width: '70px',  // increased from 50px
            height: '70px',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </Link>

      <h1>Smart Report</h1>
      <Link to="/Studentlogin" className="link" style={{ margin: '10px', fontSize: '20px', color: 'blue' }}>Student</Link>
      <Link to="/Parentlogin" className="link" style={{ margin: '10px', fontSize: '20px', color: 'blue' }}>Parent</Link>
      <Link to="/Teacherlogin" className="link" style={{ margin: '10px', fontSize: '20px', color: 'blue' }}>Teacher</Link>
    </div>
  );
}
