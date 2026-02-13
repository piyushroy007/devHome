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
app.use("/", require("./routes/user"));

// TODO: Add Error Handling Middleware

module.exports = app;
