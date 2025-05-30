const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getEvents = async (req, res) => {
  try {
    const { city, state, category, startDate, endDate } = req.query;
    const query = {};

    // Filter by location
    if (city) {
      query['location.city'] = { $regex: new RegExp(city, 'i') };
    }
    if (state) {
      query['location.state'] = { $regex: new RegExp(state, 'i') };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by date range
    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = new Date(startDate);
      }
      if (endDate) {
        query.date.$lte = new Date(endDate);
      }
    } else {
      // By default, only show future events
      query.date = { $gte: new Date() };
    }

    const events = await Event.find(query)
      .sort({ date: 1 })
      .populate('creator', 'name');

    res.status(200).json(events);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('creator', 'name');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private (creators only)
exports.createEvent = async (req, res) => {
  try {
    // Add user to req.body
    req.body.creator = req.user.id;

    const event = await Event.create(req.body);

    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (event creator or admin)
exports.updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Make sure user is event creator or admin
    if (event.creator.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (event creator or admin)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Make sure user is event creator or admin
    if (event.creator.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }

    await event.remove();

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Get events created by logged in user
// @route   GET /api/events/user
// @access  Private
exports.getUserEvents = async (req, res) => {
  try {
    const events = await Event.find({ creator: req.user.id })
      .sort({ date: 1 });

    res.status(200).json(events);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
