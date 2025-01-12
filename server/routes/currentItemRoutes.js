const express = require('express');
const router = express.Router();
const CurrentItem = require('../models/CurrentItem');

// Get current item for a specific event
router.get('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const currentItem = await CurrentItem.findOne({ eventId });

    if (!currentItem) {
      return res.status(404).json({ message: 'No current item found for this event.' });
    }
    
    res.json({ currentItem: currentItem.currentItem });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching current item.', error: error.message });
  }
});

// Update or create current item for an event
router.post('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const { currentItem } = req.body;

    if (!currentItem) {
      return res.status(400).json({ message: 'Current item is required.' });
    }

    const updatedCurrentItem = await CurrentItem.findOneAndUpdate(
      { eventId },
      { currentItem, updatedAt: Date.now() },
      { new: true, upsert: true } // Create a new document if not found
    );

    res.json({ message: 'Current item updated successfully.', updatedCurrentItem });
  } catch (error) {
    res.status(500).json({ message: 'Error updating current item.', error: error.message });
  }
});

// Delete current item for an event
router.delete('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;

    const deletedItem = await CurrentItem.findOneAndDelete({ eventId });

    if (!deletedItem) {
      return res.status(404).json({ message: 'No current item found to delete.' });
    }

    res.json({ message: 'Current item deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting current item.', error: error.message });
  }
});

module.exports = router;
