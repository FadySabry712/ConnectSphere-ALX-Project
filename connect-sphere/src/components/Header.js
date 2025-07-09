import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);
  
  return (
    <header className="header">
      <h1 className="logo">ConnectSphere</h1>
      <nav>
        {user ? (
          <>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/events/new" className="nav-link">Create Event</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
            <button onClick={logout} className="nav-link btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;