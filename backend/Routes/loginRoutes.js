const express = require("express");
const { findThinker } = require("../Controllers/login");

// Initializations
const router = express.Router();

// All Authentication Routes

// Find a Thinker
router.post("/", findThinker);

// Export all modules
module.exports = router;
