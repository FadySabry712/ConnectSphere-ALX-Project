// src/pages/EventDetails.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [rsvps, setRsvps] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data);
        const rsvpResponse = await axios.get(`http://localhost:5000/api/rsvps/${id}`);
        setRsvps(rsvpResponse.data);
      } catch (error) {
        setError('Failed to load event');
      }
    };
    fetchEvent();
  }, [id]);

  const handleRSVP = async () => {
    if (!user) {
      setError('You must be logged in to RSVP');
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:5000/api/rsvps',
        { eventId: id },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setMessage(response.data.message);
      setRsvps([...rsvps, { userId: { username: user.username }, eventId: id }]);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to RSVP');
    }
  };

  if (!event) return <div>Loading...</div>;


  return (
    <div className="page">
      <Header />
      <div className="container">
        <h1>{event.title}</h1>
        <p>{event.description}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Category:</strong> {event.category}</p>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
        <p><strong>Creator:</strong> {event.creator.username}</p>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        <div className="button-group">
          <button onClick={handleRSVP} className="btn">RSVP</button>
          {user && user.id === event.creator._id && (
            <>
              <button onClick={() => navigate(`/events/${id}/edit`)} className="btn">Edit Event</button>
              <button onClick={async () => {
                try {
                  await axios.delete(`http://localhost:5000/api/events/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                  });
                  navigate('/');
                } catch (error) {
                  setError('Failed to delete event');
                }
              }} className="btn btn-danger">Delete Event</button>
            </>
          )}
        </div>
        <h2>Attendees</h2>
        <ul>
          {rsvps.map((rsvp) => (
            <li key={rsvp._id}>{rsvp.userId.username}</li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default EventDetails;