// routes/rsvps.js
const express = require('express');
const router = express.Router();
const RSVP = require('../models/RSVP');
const Event = require('../models/Event');
const authMiddleware = require('../middleware/auth');

// Create an RSVP
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { eventId } = req.body;
    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    // Check if user already RSVP'd
    const existingRSVP = await RSVP.findOne({ userId: req.user, eventId });
    if (existingRSVP) {
      return res.status(400).json({ message: 'You have already RSVP\'d to this event' });
    }
    // Create RSVP
    const rsvp = new RSVP({
      userId: req.user,
      eventId,
    });
    await rsvp.save();
    res.status(201).json({ 
      message: 'Successfully RSVP\'d to the event',
      rsvp,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get RSVPs for an event (public)
router.get('/:eventId', async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const rsvps = await RSVP.find({ eventId: req.params.eventId })
      .populate('userId', 'username');
    res.json(rsvps);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;