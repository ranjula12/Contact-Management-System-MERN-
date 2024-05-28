require("dotenv").config({ path: "./config/config.env" });
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = require("../middleware/auth");

router.post("/login");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  //check all missing fields
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please enter all fields" });
  }

  //name validation
  if (name.length > 25) {
    return res
      .status(400)
      .json({ error: "Name only can be less than 25 characters" });
  }

  //email validation
  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailReg.test(email)) {
    return res.status(400).json({ error: "Invalid Email" });
  }

  //validation of password
  if (password.length <= 6) {
    return res
      .status(400)
      .json({ error: "Password should be atleast 6 characters long" });
  }

  try {
    const userAlredyExists = await User.findOne({ email });

    if (userAlredyExists) {
      return res.status(400).json({
        error: `User  with that the email [${email}]already exists so pleas try another one1`,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    //save the user
    const result = await newUser.save();

    result._doc.password = undefined;

    return res.status(201).json({ ...result._doc });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please enter all fields" });
  }

  //email validation
  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailReg.test(email)) {
    return res.status(400).json({ error: "Invalid Email" });
  }

  try {
    const userAlreadyexits = await User.findOne({ email });
    if (!userAlreadyexits) {
      return res.status(400).json({ error: "invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, userAlreadyexits.password);
    if (!isMatch) {
      res.status(400).json({ error: "invalid email or password" });
    }

    const payload = {
      _id: userAlreadyexits._id,
    };
    const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const user = { ...userAlreadyexits._doc, password: undefined };
    return res.status(200).json({ authToken, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.get("/me", auth, async (req, res) => {
  return res.status(200).json({ ...req.user._doc });
});
module.exports = router;
