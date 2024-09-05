const express = require("express");
const {
  getThinkers,
  getSingleThinker,
  createThinker,
  deleteThinker,
  updateThinker,
} = require("../Controllers/signup");

// Initializations
const router = express.Router();

// All Thinker Routes

// Get all thinkers
router.get("/", getThinkers);

// Get a single thinker
router.get("/:id", getSingleThinker);

// Create a New Thinker
router.post("/", createThinker);

// Delete a Thinker
router.delete("/:id", deleteThinker);

// Update a Thinker
router.patch("/:id", updateThinker);

// Export all modules
module.exports = router;
