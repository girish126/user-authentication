// src/Pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../Utils/Utiles';
import './Home.css'; // 👈 Import the CSS file

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Welcome to the Home Page 🎉</h1>
        <p>You are successfully logged in!</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Home;
