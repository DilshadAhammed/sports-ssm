const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: {
    type: String,
    enum: ["Sports", "Games", "Arts"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  description: { 
    type: String, 
    required: true 
  },
  image: {
    type: String,  // Store the file path or URL of the image
    required: true,
  },
});

module.exports = mongoose.model("Event", eventSchema);
