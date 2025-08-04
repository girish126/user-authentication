import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Home Page</h1>
      <p className="home-subtext">You are logged in.</p>
      <Link to="/login" className="logout-button">
        Logout
      </Link>
    </div>
  )
}

export default Home
