const mongoose = require('mongoose');

const CurrentItemSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // Reference to an Event schema
    required: true,
  },
  currentItem: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CurrentItem', CurrentItemSchema);
