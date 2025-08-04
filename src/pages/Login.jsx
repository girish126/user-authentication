import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password
      })

      if (response.data.success) {
        alert('Login successful')
        localStorage.setItem('token', response.data.jwtToken)
        navigate('/')
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message)
      alert('Login failed')
    }
  }

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p className="login-footer">
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  )
}

export default Login
