const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  date: {
    type: Date,
    required: [true, 'Please add a date']
  },
  time: {
    type: String,
    required: [true, 'Please add a time']
  },
  location: {
    city: {
      type: String,
      required: [true, 'Please add a city']
    },
    state: {
      type: String,
      required: [true, 'Please add a state']
    }
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Concert',
      'Festival',
      'Fair',
      'Meetup',
      'Competition',
      'Food',
      'Other'
    ]
  },
  imageUrl: {
    type: String
  },
  ticketInfo: {
    type: String
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add index for location queries
EventSchema.index({ 'location.city': 1, 'location.state': 1 });

// Add index for date queries (for upcoming events)
EventSchema.index({ date: 1 });

module.exports = mongoose.model('Event', EventSchema);
