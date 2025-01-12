// models/Department.js
const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Department", departmentSchema);
