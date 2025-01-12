const express = require("express");
const router = express.Router();
const Department = require("../models/Department");
const Result = require("../models/Result");

router.get("/:eventId", async (req, res) => {
  const { eventId } = req.params;
  try {
    const results = await Result.find({ event: eventId }).populate(
      "first.section second.section third.section"
    );

    // Create a map to store points for each department
    const departmentPoints = {};

    results.forEach((result) => {
      // Define point values for individual and group items
      const pointValues = result.isGroup
        ? { first: 10, second: 5, third: 3 }
        : { first: 5, second: 3, third: 1 };

      // Count points for 1st positions
      result.first.forEach((winner) => {
        const deptId = winner.section._id.toString();
        if (!departmentPoints[deptId]) {
          departmentPoints[deptId] = {
            firstPrizes: 0,
            secondPrizes: 0,
            thirdPrizes: 0,
            points: 0,
          };
        }
        departmentPoints[deptId].firstPrizes += 1;
        departmentPoints[deptId].points += pointValues.first;
      });

      // Count points for 2nd positions
      result.second.forEach((winner) => {
        const deptId = winner.section._id.toString();
        if (!departmentPoints[deptId]) {
          departmentPoints[deptId] = {
            firstPrizes: 0,
            secondPrizes: 0,
            thirdPrizes: 0,
            points: 0,
          };
        }
        departmentPoints[deptId].secondPrizes += 1;
        departmentPoints[deptId].points += pointValues.second;
      });

      // Count points for 3rd positions
      result.third.forEach((winner) => {
        const deptId = winner.section._id.toString();
        if (!departmentPoints[deptId]) {
          departmentPoints[deptId] = {
            firstPrizes: 0,
            secondPrizes: 0,
            thirdPrizes: 0,
            points: 0,
          };
        }
        departmentPoints[deptId].thirdPrizes += 1;
        departmentPoints[deptId].points += pointValues.third;
      });
    });

    // Fetch all departments
    const departments = await Department.find();

    // Prepare response with points
    const response = departments.map((dept) => ({
      department: dept.name,
      firstPrizes: departmentPoints[dept._id.toString()]?.firstPrizes || 0,
      secondPrizes: departmentPoints[dept._id.toString()]?.secondPrizes || 0,
      thirdPrizes: departmentPoints[dept._id.toString()]?.thirdPrizes || 0,
      points: departmentPoints[dept._id.toString()]?.points || 0,
    }));
    // Sort by points in descending order
    response.sort((a, b) => b.points - a.points);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
