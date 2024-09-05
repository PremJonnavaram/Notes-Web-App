const Thinkers = require("../MongoDB/Thinkers");

// Find Thinker by Email and Password
const findThinker = async (req, res) => {
  const thinker = await Thinkers.findOne({ email: req.body.email });

  if (!thinker) {
    return res.status(400).json({ error: "No such thinker" });
  } else {
    if (req.body.password === thinker.password) {
      return res.status(200).json(thinker);
    } else if (req.body.password !== thinker.password) {
      return res.status(401).json({ passwordMismatch: "Wrong Passowrd" });
    }
  }
};

module.exports = { findThinker };
