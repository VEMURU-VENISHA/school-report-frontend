import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './parentLogin.css';

export default function Parentlogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8010/parents/validate', {
        username,
        password
      });

      if (response.data === "Login Successful") {
        setLoginError('');
        navigate("/ParentPage", { state: { studentId: response.data.studentId } });
      } else {
        setLoginError("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Server error or invalid credentials");
    }
  };

  return (
    <div className="parent-login-container">
      <Link to="/" className="logo-link">
        <img src="/logo.jpg" alt="Logo" className="logo" />
      </Link>

      <div className="login-box">
        <div>
          <label>Username: </label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {loginError && <div style={{ color: 'red', marginTop: '10px' }}>{loginError}</div>}
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
