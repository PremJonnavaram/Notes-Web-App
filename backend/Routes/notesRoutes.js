const express = require("express");
const { getNotes, createNote, deleteNote } = require("../Controllers/notes");

// Initializations
const router = express.Router();

// Get all notes
router.post("/", getNotes);

// Create a note
router.post("/add", createNote);

// Delete a note
router.delete("/delete", deleteNote);

// Export all modules
module.exports = router;
