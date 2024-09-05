const mongoose = require("mongoose");
const Thinkers = require("../MongoDB/Thinkers");

// Get all thinkers
const getThinkers = async (req, res) => {
  const thinkers = await Thinkers.find({}).sort({ createdAt: -1 });
  res.status(200).json(thinkers);
};

// Get a single thinker
const getSingleThinker = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Id" });
  }

  const thinker = await Thinkers.findById(id);

  if (!thinker) {
    return res.status(404).json({ error: "No such thinker" });
  } else {
    return res.status(200).json({ Confirmation: "Found a thinker" });
  }
};

// Create a new Thinker
const createThinker = async (req, res) => {
  const { email, username, password } = req.body;

  // Check if the email or password is already registered
  const emailThinker = await Thinkers.findOne({ email: req.body.email });
  const usernameThinker = await Thinkers.findOne({
    username: req.body.username,
  });

  // If Email is already in use
  if (emailThinker) {
    return res.status(400).json({
      thinkerFound:
        "Thinker already exists, Login or try Signing up with a new email",
    });
  }
  // If Password is already in use
  if (usernameThinker) {
    return res.status(401).json({
      userNameExists: "Username already taken, please try with a different one",
    });
  }
  // If both and email and username are unique
  else if (!emailThinker && !usernameThinker) {
    try {
      const created_thinker = await Thinkers.create({
        email,
        username,
        password,
      });
      res.status(200).json(created_thinker);
    } catch {
      (error) => {
        res.status(404).json({ error: error.message });
      };
    }
  }
};

// Delete a Thinker
const deleteThinker = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Id" });
  }

  const deleted_thinker = await Thinkers.findOneAndDelete({ _id: id });

  if (!deleted_thinker) {
    return res.status(400).json({ error: "No such thinker" });
  }

  res.status(200).json({
    Confirmation: "User Deleted",
    User_Details: {
      email: deleted_thinker.email,
      username: deleted_thinker.username,
    },
  });
};

// Update a Thinker
const updateThinker = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Id" });
  }

  const thinker = await Thinkers.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!thinker) {
    return res.status(400).json({ error: "No such thinker" });
  }

  res.status(200).json(await Thinkers.findById(id));
};

module.exports = {
  getThinkers,
  getSingleThinker,
  createThinker,
  deleteThinker,
  updateThinker,
};
