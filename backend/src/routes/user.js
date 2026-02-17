const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Connection = require("../models/connection");

const userRouter = express.Router();

userRouter.get("/user/requests", userAuth, async (req, res) => {
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
