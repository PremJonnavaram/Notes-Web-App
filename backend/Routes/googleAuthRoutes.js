const express = require("express");
const { findThinker } = require("../Controllers/googleAuth");

// Initializations
const router = express.Router();

// Authenticate
router.post("/", findThinker);

// Export all modules
module.exports = router;
