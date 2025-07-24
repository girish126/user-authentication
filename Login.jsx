import './Auth.css';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; // Optional, if you added styling
import { validateLogin } from '../Utils/Utiles.jsx'; // Make sure path is correct

function Login() {
  const [logInfo, setLogInfo] = useState({
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

    const error = validateLogin(logInfo);
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logInfo),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Login failed');
        return;
      }

      // ✅ Save token
      localStorage.setItem('token', data.token);
      // Optional: Save user info
      // localStorage.setItem('user', JSON.stringify(data.user));

      toast.success('Login successful! Redirecting...', { autoClose: 2000 });

      setTimeout(() => {
        navigate('/home');
      }, 2000);

      setLogInfo({ email: '', password: '' });
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className='container'>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            value={logInfo.email}
            onChange={handleChange}
            placeholder='Enter your email...'
            required
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={logInfo.password}
            onChange={handleChange}
            placeholder='Enter your password...'
            required
          />
        </div>

        <button type='submit'>Login</button>

        <span>
          Don't have an account? <Link to='/signup'>Signup</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Login;
