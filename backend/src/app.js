const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    }),
);
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

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/request", requestRouter);

// TODO: Add Error Handling Middleware

module.exports = app;
