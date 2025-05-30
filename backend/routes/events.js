const express = require('express');
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getUserEvents
} = require('../controllers/eventController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getEvents)
  .post(protect, authorize('creator', 'admin'), createEvent);

router.route('/:id')
  .get(getEvent)
  .put(protect, authorize('creator', 'admin'), updateEvent)
  .delete(protect, authorize('creator', 'admin'), deleteEvent);

router.get('/user', protect, getUserEvents);

module.exports = router;
