const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignupData } = require("../utils/validation");
const authRouter = express.Router();

// POST /signup - Create or register a new user
authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignupData(req);

    const { firstname, lastname, emailid, password, age, gender } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstname,
      lastname,
      emailid,
      password: passwordHash,
      age,
      gender,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST /login - Login user
authRouter.post("/login", async (req, res) => {
  try {
    const { emailid, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ emailid });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // 2. Compare passwords using schema method
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // 3. Create a JWT Token using schema method
    const token = await user.getJWT();

    // 4. Add the token to cookie and send the response back to user
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000), // cookie expires in 8 hours
      httpOnly: true,
    });

    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST /logout - Logout user
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful!!");
});

module.exports = authRouter;
