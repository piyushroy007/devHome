const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Connection = require("../models/connection");
const User = require("../models/user");
const router = express.Router();

const getAllowedStatuses = () => {
    const path = Connection.schema.path("status");
    return (path.options && path.options.enum) || path.enumValues || [];
};

router.post("/request/send/:status/:userid", userAuth, async (req, res) => {
    try {
        const toUserId = req.params.userid;
        const statusParam = (req.params.status || "").toLowerCase();
        const allowed = ["interested", "ignored"];
        if (!allowed.includes(statusParam)) {
            return res
                .status(400)
                .json({ error: "Invalid status ", sentStatus: statusParam });
        }
        const fromUserId = req.user._id;
        if (!toUserId) {
            return res.status(400).json({ error: "userid is required" });
        }
        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(404).json({ error: "Target user not found" });
        }
        const existing = await Connection.findOne({
            $or: [
                { fromuserid: fromUserId, touserid: toUserId },
                { fromuserid: toUserId, touserid: fromUserId },
            ],
        });
        if (existing) {
            return res.status(409).json({
                error: "Request already exists",
                status: existing.status,
            });
        }
        const conn = new Connection({
            fromuserid: fromUserId,
            touserid: toUserId,
            status: statusParam,
        });
        await conn.save();
        const messages = {
            interested: `Connection sent to user ${toUser.firstname} ${toUser.lastname}`,
            ignored: `Connection ignored by user ${req.user.firstname} ${req.user.lastname}`,
        };
        const message = messages[statusParam] || "Connection created";
        res.status(201).json({ message, connection: conn });
    } catch (error) {
        if (error && error.code === 11000) {
            return res.status(409).json({ error: "Duplicate request" });
        }
        res.status(400).json({ error: error.message });
    }
});

router.post("/request/review/:status/:userid", userAuth, async (req, res) => {
    try {
        const fromUserId = req.params.userid;
        const statusParam = (req.params.status || "").toLowerCase();
        const allowed = ["accepted", "rejected"];
        if (!allowed.includes(statusParam)) {
            return res.status(400).json({
                error: "Invalid review status",
                sentStatus: statusParam,
            });
        }

        const toUserId = req.user._id;

        const connection = await Connection.findOne({
            fromuserid: fromUserId,
            touserid: toUserId,
            status: { $in: ["interested"] },
        }).populate("fromuserid", "firstname lastname");

        if (!connection) {
            return res
                .status(404)
                .json({ error: "No pending request found for this user" });
        }

        connection.status = statusParam;
        await connection.save();

        const messages = {
            accepted: "Connection request accepted",
            rejected: "Connection request rejected",
            ignored: "Connection request ignored",
        };
        const message = messages[statusParam] || "Connection request updated";

        res.json({ message, connection });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
