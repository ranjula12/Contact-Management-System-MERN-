const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const connectionDB = require("./config/db");

const auth = require("./middleware/auth");

const app = express();

//middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(require("cors")());

//routes
app.get("/protected", auth, (req, res) => {
  return res.status(200).json({ user: req.user });
});
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/contact"));

//server configeration
const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  try {
    await connectionDB();
    console.log(`server is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
