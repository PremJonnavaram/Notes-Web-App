const Notes = require("../MongoDB/Notes");

// Get all notes for a user
const getNotes = async (req, res) => {
  const notes = await Notes.find({ email: req.body.email }).sort({
    createdAt: -1,
  });

  if (!notes) {
    return res.status(400).json({ error: "No notes yet" });
  } else {
    if (notes) {
      return res.status(200).json(notes);
    }
  }
};
// Create a note
const createNote = async (req, res) => {
  const { email, title, note } = req.body;

  try {
    const created_note = await Notes.create({
      email,
      title,
      note,
    });
    res.status(200).json(created_note);
  } catch {
    (error) => {
      res.status(404).json({ error: error.message });
    };
  }
};
// Delete a note
const deleteNote = async (req, res) => {
  const { id } = req.body;

  try {
    const deleted_note = await Notes.findByIdAndDelete({ _id: id });
    res.status(200).json(deleted_note);
  } catch {
    (error) => {
      res.status(404).json({ error: error.message });
    };
  }
};

// Export
module.exports = { getNotes, createNote, deleteNote };
