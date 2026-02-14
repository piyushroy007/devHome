const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/auth");
const {
    validateSignupData,
    validateEditProfileData,
} = require("../utils/validation");
const userRouter = express.Router();

// GET /user - Get user by email id
// Accepts emailid as a query parameter: /user?emailid=example@test.com
userRouter.get("/user", async (req, res) => {
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
userRouter.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /user - Create a user (Generic Create)
userRouter.post("/user", async (req, res) => {
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
userRouter.patch("/user/:userId", async (req, res) => {
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
userRouter.put("/user/:userId", async (req, res) => {
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
userRouter.delete("/user/:userId", async (req, res) => {
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

module.exports = userRouter;
