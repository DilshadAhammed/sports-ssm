// models/Result.js
const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event", // Reference to the Event model
    required: true,
  },
  item: {
    // This will store the specific item like "100m Race"
    type: String,
    required: true,
  },
  category: { type: String, required: true },
  isGroup: { type: Boolean, required: true },
  first: [
    {
      chestNo: String,
      name: String,
      section: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    },
  ],
  second: [
    {
      chestNo: String,
      name: String,
      section: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    },
  ],
  third: [
    {
      chestNo: String,
      name: String,
      section: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    },
  ],
  status: {
    type: String,
    enum: ["Running", "Finished"],
    default: "Running",
  },
});

module.exports = mongoose.model("Result", resultSchema);
