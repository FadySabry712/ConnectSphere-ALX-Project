// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <h1 className="logo">ConnectSphere</h1>
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/signup" className="nav-link">Signup</Link>
        <Link to="/events/new" className="nav-link">Create Event</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
      </nav>
    </header>
  );
}

export default Header;