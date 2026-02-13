const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
    validateSignupData,
    validateEditProfileData,
} = require("../utils/validation");
const router = express.Router();

// POST /signup - Create or register a new user
router.post("/signup", async (req, res) => {
    try {
        // Validation of data
        validateSignupData(req);

        const { firstname, lastname, emailid, password, age, gender } =
            req.body;

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
router.post("/login", async (req, res) => {
    try {
        const { emailid, password } = req.body;

        // 1. Find user by email
        const user = await User.findOne({ emailid });
        if (!user) {
            throw new Error("Invalid credentials");
        }

        // 2. Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        // 3. Create a JWT Token
        const token = await jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            },
        );

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

// GET /profile - Get profile of the logged in user
router.get("/profile", async (req, res) => {
    try {
        const cookies = req.cookies;
        const { token } = cookies;

        if (!token) {
            throw new Error("Invalid Token");
        }

        // Verify the token
        const decodedMessage = await jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = decodedMessage;

        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User does not exist");
        }

        res.send(user);
    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
});

// GET /user - Get user by email id
// Accepts emailid as a query parameter: /user?emailid=example@test.com
router.get("/user", async (req, res) => {
    try {
        const { emailid } = req.query;
        if (!emailid) {
            return res
                .status(400)
                .json({ error: "emailid query parameter is required" });
        }

        const user = await User.findOne({ emailid });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /feed - Get all users from db
router.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /user - Create a user (Generic Create)
router.post("/user", async (req, res) => {
    try {
        validateSignupData(req);

        const { firstname, lastname, emailid, password, age, gender } =
            req.body;

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
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PATCH /user/:userId - Update user partially
router.patch("/user/:userId", async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            return res
                .status(400)
                .json({ error: "Update not allowed for some fields" });
        }

        const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT /user/:userId - Update user fully
router.put("/user/:userId", async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            return res
                .status(400)
                .json({ error: "Update not allowed for some fields" });
        }

        const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE /user/:userId - Delete user
router.delete("/user/:userId", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
