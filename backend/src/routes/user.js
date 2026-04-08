const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const Connection = require("../models/connection");
const { validateEditProfileData } = require("../utils/validation");
const USER_SAFE_DATA = "firstname lastname photourl age gender about skill";
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

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        const connectionRequests = await Connection.find({
            $or: [
                { fromuserid: loggedInUser._id },
                { touserid: loggedInUser._id },
            ],
        }).select("fromuserid touserid");
        console.log("connectionRequests from /feed GET", connectionRequests);
        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromuserid.toString());
            hideUsersFromFeed.add(req.touserid.toString());
        });

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id } },
            ],
        })
            .select(USER_SAFE_DATA)
            .skip(skip)
            .limit(limit);
        console.log("users from /feed GET", users);
        res.json({ userList: users });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = userRouter;
