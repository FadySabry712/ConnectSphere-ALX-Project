// src/pages/Profile.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchUserEvents = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/events', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          setEvents(response.data.filter((event) => event.creator._id === user.id));
        } catch (error) {
          console.error('Error fetching user events:', error);
        }
      };
      fetchUserEvents();
    }
  }, [user]);

  if (!user) return <div>Please log in to view your profile.</div>;

  return (
    <div className="page">
      <Header />
      <div className="container">
        <h1>User Profile</h1>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button onClick={logout} className="btn btn-danger">Logout</button>
        <h2>My Events</h2>
        <div className="event-list">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;