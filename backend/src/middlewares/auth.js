const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        console.log("Received Token:", token);
        if (!token) {
            throw new Error("Token is not valid!");
        }

        const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = decodedObj;
        console.log("_id from decodedObj", _id);
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found");
        }
        console.log("user from userAuth", user);
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
};

module.exports = {
    userAuth,
};
