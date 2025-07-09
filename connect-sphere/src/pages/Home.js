// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';

function Home() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events?location=${search}`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
  };

  return (
    <div className="page">
      <Header />
      <div className="container">
        <h1>ConnectSphere</h1>
        <form className="search-bar" onSubmit={handleSearch}>
          <input type="text" name="search" placeholder="Search by location" />
          <button type="submit" className="btn">Search</button>
        </form>
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

export default Home;