const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            trim: true,
        },
        lastname: {
            type: String,
            trim: true,
        },
        emailid: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            min: 18,
        },
        gender: {
            type: String,
            validate(value) {
                if (
                    !["male", "female", "others"].includes(value.toLowerCase())
                ) {
                    throw new Error("Gender data is not valid");
                }
            },
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("User", userSchema);
