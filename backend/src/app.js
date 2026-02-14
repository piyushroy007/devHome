const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser
app.use(cookieParser());

// Basic Health Check Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Routes
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// TODO: Add Error Handling Middleware

module.exports = app;
