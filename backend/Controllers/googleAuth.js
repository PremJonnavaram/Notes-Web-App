const Thinkers = require("../MongoDB/Thinkers");

// Random Password Generator
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

// Auth Function
const findThinker = async (req, res) => {
  const thinker = await Thinkers.findOne({ email: req.body.email });
  if (thinker) {
    return res.status(200).json(thinker);
  } else if (!thinker) {
    // return res.status(400).json({ error: "No such thinker" });
    try {
      const created_thinker = await Thinkers.create({
        email: req.body.email,
        username: req.body.username,
        password: generateString(10),
      });
      res.status(200).json(created_thinker);
    } catch {
      (error) => {
        res.status(404).json({ error: error.message });
      };
    }
  }
};

module.exports = { findThinker };
