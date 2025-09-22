import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Teacherlogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8010/teachers/validate', {
        username,
        password
      });

      if (response.data === "Login Successful") {
        setLoginError('');
        navigate("/Teacherfirst");
      } else {
        setLoginError("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Server error or invalid credentials");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url('/bg7.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
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

      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '10px' }}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label>Password: </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
        <br />
        <button onClick={handleLogin} style={{ marginBottom: '10px' }}>Login</button>
      </div>
    </div>
  );
}
