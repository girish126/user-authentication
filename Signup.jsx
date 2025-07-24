import './Auth.css';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';
import { validateSignup } from '../Utils/Utiles.jsx';

function Signup() {
  const [logInfo, setLogInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedInfo = {
      name: logInfo.name.trim(),
      email: logInfo.email.trim(),
      password: logInfo.password.trim(),
    };

    const error = validateSignup(trimmedInfo);
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trimmedInfo),
      });

      const contentType = res.headers.get('content-type');

      if (!res.ok) {
        if (contentType && contentType.includes('application/json')) {
          const errorData = await res.json();
          toast.error(errorData.message || 'Signup failed');
        } else {
          toast.error('Server error. Please try again later.');
        }
        return;
      }

      const data = await res.json();
      toast.success(data.message || 'Signup successful! Redirecting to login...', {
        autoClose: 2000,
      });

      setTimeout(() => navigate('/login'), 2000);

      setLogInfo({ name: '', email: '', password: '' });
    } catch (err) {
      console.error('Signup error:', err);
      toast.error('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={logInfo.name}
            onChange={handleChange}
            placeholder="Enter your name..."
            autoFocus
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={logInfo.email}
            onChange={handleChange}
            placeholder="Enter your email..."
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={logInfo.password}
            onChange={handleChange}
            placeholder="Enter your password..."
          />
        </div>

        <button type="submit">Signup</button>

        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
