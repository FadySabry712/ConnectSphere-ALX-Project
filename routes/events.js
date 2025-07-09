// routes/events.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const authMiddleware = require('../middleware/auth');

// Create an event
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, location, category, date } = req.body;
    const event = new Event({
      title,
      description,
      location,
      category,
      date,
      creator: req.user,
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all events (public)
router.get('/', async (req, res) => {
  try {
    const { location, category } = req.query;
    const query = {};
    // Case-insensitive search
    if (location) query.location = new RegExp(location, 'i'); 
    if (category) query.category = new RegExp(category, 'i');
    const events = await Event.find(query).populate('creator', 'username');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single event by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('creator', 'username');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update an event (authenticated, creator only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.creator.toString() !== req.user) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }
    const { title, description, location, category, date } = req.body;
    Object.assign(event, { title, description, location, category, date });
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete an event (authenticated, creator only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.creator.toString() !== req.user) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }
    await event.deleteOne();
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;