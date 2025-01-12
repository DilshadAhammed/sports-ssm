// routes/departmentRoutes.js
const express = require("express");
const Department = require("../models/Department");
const Result = require("../models/Result");


const router = express.Router();

// Add a new department
router.post("/", async (req, res) => {
  try {
    const { name, code } = req.body;
    const department = new Department({ name, code });
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find().sort({ totalPoints: -1 });
    
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update department points
router.put("/:id", async (req, res) => {
  try {
    const { totalPoints } = req.body;
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { totalPoints },
      { new: true }
    );
    if (!department) return res.status(404).json({ error: "Department not found" });
    res.status(200).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
