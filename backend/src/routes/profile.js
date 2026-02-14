const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const router = express.Router();

router.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
});

router.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            return res
                .status(400)
                .json({ error: "Update not allowed for some fields" });
        }
        const user = await User.findByIdAndUpdate(req.user._id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;

router.post("/profile/password", userAuth, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res
                .status(400)
                .json({ error: "oldPassword and newPassword are required" });
        }
        const user = req.user;
        const ok = await user.validatePassword(oldPassword);
        if (!ok) {
            return res.status(400).json({ error: "Invalid current password" });
        }
        if (!validator.isStrongPassword(newPassword)) {
            return res
                .status(400)
                .json({ error: "Please enter a strong password" });
        }
        const hash = await bcrypt.hash(newPassword, 10);
        user.password = hash;
        await user.save();
        res.json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
