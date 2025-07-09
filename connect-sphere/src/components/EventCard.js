// src/components/EventCard.js
import React from 'react';
import { Link } from 'react-router-dom';

function EventCard({ event }) {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
      <p><strong>Creator:</strong> {event.creator.username}</p>
      <Link to={`/events/${event._id}`} className="btn">View Details</Link>
    </div>
  );
}

export default EventCard;