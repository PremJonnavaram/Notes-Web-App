const express = require("express");
const mongoose = require("mongoose");
const signupRoutes = require("./Routes/signupRoutes");
const loginRoutes = require("./Routes/loginRoutes");
const googleAuthRoutes = require("./Routes/googleAuthRoutes");
const notesRoutes = require("./Routes/notesRoutes");
const cors = require("cors");
require("dotenv").config();

// App Initializations
const app = express();
app.use(express.json());
app.use(cors());

// Routes and Requests
app.use("/thinkers", signupRoutes);
app.use("/login", loginRoutes);
app.use("/googleAuth", googleAuthRoutes);
app.use("/dashboard", notesRoutes);
// Listen
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to the database and app is listening on port: ",
        process.env.PORT
      );
    });
  })
  .catch((error) => console.log(error));
