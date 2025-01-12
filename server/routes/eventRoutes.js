const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware")

// Fetch all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events from the database
    res.status(200).json(events); // Send the list of events to the frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

/// Add an event with image upload
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { name, category, status, description } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Cloudinary URL
    

    if (!imageUrl) {
      return res.status(400).json({ error: "Image is required" });
    }

    // Check if event already exists
    const existingEvent = await Event.findOne({ name });
    if (existingEvent) {
      return res.status(400).json({ error: "Event with this name already exists" });
    }

    // Create and save new event
    const event = new Event({
      name,
      category,
      status,
      description,
      image: imageUrl,  // Store Cloudinary image URL
    });

    await event.save();
    res.status(200).json({ message: "Event added successfully", event });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Delete event
router.delete("/:id", async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findByIdAndDelete(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
