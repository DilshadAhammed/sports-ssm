// routes/resultRoutes.js
const express = require("express");
const Result = require("../models/Result");
const Event = require("../models/Event");
const Department = require("../models/Department");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")


router.get('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;

    // Fetch event to ensure it exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Fetch results for the event
    const results = await Result.find({ event: eventId })
      .populate('first.section second.section third.section') // Assuming you have populated data for sections
      .sort({ createdAt: -1 }); // Sort by date, if applicable

    if (results.length === 0) {
      return res.status(404).json({ message: 'No results found for this event' });
    }

    // Separate results into individual and group items
    const individualResults = results.filter(result => !result.isGroup);
    const groupResults = results.filter(result => result.isGroup);

    // Return the results in separate tables
    res.status(200).json({
      event,
      individualResults,
      groupResults,
    });
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add or update result
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { event, item, category, first, second, third, status, isGroup } = req.body;

    // Check if result already exists for the event and item
    let result = await Result.findOne({ event, item });
    let previousCategory = null;

    if (!result) {
      // Create new result for the event and item
      result = new Result({ event, item, category, first, second, third, status, isGroup });
    } else {
      // Track the previous category
      previousCategory = result.category;

      // Update existing result
      result.first = first || [];
      result.second = second || [];
      result.third = third || [];
      result.category = category;
      result.status = status || "Undeclared";
      result.isGroup = isGroup; // Ensure that isGroup is updated if necessary
    }

    // Save the result
    await result.save();

    // Update department counts
    // await updateDepartmentPositions(result, previousCategory);

    res.status(200).json({ message: "Result added/updated successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Update department position counts and total points
const updateDepartmentPositions = async (result, previousCategory) => {
  const categoryPrefix = {
    Sports: "Sports",
    Games: "Games",
    Arts: "Arts",
  };

  const currentCategoryPrefix = categoryPrefix[result.category];
  if (!currentCategoryPrefix) {
    throw new Error("Invalid category in result");
  }

  // Reset previous counts for the previous category, if applicable
  if (previousCategory && previousCategory !== result.category) {
    const previousCategoryPrefix = categoryPrefix[previousCategory];
    if (previousCategoryPrefix) {
      await resetDepartmentCounts(result, previousCategoryPrefix);
    }
  }

  // Increment counts for the new result's category
  for (const winner of result.first) {
    const deptId = winner.section;
    if (deptId) {
      await Department.findByIdAndUpdate(deptId, {
        $inc: {
          [`firstPositions${currentCategoryPrefix}`]: 1,
          [`totalPoints${currentCategoryPrefix}`]: 5,
        },
      });
    }
  }

  for (const winner of result.second) {
    const deptId = winner.section;
    if (deptId) {
      await Department.findByIdAndUpdate(deptId, {
        $inc: {
          [`secondPositions${currentCategoryPrefix}`]: 1,
          [`totalPoints${currentCategoryPrefix}`]: 3,
        },
      });
    }
  }

  for (const winner of result.third) {
    const deptId = winner.section;
    if (deptId) {
      await Department.findByIdAndUpdate(deptId, {
        $inc: {
          [`thirdPositions${currentCategoryPrefix}`]: 1,
          [`totalPoints${currentCategoryPrefix}`]: 1,
        },
      });
    }
  }
};

// Reset counts and points for affected departments
const resetDepartmentCounts = async (result, categoryPrefix) => {
  for (const winner of result.first) {
    const deptId = winner.section;
    if (deptId) {
      await Department.findByIdAndUpdate(deptId, {
        $inc: { [`firstPositions${categoryPrefix}`]: -1, [`totalPoints${categoryPrefix}`]: -5 },
      });
    }
  }

  for (const winner of result.second) {
    const deptId = winner.section;
    if (deptId) {
      await Department.findByIdAndUpdate(deptId, {
        $inc: { [`secondPositions${categoryPrefix}`]: -1, [`totalPoints${categoryPrefix}`]: -3 },
      });
    }
  }

  for (const winner of result.third) {
    const deptId = winner.section;
    if (deptId) {
      await Department.findByIdAndUpdate(deptId, {
        $inc: { [`thirdPositions${categoryPrefix}`]: -1, [`totalPoints${categoryPrefix}`]: -1 },
      });
    }
  }
};

module.exports = router;