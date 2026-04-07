const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const Connection = require("../models/connection");
const { validateEditProfileData } = require("../utils/validation");

const userRouter = express.Router();

userRouter.get("/all", userAuth, async (req, res) => {
    try {
        console.log("req.user from /all GET", req.user);
        const userArr = await User.find();
        console.log("userArr.length from /all GET", userArr.length);
        res.json({
            count: userArr.length,
            userArr,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

userRouter.put("/editUserInfo", userAuth, async (req, res) => {
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
        res.json({ message: "User info updated successfully", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

userRouter.get("/requests", userAuth, async (req, res) => {
    try {
        const loggedinUserId = req.user._id;
        const requests = await Connection.find({
            touserid: loggedinUserId,
        })
            .sort({ createdAt: -1 })
            .populate("fromuserid", "firstname lastname photourl about skill");

        res.json({
            count: requests.length,
            requests,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = userRouter;
